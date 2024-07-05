import React, { useEffect, useState } from 'react';
import { deleteSelectedUsers, getAllPartners } from '../../apis/admin/admin';
import PartnerTable from '../../components/admin/PartnerTable';
import Swal from 'sweetalert2';
import Sidebar from '../../components/static/Sidebar';
import './Admin.css';
import '../../components/static/css/Pagenation.css';
import CustomPagination from '../../components/admin/Pagenation';

const PartnerContainer = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [partners, setPartners] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0); 
  const itemsPerPage = 10;

  const fetchPartners = async (page) => {
    try {
      const response = await getAllPartners(page);
      const data = response.data;
      console.log('Fetched Partners:', data);
      setPartners(data.partnerList);
      setTotalCount(data.totalCount); 
    } catch (error) {
      console.error('Failed to fetch Partners:', error);
      setError(error);
    }
  };

  const handleDeleteUsers = async () => {
    const checkboxes = document.querySelectorAll('.checkbox:checked');
    const deleteNoList = Array.from(checkboxes)
      .map(checkbox => checkbox.value)
      .filter(value => value !== 'on'); // 'on' 값 필터링
    
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
        const updatedPage = currentPage > 1 && partners.length === deleteNoList.length ? currentPage - 1 : currentPage;
        setCurrentPage(updatedPage);
        await fetchPartners(updatedPage);
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

  const toggleAllCheckboxes = (e) => {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = e.target.checked;
    });
  };

  useEffect(() => {
    fetchPartners(currentPage);
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
          <h3>파트너 관리</h3>
          <p>사용자 이름 클릭 시 조회 화면으로 이동합니다.</p>
          <PartnerTable partners={partners} toggleAllCheckboxes={toggleAllCheckboxes} />
          <div className="buttons">
            <button className="btn btn-primary custom1 delBtn" onClick={handleDeleteUsers}>선택 삭제</button>
          </div>
          <CustomPagination currentPage={currentPage} totalCount={totalCount} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

export default PartnerContainer;
