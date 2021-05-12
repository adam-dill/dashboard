import React from 'react';

const DELAY = 60000 * 1;

const HOST = 'http://cityscape.adamdill.com';
const ENDPOINT = `${HOST}/api/images?key=WNPW298-6W7M95X-JGA8XQR-XERQ9V8&group=1`;

class Background extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            backgrounds: [],
            outbound: undefined,
        }
    }

    componentDidMount() {
        // updating the image index
        setInterval(() => {
            this.setState((prev) => {
                return {currentIndex: prev.currentIndex + 1, outbound: true}
            })
        }, DELAY);
        setInterval(() => this.fetchData(), 60000*30);
        this.fetchData();
    }

    fetchData() {
        fetch(ENDPOINT)
            .then(response => response.json())
            .then(data => {
                const backgrounds = this.shuffle(data.map(value => value.image_large));
                this.setState({backgrounds, currentIndex: 0});
            });
    }

    currentImage = () => {
        const index = this.state.currentIndex % this.state.backgrounds.length;
        return this.state.backgrounds[index];
    }

    previousImage = () => {
        const index = (this.state.currentIndex-1) % this.state.backgrounds.length;
        return this.state.backgrounds[index];
    }

    shuffle = (arr) => {
        let array = JSON.parse(JSON.stringify(arr));
        let currentIndex = array.length, temporaryValue, randomIndex;
        
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
        
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        
        return array;
    }

    render() {
        if (this.state.outbound) {
            setTimeout(() => this.setState({outbound: false}), (1000*4)-10);
        }
        return (
            <div className="opacity-3 vw-100 vh-100 background-image">
                <img src={this.currentImage()} className="background-image vw-100 vh-100" />
                {this.state.outbound && <img src={this.previousImage()} className="background-image vw-100 vh-100 fade-out" />}
            </div>
        );
    }
}
 
export default Background;