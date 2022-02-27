import React from 'react';
import { connect } from "react-redux";
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

const Trends = (props) => {
    const { error, loading, lastUpdate, data } = props;

    if (loading) return null;
    if (error) {
        // TODO: send error to handler
        return null;
    }
    console.log(data);
    return (
        <div>
            <h3>Stocks Trending <span className="last-update">{lastUpdate}</span></h3>
            {data && <Bar data={data} options={options} />}
        </div>
    );
};

const mapStateToProps = state => ({
    lastUpdate: state.trends.lastUpdate,
    loading: state.trends.loading,
    error: state.trends.error,
    data: state.trends.data,
  });

export default connect(mapStateToProps)(Trends);