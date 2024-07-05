import React from 'react'

const PartnerTable = ({ partners, toggleAllCheckboxes }) => {

    return (
      
        <form id="form" >
          <table className="table table-sm table-hover">
            <thead className="table-light">
              <tr>
                <th>No.</th>
                <th>파트너 명</th>
                <th>주소</th>
                <th>경력</th>
                <th>등록 일자</th>
                <th>승인 상태</th>
                <th width="30">
                  <input type="checkbox" className="checkbox" id="allCheck" onClick={toggleAllCheckboxes} />
                </th>
              </tr>
            </thead>
            <tbody>
              {partners.length === 0 ? (
                <tr>
                  <td colSpan="7">조회된 회원 정보가 없습니다.</td>
                </tr>
              ) : (
                partners.map((partner) => (
                  <tr key={partner.userNo}>
                    <td>{partner.userNo}</td>
                    <td>
                      <a href={`/admin/adminPartnerRead/${partner.userNo}`} className="text-decoration-line">
                        {partner.userName}
                      </a>
                    </td>
                    <td>{partner.userAddress}</td>
                    <td>{partner.partnerCareer}</td>
                    <td>{new Date(partner.userRegDate).toLocaleDateString()}</td>
                    <td>
                      {partner.status === 1 ? (
                        <span style={{ color: 'red' }}>대기</span>
                      ) : (
                        <span style={{ color: 'blue' }}>승인 완료</span>
                      )}
                    </td>
                    <td className="checked">
                      <input type="checkbox" className="checkbox" name="deleteNoList" value={partner.userNo} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </form>
    )
  }

export default PartnerTable