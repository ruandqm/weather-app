import { combineReducers, createStore } from "redux"
import citiesReducer from "./cities/reducer"

const reducers = combineReducers({
    cities: citiesReducer,
})

const store = createStore(reducers)

export default store