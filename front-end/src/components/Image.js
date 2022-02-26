import React, {useState, useEffect} from 'react';

const FADE_DURATION = 5000;

const Image = ({source, style, containerStyle, fadeInStyle}) => {
    const [currentImage, setCurrentImage] = useState();
    const [incomingImage, setIncomingImage] = useState();


    useEffect(() => {
        setIncomingImage(source);
    }, [source]);

    useEffect(() => {
        if (incomingImage === undefined) return;

        const timeout = setTimeout(() => {
            setCurrentImage(incomingImage);
            setIncomingImage(undefined);
        }, FADE_DURATION);

        return () => clearTimeout(timeout);
    }, [incomingImage]);

    

    return (
        <div className={containerStyle}>
            {incomingImage && <img src={incomingImage} className={`position-absolute ${fadeInStyle} ${style}`} />}
            {currentImage && <img src={currentImage} className={`${style}`} />}
        </div>
    );
};

export default Image;