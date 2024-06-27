import React, { useEffect, useRef, useState } from 'react';
import Footer from './static/Footer';
import Header from './static/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCalendarCheck, faBrush, faBug, faJugDetergent } from '@fortawesome/free-solid-svg-icons';
import Slide from './index/Slide';
import './css/Home.css';

const Home = () => {
  const swiperRef = useRef(null);
  // const [swiperInstance, setSwiperInstance] = useState([]);
  const [weather, setWeather] = useState({
    weatherDescription: '',
    temp: '',
    humidity: '',
    wind: '',
    city: '',
    cloud: '',
    temp_min: '',
    temp_max: '',
    iconClass: '',
  })

  const weatherIcon = {
    '01': 'bi bi-brightness-high-fill',
    '02': 'fa-solid fa-cloud-sun',
    '03': 'fa-solid fa-cloud',
    '04': 'fa-solid fa-cloud-meatball',
    '09': 'fa-solid fa-cloud-sun-rain',
    '10': 'fa-solid fa-cloud-showers-heavy',
    '11': 'fa-solid fa-cloud-bolt',
    '13': 'fa-solid fa-snowflake',
    '50': 'fa-solid fa-smog',
  }

  // 위치 정보를 가져오는 함수
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude
          weatherData(latitude, longitude)
        },
        error => {
          console.error('위치 정보 로드 중 에러 발생 : ', error)
        }
      )
    } else {
      console.error('해당 브라우저는 위치 정보를 가져올 수 없습니다.')
    }
  }

  // API를 통해 날씨 데이터를 가져오는 함수
  const weatherData = (latitude, longitude) => {
    const API_KEY = 'ef8952bfbab9356b5066de2f01ab56c1'
    const apiURI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`

    fetch(apiURI)
      .then(response => response.json())
      .then(data => {
        const weatherDescription = data.weather[0].description
        const temp = Math.floor(data.main.temp) + '°C'
        const humidity = '습도 : ' + data.main.humidity + ' %'
        const wind = '바람 : ' + data.wind.speed + ' m/s'
        const city = data.name
        const cloud = '구름 : ' + data.clouds.all + '%'
        const temp_min = '최저 온도 : ' + Math.floor(data.main.temp_min) + '°C'
        const temp_max = '최고 온도 : ' + Math.floor(data.main.temp_max) + '°C'
        const icon = data.weather[0].icon.substr(0, 2)
        const iconClass = weatherIcon[icon]

        // 상태 업데이트
        setWeather({
          weatherDescription,
          temp,
          humidity,
          wind,
          city,
          cloud,
          temp_min,
          temp_max,
          iconClass,
        });
      })
      .catch(error => {
        console.error('날씨 데이터 로드 중 오류 발생 :', error)
      })
  }

  // 서비스 영역 표시 함수
  const showService = option => {
    const outputs = document.querySelectorAll('.output');
    outputs.forEach(el => {
      el.style.display = 'none'
    })
    document.getElementById('output' + option.charAt(option.length - 1)).style.display = 'block'
  }

  useEffect(() => {

    getLocation()
  }, [])

  return (
    <>
      <Header />
      <body>
        <div className="weather">
          <div className="weatherIcon"></div>
          <div className="weatherText">
            <div className="weatherData">
              <div className="temp_min">{weather.temp_min}</div>
              <div className="temp_max">{weather.temp_max}</div>
              <div className="humidity">{weather.humidity}</div>
              <div className="wind">{weather.wind}</div>
              <div className="cloud">{weather.cloud}</div>
            </div>
            <div className="myWeather">
              <div className="current_temp">{weather.temp}</div>
              <div className="weather_description">{weather.weatherDescription}</div>
              <div className="city">{weather.city}</div>
            </div>
          </div>
        </div>

        <Slide />

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
                    <FontAwesomeIcon icon={faBuilding} className="icon-feature text-gradient d-block mb-3 color_point" />
                    <h3 className="font-alt">입주 청소</h3>
                    <p className="text-muted mb-0">이사하느라 정신없으시죠? 저희가 <br />새 집보다 새 집처럼 청소해둘게요!</p>
                  </div>
                </div>
                <div className="col-lg-2 order-lg-1">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faCalendarCheck} className="icon-feature text-gradient d-block mb-3 color_point" />
                    <h3 className="font-alt">정기 청소</h3>
                    <p className="text-muted mb-0">정기적인 구독으로 할인과 청소,<br /> 두마리 토끼를 모두 잡아보세요!</p>
                  </div>
                </div>
                <div className="col-lg-2 order-lg-1">
                  <div className="text-center">
                    <i className="bi-brush icon-feature text-gradient d-block mb-3 color_point icon"></i>
                    <FontAwesomeIcon icon={faBrush} className="icon-feature text-gradient d-block mb-3 color_point" />
                    <h3 className="font-alt">부분 청소</h3>
                    <p className="text-muted mb-0">더러운 집은 볼 때마다 화가 날거에요 <br />지금 바로 저희에게 부탁하세요!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 output" id="output2">
              <div className="row gx-5 align-items-center">
                <div className="col-lg-2 order-lg-1">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faBuilding} className="icon-feature text-gradient d-block mb-3 color_point" />
                    <h3 className="font-alt">입주 방역</h3>
                    <p className="text-muted mb-0">이사하느라 정신없으시죠? 저희가<br />새 집보다 새 집처럼 방역해둘게요!</p>
                  </div>
                </div>
                <div className="col-lg-2 order-lg-1">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faCalendarCheck} className="icon-feature text-gradient d-block mb-3 color_point" />
                    <h3 className="font-alt">정기 방역</h3>
                    <p className="text-muted mb-0">정기적인 구독으로 할인과 방역, <br /> 두마리 토끼를 모두 잡아보세요!</p>
                  </div>
                </div>
                <div className="col-lg-2 order-lg-1">
                  <div className="text-center">
                    <i className="bi-brush icon-feature text-gradient d-block mb-3 color_point icon"></i>
                    <FontAwesomeIcon icon={faBug} className="icon-feature text-gradient d-block mb-3 color_point" />
                    <h3 className="font-alt">부분 방역</h3>
                    <p className="text-muted mb-0">더러운 집은 볼 때마다 화가 날거에요<br />지금 바로 저희에게 부탁하세요!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 output" id="output3">
              <div className="row gx-5 align-items-center">
                <div className="col-lg-2 order-lg-1">
                  <div className="text-center">
                  <FontAwesomeIcon icon={faBuilding} className="icon-feature text-gradient d-block mb-3 color_point" />
                    <h3 className="font-alt">입주 빨래</h3>
                    <p className="text-muted mb-0">이사하느라 정신없으시죠? 저희가<br />새 집보다 새 집처럼 빨래해드릴게요!</p>
                  </div>
                </div>
                <div className="col-lg-2 order-lg-1">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faCalendarCheck} className="icon-feature text-gradient d-block mb-3 color_point" />
                    <h3 className="font-alt">정기 빨래</h3>
                    <p className="text-muted mb-0">정기적인 구독으로 할인과 빨래, <br /> 두마리 토끼를 모두 잡아보세요!</p>
                  </div>
                </div>
                <div className="col-lg-2 order-lg-1">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faJugDetergent} className="icon-feature text-gradient d-block mb-3 color_point" />
                    <h3 className="font-alt">부분 빨래</h3>
                    <p className="text-muted mb-0">더러운 집은 볼 때마다 화가 날거에요<br />지금 바로 저희에게 부탁하세요!</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="section02">
        <div className="px-5">
          <div className="row gx-5 align-items-center justify-content-center justify-content-lg-between scroll_wrap">
            <div className="col-sm-8 col-md-6 scroll_on type_bottom">
              <div className="px-5 px-sm-0">
                <img
                  src={`${process.env.PUBLIC_URL}/img/index02.png`}
                  alt="설명이미지"
                  className="img-fluid rounded-circle"
                />
              </div>
            </div>
            <div className="col-12 col-lg-5 scroll_on type_bottom">
              <h2 className="display-4 lh-1 mb-4 h2">Eco friendly</h2>
              <p className="lead fw-normal text-muted mb-5 mb-lg-0">
                저희 다이웃은 고객님의 건강을 최우선으로 생각하여 오직 친환경약품을 사용합니다.<br /> 이를 통해 환경과 건강에 동시에 이로운 선택을 할 수 있습니다.<br /> 우리의 목표는 고객님의 만족과 건강한 생활 환경을 돕는 것입니다</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section03">
        <div className="px-5">
          <div className="row gx-5 align-items-center justify-content-center justify-content-lg-between scroll_wrap">
            <div className="col-12 col-lg-5 scroll_on type_bottom">
              <h2 className="display-4 lh-1 mb-4 h2">Management</h2>
              <p className="lead fw-normal text-muted mb-5 mb-lg-0">
                다이웃 파트너는 엄격한 심사 과정을 거쳐 승인된 파트너들만 활동하고 있습니다.<br /> 저희는 개별적으로 모든 파트너를 심사하여 그들의 신뢰성과 서비스 품질을 보장합니다.<br /> 이를 통해 안전하고 믿을 수 있는 서비스를 제공하며, 고객들이 걱정 없이 다이웃 파트너를 이용할 수 있도록 최선을 다하고 있습니다.</p>
            </div>
            <div className="col-sm-8 col-md-6 scroll_on type_bottom">
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

      <section className="cta scroll_wrap">
        <div className="cta-content scroll_on type_bottom">
          <div className="container px-5 scroll_on">
            <h2 className="color_white display-1 lh-1 mb-4 text-center">
              누구나 깨끗한 집을
              <br />
              원하잖아요
            </h2>
            <a className="btn btn-outline-light py-3 px-4 w-auto" href="/reservation/reservation">
              지금 예약하기
            </a>
          </div>
        </div>
      </section>
      </body>
      <Footer />
    </>
  );
};

export default Home;
