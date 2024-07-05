import React, { useEffect, useState } from 'react';
import ReservationForm from '../../components/admin/ReservationForm';
import ReservBtn from '../../components/admin/ReservBtn';
import RefundInfo from '../../components/admin/RefundInfo';
import { getReservationDetails } from '../../apis/admin/admin';
import Sidebar from '../../components/static/Sidebar';
import { Link } from 'react-router-dom';
import './Admin.css';

const ReservRead = ({ ordersNo }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [reservationData, setReservationData] = useState(null);
    const [refundData, setRefundData] = useState(null);

    console.log("ordersNo", ordersNo);

    console.log("reservationData::::::::: ", reservationData);
    console.log("refundData::::::::: ", refundData);

    useEffect(() => {
        const fetchReservationData = async () => {
            try {
                const response = await getReservationDetails(ordersNo);
                const data = response.data;
                console.log("data : ", data);
                console.log("ordersNo :: ", ordersNo);
                
                setReservationData(data);
                setRefundData(data.cancel); // Assuming 'cancel' contains the refund information
            } catch (error) {
                console.error('Error fetching reservation data', error);
            }
        };

        fetchReservationData();
    }, [ordersNo]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    if (!reservationData) return <div>Loading...</div>;

    return (
        <div className='container-fluid container'>
            <div className="row">
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} roles={{ isAdmin: true }} />
                <div className="col-md-9 col-lg-10 form-section">
                    <div className="mb-5">
                        <h3>예약 정보</h3>
                        <ReservationForm reservationData={reservationData}/>
                        {refundData && (
                            <>
                                <h3 className="mt-5 mb-5">환불 정보</h3>
                                <RefundInfo refundData={refundData} />
                            </>
                        )}
                        <div className="buttons mt-3">
                            <Link className="btn btn-primary custom1 delBtn" to={`/admin/adminReservationUpdate/${reservationData.orders.ordersNo}`}>예약 수정</Link>
                            <Link to="/admin/adminReservation" className="btn btn-primary custom2">목록</Link>
                            {refundData && (
                                <form className="d-inline">
                                    <ReservBtn type="submit" className="btn btn-primary custom1 delBtn">환불 승인</ReservBtn>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservRead;
