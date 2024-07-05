import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TipInsert from '../../components/tip/TipInsert';
import { LoginContext } from '../../components/contexts/LoginContextProvider';

const TipInsertContainer = () => {
  const { userInfo } = useContext(LoginContext);
  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [mainImagePreviews, setMainImagePreviews] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setIsLoading(false);
    }
  }, [userInfo]);

  const handleTitleChange = (e) => setBoardTitle(e.target.value);
  const handleContentChange = (e) => setBoardContent(e.target.value);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnailFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setMainImagePreviews([reader.result]);
    };
    reader.readAsDataURL(file);
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);

    const readerPromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readerPromises).then((images) => {
      setFilePreviews(images);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('boardTitle', boardTitle);
    formData.append('boardContent', boardContent);
    formData.append('userNo', userInfo.userNo);

    if (thumbnailFile) {
      formData.append('thumbnail', thumbnailFile);
    }

    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append('file', file);
      });
    }

    try {
      const response = await axios.post('http://localhost:8080/tip/boards', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Form submitted successfully', response.data);
      navigate('/tip/boards');
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
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
      userId={userInfo?.userId || ''}
    />
  );
};

export default TipInsertContainer;
