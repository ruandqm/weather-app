const DAILY_INITIAL_STATE = {
    selectedDay: ''
}

const dailyWeatherReducer = (state = DAILY_INITIAL_STATE, action: any) => {
    switch (action.type) {
        case 'SELECT_DAY':
            return {
                selectedDay: action.payload
            }
        default:
            return state
    }
}

export default dailyWeatherReducer