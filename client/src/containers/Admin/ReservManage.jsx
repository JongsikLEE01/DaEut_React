import React, { useEffect, useState } from 'react';
import ReservationTable from '../../components/admin/ReservationTable';
import Sidebar from '../../components/static/Sidebar';
import { getReservations } from '../../apis/admin/admin';
import Swal from 'sweetalert2';
import './Admin.css';
import CustomPagination from '../../components/admin/Pagenation';

const ReservManage = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 10;

    console.log("reservations :::::::::: ", reservations);

    const fetchReservations = async (page) => {
        try {
            const response = await getReservations(page);
            const data = response.data;
            console.log("Fetched reservations: ", data.orderList); // 데이터 확인
            setReservations(data.orderList);
            setTotalCount(data.totalCount);
        } catch (error) {
            console.error('Failed to fetch reservations:', error);
            setError(error);
        }
    };

    useEffect(() => {
        fetchReservations(currentPage);
    }, [currentPage]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    if (error) {
        return <p>Error fetching reservation information</p>;
    }

    return (
        <div className="container-fluid container">
            <div className="row">
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} roles={{ isAdmin: true }} />
                <div className="col-md-9 col-lg-10 form-section">
                    <h3>예약 관리</h3>
                    <p>사용자 이름 클릭 시 조회 화면으로 이동합니다.</p>
                    <ReservationTable reservations={reservations} />
                    <CustomPagination currentPage={currentPage} totalCount={totalCount} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} />
                </div>
            </div>
        </div>
    );
};

export default ReservManage;
