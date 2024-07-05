import React from 'react'
import { Link } from 'react-router-dom'

const UserUpdateForm = ({ user, onChange, onSubmit, onDelete }) => {
    if (!user) return null // user가 없는 경우 렌더링하지 않음

    return (
        <form onSubmit={onSubmit}>
            <input type="hidden" name="userNo" value={user.userNo} />
            <div className="row info-row">
                <label htmlFor="id" className="col-3 label">아이디</label>
                <div className="col-9">
                    <input type="text" name="userId" className="form-control" value={user.userId} readOnly />
                </div>
            </div>
            <div className="row info-row">
                <label htmlFor="name" className="col-3 label">이름</label>
                <div className="col-9">
                    <input type="text" name="userName" className="form-control" value={user.userName} onChange={onChange} />
                </div>
            </div>
            <div className="row info-row">
                <label htmlFor="phone" className="col-3 label">전화번호</label>
                <div className="col-9">
                    <input type="text" name="userPhone" className="form-control" value={user.userPhone} onChange={onChange} />
                </div>
            </div>
            <div className="row info-row">
                <label htmlFor="address" className="col-3 label">주소</label>
                <div className="col-9">
                    <input type="text" name="userAddress" className="form-control" value={user.userAddress} onChange={onChange} />
                </div>
            </div>
            <div className="row info-row">
                <label htmlFor="birth" className="col-3 label">생년월일</label>
                <div className="col-9">
                    <input type="date" id="birth" name="userBirth" className="form-control" value={user.userBirth} onChange={onChange} />
                </div>
            </div>
            <div className="buttons">
                <button type="submit" className="btn btn-primary custom1 delBtn">수정</button>
                <button type="button" className="btn btn-primary custom1 delBtn" onClick={onDelete}>삭제</button>
                <Link to="/admin/adminUser" className="btn btn-primary custom2 size">목록</Link>
            </div>
        </form>
    )
}

export default UserUpdateForm
