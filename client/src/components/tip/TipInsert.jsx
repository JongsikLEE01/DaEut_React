import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../tip/css/TipInsert.module.css';

const TipInsert = ({
  boardTitle,
  boardContent,
  mainImagePreviews,
  filePreviews,
  handleTitleChange,
  handleContentChange,
  handleThumbnailChange,
  handleFilesChange,
  handleSubmit,
  userId
}) => {
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className={`mb-3 d-flex align-items-center rounded px-3 py-2 ${styles['custom-border']}`}>
          <input type="hidden" name="userNo" value="userNo" />
          <label htmlFor="userId" className={`form-label mb-0 text-center me-3 ${styles['label-adjust']}`}>작성자 ID</label>
          <div className={styles.verticalLine}></div>
          <input type="text" id="userId" className={`form-control ${styles['borderless-input']}`} value={userId || ''} disabled />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label visually-hidden">제목을 입력해주세요.</label>
          <input type="text" id="title" name="boardTitle" className={`form-control ${styles['title-input']}`} placeholder="제목을 입력해주세요." value={boardTitle} onChange={handleTitleChange} />
        </div>
        <div className="mb-3">
          <textarea className={`form-control ${styles['content-input']}`} id="content" name="boardContent" rows="8" placeholder="부적절한 글로 판단되어 다른 사용자로부터 일정 수 이상의 신고를 받은 경우 글이 삭제될 수 있습니다." value={boardContent} onChange={handleContentChange}></textarea>
        </div>
        <div className="mb-2 mt-5 d-flex align-items-center">
          <label htmlFor="thumbnail" className={`form-label me-3 ${styles['label-adjust']}`}>썸네일</label>
          <input type="file" className="form-control flex-grow-1 me-3" id="thumbnail" name="thumbnail" accept="image/*" onChange={handleThumbnailChange} />
          <label htmlFor="thumbnail" className={`btn btn-outline-secondary ${styles['file-upload-button1']}`}>첨부하기</label>
        </div>
        <div className="form-text mb-3">사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.</div>
        
        <div id="image-thumbnail-container" className={styles.thumbnailPreview}>
          {mainImagePreviews.map((src, index) => (
            <img key={index} src={src} alt="썸네일 이미지 미리보기" className="img-thumbnail" style={{ maxWidth: '200px' }} />
          ))}
        </div>
        
        <div className="mb-2 mt-5 d-flex align-items-center">
          <label htmlFor="images" className={`form-label me-3 ${styles['label-adjust']}`}>첨부파일</label>
          <input type="file" className="form-control flex-grow-1 me-3" id="images" name="file" accept="image/*" multiple onChange={handleFilesChange} />
          <label htmlFor="images" className={`btn btn-outline-secondary ${styles['file-upload-button1']}`}>첨부하기</label>
        </div>
        <div className="form-text mb-3">사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.</div>
        <div id="image-preview-container" className="d-flex flex-wrap gap-2 mb-3">
          {filePreviews.map((src, index) => (
            <img key={index} src={src} alt="이미지 미리보기" className="img-thumbnail" style={{ maxWidth: '200px' }} />
          ))}
        </div>
        <div className="d-flex justify-content-end">
        <button type="submit" className={`btn ${styles['btn-submit-custom']} me-2`}>등록하기</button>
        <a href="/tip/boards" className={`btn ${styles['btn-outline-custom']}`}>목록</a>
        </div>
      </form>
    </div>
  );
};

export default TipInsert;
