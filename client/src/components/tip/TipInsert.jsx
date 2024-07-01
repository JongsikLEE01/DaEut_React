import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../tip/css/TipInsert.css';

function TipInsert() {
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
    <div className="container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3 d-flex align-items-center border rounded px-3 py-2">
          <input type="hidden" name="userNo" value="userNo" />
          <label htmlFor="userId" className="form-label mb-0 text-center me-3 label-adjust">작성자 ID</label>
          <div className="vertical-line"></div>
          <input type="text" id="userId" className="form-control borderless-input" value="joeun" disabled />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label visually-hidden">제목을 입력해주세요.</label>
          <input type="text" id="title" name="boardTitle" className="form-control" placeholder="제목을 입력해주세요." value={boardTitle} onChange={handleTitleChange} />
        </div>
        <div className="mb-3">
          <textarea className="form-control" id="content" name="boardContent" rows="8" placeholder="부적절한 글로 판단되어 다른 사용자로부터 일정 수 이상의 신고를 받은 경우 글이 삭제될 수 있습니다." value={boardContent} onChange={handleContentChange}></textarea>
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="thumbnail" className="form-label me-3 label-adjust">썸네일</label>
          <input type="file" className="form-control flex-grow-1 me-3" id="thumbnail" name="thumbnail" accept="image/*" onChange={handleThumbnailChange} />
          <label htmlFor="thumbnail" className="btn btn-outline-secondary file-upload-button">첨부하기</label>
        </div>
        <div className="form-text mb-3">사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.</div>
        <div id="image-main-container" className="d-flex flex-wrap gap-2 mb-3">
          {mainImagePreviews.map((src, index) => (
            <img key={index} src={src} alt="이미지 미리보기" className="img-thumbnail" style={{ maxWidth: '200px' }} />
          ))}
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="file" className="form-label me-3 label-adjust">첨부파일</label>
          <input type="file" className="form-control flex-grow-1 me-3" id="file" name="file" accept="image/*" multiple onChange={handleFilesChange} />
          <label htmlFor="file" className="btn btn-outline-secondary file-upload-button">첨부하기</label>
        </div>
        <div className="form-text mb-3">사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.</div>
        <div id="image-preview-container" className="d-flex flex-wrap gap-2 mb-3">
          {filePreviews.map((src, index) => (
            <img key={index} src={src} alt="이미지 미리보기" className="img-thumbnail" style={{ maxWidth: '200px' }} />
          ))}
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary me-2">등록하기</button>
          <a href="/tip/boards" className="btn btn-outline-secondary-custom">목록</a>
        </div>
      </form>
    </div>
  );
}

export default TipInsert;
