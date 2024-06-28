import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/static/Sidebar';
import UserForm from '../../components/user/UserForm';
// import './UserMyPageUpdate.css';

const UserMyPageUpdate = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/user/exampleUserId')
            .then(response => setUser(response.data))
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const action = event.nativeEvent.submitter.value;
        if (action === 'update') {
            axios.post('http://localhost:8080/api/user/update', user)
                .then(response => console.log('User updated successfully'))
                .catch(error => console.error('Error updating user:', error));
        } else if (action === 'delete') {
            // 탈퇴 로직을 추가하세요
            console.log('탈퇴하기');
        }
    };

    return (
        <div className="container-fluid container">
            <button className="btn btn-primary toggle-btn menu mt-2 ml-2 myBtn" id="toggle-btn" onClick={toggleSidebar}>메뉴</button>
            <div className="row">
                <Sidebar toggleSidebar={toggleSidebar} />
                {user && <UserForm user={user} handleChange={handleChange} handleSubmit={handleSubmit} isUpdatePage={true} />}
            </div>
        </div>
    );
};

export default UserMyPageUpdate;
