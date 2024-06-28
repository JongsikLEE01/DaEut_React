import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ServiceInsert = ({ onInsert }) => {
  const [serviceName, setServiceName] = useState('')
  const [serviceCategory, setServiceCategory] = useState([])
  const [servicePrice, setServicePrice] = useState('')
  const [serviceContent, setServiceContent] = useState('')
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [imageFiles, setImageFiles] = useState([])

  console.log("ServiceInsert - onInsert function: ", onInsert)

  // 썸네일 이미지 미리보기
  const previewThumbnail = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        // 이미지 미리보기 처리
        const previewContainer = document.getElementById('image-thumbnail-container')
        if (previewContainer) {
          previewContainer.innerHTML = `<img src="${reader.result}" alt="썸네일 미리보기" style="width: 250px; height: 250px;" />`
        }
      }
      reader.readAsDataURL(file)
      setThumbnailFile(file)
    }
  }

  // 설명 이미지 미리보기
  const previewImages = (event) => {
    const files = Array.from(event.target.files)
    if (files.length > 0) {
      const readerPromises = files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve(reader.result)
          }
          reader.readAsDataURL(file)
        })
      })
      Promise.all(readerPromises).then(images => {
        // 이미지 미리보기 처리
        const previewContainer = document.getElementById('image-preview-container')
        if (previewContainer) {
          previewContainer.innerHTML = images.map(image => `<img src="${image}" alt="설명 이미지 미리보기" style="width: 250px; height: 250px;" />`).join('')
        }
      })
      setImageFiles(files)
    }
  }

  // 카테고리 선택 처리
  const handleCategoryChange = (event) => {
    const { value } = event.target
    setServiceCategory(prev => 
      prev.includes(value) ? prev.filter(category => category !== value) : [...prev, value]
    )
  }

  // 폼 제출
  const onSubmit = (e) => {
    e.preventDefault()

    if(serviceCategory.length === 0 ){
      alert('카테고리를 선택해주세요')
      return
    }

    const formData = new FormData()
    formData.append('serviceName', serviceName)
    formData.append('serviceCategory', serviceCategory.join(','))
    formData.append('servicePrice', servicePrice)
    formData.append('serviceContent', serviceContent)
    formData.append('partnerNo', 1)
    
    // 썸네일 이미지
    if (thumbnailFile) {
      formData.append('files', thumbnailFile)
    }
    // 설명 이미지
    if(imageFiles){
      for(let i=0; i<imageFiles.length; i++){
        const file = imageFiles[i]
        formData.append('files', file)
      }
    }

    const headers = {
      'Content-Type': 'multipart/form-data'
    }

    onInsert(formData, headers)
  }

  return (
    <div className="reservationInsertBox">
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title" style={{ display: 'none' }}>제목:</label><br />
          <input type="text" id="title" name="serviceName" placeholder="제목을 입력해주세요" required onChange={(e) => setServiceName(e.target.value)} /><br />
        </div>

        <div className="servicetag">
          {/* 서비스 가격 */}
          <input type="number" name="servicePrice" placeholder="가격" required onChange={(e) => setServicePrice(e.target.value)} />

          {/* 카테고리 */}
          <input type="checkbox" name="serviceCategory" id="serviceCategoryClean" className="tag-button" value="청소" onChange={handleCategoryChange} />
          <label htmlFor="serviceCategoryClean">청소</label>
          <input type="checkbox" name="serviceCategory" id="serviceCategoryWash" className="tag-button" value="빨래" onChange={handleCategoryChange} />
          <label htmlFor="serviceCategoryWash">빨래</label>
          <input type="checkbox" name="serviceCategory" id="serviceCategoryQuarantine" className="tag-button" value="방역" onChange={handleCategoryChange} />
          <label htmlFor="serviceCategoryQuarantine">방역</label>
          <input type="checkbox" name="serviceCategory" id="serviceCategorySecurity" className="tag-button" value="보안" onChange={handleCategoryChange} />
          <label htmlFor="serviceCategorySecurity">보안</label>
          <input type="checkbox" name="serviceCategory" id="serviceCategoryEtc" className="tag-button" value="기타" onChange={handleCategoryChange} />
          <label htmlFor="serviceCategoryEtc">기타</label>
        </div>

        <div>
          {/* 내용 */}
          <textarea id="content" name="serviceContent" rows="4" cols="50" placeholder="* tip : 사용자들이 부담 없이 볼 수 있도록 한줄로 작성하는 것이 좋아요.
                             부적절한 글로 판단되어 다른 사용자로부터 일정 수 이상의 신고를 받는 경우 글이 삭제처리 될 수 있습니다." required onChange={(e) => setServiceContent(e.target.value)}></textarea><br />
        </div>

        {/* 썸네일 */}
        <div className="fileuploadbox">
          <label htmlFor="thumbnail" className="image-upload-title">썸네일</label>
          <label htmlFor="thumbnail" className="file-upload-button sessuce">첨부하기</label>

          {/* 이미지 */}
          <input type="file" id="thumbnail" name="thumbnail" accept="image/*" onChange={previewThumbnail} required />
          <p className="file-upload-note">사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.</p>
        </div>
        <div id="image-thumbnail-container"></div>

        <br />

        {/* 설명 이미지 */}
        <div className="fileuploadbox">
          <label htmlFor="images" className="image-upload-title">설명이미지</label>
          <label htmlFor="images" className="file-upload-button sessuce">첨부하기</label>

          {/* 이미지 */}
          <input type="file" id="images" name="file" accept="image/*" multiple onChange={previewImages} required />
          <p className="file-upload-note">사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.</p>
        </div>
        <div id="image-preview-container"></div>

        <div className="bottomButton">
          <input type="submit" className="reservationInsertOk sessuce" value="등록하기" />
          <Link className="cancleInsert" to="/service">취소하기</Link>
        </div>
      </form>
    </div>
  )
}

export default ServiceInsert
