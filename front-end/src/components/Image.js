import React from 'react';

const Image = ({source, delay}) => {
    return (
        <div>
            <img src={source} />
        </div>
    );
};

export default Image;