import React from 'react';

const Triangle = props => {
    return (
        <div
            style={{
                content: '' /* triangle */,
                position: 'absolute',
                bottom: '-12px' /* value = - border-top-width - border-bottom-width */,
                left: `${props.alignTriangle}` /* controls horizontal position */,
                borderWidth:
                    '15px 15px 0' /* vary these values to change the angle of the vertex */,
                borderStyle: 'solid',
                borderColor: `${props.color} transparent`
            }}
        />
    );
};

export default Triangle;