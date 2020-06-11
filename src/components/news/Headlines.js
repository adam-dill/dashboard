import React from 'react';
import get from 'lodash-es/get';

const API_KEY = "f0665623f70548829d60df1c146c715c";
const MAX_VIEW = 5;

class Headlines extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentPosition: 0
        }
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
        setInterval(this.loadData, 60000 * 60);
    }

    loadData() {
        clearInterval(this.ticker);
        fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const articles = get(data, 'articles', [])
                    .map((value, index) => {
                        return {
                            key: index,
                            title: get(value, 'title'),
                        }
                    });
                this.setState({data: articles, currentPosition: 0});
                this.startTicker();
            });
    }

    startTicker() {
        this.ticker = setInterval(() => {
            let next = this.state.currentPosition + MAX_VIEW;
            if (next > this.state.data.length - 1) {
                next = 0;
            }
            this.setState({
                currentPosition: next
            });
        }, 60000);
    }

    render() {
        const {data, currentPosition} = this.state;
        const selectedItems = data.slice(currentPosition, currentPosition + MAX_VIEW);
        const items = selectedItems
            .map(value => {
                return (
                    <div key={value.key} className="list-group-item fw-500 fade-in">{value.title}</div>
                );
            });
        return (
            <div className="mb-3">
                <div className="title">News</div>
                <div className="list-group">{items}</div>
            </div>
            
        );
    }
}
 
export default Headlines;