import React, { useEffect, useState } from 'react'
import ReservationForm from '../../components/admin/ReservationForm'
import ReservBtn from '../../components/admin/ReservBtn'
import RefundInfo from '../../components/admin/RefundInfo'
import * as admin from '../../apis/admin/admin'
import Sidebar from '../../components/static/Sidebar'
import { Link } from 'react-router-dom'
import './Admin.css'
import * as Swal from '../../apis/alert'

const ReservRead = ({ ordersNo }) => {
    const [isOpen, setIsOpen] = useState(true)
    const [reservationData, setReservationData] = useState(null)
    const [refundData, setRefundData] = useState(null)

    console.log("ordersNo", ordersNo)

    console.log("reservationData::::::::: ", reservationData)
    console.log("refundData::::::::: ", refundData)

    useEffect(() => {
        const fetchReservationData = async () => {
            try {
                const response = await admin.getReservationDetails(ordersNo)
                const data = response.data
                const cancel = data.cancel

                console.log("data : ", data)
                console.log("ordersNo :: ", ordersNo)
                
                setReservationData(data)
                setRefundData(cancel)
            } catch (error) {
                console.error('Error fetching reservation data', error)
            }
        }

        fetchReservationData()
    }, [ordersNo])

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    if (!reservationData) return <div>Loading...</div>

    const onCancel = async (ordersNo) =>{
    try {
          console.log(`-----${ordersNo}----`);
          const response = await admin.checkCancel(ordersNo)
          const status = response.status
          console.log(`환불 승인 결과.... ${status}`)
        } catch (e) {
          console.log(`환불 승인 중 오류 발생... ${e}`)
        }
    }

    const checkConfirm = () =>{
        Swal.confirm('환불을 승인하시겠습니까?', '확인 버튼을 누르면 환불이 승인됩니다.', 'question', (result) => {
          // isConfirmed : 확인 버튼 클릭 여부
          if (result.isConfirmed) {
              onCancel(ordersNo)
              Swal.alert('환불 승인 성공', '', 'success')
          }
        })
    }

    return (
        <div className='container-fluid container'>
            <div className="row">
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} roles={{ isAdmin: true }} />
                <div className="col-md-9 col-lg-10 form-section">
                    <div className="mb-5">
                        <h3>예약 정보</h3>
                        <ReservationForm reservationData={reservationData}/>
                        <div className="buttons mt-3">
                            <Link className="btn btn-primary custom1 delBtn" to={`/admin/adminReservationUpdate/${reservationData.orders.ordersNo}`}>예약 수정</Link>
                            <Link to="/admin/adminReservation" className="btn btn-primary custom2">목록</Link>
                        </div>
                        {refundData && (
                            <>
                                <h3 className="mt-5 mb-5">환불 정보</h3>
                                <RefundInfo 
                                    refundData={refundData}
                                />
                            </>
                        )}
                        <div className="buttons mt-3">
                            
                            {refundData && (
                                // <form className="d-inline">
                                    <button onClick={checkConfirm} className="btn btn-primary custom1 delBtn">환불 승인</button>
                                // </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReservRead
