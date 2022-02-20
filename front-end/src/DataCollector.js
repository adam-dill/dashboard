import { updateTime } from "./redux/actions/timeAction";
import { fetchWeather } from "./redux/actions/weatherAction";

const DataCollector = (store) => {

    // Clock
    setInterval(() => {
        //store.dispatch(updateTime());
    }, 1000);


    // Weather
    setInterval(() => {
        store.dispatch(fetchWeather());
    }, 120000)

    // Calendar


    // News


    // Trello



};

export default DataCollector;