import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../tip/css/TipRead.css';

const PostEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [board, setBoard] = useState({ boardTitle: '', boardContent: '' });
  const [fileList, setFileList] = useState([]);
  const [mainImagePreview, setMainImagePreview] = useState([]);
  const [additionalImagePreview, setAdditionalImagePreview] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 쿼리 매개변수 추출
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
      await axios.post('/tip/tipUpdate', formData);
      navigate(`/tip/boards/${boardNo}`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDelete = async () => {
    setShowModal(false);
    try {
      await axios.post('/tip/tipDelete', { boardNo });
      navigate('/tip/boards');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleFileDelete = async (fileNo) => {
    try {
      await axios.delete(`/file/${fileNo}`);
      setFileList(fileList.filter(file => file.fileNo !== fileNo));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container">
      <form id="form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="title" className="form-label visually-hidden">제목</label>
          <input
            type="text"
            id="title"
            className="form-control"
            name="boardTitle"
            value={board.boardTitle}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="content"
            rows="8"
            name="boardContent"
            value={board.boardContent}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">썸네일</label>
          <input
            type="file"
            className="form-control"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            onChange={handleMainImageChange}
          />
          <div className="form-text">사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.</div>
          <div id="image-main-container" className="d-flex flex-wrap gap-2">
            {mainImagePreview.map((src, index) => (
              <img key={index} src={src} alt="이미지 미리보기" className="img-thumbnail" style={{ maxWidth: '200px' }} />
            ))}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">첨부파일</label>
          <input
            type="file"
            className="form-control"
            id="file"
            name="file"
            accept="image/*"
            multiple
            onChange={handleAdditionalImageChange}
          />
          <div className="form-text">사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.</div>
          <div id="image-preview-container" className="d-flex flex-wrap gap-2">
            {additionalImagePreview.map((src, index) => (
              <img key={index} src={src} alt="이미지 미리보기" className="img-thumbnail" style={{ maxWidth: '200px' }} />
            ))}
          </div>
        </div>
        <div className="mb-3">
          <ul>
            {fileList.map(file => (
              <li key={file.fileNo}>
                <a href={`/file/img/${file.fileNo}`} download>{file.originFileName}</a>
                <button type="button" onClick={() => handleFileDelete(file.fileNo)} className="btn btn-primary me-2">삭제</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary me-2">수정하기</button>
          <button type="button" onClick={handleShowModal} className="btn btn-primary me-2">삭제하기</button>
          <a href={`/tip/boards/${boardNo}`} className="btn btn-outline-secondary">목록</a>
        </div>
      </form>
      
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말로 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            취소
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostEdit;
