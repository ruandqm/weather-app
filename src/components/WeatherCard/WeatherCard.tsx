import React from 'react'
import './style.scss'



export const WeatherCard = (props: any) => {
    return (
        <div className='WeatherCardContainer'>
            <span>{props.data.date}</span>
            <span>{`${props.data.temp_max}º ${props.data.temp_min}º`}</span>
            <span>{props.data.main}</span>
        </div>
    )
}
