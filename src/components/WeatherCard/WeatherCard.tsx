import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux'
import useMoment from '../../hooks/useMoment'
import store from '../../store'
import { selectDay } from '../../store/dailyWeather/actions'
import './style.scss'



export const WeatherCard = (props: any) => {
    const setDailyWeather = () => {
        store.dispatch(selectDay(props.data.date))
        props.actions()
    }

    return (
        <div className='WeatherCardContainer animate__animated animate__bounceInUp' onClick={setDailyWeather}>
            <span>{useMoment(props.data.date, 'DD/MM/YYYY')}</span>
            <span>{`${props.data.temp_max}º ${props.data.temp_min}º`}</span>
            {/* <span>{props.data.main}</span> */}
            <img src={`https://openweathermap.org/img/wn/${props.data.icon}.png`} alt="ícone do clima" />
        </div>
    )
}
