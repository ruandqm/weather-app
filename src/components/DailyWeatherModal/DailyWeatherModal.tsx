import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useMoment from '../../hooks/useMoment'
import './style.scss'

interface iProps {
    data: iDailyWeather,
    actions: any
}

export const DailyWeatherModal = (props: iProps) => {
    const dailyWeatherReducer = useSelector((state: any) => state.selectedDay)

    const modalHandler = () => {
        props.actions()
    }

    return (
        <div className='DailyWeatherModal animate__animated animate__bounceInU'>
            <div className="modalHeader">
                <h2>Previsão para o dia {useMoment(dailyWeatherReducer.selectedDay, 'DD/MM/YYYY')}</h2>
                <span onClick={modalHandler} className="material-symbols-outlined">
                    close
                </span>
            </div>

            <section className="weatherContent">
                {Object.keys(props.data).map((key: any, index: number) => {

                    if (key == useMoment(dailyWeatherReducer.selectedDay, 'DD/MM/YYYY')) {
                        const data = props.data[key][index]

                        return props.data[key].map((element, index) => {
                            return (
                                <article key={index} className="hourWeather">
                                    <span>{useMoment(element.date, 'HH:mm')}</span>
                                    <img src={`https://openweathermap.org/img/wn/${element.icon}.png`} alt="" />
                                    <span>{element.temp_max}º {element.temp_min}º</span>
                                </article>
                            )
                        })
                    }
                })}

            </section>

        </div>
    )
}