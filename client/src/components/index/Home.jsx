import React, { useEffect, useRef, useState } from 'react';
import Slide from './Slide';
import '../index/css/Home.css';
import Section from './Section';
import Tap from './Tap';

const Home = () => {
  // 날씨 api
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
  // 날씨 아이콘
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

  useEffect(() => {
    // 위치 가져오기
    getLocation()
  }, [])

  return (
    <>
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
        <Tap />
        <Section/>
    </>
  );
};

export default Home;
