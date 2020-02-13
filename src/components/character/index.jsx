import React from 'react';
import Spritesheet from 'react-responsive-spritesheet';
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';
import './style.css';
import image from '../../spritesheet/character/ForteSpriteSheet.png'

class Character extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 1,
            className: "character-right-style",
            keysPressed: {},
            keysChanged: false,
            rightX: 0,
            mousePressed: false,
            isDown: false,
        }

        // bind function
        this.toggleClass  = this.toggleClass.bind(this);
        this.onKeyDownFunction = this.onKeyDownFunction.bind(this);
        this.onKeyUpFunction = this.onKeyUpFunction.bind(this);
        this.timer = this.timer.bind(this);
    }
    componentDidMount() {
        var intervalId = setInterval(this.timer, 4000);
        // store intervalId in the state so it can be accessed later:
        this.setState({ intervalId: intervalId });
        window.addEventListener("mousedown", this.toggleClass );
        window.addEventListener("mouseup", this.toggleClass );
        document.addEventListener('keydown', this.onKeyDownFunction);
        document.addEventListener('keyup', this.onKeyUpFunction);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
        window.removeEventListener("mousedown", this.toggleClass );
        window.removeEventListener("mouseup", this.toggleClass );
        document.removeEventListener('keydown', this.onKeyDownFunction);
        document.removeEventListener('keyup', this.onKeyUpFunction);
    }

    toggleClass(event) {
        this.buttonPressTimer = setTimeout(() => {
            console.log(event)

        }, 0);
        this.setState(prevState => ({ isDown: !prevState.isDown }));
        console.log(this.state.isDown)
        
      }

    // onMouseFunction(e) {
    //     while (!this.state.mousePressed){
    //         if(e.type === 'mouseup') {
    //             this.state.mousePressed = true
    //         }
    //         document.body.style.backgroundPositionX = `${this.state.rightX}px`;
    //         if (window.innerWidth / 2 <= e.clientX) {
    //             var xPosition = e.clientX;
    //             console.log(xPosition, window.innerWidth)
    //             this.setState({
    //                 step: 3,
    //                 className: "character-right-style",
    //                 rightX: this.state.rightX - 10,
    //             });

    //         } else {
    //             var xPosition = e.clientX;
    //             console.log(xPosition, window.innerWidth)
    //             this.setState({
    //                 step: 3,
    //                 className: "character-left-style",
    //                 rightX: this.state.rightX + 10,
    //             });
    //         }
    //     }
    // }

    handleButtonPress (event) {
        this.buttonPressTimer = setTimeout(() => {
            console.log(event)

        }, 0);
        console.log(event)
    }

    handleButtonRelease (event) {
        console.log(event)
        clearTimeout(event);
    }

    onKeyDownFunction(event) {
        document.body.style.backgroundPositionX = `${this.state.rightX}px`;
        this.state.keysPressed[event.key] = true;
        console.log(this.state.rightX)
        switch (event.key) {
            case 'ArrowRight':
                // ArrowRight Button
                this.setState({
                    step: 3,
                    className: "character-right-style",
                    rightX: this.state.rightX - 10,
                });
                if (!this.state.keysChanged) {
                    this.spritesheetInstance.goToAndPlay(4);
                    this.spritesheetInstance.setStartAt(4);
                    this.spritesheetInstance.setEndAt(6);
                    this.state.keysChanged = true;
                }
                break;
            case 'ArrowLeft':
                // ArrowLeft Button
                this.setState({
                    step: 3,
                    className: "character-left-style",
                    rightX: this.state.rightX + 10,
                });
                if (!this.state.keysChanged) {
                    this.spritesheetInstance.goToAndPlay(4);
                    this.spritesheetInstance.setStartAt(4);
                    this.spritesheetInstance.setEndAt(6);
                    this.state.keysChanged = true;
                }
                break;
            default:
            // code block
        }
    }

    timer() {
        // setState method is used to update the state
        if (!this.state.keysChanged) {
            this.spritesheetInstance.setStartAt(1);
            this.spritesheetInstance.setEndAt(3);
            this.spritesheetInstance.goToAndPlay(1);
        }
    }

    onKeyUpFunction(event) {
        delete this.state.keysPressed[event.key];
        delete this.state.keysChanged;
        delete this.state.step;

        switch (event.key) {
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
    }

    render() {
        return (
            <div >
                <Spritesheet
                    className={this.state.className}
                    image={image}
                    // style={{ width: '12%', marginTop: '25%'}}
                    widthFrame={70}
                    heightFrame={70}
                    steps={this.state.step}
                    fps={10}
                    // timeout={1000}
                    autoplay={false}
                    loop={true}
                    isResponsive={true}
                    // background={BgImage}
                    // backgroundSize={`cover`}
                    // backgroundRepeat={`no-repeat`}
                    // backgroundPosition={`center center`}
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
        );
    }
}

export default Character;