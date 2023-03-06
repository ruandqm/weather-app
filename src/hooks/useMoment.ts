import moment from "moment"

const useMoment = (data: string, params: string) => {
    return moment(data).format(params)
}

export default useMoment