import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/static/Sidebar';
import UserForm from '../../components/admin/UserForm';
import UserReviews from '../../components/admin/UserReviews';
import { deleteReview, getAllUsers, getUserAndReviews } from '../../apis/admin/admin';
import * as Swal from '../../apis/alert'

const UserDetailContainer = ({ userNo }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUserAndReviews(userNo);
                setUser(response.user);
                setReviews(response.reviews);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [userNo]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                setUser(response.userList);
            } catch (error) {
                setError(error);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteReview = async (reviewNo) => {
        try {
            const response = await deleteReview(reviewNo);
            if (response.status === 200) {
                // 삭제 성공 시
                // Swal.alert('리뷰가 성공적으로 삭제되었습니다.');
                const updatedReviews = reviews.filter(review => review.reviewNo !== reviewNo);
                setReviews(updatedReviews);
            } else {
                // 삭제 실패 시
                throw new Error('리뷰 삭제에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error deleting review:', error);
            // Swal.alert('리뷰 삭제에 실패했습니다.');
        }
    };

    return (
        <div className="container-fluid container">
            <div className="row">
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} roles={{ isAdmin: true }} />
                <div className="col-md-9 col-lg-10 form-section">
                    <div className="mb-5">
                        <h3>회원 조회</h3>
                        <div className="container mt-2 userRead">
                            <div className="card">
                                <div className="card-body">
                                    <UserForm user={user} />
                                </div>
                            </div>
                        </div>
                        <div className="buttons">
                            <Link to={`/admin/adminUserUpdate/${user?.userNo}`} className="btn btn-primary custom1 delBtn">회원 수정</Link>
                            <Link to="/admin/adminUser" className="btn btn-primary custom2">목록</Link>
                        </div>
                    </div>
                    <div>
                        <h3>작성 리뷰</h3>
                        <div className="container mt-2 userRead">
                            <div className="card">
                                <div className="card-body">
                                    <UserReviews reviews={reviews} onDelete={handleDeleteReview} />
                                    <div className="buttons mt-3">
                                        <Link to="/admin/adminUser" className="btn btn-primary custom2">목록</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailContainer;
