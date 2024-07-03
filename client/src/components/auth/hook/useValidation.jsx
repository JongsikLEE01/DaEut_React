import Swal from 'sweetalert2'

const useValidation = (formData, isIdChecked, isEmailChecked) => {
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

    const validateForm = () => {
        const {
            userId, userPassword, confirmPassword, userName,
            userBirth, userPhone, userEmail, userAddress
        } = formData

        const userIdPattern = /^[a-zA-Z0-9]{4,12}$/
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        if (!userIdPattern.test(userId)) {
            showAlert('아이디는 4~12자의 영문 또는 숫자만 가능합니다.', 'warning')
            return false
        }
        if (!passwordPattern.test(userPassword)) {
            showAlert('비밀번호는 8자 이상이어야 하며, 영문, 숫자, 특수문자를 모두 포함해야 합니다.', 'warning')
            return false
        }
        if (userPassword !== confirmPassword) {
            showAlert('비밀번호가 일치하지 않습니다.', 'warning')
            return false
        }
        if (!userName) {
            showAlert('이름을 입력해주세요.', 'warning')
            return false
        }
        if (!userBirth) {
            showAlert('생년월일을 입력해주세요.', 'warning')
            return false
        }
        if (!/^\d{10,11}$/.test(userPhone)) {
            showAlert('연락처를 올바르게 입력해주세요.', 'warning')
            return false
        }
        if (!userEmail || !/\S+@\S+\.\S+/.test(userEmail)) {
            showAlert('올바른 이메일 주소를 입력해주세요.', 'warning')
            return false
        }
        if (!userAddress) {
            showAlert('주소를 입력해주세요.', 'warning')
            return false
        }
        if (!isIdChecked) {
            showAlert('아이디 중복 체크를 해주세요.', 'warning')
            return false
        }
        if (!isEmailChecked) {
            showAlert('이메일 중복 체크를 해주세요.', 'warning')
            return false
        }

        return true
    }

    return [validateForm, showAlert]
}

export default useValidation
