import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCalendarCheck, faBrush, faBug, faJugDetergent } from '@fortawesome/free-solid-svg-icons';

const Tap = () => {
  const showService = option => {
    const outputs = document.querySelectorAll('.output');
      outputs.forEach(el => {
        el.style.display = 'none'
    })
    document.getElementById('output' + option.charAt(option.length - 1)).style.display = 'block'
  }

  useEffect(() => {
    showService('output1');
  }, [])

  return (
    <>
      <div className="content">
          <section id="features">
            <div className="px-5 serviceBox">
              <div className="row gx-5">
                <div className="col-4 align-items-center justify-content-center">
                  <button type="button" onClick={() => showService('output1')} className="service">청소</button>
                </div>
                <div className="col-4">
                  <button type="button" onClick={() => showService('output2')} className="service">방역</button>
                </div>
                <div className="col-4">
                  <button type="button" onClick={() => showService('output3')} className="service">빨래</button>
                </div>
              </div>
            </div>
            
            <div className="px-5 output" id="output1">
              <div className="row gx-5 align-items-center">
                <div className="col-lg-2 order-lg-1">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faBuilding} className="icon-feature text-gradient d-block mb-3 icon color_point mx-auto" />
                    <h3 className="font-alt">입주 청소</h3>
                    <p className="text-muted mb-0">이사하느라 정신없으시죠? 새 집보다 새 집처럼 청소해둘게요!</p>
                  </div>
                </div>
                <div className="col-lg-2 order-lg-1">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faCalendarCheck} className="icon-feature text-gradient d-block mb-3 color_point mx-auto" />
                    <h3 className="font-alt">정기 청소</h3>
                    <p className="text-muted mb-0">정기적인 구독으로 할인과 청소, 두마리 토끼를 모두 잡아보세요!</p>
                  </div>
                </div>
                <div className="col-lg-2 order-lg-1">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faBrush} className="icon-feature text-gradient d-block mb-3 color_point mx-auto" />
                    <h3 className="font-alt">부분 청소</h3>
                    <p className="text-muted mb-0">더러운 집은 볼 때마다 화가 날거에요. 지금 바로 저희에게 부탁하세요!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 output" id="output2">
              <div className="row gx-5 align-items-center">
                <div className="col-lg-2 order-lg-1">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faBuilding} className="icon-feature text-gradient d-block mb-3 color_point mx-auto" />
                    <h3 className="font-alt">입주 방역</h3>
                    <p className="text-muted mb-0">이사하느라 정신없으시죠? 새 집보다 새 집처럼 방역해둘게요!</p>
                  </div>
                </div>
                <div className="col-lg-2 order-lg-1">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faCalendarCheck} className="icon-feature text-gradient d-block mb-3 color_point mx-auto" />
                    <h3 className="font-alt">정기 방역</h3>
                    <p className="text-muted mb-0">정기적인 구독으로 할인과 방역, 두마리 토끼를 모두 잡아보세요!</p>
                  </div>
                </div>
                <div className="col-lg-2 order-lg-1">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faBug} className="icon-feature text-gradient d-block mb-3 color_point mx-auto" />
                    <h3 className="font-alt">부분 방역</h3>
                    <p className="text-muted mb-0">더러운 집은 볼 때마다 화가 날거에요지금 바로 저희에게 부탁하세요!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 output" id="output3">
              <div className="row gx-5 align-items-center">
                <div className="col-lg-2 order-lg-1">
                  <div className="text-center align-items-center">
                    <FontAwesomeIcon icon={faBuilding} className="icon-feature text-gradient d-block mb-3 color_point mx-auto" />
                    <h3 className="font-alt">입주 빨래</h3>
                    <p className="text-muted mb-0">이사하느라 정신없으시죠? 깨끗하게 빨래해드릴게요!</p>
                  </div>
                </div>
                <div className="col-lg-2 order-lg-1">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faCalendarCheck} className="icon-feature text-gradient d-block mb-3 color_point mx-auto" />
                    <h3 className="font-alt">정기 빨래</h3>
                    <p className="text-muted mb-0">정기적인 구독으로 할인과 빨래, 두마리 토끼를 모두 잡아보세요!</p>
                  </div>
                </div>
                <div className="col-lg-2 order-lg-1">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faJugDetergent} className="icon-feature text-gradient d-block mb-3 color_point mx-auto" />
                    <h3 className="font-alt">부분 빨래</h3>
                    <p className="text-muted mb-0">더러운 집은 볼 때마다 화가 날거에요. 지금 바로 저희에게 부탁하세요!</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
    </>
  )
}

export default Tap