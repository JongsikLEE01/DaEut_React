import React from 'react'
import { Link } from 'react-router-dom'

const UserTable = ({ users, toggleAllCheckboxes }) => {
    

    if (!Array.isArray(users)) {
        return <p>사용자 데이터가 올바르지 않습니다.</p>
    }

    return (
        <form id="form">
            <table className="table table-sm table-hover">
                <thead className="table-light">
                    <tr>
                        <th width="30">No.</th>
                        <th width="80">사용자 명</th>
                        <th width="50">아이디</th>
                        <th width="80">전화번호</th>
                        <th width="200">등록 일자</th>
                        <th width="30" name="allCheck">
                            <input type="checkbox" className="checkbox" id="allCheck" onClick={toggleAllCheckboxes} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="6">조회된 회원 정보가 없습니다.</td>
                        </tr>
                    ) : (
                        users.map(user => (
                            <tr key={user.userNo}>
                                <td className='userTd'>{user.userNo}</td>
                                <td className='userTd'>
                                    <Link to={`/admin/adminUserRead/${user.userNo}`} className="text-decoration-line">
                                        {user.userName}
                                    </Link>
                                </td>
                                <td className='userTd'>{user.userId}</td>
                                <td className='userTd'>{user.userPhone}</td>
                                <td className='userTd'>{new Date(user.userRegDate).toLocaleString()}</td>
                                <td className='userTd'>
                                    <input type="checkbox" className="checkbox" name="deleteNoList" value={user.userNo} />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </form>
    )
}

export default UserTable
