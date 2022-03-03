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
    store.dispatch(updateTime());
    delay(store, updateTime, 1);

    // Weather
    store.dispatch(fetchWeather());
    delay(store, fetchWeather, 60);

    // Calendar
    store.dispatch(fetchCalendar());
    delay(store, fetchCalendar, 60);

    // News
    store.dispatch(fetchNews());
    delay(store, fetchNews, 60);

    // Trello
    store.dispatch(fetchTrello());
    delay(store, fetchTrello, 60);

    // Quote
    store.dispatch(fetchQuote());
    delay(store, fetchQuote, 60);

    // Trends
    store.dispatch(fetchTrends());
    delay(store, fetchTrends, 60);

    // Background
    store.dispatch(fetchBackground());
    delay(store, fetchBackground, 60);
};

const delay = (store, fn, min) => {
    setInterval(() => {
        store.dispatch(fn());
    }, min * 60 * 1000);
}

export default DataCollector;