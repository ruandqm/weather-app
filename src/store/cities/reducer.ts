const CITIES_INITIAL_STATE = {
    cities: [],
}

const citiesReducer = (state = CITIES_INITIAL_STATE, action: any) => {
    switch (action.type) {
        case 'ADD_CITY':
            return {
                ...state,
                cities: [...state.cities, action.payload]
            }

        default:
            return state
    }
}

export default citiesReducer