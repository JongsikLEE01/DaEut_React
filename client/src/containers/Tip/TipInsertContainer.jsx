import React, { useState } from 'react';
import axios from 'axios';
import TipInsert from '../../components/tip/TipInsert';

const TipInsertContainer = () => {
  const [boardTitle, setBoardTitle] = useState('');
  const [boardContent, setBoardContent] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [files, setFiles] = useState([]);
  const [mainImagePreviews, setMainImagePreviews] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);

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
    if (thumbnail) formData.append('thumbnail', thumbnail);
    files.forEach(file => formData.append('file', file));
  
    // 콘솔 로그 추가
    for (let pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
  
    try {
      const response = await axios.post('/boards', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Form submitted successfully', response.data);
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

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
    />
  );
};

export default TipInsertContainer;
