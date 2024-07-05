import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/static/Sidebar';
import UserUpdateForm from '../../components/admin/UserUpdateForm';
import { updateUser, updateUserDetails, deleteUser } from '../../apis/admin/admin';
import Swal from 'sweetalert2';
import './Admin.css';

const UpdateUser = ({ userNo }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (!userNo) {
            console.error('userNo is undefined');
            return;
        }
        console.log("UserUpdateContainer userNo:", userNo);

        const fetchUserData = async () => {
            try {
                const response = await updateUser(userNo);
                setUser(response.data.user);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [userNo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUserDetails(userNo, user);
            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: '수정 완료',
                    text: '회원 정보가 성공적으로 수정되었습니다.',
                }).then(() => {
                    navigate('/admin/adminUser');
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '수정 실패',
                    text: '회원 수정에 실패했습니다.',
                });
            }
        } catch (error) {
            console.error('회원 수정 중 오류가 발생했습니다.', error);
            Swal.fire({
                icon: 'error',
                title: '수정 실패',
                text: '회원 수정 중 오류가 발생했습니다.',
            });
        }
    };

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: '정말로 삭제하시겠습니까?',
            text: "이 작업은 되돌릴 수 없습니다!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인'
        });

        if (result.isConfirmed) {
            try {
                const response = await deleteUser(userNo);
                if (response) {
                    Swal.fire({
                        icon: 'success',
                        title: '삭제 완료',
                        text: '회원 정보가 성공적으로 삭제되었습니다.',
                    }).then(() => {
                        navigate('/admin/adminUser');
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '삭제 실패',
                        text: '회원 삭제에 실패했습니다.',
                    });
                }
            } catch (error) {
                console.error('회원 삭제 중 오류가 발생했습니다.', error);
                Swal.fire({
                    icon: 'error',
                    title: '삭제 실패',
                    text: '회원 삭제 중 오류가 발생했습니다.',
                });
            }
        }
    };

    return (
        <div className="container-fluid container">
            <div className="row">
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} roles={{ isAdmin: true }} />
                <div className="col-md-9 col-lg-10 form-section">
                    <div className="mb-5">
                        <h3>회원 수정</h3>
                        <div className="container mt-2 userRead">
                            <div className="card">
                                <div className="card-body">
                                    {user && (
                                        <UserUpdateForm
                                            user={user}
                                            onChange={handleChange}
                                            onSubmit={handleSubmit}
                                            onDelete={handleDelete}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;
