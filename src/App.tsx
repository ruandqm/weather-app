import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { WeatherCard } from './components/WeatherCard/WeatherCard'
import store from './store'
import './App.scss'
import { addCity } from './store/cities/actions'
import { DailyWeatherModal } from './components/DailyWeatherModal/DailyWeatherModal'
import useMoment from './hooks/useMoment'

const App = () => {
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState<iDailyWeather>({})
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const citiesReducer = useSelector((state: any) => state.cities)

  const inputSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const submitSearchHandler = async () => {
    if (!citiesReducer.cities.some((e: any) => e.city === search)) {
      setIsLoading(true)
      const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${search}&appid=${import.meta.env.VITE_WEATHER_KEY}`)
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
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=pt_br&units=metric&appid=${import.meta.env.VITE_WEATHER_KEY}`)
    let weatherArr = []
    let dailyWeather: iDailyWeather = {}

    for (let i = 0; i < response.data.list.length; i++) {
      const weatherData: iWeatherData = {
        date: response.data.list[i].dt_txt,
        temp_max: parseInt(response.data.list[i].main.temp_max),
        temp_min: parseInt(response.data.list[i].main.temp_min),
        main: response.data.list[i].weather[0].main,
        icon: response.data.list[i].weather[0].icon,
      }
      weatherArr.push(weatherData)
    }

    for (let i = 0; i < weatherArr.length; i++) {
      const date = useMoment(weatherArr[i].date, 'DD/MM/YYYY')
      if (!dailyWeather[date]) {
        dailyWeather[date] = []
      }
      dailyWeather[date].push(weatherArr[i])
    }

    setIsLoading(false)

    const cityWeather = {
      city: search,
      weather: dailyWeather
    }

    store.dispatch(addCity(cityWeather))
    setWeather(dailyWeather)
  }

  const modalOpen = () => {
    setModalIsOpen(true)
  }
  const modalClose = () => {
    setModalIsOpen(false)
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
        <span>Clique em algum dia para obter mais previsões</span>
        <div className="infos">
          {isLoading ? <h4>Carregando...</h4> : null}
          {Object.keys(weather).length != 0 && Object.keys(weather).map((key: string, index) => {

            return (
              <WeatherCard key={index} data={weather[key][0]} actions={modalOpen} />
            )
          })}

        </div>
      </div>

      {modalIsOpen && <DailyWeatherModal data={weather} actions={modalClose} />}

    </div>
  );
};

export default App