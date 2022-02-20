import { fetchData } from "./baseAction";

export const FETCH_WEATHER_BEGIN = "FETCH_WEATHER_BEGIN";
export const FETCH_WEATHER_SUCCESS = "FETCH_WEATHER_SUCCESS";
export const FETCH_WEATHER_FAILURE = "FETCH_WEATHER_FAILURE";

export const fetchWeatherBegin = () => ({
    type: FETCH_WEATHER_BEGIN,
});

export const fetchWeatherSuccess = (data) => ({
    type: FETCH_WEATHER_SUCCESS,
    lastUpdate: new Date(),
    data,
});

export const fetchWeatherFailure = (error) => ({
    type: FETCH_WEATHER_FAILURE,
    error,
});

export function fetchWeather() {
    return fetchData('/weather', fetchWeatherBegin, fetchWeatherSuccess, fetchWeatherSuccess);
}
