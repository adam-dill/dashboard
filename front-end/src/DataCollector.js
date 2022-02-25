import { 
    updateTime,
    fetchWeather,
    fetchCalendar,
    fetchNews,
    fetchTrello,
    fetchQuote,
    fetchTrends,
    fetchBackground
 } from "./redux/actions";

const DataCollector = (store) => {

    // Clock
    delay(store, updateTime, 1);

    // Weather
    delay(store, fetchWeather, 60);

    // Calendar (daily)
    delay(store, fetchCalendar, 1440);

    // News
    delay(store, fetchNews, 60);

    // Trello
    delay(store, fetchTrello, 60);

    // Quote
    delay(store, fetchQuote, 60);

    // Trends
    delay(store, fetchTrends, 60);

    // Background
    delay(store, fetchBackground, 60);
};

const delay = (store, fn, min) => {
    setInterval(() => {
        store.dispatch(fn());
    }, min * 60 * 1000);
}

export default DataCollector;