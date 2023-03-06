export const selectDay = (day: string) => {
    return {
        type: 'SELECT_DAY',
        payload: day
    }
}