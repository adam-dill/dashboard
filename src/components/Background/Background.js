import React from 'react';
import Image1 from '../../assets/images/wallpaper/1.jpg';
import Image2 from '../../assets/images/wallpaper/2.jpg';
import Image3 from '../../assets/images/wallpaper/3.jpg';
import Image4 from '../../assets/images/wallpaper/4.jpg';
import Image5 from '../../assets/images/wallpaper/5.jpg';
import Image6 from '../../assets/images/wallpaper/6.jpg';
import Image7 from '../../assets/images/wallpaper/7.jpg';
import Image8 from '../../assets/images/wallpaper/8.jpg';
import Image9 from '../../assets/images/wallpaper/9.jpg';
import Image10 from '../../assets/images/wallpaper/10.jpg';

const DELAY = 60000 * 10;

class Background extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundImage: Image1,
            queueImage: undefined
        }
    }

    componentDidMount() {
        setInterval(this.setRandomImage.bind(this), DELAY)
    }

    setRandomImage() {
        const rand = Math.floor(Math.random() * 10) + 1;
        let image = Image1;
        switch(rand) {
            case 1: image = Image1; break;
            case 2: image = Image2; break;
            case 3: image = Image3; break;
            case 4: image = Image4; break;
            case 5: image = Image5; break;
            case 6: image = Image6; break;
            case 7: image = Image7; break;
            case 8: image = Image8; break;
            case 9: image = Image9; break;
            case 10: image = Image10; break;
        }
        this.setState({queueImage: image});
        setTimeout(() => {
            this.setState({
                backgroundImage: image,
                queueImage: undefined
            })
        }, 2000);
    }

    render() {
        const style = this.state.queueImage ? 'fade-in' : '';
        return (
            <div className="opacity-3 vw-100 vh-100 background-image">
                <img src={this.state.backgroundImage} className="background-image vw-100 vh-100" />
                <img src={this.state.queueImage} className={`background-image vw-100 vh-100 ${style}`} />
            </div>
        );
    }
}
 
export default Background;