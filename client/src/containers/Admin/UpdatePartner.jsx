import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/static/Sidebar'
import PartnerUpdateForm from '../../components/admin/PartnerUpdateForm'
import { updatePartner, updatePartnerDetails, deletePartner } from '../../apis/admin/admin'
import Swal from 'sweetalert2'
import './Admin.css'

const UpdatePartner = ({ userNo }) => {
  const navigate = useNavigate()
  const [partner, setPartner] = useState(null)
  const [isOpen, setIsOpen] = useState(true)

  console.log("updatePartner :::::::::::: ", partner);
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (!userNo) {
      console.error('userNo is undefined');
      return
    }
    console.log("UpdatePartner userNo:", userNo);

    const fetchPartnerData = async () => {
      try {
        const response = await updatePartner(userNo)
        setPartner(response.data)
      } catch (error) {
        console.error('Error fetching partner data:', error);
      }
    }
    fetchPartnerData()
  }, [userNo])

  const handleChange = (e) => {
    const { name, value } = e.target
    setPartner(prevPartner => ({ ...prevPartner, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // 기본 form 제출 동작을 막음
    try {
      const response = await updatePartnerDetails(userNo, partner)

      console.log("response 수정 🤍 " , response);
      if (response) {
        Swal.fire({
          icon: 'success',
          title: '수정 완료',
          text: '파트너 정보가 성공적으로 수정되었습니다.',
        }).then(() => {
          navigate('/admin/adminPartner')
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: '수정 실패',
          text: '파트너 수정에 실패했습니다.',
        })
      }
    } catch (error) {
      console.error('파트너 수정 중 오류가 발생했습니다.', error);
      Swal.fire({
        icon: 'error',
        title: '수정 실패',
        text: '파트너 수정 중 오류가 발생했습니다.',
      })
    }
  }

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '정말로 삭제하시겠습니까?',
      text: "이 작업은 되돌릴 수 없습니다!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인'
    })

    if (result.isConfirmed) {
      try {
        const response = await deletePartner(userNo)
        if (response) {
          Swal.fire({
            icon: 'success',
            title: '삭제 완료',
            text: '파트너 정보가 성공적으로 삭제되었습니다.',
          }).then(() => {
            navigate('/admin/adminPartner')
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: '삭제 실패',
            text: '파트너 삭제에 실패했습니다.',
          })
        }
      } catch (error) {
        console.error('파트너 삭제 중 오류가 발생했습니다.', error);
        Swal.fire({
          icon: 'error',
          title: '삭제 실패',
          text: '파트너 삭제 중 오류가 발생했습니다.',
        })
      }
    }
  }

  return (
    <div className="container-fluid container">
      <div className="row">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} roles={{ isAdmin: true }} />
        <div className="col-md-9 col-lg-10 form-section">
          <div className="mb-5">
            <h3>파트너 수정</h3>
            <div className="container mt-2 userRead">
              <div className="card">
                <div className="card-body">
                  {partner && (
                    <PartnerUpdateForm
                      partner={partner}
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
  )
}

export default UpdatePartner
