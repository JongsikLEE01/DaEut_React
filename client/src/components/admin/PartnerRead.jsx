import React from 'react'
import { Link } from 'react-router-dom'

const PartnerRead = ({ partner, pthumbnail, handleApprovePartner, handleCancelPartner }) => {
  if (!partner) {
    return <p>Loading...</p>
  }


  return (
   
      <div className="d-flex justify-content-center">
        <div className="col-md-3 mt-5">
          {pthumbnail && pthumbnail.fileNo ? (
            <img src={`/file/img/${pthumbnail.fileNo}`} alt="파트너 사진" className="profile-img img-thumbnail" />
          ) : (
            <img src="/file/img/0" alt="기본 이미지" className="profile-img img-thumbnail" />
          )}
        </div>
        <div className="col-md-8">
          <form id="cancelPartnerForm" method="POST">
            <div className="form-group form-section p-1 mt-5 text-start">
              <label htmlFor="partnerName">이름</label>
              <input type="text" className="form-control" id="partnerName" value={partner?.userName} readOnly />
            </div>
            <div className="form-group form-section p-1 text-start">
              <label htmlFor="partnerAddress">주소</label>
              <input type="text" className="form-control" id="partnerAddress" value={partner?.userAddress} readOnly />
            </div>
            <div className="form-group form-section p-1 text-start">
              <label htmlFor="contact">연락처</label>
              <input type="text" className="form-control" id="contact" value={partner?.userPhone} readOnly />
            </div>
            <div className="form-group form-section p-1 text-start">
              <label htmlFor="experience">경력 사항</label>
              <input type="text" className="form-control" id="experience" value={partner?.partnerCareer} readOnly />
            </div>
            <div className="form-group form-section p-1 f-warp text-start">
              <label htmlFor="description">소개글</label>
              <textarea className="form-control w-75" id="description" rows="3" value={partner?.introduce} readOnly />
            </div>
            <div className="buttons mb-5 d-flex gap-3 justify-content-end">
              {partner?.status === 1 && (
                <button type="button" className="btn btn-primary sessuce color_main" onClick={handleApprovePartner}>
                  승인하기
                </button>
              )}
              <button type="button" className="btn btn-secondary cancel" onClick={handleCancelPartner}>
                승인 취소
              </button>
              <Link to={`/admin/adminPartnerUpdate/${partner.userNo}`} className="btn btn-secondary myBtn">
                수정하기
              </Link>
              <Link to="/admin/adminPartner" className="btn btn-light myBtn">
                목록
              </Link>
            </div>
          </form>
        </div>
      </div>
  )
}

export default PartnerRead
