import React, { useEffect, useState } from 'react';
import UserTable from '../../components/admin/UserTable';
import './Admin.css';
import '../../components/static/css/Pagenation.css';
import { deleteSelectedUsers, getAllUsers } from '../../apis/admin/admin';
import Swal from 'sweetalert2';
import CustomPagination from '../../components/admin/Pagenation';
import Sidebar from '../../components/static/Sidebar';

const AdminUserContainer = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 10;

    const fetchUsers = async (page) => {
        try {
            const response = await getAllUsers(page);
            const data = response.data;
            setUsers(data.userList);
            setTotalCount(data.totalCount);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            setError(error);
        }
    };

    const handleDeleteUsers = async () => {
        const checkboxes = document.querySelectorAll('.checkbox:checked');
        const deleteNoList = Array.from(checkboxes)
            .map(checkbox => checkbox.value)
            .filter(value => value !== 'on'); // 'on' 값 필터링
        
        if (deleteNoList.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: '선택된 항목이 없습니다.',
                text: '삭제할 사용자를 선택해주세요.',
            });
            return;
        }

        const result = await Swal.fire({
            title: '정말로 삭제하시겠습니까?',
            text: "이 작업은 되돌릴 수 없습니다!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소'
        });

        if (result.isConfirmed) {
            try {
                await deleteSelectedUsers(deleteNoList);
                const updatedPage = currentPage > 1 && users.length === deleteNoList.length ? currentPage - 1 : currentPage;
                setCurrentPage(updatedPage);
                await fetchUsers(updatedPage);
                Swal.fire({
                    icon: 'success',
                    title: '삭제 완료',
                    text: '선택한 사용자가 성공적으로 삭제되었습니다.',
                });
            } catch (error) {
                console.error('Failed to delete users:', error);
                Swal.fire({
                    icon: 'error',
                    title: '삭제 실패',
                    text: '사용자 삭제에 실패했습니다.',
                });
            }
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    if (error) {
        return <p>Error fetching user information</p>;
    }

    return (
        <div className="container-fluid container">
            <div className="row">
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} roles={{ isAdmin: true }} />
                <div className="col-md-9 col-lg-10 form-section">
                    <h3>회원 관리</h3>
                    <p>사용자 이름 클릭 시 조회 화면으로 이동합니다.</p>
                    <UserTable users={users} />
                    <div className="buttons">
                        <button className="btn btn-primary custom1 delBtn" onClick={handleDeleteUsers}>선택 삭제</button>
                    </div>
                    <CustomPagination currentPage={currentPage} totalCount={totalCount} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} />
                </div>
            </div>
        </div>
    );
}

export default AdminUserContainer;
