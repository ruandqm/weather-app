interface iWeatherData {
    date: string;
    temp_max: number;
    temp_min: number;
    main: string;
    icon: string;
}
interface iDailyWeather {
    [key: string]: iWeatherData[];
}