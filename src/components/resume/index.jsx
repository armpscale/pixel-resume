import React from 'react'
import Spritesheet from 'react-responsive-spritesheet';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import styled, { keyframes } from 'styled-components';
import bgSpace from '../../spritesheet/background/Space.png'
import bgPanel from '../../spritesheet/background/panelTest.png'
import bgEarth from '../../spritesheet/background/earth.png'
import bgBlackHole from '../../spritesheet/background/blackhole.png'
import image from '../../spritesheet/character/ForteSpriteSheet.png'
import './style.css';

const Space = styled.div`
    background-image: url(${bgSpace});
    height: 100%;
    width: 100%;
    position: relative;
    align-items: center;
    justify-content: center;
    background-repeat: repeat;
    background-size: cover;
`;

const Panel = styled.div`
    background-image: url(${bgPanel});
    height: 100%;
    width: 100%;
    position: relative;
    align-items: center;
    justify-content: center;
    background-repeat: repeat-x;
    background-size: 13%;
`;

const Earth = styled.div`
    background-image: url(${bgEarth});
    height: 100%;
    width: 100%;
    position: relative;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-size: 10%;
`;

// Create the keyframes
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
// Here we create a component that will rotate everything we pass in over two seconds
const BlackHole = styled.div`
  background-image: url(${bgBlackHole});
  height: 250px;
  width: 250px;
  background-repeat: no-repeat;
  background-size: 100%;
  animation: ${rotate} 120s linear infinite;
`;

let keyState = {};
let x = 0;
let mouseX = 0;

class Resume extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 1,
            className: "character-right-style",
            keysChanged: false,
            mousePressed: false,
        }

        // bind function
        this.timer = this.timer.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.autoLoop = this.autoLoop.bind(this);
    }

    componentDidMount() {
        this.autoLoop();
        var intervalId = setInterval(this.timer, 4000);
        // store intervalId in the state so it can be accessed later:
        this.setState({ intervalId: intervalId });
        // window.addEventListener('touchstart', this.handleKeyDown, true);
        // window.addEventListener('touchend', this.handleKeyUp, true);
        window.addEventListener('mousedown', this.handleKeyDown, true);
        window.addEventListener('mouseup', this.handleKeyUp, true);
        window.addEventListener('keydown', this.handleKeyDown, true);
        window.addEventListener('keyup', this.handleKeyUp, true);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        // window.removeEventListener('touchstart', this.handleKeyDown, true);
        // window.removeEventListener('touchend', this.handleKeyUp, true);
        window.removeEventListener('mousedown', this.handleKeyDown, true);
        window.removeEventListener('mouseup', this.handleKeyUp, true);
        window.removeEventListener('keydown', this.handleKeyDown, true);
        window.removeEventListener('keyup', this.handleKeyUp, true);
    }

    timer() {
        // setState method is used to update the state
        console.log(x)
        if (!this.state.keysChanged) {
            this.spritesheetInstance.setStartAt(1);
            this.spritesheetInstance.setEndAt(3);
            this.spritesheetInstance.goToAndPlay(1);
        }
    }

    autoLoop() {
        if (x > 0) {
            x = 0;
            this.setState({
                className: "character-right-style",
            });
        }
        if ((keyState[37] || keyState[65]) ||
            ((window.innerWidth / 2) > mouseX) && keyState[1]) {
            x += 10;
            this.setState({
                step: 3,
                className: "character-left-style",
            });
            if (!this.state.keysChanged) {
                this.spritesheetInstance.goToAndPlay(4);
                this.spritesheetInstance.setStartAt(4);
                this.spritesheetInstance.setEndAt(6);
                this.state.keysChanged = true;
            }
        }

        if (keyState[39] || keyState[68] ||
            ((window.innerWidth / 2) <= mouseX) && keyState[1]) {
            x -= 10;
            this.setState({
                step: 3,
                className: "character-right-style",
            });
            if (!this.state.keysChanged) {
                this.spritesheetInstance.goToAndPlay(4);
                this.spritesheetInstance.setStartAt(4);
                this.spritesheetInstance.setEndAt(6);
                this.state.keysChanged = true;
            }
        }

        setTimeout(this.autoLoop, 10);
    }

    handleKeyDown(e) {
        mouseX = e.clientX
        keyState[e.keyCode || e.which] = true;
    }

    handleKeyUp(e) {
        keyState[e.keyCode || e.which] = false;
        delete this.state.keysChanged;
        delete this.state.step;

        switch (e.key) {
            case 'ArrowRight':
                // ArrowRight Button
                this.spritesheetInstance.pause();
                break;
            case 'ArrowLeft':
                // ArrowLeft Button
                this.spritesheetInstance.pause();
                break;
            default:
            // code block
        }
        switch (e.which) {
            case 1:
                // Mouse Left Click 
                this.spritesheetInstance.pause();
                break;
            default:
            // code block
        }
    }

    render() {
        return (
            <div>
                <Parallax horizontal scrolling={false} ref={ref => (this.parallax = ref)} pages={1}>

                    <ParallaxLayer
                        offset={0}
                        speed={0}
                    >
                        <Space
                            style={{ backgroundPositionX: (x / 50) + 'px' }}
                        />
                    </ParallaxLayer>
                    {/* {x < -200 && */}
                    <ParallaxLayer
                        offset={0}
                        speed={0}
                        style={{ marginTop: "5%" }}
                    >
                        <Earth
                            style={{ backgroundPositionX: (x / 45) + 'px' }}
                        />
                    </ParallaxLayer>
                    <ParallaxLayer
                        offset={0}
                        speed={0}
                    >
                        {/* <BlackHole
                            style={{ backgroundPositionX: (x / 10) + 'px' }}
                        /> */}
                    </ParallaxLayer>
                    {/* } */}
                    <ParallaxLayer
                        offset={0}
                        speed={0}
                        style={{ marginTop: "30%" }}
                    >
                        <Panel
                            style={{ backgroundPositionX: x + 'px' }}
                        />
                    </ParallaxLayer>


                </Parallax>
                <Spritesheet
                    className={this.state.className}
                    style={{ marginTop: "25%" }}
                    image={image}
                    widthFrame={70}
                    heightFrame={70}
                    steps={this.state.step}
                    fps={10}
                    autoplay={false}
                    loop={true}
                    isResponsive={true}
                    onPause={spritesheet => {
                        spritesheet.setStartAt(1);
                        spritesheet.setEndAt(3);
                        spritesheet.goToAndPlay(1);
                    }}
                    getInstance={spritesheet => {
                        this.spritesheetInstance = spritesheet;
                    }}
                />
            </div>
        )
    }
}

export default Resume;
