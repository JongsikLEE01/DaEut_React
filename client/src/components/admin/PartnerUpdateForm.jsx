import React from 'react'
import { Link } from 'react-router-dom'

const PartnerUpdateForm = ({ partner, onChange, onSubmit, onDelete }) => {

  console.log("partner :: " , partner)
  if (!partner) return null // partner가 없는 경우 렌더링하지 않음

  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" name="userNo" value={partner.userNo} />
      <div className="row info-row">
        <div className="col-md-3 mt-5">
          {partner.pthumbnail && partner.pthumbnail.fileNo ? (
            <img src={`/file/img/${partner.pthumbnail.fileNo}`} alt="파트너 사진" className="profile-img img-thumbnail" />
          ) : (
            <img src="/file/img/0" alt="기본 이미지" className="profile-img img-thumbnail" />
          )}
        </div>
        <div className="col-md-8">
          <div className="row info-row">
            <label htmlFor="userName" className="col-3 label">이름</label>
            <div className="col-9">
              <input type="text" name="userName" className="form-control" value={partner.userName} onChange={onChange} />
            </div>
          </div>
          <div className="row info-row">
            <label htmlFor="userAddress" className="col-3 label">주소</label>
            <div className="col-9">
              <input type="text" name="userAddress" className="form-control" value={partner.userAddress} onChange={onChange} />
            </div>
          </div>
          <div className="row info-row">
            <label htmlFor="userPhone" className="col-3 label">연락처</label>
            <div className="col-9">
              <input type="text" name="userPhone" className="form-control" value={partner.userPhone} onChange={onChange} />
            </div>
          </div>
          <div className="row info-row">
            <label htmlFor="partnerCareer" className="col-3 label">경력 사항</label>
            <div className="col-9">
              <input type="text" name="partnerCareer" className="form-control" value={partner.partnerCareer} onChange={onChange} />
            </div>
          </div>
          <div className="row info-row">
            <label htmlFor="introduce" className="col-3 label">소개글</label>
            <div className="col-9">
              <textarea className="form-control" name="introduce" rows="3" value={partner.introduce} onChange={onChange}></textarea>
            </div>
          </div>
          <div className="buttons">
            <button type="submit" className="btn btn-primary custom1 delBtn">수정</button>
            <button type="button" className="btn btn-primary custom1 delBtn" onClick={onDelete}>삭제</button>
            <Link to="/admin/adminPartner" className="btn btn-primary custom2 size">목록</Link>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PartnerUpdateForm
