import React, { useState } from 'react';
import UserLayout from '../../layouts/UserLayout';
import '../../components/user/user.css'; // CSS 파일 가져오기

const UserPartner = () => {
    const [partner, setPartner] = useState({
        userName: '홍길동',
        userAddress: '서울시 강남구',
        userPhone: '010-1234-5678',
        partnerCareer: '',
        introduce: '',
        thumbnail: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPartner(prevPartner => ({
            ...prevPartner,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPartner(prevPartner => ({
                ...prevPartner,
                thumbnail: URL.createObjectURL(file)
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Partner application submitted:', partner);
    };

    return (
        <UserLayout>
            <div className="mb-5">
                <h3>파트너 신청</h3>
                <ul style={{ padding: 0, color: 'red' }}>
                    파트너 신청 주의 사항
                    <li style={{ listStyleType: 'none', color: 'black' }}>1. 파트너 임을 입증할 수 있는 파일을 등록해주세요.</li>
                    <li style={{ listStyleType: 'none', color: 'black' }}>2. 파트너 신청을 여러번 할 경우 불이익이 따를 수 있습니다.</li>
                    <li style={{ listStyleType: 'none', color: 'black' }}>3. 파트너 승인이 됐을 경우, 재로그인 시 파트너 화면으로 로그인 됩니다.</li>
                </ul>
                <div className="d-flex justify-content-center">
                    <div className="col-md-3 mt-5" id="image-thumbnail-container">
                        <img src={partner.thumbnail || '/img/partner.png'} alt="파트너 이미지" className="profile-img img-thumbnail" />
                    </div>
                    <div className="col-md-8">
                        <form className="ms-5" onSubmit={handleSubmit} encType="multipart/form-data">
                            <input type="hidden" name="userNo" value={partner.userNo} id="userNo" />
                            <div className="form-group form-section p-1 mt-5 text-start">
                                <label htmlFor="partnerName">이름</label>
                                <input type="text" className="form-control" id="partnerName" value={partner.userName} readOnly />
                            </div>
                            <div className="form-group form-section p-1 text-start">
                                <label htmlFor="partnerAddress">주소</label>
                                <input type="text" className="form-control" id="partnerAddress" value={partner.userAddress} readOnly />
                            </div>
                            <div className="form-group form-section p-1 text-start">
                                <label htmlFor="contact">연락처</label>
                                <input type="text" className="form-control" id="contact" value={partner.userPhone} readOnly />
                            </div>
                            <div className="form-group form-section p-1 text-start">
                                <label htmlFor="experience">경력 사항</label>
                                <input type="text" className="form-control" id="experience" name="partnerCareer" value={partner.partnerCareer} onChange={handleChange} placeholder="경력 사항을 입력해주세요" />
                            </div>
                            <div className="form-group form-section p-1 f-warp text-start">
                                <label htmlFor="description">소개 글</label>
                                <textarea className="form-control w-75" id="description" name="introduce" value={partner.introduce} onChange={handleChange} rows="3"></textarea>
                            </div>
                            <div className="form-group form-section p-1 f-warp text-start">
                                <label htmlFor="file">프로필 사진</label>
                                <input type="file" className="form-control" id="thumbnail" name="thumbnail" accept="image/*" onChange={handleFileChange} required />
                            </div>
                            <div className="buttons mb-5 d-flex gap-3 justify-content-end">
                                <button type="submit" className="btn btn-primary sessuce color_main">신청하기</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default UserPartner;
