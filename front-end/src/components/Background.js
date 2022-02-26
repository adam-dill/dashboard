import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import Image from './Image';

const Background = (props) => {
    const { error, loading, images, delay } = props;
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

    return (
        <Image 
            source={images[index]}
            containerStyle={"background-container"}
            fadeInStyle={"fade-in-5"} />
    );
};

const mapStateToProps = state => ({
    lastUpdate: state.background.lastUpdate,
    loading: state.background.loading,
    error: state.background.error,
    images: state.background.images
});

export default connect(mapStateToProps)(Background);