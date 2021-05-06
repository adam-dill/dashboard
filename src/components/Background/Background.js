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
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState((prev) => {
                return {currentIndex: prev.currentIndex + 1}
            })
        }, DELAY);
        setInterval(() => this.hardReset(), 60000*30);
        fetch(ENDPOINT)
            .then(response => response.json())
            .then(data => {
                const backgrounds = this.shuffle(data.map(value => value.image_large));
                this.setState({backgrounds});
            });
    }

    hardReset = () => {
        const backgrounds = this.shuffle(this.state.backgrounds);
        this.setState({currentIndex: 0, backgrounds});
    }

    currentImage = () => {
        const index = this.state.currentIndex % this.state.backgrounds.length;
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
        return (
            <div className="opacity-3 vw-100 vh-100 background-image">
                <img src={this.currentImage()} className="background-image vw-100 vh-100" />
            </div>
        );
    }
}
 
export default Background;