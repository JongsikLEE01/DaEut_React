import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/static/Sidebar'
import PartnerRead from '../../components/admin/PartnerRead'
import { getPartner, approvePartner, cancelPartnerApproval } from '../../apis/admin/admin'
import './Admin.css'
import Swal from 'sweetalert2'

const PartnerReadContainer = ({ userNo }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [partner, setPartner] = useState(null)
  const [userId, setUserId] = useState(null) // userId 상태 추가
  const [pthumbnail, setPthumbnail] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate() // useNavigate 훅 사용

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const response = await getPartner(userNo)
        console.log('Fetched Partner:', response.data);
        setPartner(response.data)
        setPthumbnail(response.data.pthumbnail)
        setUserId(response.data.userId) // userId 설정
      } catch (error) {
        console.error('Failed to fetch partner:', error);
        setError(error)
      }
    }

    fetchPartner()
  }, [userNo])

  const handleApprovePartner = async () => {
    const confirmed = await Swal.fire({
      title: '파트너를 승인하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    })
    
    if (confirmed.isConfirmed) {
      try {
        const response = await approvePartner(userId)
        console.log('Approve Response:', response);
        await Swal.fire({
          title: response.data.message,
          icon: 'success',
          confirmButtonText: '확인',
        })
        setPartner({ ...partner, status: response.data.status  }) // 상태 업데이트
        navigate('/admin/adminPartner') // 승인 후 리다이렉트
      } catch (error) {
        console.error('Failed to approve partner:', error);
        await Swal.fire({
          title: '파트너 승인에 실패했습니다.',
          icon: 'error',
          confirmButtonText: '확인',
        })
      }
    }
  }

  const handleCancelPartner = async () => {
    const confirmed = await Swal.fire({
      title: '파트너 승인을 취소하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    })

    if (confirmed.isConfirmed) {
      try {
        const response = await cancelPartnerApproval(userId)
        console.log('Cancel Response:', response);
        await Swal.fire({
          title: response.data.message,
          icon: 'success',
          confirmButtonText: '확인',
        })
        setPartner({ ...partner, status: response.data.status }) // 상태 업데이트
        navigate('/admin/adminPartner') // 승인 취소 후 리다이렉트
      } catch (error) {
        console.error('Failed to cancel partner approval:', error);
        await Swal.fire({
          title: '파트너 승인 취소에 실패했습니다.',
          icon: 'error',
          confirmButtonText: '확인',
        })
      }
    }
  }

  if (error) {
    return <div>Error loading partner data.</div>
  }

  return (
    <div className="container-fluid container">
      <div className="row">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} roles={{ isAdmin: true }} />
        <div className="col-md-9 col-lg-10 form-section">
          <div className="mb-5">
            <h3>파트너 조회</h3>
            <PartnerRead 
              partner={partner} 
              pthumbnail={pthumbnail} 
              handleApprovePartner={handleApprovePartner} 
              handleCancelPartner={handleCancelPartner} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnerReadContainer
