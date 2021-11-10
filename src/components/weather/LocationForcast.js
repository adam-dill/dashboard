import React, { Component } from 'react'

export default class LocationForcast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            latitude: undefined,
            longitude: undefined
        }
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        window.navigator.geolocation
                .getCurrentPosition(({coords}) => {
                    const {latitude, longitude} = coords;
                    this.setState({
                        latitude,
                        longitude
                    }, this.fetchData);
                }, console.error);
    }

    async fetchData() {
        const {latitude, longitude} = this.state;
        if (!latitude || !longitude) return;

        const locationUrl = `https://api.weather.gov/points/${latitude},${longitude}`;
        const location = await fetch(locationUrl).then((res) => res.json());

        const forecastUrl = location.properties.forecast;
        const forecast = await fetch(forecastUrl).then((res) => res.json());

        const { city, state } = location.properties.relativeLocation.properties;

        console.log(forecast);
    }
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
