import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/TipIndex.css';

function TipUpdate() {
  const { boardNo } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState({});
  const [fileList, setFileList] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [files, setFiles] = useState([]);
  const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');

  useEffect(() => {
    fetchBoard();
  }, [boardNo]);

  async function fetchBoard() {
    try {
      const response = await axios.get(`/tip/boards/${boardNo}`);
      setBoard(response.data.board);
      setFileList(response.data.fileList);
    } catch (error) {
      console.error('Error fetching board:', error);
    }
  }

  function handleThumbnailChange(event) {
    setThumbnail(event.target.files[0]);
    previewImages(event, 'image-main-container');
  }

  function handleFilesChange(event) {
    setFiles(event.target.files);
    previewImages(event, 'image-preview-container');
  }

  function previewImages(event, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // 기존 이미지 제거

    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const image = document.createElement('img');
      image.src = URL.createObjectURL(files[i]);
      image.alt = '이미지 미리보기';
      image.classList.add('img-thumbnail');
      image.style.maxWidth = '200px';
      container.appendChild(image);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('boardNo', board.boardNo);
    formData.append('boardTitle', board.boardTitle);
    formData.append('boardContent', board.boardContent);
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }

    try {
      await axios.post('/tip/tipUpdate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRF-TOKEN': csrfToken
        }
      });
      navigate('/tip/index');
    } catch (error) {
      console.error('Error updating board:', error);
    }
  }

  async function handleDelete() {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/tip/boards/${boardNo}`, {
          headers: { 'X-CSRF-TOKEN': csrfToken }
        });
        navigate('/tip/index');
      } catch (error) {
        console.error('Error deleting board:', error);
      }
    }
  }

  async function handleFileDelete(fileNo) {
    try {
      await axios.delete(`/file/${fileNo}`, {
        headers: { 'X-CSRF-TOKEN': csrfToken }
      });
      setFileList(fileList.filter(file => file.fileNo !== fileNo));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  return (
    <div className="container">
      <form id="form" onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="hidden" name="boardNo" value={board.boardNo} />
        <div className="mb-3">
          <label htmlFor="title" className="form-label visually-hidden"></label>
          <input
            type="text"
            id="title"
            className="form-control"
            name="boardTitle"
            value={board.boardTitle || ''}
            onChange={(e) => setBoard({ ...board, boardTitle: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="content"
            rows="8"
            name="boardContent"
            value={board.boardContent || ''}
            onChange={(e) => setBoard({ ...board, boardContent: e.target.value })}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">썸네일</label>
          <label htmlFor="thumbnail" className="file-upload-button">첨부하기</label>
          <input type="file" className="form-control" id="thumbnail" name="thumbnail" accept="image/*" onChange={handleThumbnailChange} />
          <div className="form-text">사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.</div>
          <div id="image-main-container" className="d-flex flex-wrap gap-2"></div>
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">첨부파일</label>
          <label htmlFor="file" className="file-upload-button">첨부하기</label>
          <input type="file" className="form-control" id="file" name="file" accept="image/*" multiple onChange={handleFilesChange} />
          <div className="form-text">사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.</div>
          <div id="image-preview-container" className="d-flex flex-wrap gap-2"></div>
        </div>
        <tr>
          <td>파일</td>
          <td>
            <ul>
              {fileList.map(file => (
                <li key={file.fileNo}>
                  <a href={`/file/img/${file.fileNo}`} target="_blank" rel="noopener noreferrer">{file.originFileName}</a>
                  <button type="button" onClick={() => handleFileDelete(file.fileNo)} className="btn-btn-primary me-2">삭제</button>
                </li>
              ))}
            </ul>
          </td>
        </tr>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn-btn-primary me-2">수정하기</button>
          <button type="button" onClick={handleDelete} className="btn-btn-primary me-2">삭제하기</button>
          <button type="button" onClick={() => navigate('/tip/index')} className="btn-btn-outline-secondary">목록</button>
        </div>
      </form>
    </div>
  );
}

export default TipUpdate;
