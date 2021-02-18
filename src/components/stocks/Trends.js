import React from 'react';
import { Bar } from 'react-chartjs-2';


const options = {
    defaultFontColor: 'white',
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                    fontColor: 'white',
                },
            },
        ],
        xAxes: [
            {
                ticks: {
                    fontColor: 'white',
                },
            },
        ],
    },
    legend: {
        labels: {
            // This more specific font property overrides the global property
            fontColor: 'white'
        }
    }
};

const colorNames = [
    "rgb(255, 0, 255)",
    "rgb(124, 252, 0)",
    "rgb(70, 130, 180)",
];

class Trends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            draw: true
        };
        this.handleRedraw = this.handleRedraw.bind(this);
    }

    componentDidMount() {
        this.fetchData();
        setInterval(() => {
            // update at 1am, to give the data time to be set.
            const date = new Date();
            if (date.getHours() === 1) {
                this.fetchData();
            }
        }, (1000 * 60 * 60));
    }

    fetchData() {
        fetch(`http://reddit-trends.adamdill.com//trends/limit/1`)
            .then(response => response.json())
            .then(result => {
                const resultData = JSON.parse(result[0].data);
                const tickers = Object.keys(resultData.scores);
                // assume all data is structured consistently.
                const trackingKeys = Object.keys(resultData.scores[tickers[0]]);
                const datasets = trackingKeys
                    .filter(key => key !== 'neu')
                    .map((key, index) => {
                        return {
                            label: key,
                            data: tickers.map(ticker => resultData.scores[ticker][key]),
                            backgroundColor: colorNames[index]
                        }
                    });
                this.setState({
                    data: { labels: tickers, datasets },
                    redraw: false
                });
            })
            .catch(e => setTimeout(this.fetchData, 1000));;
    }

    handleRedraw() {
        setTimeout(() => this.setState({draw: true}), 100)
    }

    render() {
        const compoent = (this.state.draw)
            ? <Bar redraw={true} data={this.state.data} options={options} />
            : null;
        if (this.state.draw === false) {
            this.handleRedraw();
        }
        return (
            <div className="my-5">
                <div className="title">Reddit Trends</div>
                {compoent}
            </div>
        );
    }
}

export default Trends;
