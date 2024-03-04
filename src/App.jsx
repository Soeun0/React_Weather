import { useEffect, useState } from 'react'
import './App.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function App() {
  const cities = ['서울', '도쿄', '베이징', '모스크바', '런던', '워싱턴', '로마', '부다페스트', '시드니', '스톡홀름', '파리', '카이로', '타이베이'];
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const [city, setCity] = useState(cities[0]);
  const [engCity, setEngCity] = useState(cityToEnglish(city));
  const [tempature, settempature] = useState(0);
  const [weather, setWeather] = useState('맑음');

  const [selected, setSelected] = useState(cities[0]);

  function cityToEnglish(city) {
    switch (city) {
      case '서울':
        return 'seoul';
      case '도쿄':
        return 'tokyo';
      case '베이징':
        return 'beijing';
      case '모스크바':
        return 'moscow';
      case '런던':
        return 'london';
      case '워싱턴':
        return 'washington';
      case '로마':
        return 'rome, IT';
      case '부다페스트':
        return 'budapest';
      case '시드니':
        return 'sydney';
      case '카이로':
        return 'cairo';
      case '스톡홀름':
        return 'stockholm';
      case '파리':
        return 'paris';
      case '타이베이' :
        return 'Taipei City';
    }
  }

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${engCity}&appid=${API_KEY}&units=metric&lang=kr`)
      .then((response) => { //성공했을때 
        settempature(response.data.main.temp);
        setWeather(response.data.weather[0].description);
      })
      .catch((error) => {
        console.log(error)
      }) //실패했을때
  }, [city]);

  return (
    <div>
      <h1 className='title'>세계 현재 날씨</h1>
      <div className='weather-box'>
        <div className='weather-info'>
          <div className='city'>{city}</div>
          <div>
            <div className='weather'>{weather}</div>
            <div className='tempature'>{tempature}°C</div>
          </div>
        </div>
      </div>
      <div className='city-box'>
        {

          cities.map((element, index) => {
            return (
              <Button variant="dark" className={`city-button ${element === selected ? 'city-button-selected' : ''}`}
                onClick={() => {
                  setCity(cities[index]);
                  setSelected(cities[index]);
                  setEngCity(cityToEnglish(element));
                }}> {element}
              </Button>
            )
          })

        }
      </div>
    </div>
  );
}

export default App
