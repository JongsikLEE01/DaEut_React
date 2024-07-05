import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../tip/css/TipInsert.module.css';

const TipUpdate = ({
  board,
  mainImagePreview,
  additionalImagePreview,
  handleInputChange,
  handleMainImageChange,
  handleAdditionalImageChange,
  handleSubmit,
  handleDeleteConfirm,
  handleFileDelete,
  boardNo,
  fileList
}) => {
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className={`mb-3 d-flex align-items-center rounded px-3 py-2 ${styles['custom-border']}`}>
          <label htmlFor="userId" className={`form-label mb-0 text-center me-3 ${styles['label-adjust']}`}>작성자 ID</label>
          <div className={styles.verticalLine}></div>
          <input type="text" id="userId" className={`form-control ${styles['borderless-input']}`} value={board.userId || ''} disabled />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label visually-hidden">제목</label>
          <input
            type="text"
            id="title"
            className={`form-control ${styles['title-input']}`}
            name="boardTitle"
            value={board.boardTitle}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <textarea
            className={`form-control ${styles['content-input']}`}
            id="content"
            rows="8"
            name="boardContent"
            value={board.boardContent}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="mb-2 mt-5 d-flex align-items-center">
          <label htmlFor="thumbnail" className={`form-label ${styles['label-adjust']}`}>썸네일</label>
          <input
            type="file"
            className="form-control"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            onChange={handleMainImageChange}
          />
          <label htmlFor="thumbnail" className={`btn btn-outline-secondary ${styles['file-upload-button1']}`}>첨부하기</label>
        </div>
        <div className="form-text">사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.</div>
        <div id="image-thumbnail-container" className={`d-flex flex-wrap gap-2 ${styles.thumbnailPreview}`}>
          {mainImagePreview.map((src, index) => (
            <img key={index} src={src} alt="이미지 미리보기" className="img-thumbnail" style={{ maxWidth: '200px' }} />
          ))}
        </div>
        <div className="mb-2 mt-5 d-flex align-items-center">
          <label htmlFor="images" className={`form-label ${styles['label-adjust']}`}>첨부파일</label>
          <input
            type="file"
            className="form-control"
            id="images"
            name="file"
            accept="image/*"
            multiple
            onChange={handleAdditionalImageChange}
          />
          <label htmlFor="images" className={`btn btn-outline-secondary ${styles['file-upload-button1']}`}>첨부하기</label>
        </div>
        <div className="form-text">사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.</div>
        <div id="image-preview-container" className={`d-flex flex-wrap gap-2 ${styles.thumbnailPreview}`}>
          {additionalImagePreview.map((src, index) => (
            <img key={index} src={src} alt="이미지 미리보기" className="img-thumbnail" style={{ maxWidth: '200px' }} />
          ))}
        </div>
        <div className="mb-3">
          <ul>
            {fileList.map(file => (
              <li key={file.fileNo} className={styles.fileItem}>
                <a href={`/file/img/${file.fileNo}`} download>{file.originFileName}</a>
                <button type="button" onClick={() => handleFileDelete(file.fileNo)} className={`btn ${styles['btn-delete-file']} me-2`}>삭제</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className={`btn ${styles['btn-submit']} me-2`}>수정하기</button>
          <button type="button" onClick={handleDeleteConfirm} className={`btn ${styles['btn-delete']} me-2`}>삭제하기</button>
          <a href={`/tip/boards/${boardNo}`} className={`btn ${styles['btn-back']}`}>목록</a>
        </div>
      </form>
    </div>
  );
};

export default TipUpdate;
