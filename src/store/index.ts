import { combineReducers, createStore } from "redux"
import citiesReducer from "./cities/reducer"
import dailyWeatherReducer from "./dailyWeather/reducer"

const reducers = combineReducers({
    cities: citiesReducer,
    selectedDay: dailyWeatherReducer
})

const store = createStore(reducers)

export default store