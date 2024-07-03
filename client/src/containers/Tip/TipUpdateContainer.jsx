import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import TipUpdate from '../../components/tip/TipUpdate';

const TipUpdateContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [board, setBoard] = useState({ boardTitle: '', boardContent: '' });
  const [fileList, setFileList] = useState([]);
  const [mainImagePreview, setMainImagePreview] = useState([]);
  const [additionalImagePreview, setAdditionalImagePreview] = useState([]);

  const query = new URLSearchParams(location.search);
  const boardNo = query.get('no');

  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const response = await axios.get(`/tip/boards/${boardNo}`);
        setBoard(response.data.board);
        setFileList(response.data.fileList);
      } catch (error) {
        console.error('Error fetching board details:', error);
      }
    };

    fetchBoardDetails();
  }, [boardNo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBoard({ ...board, [name]: value });
  };

  const handleMainImageChange = (e) => {
    const files = Array.from(e.target.files);
    setMainImagePreview(files.map(file => URL.createObjectURL(file)));
  };

  const handleAdditionalImageChange = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalImagePreview(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('boardNo', boardNo);
    formData.append('boardTitle', board.boardTitle);
    formData.append('boardContent', board.boardContent);

    try {
      await axios.put(`/tip/boards/${boardNo}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate(`/tip/boards/${boardNo}`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/tip/boards/${boardNo}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      navigate('/tip/boards');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleDeleteConfirm = () => {
    Swal.fire({
      title: '게시글을 삭제하시겠습니까?',
      text: '삭제하면 되돌릴 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      }
    });
  };

  const handleFileDelete = async (fileNo) => {
    try {
      await axios.delete(`/file/${fileNo}`);
      setFileList(fileList.filter(file => file.fileNo !== fileNo));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <TipUpdate
      board={board}
      mainImagePreview={mainImagePreview}
      additionalImagePreview={additionalImagePreview}
      fileList={fileList}
      handleInputChange={handleInputChange}
      handleMainImageChange={handleMainImageChange}
      handleAdditionalImageChange={handleAdditionalImageChange}
      handleSubmit={handleSubmit}
      handleFileDelete={handleFileDelete}
      handleDeleteConfirm={handleDeleteConfirm}
      boardNo={boardNo}
    />
  );
};

export default TipUpdateContainer;
