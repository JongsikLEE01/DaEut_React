import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
/**
 * icon : success, error, warning, info, question
 */
const MySwal = withReactContent(Swal)

// 기본 alert ⚠
export const alert = (title, text, icon, callback) => {
    MySwal.fire({
        title: title,
        text: text,
        icon: icon
    })
    .then( callback )   // 경고창 출력 이후 실행할 콜백함수
}

// confirm 👨‍🏫
export const confirm = (title, text, icon, callback) => {
    MySwal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        cancelButtonColor: "#FF0000",
        cancelButtonText: "취소하기",
        confirmButtonColor: "#8FA2CA",
        confirmButtonText: "확인하기",
    })
    .then( callback )
}