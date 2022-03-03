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
    daily(store, fetchCalendar);

    // News
    store.dispatch(fetchNews());
    delay(store, fetchNews, 60);

    // Trello
    store.dispatch(fetchTrello());
    delay(store, fetchTrello, 60);

    // Quote
    store.dispatch(fetchQuote());
    daily(store, fetchQuote);

    // Trends
    store.dispatch(fetchTrends());
    daily(store, fetchTrends);

    // Background
    store.dispatch(fetchBackground());
    daily(store, fetchBackground);
};

const delay = (store, fn, min) => {
    setInterval(() => {
        store.dispatch(fn());
    }, min * 60 * 1000);
}

const daily = (store, fn) => {
    let now = new Date();
    setInterval(() => {
        if (!compareDate(now, new Date())) {
            console.log('updating....');
            now = new Date();
            store.dispatch(fn());
        }
    }, 60000)
}

const compareDate = (a, b) => {
    return (
        a.getDate() === b.getDate() &&
        a.getMonth() === b.getMonth() &&
        a.getYear() === b.getYear()
    );
}

export default DataCollector;