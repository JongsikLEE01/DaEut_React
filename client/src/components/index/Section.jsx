import React, { useEffect, useRef } from 'react';
import './css/SectionStyles.css';

const Section = () => {
  const countersRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, { threshold: 0.5 }); // 50% 이상 노출되면 감지

    countersRef.current.forEach(counter => {
      observer.observe(counter);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section className="section01">
        <div className="px-5 ">
          <div className="row gx-5 align-items-center justify-content-center justify-content-lg-between scroll_wrap">
            <div className="col-12 col-lg-5 scroll_wrap scroll_on type_bottom" ref={el => countersRef.current[0] = el}>
              <h2 className="display-4 lh-1 mb-4 h2">Everywhere</h2>
              <p className="lead fw-normal text-muted mb-5 mb-lg-0">
                입주 청소, 정기 청소, 화장실 등 어디든, 저희 다이웃은 함께하면 어디든 깨끗해집니다.<br /> 고객님의 편안하고 안정적인 생활과 건강을 위해 최선을 다하겠습니다.<br /> 다이웃과 함께라면 청결한 환경을 유지하는 것이 더욱 간편해집니다.
              </p>
            </div>
            <div className="col-sm-8 col-md-6 scroll_on type_bottom" ref={el => countersRef.current[1] = el}>
              <div className="px-5 px-sm-0">
                <img
                  src={`${process.env.PUBLIC_URL}/img/index01.png`}
                  alt="설명이미지"
                  className="img-fluid rounded-circle"
                  ref={el => countersRef.current[1] = el} // 이미지 요소에 ref를 추가하여 countersRef에 할당
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section02">
        <div className="px-5">
          <div className="row gx-5 align-items-center justify-content-center justify-content-lg-between scroll_wrap">
            <div className="col-sm-8 col-md-6 scroll_on type_bottom" ref={el => countersRef.current[2] = el}>
              <div className="px-5 px-sm-0">
                <img
                  src={`${process.env.PUBLIC_URL}/img/index02.png`}
                  alt="설명이미지"
                  className="img-fluid rounded-circle"
                />
              </div>
            </div>
            <div className="col-12 col-lg-5 scroll_on type_bottom" ref={el => countersRef.current[3] = el}>
              <h2 className="display-4 lh-1 mb-4 h2">친환경</h2>
              <p className="lead fw-normal text-muted mb-5 mb-lg-0">
                저희 다이웃은 고객님의 건강을 최우선으로 생각하여 오직 친환경약품을 사용합니다.<br /> 이를 통해 환경과 건강에 동시에 이로운 선택을 할 수 있습니다.<br /> 우리의 목표는 고객님의 만족과 건강한 생활 환경을 돕는 것입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section03">
        <div className="px-5">
          <div className="row gx-5 align-items-center justify-content-center justify-content-lg-between scroll_wrap">
            <div className="col-12 col-lg-5 scroll_on type_bottom" ref={el => countersRef.current[4] = el}>
              <h2 className="display-4 lh-1 mb-4 h2">관리</h2>
              <p className="lead fw-normal text-muted mb-5 mb-lg-0">
                다이웃 파트너는 엄격한 심사 과정을 거쳐 승인된 파트너들만 활동하고 있습니다.<br /> 저희는 개별적으로 모든 파트너를 심사하여 그들의 신뢰성과 서비스 품질을 보장합니다.<br /> 이를 통해 안전하고 믿을 수 있는 서비스를 제공하며, 고객들이 걱정 없이 다이웃 파트너를 이용할 수 있도록 최선을 다하고 있습니다.
              </p>
            </div>
            <div className="col-sm-8 col-md-6 scroll_on type_bottom" ref={el => countersRef.current[5] = el}>
              <div className="px-5 px-sm-0">
                <img
                  src={`${process.env.PUBLIC_URL}/img/index03.png`}
                  alt="설명이미지"
                  className="img-fluid rounded-circle"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta scroll_wrap" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/order01.jpg)` }}>
        <div className="cta-content scroll_on type_bottom" ref={el => countersRef.current[6] = el}>
          <div className="cont px-5 scroll_on" ref={el => countersRef.current[7] = el}>
            <h2 className="color_white display-1 lh-1 mb-4 text-center" >
              누구나 깨끗한 집을
              <br />
              원하잖아요
            </h2>
            <a className="btn btn-outline-light py-3 px-4 w-auto color_white" href="/reservation/reservation">
              지금 예약하기
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Section;
