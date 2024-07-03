import { useState } from 'react'
import Swal from 'sweetalert2'

const useDuplicateCheck = (checkDuplicateId, checkDuplicateEmail) => {
    const [isIdChecked, setIsIdChecked] = useState(false)
    const [isEmailChecked, setIsEmailChecked] = useState(false)

    const showAlert = (message, type) => {
        let icon = ''
        if (type === 'success') {
            icon = 'success'
        } else if (type === 'warning') {
            icon = 'warning'
        } else if (type === 'error') {
            icon = 'error'
        }

        Swal.fire({
            text: message,
            icon: icon,
            confirmButtonText: '확인'
        })
    }

    const handleCheckDuplicateId = (userId) => {
        if (!userId) {
            showAlert('아이디를 입력해주세요.', 'warning')
            return
        }
        checkDuplicateId(userId)
            .then(response => {
                const data = response.data
                if (data.exists) {
                    showAlert('이미 사용 중인 아이디입니다.', 'warning')
                    setIsIdChecked(false)
                } else {
                    showAlert('사용 가능한 아이디입니다.', 'success')
                    setIsIdChecked(true)
                }
            })
            .catch(error => {
                showAlert('아이디 중복 확인 중 오류가 발생했습니다.', 'error')
                console.error('아이디 중복 확인 오류:', error);
            })
    }

    const handleCheckDuplicateEmail = (userEmail) => {
        if (!userEmail) {
            showAlert('이메일을 입력해주세요.', 'warning')
            return
        }
        checkDuplicateEmail(userEmail)
            .then(response => {
                const data = response.data
                if (data.exists) {
                    showAlert('이미 사용 중인 이메일입니다.', 'warning')
                    setIsEmailChecked(false)
                } else {
                    showAlert('사용 가능한 이메일입니다.', 'success')
                    setIsEmailChecked(true)
                }
            })
            .catch(error => {
                showAlert('이메일 중복 확인 중 오류가 발생했습니다.', 'error')
                console.error('이메일 중복 확인 오류:', error);
            })
    }

    return [isIdChecked, isEmailChecked, handleCheckDuplicateId, handleCheckDuplicateEmail]
}

export default useDuplicateCheck
