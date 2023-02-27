import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { WeatherCard } from './components/WeatherCard/WeatherCard'
import store from './store'
import './App.scss'
import { addCity } from './store/cities/actions'

const App = () => {
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState([{}])
  const [isLoading, setIsLoading] = useState(false)

  const citiesReducer = useSelector((state: any) => state.cities)

  const inputSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const submitSearchHandler = async () => {
    if (!citiesReducer.cities.some((e: any) => e.city === search)) {
      setIsLoading(true)
      const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${import.meta.env.VITE_WEATHER_KEY}`)
      getWeather(response.data[0].lat, response.data[0].lon)
    } else {
      const actCity = citiesReducer.cities.find((e: any) => e.city === search)
      setWeather(actCity.weather)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      submitSearchHandler()
    }
  }

  const getWeather = async (lat: number, lon: number) => {
    console.log('api')
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=pt_br&units=metric&appid=${import.meta.env.VITE_WEATHER_KEY}`)
    let actIndex = 0
    let weatherArr = []
    for (let i = 0; i < response.data.list.length; i++) {
      if (i == actIndex) {
        const weatherData = {
          date: response.data.list[i].dt_txt.substring(0, 10),
          temp_max: parseInt(response.data.list[i].main.temp_max),
          temp_min: parseInt(response.data.list[i].main.temp_min),
          main: response.data.list[i].weather[0].main,
        }
        weatherArr.push(weatherData)
      }
      i == actIndex ? actIndex += 8 : null
    }
    setIsLoading(false)

    const cityWeather = {
      city: search,
      weather: weatherArr
    }

    store.dispatch(addCity(cityWeather))
    console.log(citiesReducer)
    setWeather(weatherArr)
  }

  return (
    <div className='AppContainer'>
      <h1 className='title'>Busque por sua cidade</h1>
      <div className="searchActions">
        <input className='cityInput'
          type="text"
          placeholder='Ex: Fortaleza'
          onChange={inputSearchHandler}
          onKeyDown={handleKeyDown} />
        <button className='searchButton' type='button' onClick={submitSearchHandler}><span className="material-symbols-outlined">
          search
        </span></button>
      </div>

      <div className="weather">
        <h2 className='titleWeather'>Previsão para os próximos 5 dias</h2>
        <div className="infos">
          {isLoading ? <h4>Carregando...</h4> : null}
          {Object.keys(weather[0]).length != 0 && weather.map((data, index) => {
            return (
              <WeatherCard key={index} data={data} />
            )
          })}

        </div>
      </div>
    </div>
  );
};

export default App