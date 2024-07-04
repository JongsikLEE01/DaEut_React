import React, { useEffect, useState } from 'react'
import * as orders from '../../apis/Services/Orders'
import UserCancelDoneForm from '../../components/user/UserCancelDoneForm'

const UserCancelDoneContainer = ({ ordersNo }) => {
  const [cancel, setCancel] = useState({})
  console.log(ordersNo);

  // 환불데이터 가져오기
  const getCancel = async (ordersNo) => {
    try {
      const response = await orders.getCancel(ordersNo)
      const cancel = response.data
      console.log(`cancel? ${cancel}`);
      console.log(cancel);
    
      setCancel(cancel)
    } catch (e) {
      console.error(`환불 조회중 에러 발생... ${e}`);
    }
  }

  useEffect(() => {
    if (ordersNo) {
      getCancel(ordersNo)
    }
  }, [ordersNo])

  return (
    <>
      <UserCancelDoneForm 
        cancel={cancel} 
      />
    </>
  )
}

export default UserCancelDoneContainer
