import { fetchData } from "./baseAction";

export const FETCH_WEATHER_BEGIN = "FETCH_WEATHER_BEGIN";
export const FETCH_WEATHER_SUCCESS = "FETCH_WEATHER_SUCCESS";
export const FETCH_WEATHER_FAILURE = "FETCH_WEATHER_FAILURE";

export function fetchWeather() {
    return fetchData('/weather', FETCH_WEATHER_BEGIN, FETCH_WEATHER_SUCCESS, FETCH_WEATHER_FAILURE);
}
