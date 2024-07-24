import React from 'react'
import { Link } from 'react-router-dom'

const ReservationTable = ({ reservations=[] }) => {
    console.log("ReservationTable reservations: ", reservations) // 데이터 확인

    if (!Array.isArray(reservations)) {
        return <p>예약 데이터가 올바르지 않습니다.</p>
    }
    return (
        <table className="table table-sm table-hover">
            <thead className="table-light">
                <tr>
                    <th>No.</th>
                    <th>사용자 명</th>
                    <th>파트너 명</th>
                    <th>예약 번호</th>
                    <th>예약 상태</th>
                    <th>예약 시간</th>
                </tr>
            </thead>
            <tbody>
                {reservations.length === 0 ? (
                    <tr>
                        <td colSpan="6">조회된 예약 정보가 없습니다.</td>
                    </tr>
                ) : (
                    reservations.map((reservation, index) => (
                        <tr key={reservation.ordersNo}>
                            <td>{index + 1}</td>
                            <td>
                                <Link to={`/admin/adminReservationRead/${reservation.ordersNo}`} className="text-decoration-line">
                                    {reservation.userName}
                                </Link>
                            </td>
                            <td>{reservation.partnerName}</td>
                            <td>{reservation.ordersNo}</td>
                            <td>
                                <span className={`status-${reservation.status.toLowerCase()}`}>
                                    {reservation.status}
                                </span>
                            </td>
                            <td>{new Date(reservation.serviceDate).toLocaleString()}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )
}

export default ReservationTable
