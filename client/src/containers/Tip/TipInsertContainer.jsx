import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import TipInsert from '../../components/tip/TipInsert';
import { LoginContext } from '../../components/contexts/LoginContextProvider';

const TipInsertContainer = () => {
  const { userInfo } = useContext(LoginContext); // LoginContext에서 userInfo 가져오기
  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [files, setFiles] = useState([]);
  const [mainImagePreviews, setMainImagePreviews] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    if (userInfo) {
      setIsLoading(false);
    }
  }, [userInfo]);

  const handleTitleChange = (e) => setBoardTitle(e.target.value);
  const handleContentChange = (e) => setBoardContent(e.target.value);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setMainImagePreviews([URL.createObjectURL(file)]);
  };

  const handleFilesChange = (e) => {
    const fileArray = Array.from(e.target.files);
    setFiles(fileArray);
    setFilePreviews(fileArray.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('boardTitle', boardTitle);
    formData.append('boardContent', boardContent);
    if (userInfo) {
      formData.append('userNo', userInfo.userNo); // userNo 추가
    }
    if (thumbnail) formData.append('thumbnail', thumbnail);
    files.forEach(file => formData.append('file', file));

    try {
      const response = await axios.post('http://localhost:8080/tip/boards', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Form submitted successfully', response.data);
      navigate('/tip/boards'); // 게시글 등록 성공 후 게시판 메인 페이지로 이동
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>; // 로딩 중 메시지
  }

  return (
    <TipInsert
      boardTitle={boardTitle}
      boardContent={boardContent}
      mainImagePreviews={mainImagePreviews}
      filePreviews={filePreviews}
      handleTitleChange={handleTitleChange}
      handleContentChange={handleContentChange}
      handleThumbnailChange={handleThumbnailChange}
      handleFilesChange={handleFilesChange}
      handleSubmit={handleSubmit}
      userId={userInfo?.userId || ''} // userId 전달, userInfo가 null일 때 빈 문자열 전달
    />
  );
};

export default TipInsertContainer;
