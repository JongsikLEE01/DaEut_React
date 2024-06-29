import React from 'react'

const ReadContent = ({ service }) => {
  const handleDirectReservation = () => {
    alert('바로 예약하기')
    // 예약하기에 대한 로직 추가
  }

//   const handleAddToCart = () => {
//     addToCart()
//   }

  return (
    <div className="box-form-right">
      <div className="partner-service-list">
        <table className="partner-service-table">

          <tbody>
            <tr>
              <td style={{ width: '65px' }}>가격 :</td>
              <td>{service.servicePrice}</td>
            </tr>
            <tr>
              <td style={{ width: '65px' }}>설명 :</td>
              <td>{service.serviceContent}</td>
            </tr>
          </tbody>

          <tfoot>
            <tr className="reservation-buttons">

              {/* <td>
                <button className="reservation-calender">바로 예약하기</button>
              </td>

              <td>
                <button className="reservation-paybutton">장바구니 담기</button>
              </td> */}

              <td>
                <form>
                  <input type="hidden" name={csrfToken.parameterName} value={csrfToken.token} />
                  <input type="hidden" id="serviceNo" name="serviceNo" value={service.serviceNo} />
                  <input type="hidden" id="quantity" name="quantity" value="1" />
                  <button className="reservation-calender" id="couponBtn">
                    바로 예약하기
                  </button>
                </form>
              </td>

              <td>
                <button className="reservation-paybutton">
                  장바구니 담기
                </button>
              </td>

            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default ReadContent
