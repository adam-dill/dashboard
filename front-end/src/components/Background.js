import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Image from './Image';
import ColorThief from '/node_modules/colorthief/dist/color-thief.mjs';
import { updateColor } from '../redux/actions/backgroundAction';

const colorThief = new ColorThief();

const Background = (props) => {
    const { error, loading, images, delay, dispatch } = props;
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!images?.length) return;
            
            let num = index + 1;
            if (num >= images.length)
                num = 0;
            setIndex(num);
        }, delay ? delay : 10000);

        return () => clearInterval(interval);
    }, [images, index, delay]);

    if (loading) return null;
    if (error) {
        // TODO: send error to handler
        return null;
    }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }
    
    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
      
    const handleOnLoad = (e) => {
        const [r, g, b] = colorThief.getColor(e.target);
        const color = rgbToHex(r, g, b);
        dispatch(updateColor(color));
    };

    return (
        <Image 
            source={images[index]}
            containerStyle={"background-container"}
            fadeInStyle={"fade-in-5"}
            onLoad={handleOnLoad} />
    );
};

const mapStateToProps = state => ({
    lastUpdate: state.background.lastUpdate,
    loading: state.background.loading,
    error: state.background.error,
    images: state.background.images
});

export default connect(mapStateToProps)(Background);