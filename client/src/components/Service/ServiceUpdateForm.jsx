import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as alert from '../../apis/alert'

const ServiceUpdateForm = ({ onUpdate, service, fileList, onRemove }) => {
  // state 등록
  const [serviceName, setServiceName] = useState('')
  const [serviceCategory, setServiceCategory] = useState([])
  const [servicePrice, setServicePrice] = useState('')
  const [serviceContent, setServiceContent] = useState('')
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [imageFiles, setImageFiles] = useState([])
  const [newThumbnailFile, setNewThumbnailFile] = useState(null)
  const [newImageFiles, setNewImageFiles] = useState([])

  // handle
  const handleChangeName = (e) => {
    setServiceName(e.target.value)
  }
  const handleChangePrice = (e) => {
    setServicePrice(e.target.value)
  }
  const handleChangeContent = (e) => {
    setServiceContent(e.target.value)
  }

  // 카테고리 선택 처리
  const handleCategoryChange = (event) => {
    const { value } = event.target
    setServiceCategory((prev) =>
      prev.includes(value)
        ? prev.filter((category) => category !== value)
        : [...prev, value]
    )
  }

  // 썸네일 이미지 미리보기
  const previewThumbnail = (event) => {
    const file = event.target.files[0]
    if (file) {
      setNewThumbnailFile(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        // 이미지 미리보기 처리
        const previewContainer = document.getElementById(
          'image-thumbnail-container'
        )
        if (previewContainer) {
          previewContainer.innerHTML = `<img src="${reader.result}" alt="썸네일 미리보기" style="width: 150px; height: 150px;" />`
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // 설명 이미지 미리보기
  const previewImages = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setNewImageFiles(files)

      const readerPromises = files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve(reader.result)
          }
          reader.readAsDataURL(file)
        })
      })

      Promise.all(readerPromises).then((images) => {
        // 이미지 미리보기 처리
        const previewContainer = document.getElementById(
          'image-preview-container'
        )
        if (previewContainer) {
          previewContainer.innerHTML = images
            .map(
              (image) =>
                `<img src="${image}" alt="설명 이미지 미리보기" style="width: 150px; height: 150px;" />`
            )
            .join('')
        }
      })
    }
  }

  // 폼 제출 처리
  const onSubmit = (e) => {
    e.preventDefault()

    if (serviceCategory.length === 0) {
      alert.alert('카테고리를 선택해주세요','카테고리가 선택되지않았어요. 카테고리를 선택해주세요.', 'warning')
      return
    }

    const formData = new FormData()
    formData.append('serviceNo', service.serviceNo)
    formData.append('serviceName', serviceName)
    formData.append('serviceCategory', serviceCategory.join(','))
    formData.append('servicePrice', servicePrice)
    formData.append('serviceContent', serviceContent)
    formData.append('partnerNo', 1)

    // 썸네일 이미지
    if (newThumbnailFile) {
      formData.append('file', newThumbnailFile)
    }else if(thumbnailFile){
      formData.append('file', thumbnailFile)
    }
    // 설명 이미지
    if (newImageFiles.length > 0) {
      newImageFiles.map((file) => {
        formData.append('file', file)
      })
    }else if (imageFiles.length > 0) {
      imageFiles.map((file) => {
        formData.append('file', file)
      })
    }

    const headers = {
      'Content-Type': 'multipart/form-data',
    }

    // 등록 함수 호출
    onUpdate(formData, headers)
  }

  // 삭제 처리
  const onSubmitRemove = () => {
    onRemove(service.serviceNo) // 서비스 삭제 처리
  }

  useEffect(() => {
    // 서비스 설정
    if (service) {
      setServiceName(service.serviceName)
      setServicePrice(service.servicePrice)
      setServiceContent(service.serviceContent)
    }

    fileList.forEach((file) => {
      // 썸네일 파일 설정
      if (file.fileCode === 1) {
        setThumbnailFile(file)
      } 
      // 설명 이미지 파일 설정
      else if (file.fileCode === 0) {
        setImageFiles((prevFiles) => [...prevFiles, file])
      }
    })
  }, [service, fileList])

  return (
    <div className="reservationInsertBox">
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title" style={{ display: 'none' }}>
            제목:
          </label>
          <br />
          <input
            type="text"
            id="title"
            name="serviceName"
            placeholder="제목을 입력해주세요"
            required
            onChange={handleChangeName}
            value={serviceName}
          />
          <br />
        </div>

        <div className="servicetag">
          {/* 서비스 가격 */}
          <input
            type="number"
            name="servicePrice"
            placeholder="가격"
            required
            onChange={handleChangePrice}
            value={servicePrice}
          />

          {/* 카테고리 */}
          <input
            type="checkbox"
            name="serviceCategory"
            id="serviceCategoryClean"
            className="tag-button"
            value="청소"
            onChange={handleCategoryChange}
            checked={serviceCategory.includes('청소')}
          />
          <label htmlFor="serviceCategoryClean">청소</label>
          <input
            type="checkbox"
            name="serviceCategory"
            id="serviceCategoryWash"
            className="tag-button"
            value="빨래"
            onChange={handleCategoryChange}
            checked={serviceCategory.includes('빨래')}
          />
          <label htmlFor="serviceCategoryWash">빨래</label>
          <input
            type="checkbox"
            name="serviceCategory"
            id="serviceCategoryQuarantine"
            className="tag-button"
            value="방역"
            onChange={handleCategoryChange}
            checked={serviceCategory.includes('방역')}
          />
          <label htmlFor="serviceCategoryQuarantine">방역</label>
          <input
            type="checkbox"
            name="serviceCategory"
            id="serviceCategorySecurity"
            className="tag-button"
            value="보안"
            onChange={handleCategoryChange}
            checked={serviceCategory.includes('보안')}
          />
          <label htmlFor="serviceCategorySecurity">보안</label>
          <input
            type="checkbox"
            name="serviceCategory"
            id="serviceCategoryEtc"
            className="tag-button"
            value="기타"
            onChange={handleCategoryChange}
            checked={serviceCategory.includes('기타')}
          />
          <label htmlFor="serviceCategoryEtc">기타</label>
        </div>

        <div>
          {/* 내용 */}
          <textarea
            id="content"
            name="serviceContent"
            rows="4"
            cols="50"
            placeholder="서비스 설명"
            required
            onChange={handleChangeContent}
            value={serviceContent}
          ></textarea>
          <br />
        </div>

        {/* 썸네일 */}
        <div className="fileuploadbox">
          <label htmlFor="thumbnail" className="image-upload-title">
            썸네일
          </label>
          <label htmlFor="thumbnail" className="file-upload-button sessuce">
            첨부하기
          </label>

          {/* 이미지 */}
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            accept="image/*"
            onChange={previewThumbnail}
          />
          <p className="file-upload-note">
            사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.
          </p>
        </div>
        <div id="image-thumbnail-container">
          {thumbnailFile && (
            <img
              src={`/file/${thumbnailFile.fileNo}`}
              alt={thumbnailFile.fileName}
              style={{ width: '150px', height: '150px' }}
            />
          )}
        </div>

        <br />

        {/* 설명 이미지 */}
        <div className="fileuploadbox">
          <label htmlFor="images" className="image-upload-title">
            설명이미지
          </label>
          <label htmlFor="images" className="file-upload-button sessuce">
            첨부하기
          </label>

          {/* 이미지 */}
          <input
            type="file"
            id="images"
            name="file"
            accept="image/*"
            multiple
            onChange={previewImages}
          />
          <p className="file-upload-note">
            사진은 최대 20MB 이하의 JPG, PNG, GIF 파일 10장까지 첨부 가능합니다.
          </p>
        </div>
        <div id="image-preview-container">
          {imageFiles.map((file) => (
            <img
              key={file.fileNo}
              src={`/file/${file.fileNo}`}
              alt={file.fileName}
              style={{ width: '150px', height: '150px' }}
            />
          ))}
        </div>

        <div className="bottomButton">
          <button type="submit" className="reservationInsertOk sessuce mx-2">
            수정하기
          </button>
          <button
            type="button"
            className="cancleInsert mx-2 cancel"
            onClick={onSubmitRemove}
          >
            삭제하기
          </button>
          <Link className="cancleInsert mx-2 cancel p-1" to="/service">
            취소하기
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ServiceUpdateForm
