import React from 'react';
import Spritesheet from 'react-responsive-spritesheet';
import './style.css';

class CanvasChart extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Spritesheet
                className={`my-element__class--style`}
                image={`https://raw.githubusercontent.com/danilosetra/react-responsive-spritesheet/master/assets/images/examples/sprite-image-horizontal.png`}
                widthFrame={420}
                heightFrame={500}
                steps={14}
                fps={10}
                autoplay={true}
                loop={true}
                background={`https://raw.githubusercontent.com/danilosetra/react-responsive-spritesheet/master/assets/images/examples/sprite-image-background.png`}
                backgroundSize={`cover`}
                backgroundRepeat={`no-repeat`}
                backgroundPosition={`center center`}
            />
        );
    }
}

export default CanvasChart;