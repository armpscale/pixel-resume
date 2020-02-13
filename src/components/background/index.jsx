import React from 'react';
// import './style.css';
import styled from 'styled-components';
import earth from '../../spritesheet/background/earth.png'

class Background extends React.Component {
    constructor() {
        super();
        this.state = {

        }

        // bind function
    }


    render() {

        return (
            <div>
                <ParallaxLayer
                    offset={1}
                    speed={0.1}
                    onClick={() => this.parallax.scrollTo(2)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* <img src={url('bash')} style={{ width: '40%' }} /> */}
                </ParallaxLayer>

                <ParallaxLayer
                    offset={2}
                    speed={-0}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => this.parallax.scrollTo(0)}
                >
                    <img src={url('clients-main')} style={{ width: '40%' }} />
                </ParallaxLayer>
            </div>
        );
    }
}

export default Background;