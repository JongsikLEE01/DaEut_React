import React, { useEffect } from 'react'

const useNotification = (title, options, roomNo) => {
  // useEffect(() => {
  //   if (Notification.permission !== 'granted') {
  //     Notification.requestPermission().then(permission => {
  //       if (permission !== 'granted') {
  //         console.warn('알림 권한 거부...')
  //       }
  //     }).catch(e => {
  //       console.error(`알림 권한 요청 중 에러 발생... ${e}`)
  //     })
  //   }
  // }, [])
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      try {
        Notification.requestPermission().then((permission) => {
          if (permission !== 'granted') return;
        });
      } catch (error) {
        if (error instanceof TypeError) {
          Notification.requestPermission((permission) => {
            if (permission !== 'granted') return;
          });
        } else {
          console.error(error);
        }
      }
    }
  }, [])

  const pushNotification = (title, options, roomNo) => {
    if (Notification.permission === 'granted') {
      // 로고 추가
      const icon = '/img/logo_h.png'
      options = { ...options, icon }
      const notification = new Notification(title, options)

      console.log(`notification? ${notification}`);
      console.log(notification);

      // 알림 클릭 시 이동할 URL 설정
      notification.onclick = () => {
        window.location.href = `/chat/${roomNo}`
      }

      return notification
    } else {
      console.warn('알림 권한이 허용되지 않았습니다...')
    }
  }

  return pushNotification
}

export default useNotification