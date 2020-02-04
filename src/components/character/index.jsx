import React from 'react';
import Spritesheet from 'react-responsive-spritesheet';
import './style.css';
import image from '../../spritesheet/character/ForteSpriteSheet.png'

class Character extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 1,
            className: "forte-right-style",
            keysPressed: {},
            keysChanged: false,
        }

        // bind function
        this.onKeyDownFunction = this.onKeyDownFunction.bind(this);
        this.onKeyUpFunction = this.onKeyUpFunction.bind(this);
        this.timer = this.timer.bind(this);
    }
    componentDidMount() {
        var intervalId = setInterval(this.timer, 4000);
        // store intervalId in the state so it can be accessed later:
        this.setState({ intervalId: intervalId });

        document.addEventListener('keydown', this.onKeyDownFunction);
        document.addEventListener('keyup', this.onKeyUpFunction);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
        document.addEventListener('keydown', this.onKeyDownFunction, false);
        document.addEventListener('keyup', this.onKeyUpFunction, false);
    }

    onKeyDownFunction(event) {
        this.state.keysPressed[event.key] = true;

        switch (event.key) {
            case 'ArrowRight':
                // ArrowRight Button
                this.setState({
                    step: 3,
                    className: "forte-right-style",
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
                    className: "forte-left-style",
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

        this.state.keysPressed[event.key] = true;

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

    myFunctionPlay() {
        this.spritesheetInstance.play();
    }

    myFunctionPause() {
        this.spritesheetInstance.pause();
    }

    myFunctionGetFrame() {
        alert(this.spritesheetInstance.getInfo('frame'));
    }

    myFunctionToggleDirection() {
        if (this.spritesheetInstance.getInfo('direction') === 'forward') {
            this.spritesheetInstance.setDirection('rewind');
        } else if (this.spritesheetInstance.getInfo('direction') === 'rewind') {
            this.spritesheetInstance.setDirection('forward');
        }
    }

    render() {
        return (
            <div>
                <Spritesheet
                    className={this.state.className}
                    image={image}
                    style={{ width: '12%', marginTop: '25%'}}
                    widthFrame={70}
                    heightFrame={70}
                    steps={this.state.step}
                    fps={10}
                    // timeout={1000}
                    autoplay={false}
                    loop={true}
                    isResponsive={true}
                    // backgroundSize={`cover`}
                    // backgroundRepeat={`no-repeat`}
                    // backgroundPosition={`center center`}
                    onPause={spritesheet => {
                        spritesheet.setStartAt(1);
                        spritesheet.setEndAt(3);
                        spritesheet.goToAndPlay(1);
                        console.log(spritesheet.getInfo('frame'))
                    }}
                    getInstance={spritesheet => {
                        this.spritesheetInstance = spritesheet;
                    }}
                />
                {/* <div>
                    <button onClick={this.myFunctionPlay.bind(this)}>play</button>
                    <button onClick={this.myFunctionPause.bind(this)}>pause</button>
                    <button onClick={this.myFunctionGetFrame.bind(this)}>alert current frame</button>
                    <button onClick={this.myFunctionToggleDirection.bind(this)}>toggle direction</button>
                </div> */}
            </div>
        );
    }
}

export default Character;