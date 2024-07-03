import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../tip/css/TipRead.css';

const TipUpdate = ({
  board,
  mainImagePreview,
  additionalImagePreview,
  fileList,
  showModal,
  handleInputChange,
  handleMainImageChange,
  handleAdditionalImageChange,
  handleSubmit,
  handleFileDelete,
  handleShowModal,
  handleCloseModal,
  handleDelete,
  boardNo,
}) => {
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
          <button type="button" onClick={handleShowModal} className="btn btn-custom me-2">삭제하기</button>
          <a href={`/tip/boards/${boardNo}`} className="btn btn-custom-outline">목록</a>
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

export default TipUpdate;
