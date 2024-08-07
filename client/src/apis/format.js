export const formatDate = (dateString) =>{
    const date = new Date(dateString)

    // 자바스크립트 날짜 포맷
    // 1. 포맷 option으로 적용
    // toLocaleString : 년 월 일, 시,분, 초를 객체로 넣어주면 사용할 수 있음
    // const options = { year      : 'numeric'
    //                 , month     : 'numeric'
    //                 , day       : 'numeric'
    //                 , hour      : 'numeric'
    //                 , minute    : 'numeric'
    //                 , second    : 'numeric'
    //                 , hour12    : false
    //                 , timeZone  : 'Asia/Seoul' 
    //                 }
    // return date.toLocaleString('ko-Ko', options)

    // 2. 포맷 형식으로 적용
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}년${month}월 ${day}일 ${hours}시 ${minutes}분`
}

export const byteToUnit = (byte) => {
    // 단위별 곱셈 계수를 정의합니다.
    const unitMultipliers = {
        "B": 1,
        "KB": 1024,
        "MB": 1048576,
        "GB": 1073741824,
        "TB": 1099511627776
    };
    // 가장 큰 단위를 찾습니다.
    let unit = "";
    for (const key in unitMultipliers) {
        if (byte >= unitMultipliers[key]) {
        unit = key;
        }
    }
    // 입력된 바이트 수를 단위별로 변환합니다.
    return parseFloat(byte / unitMultipliers[unit]).toFixed(2) + " " + unit;
}