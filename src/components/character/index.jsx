import React from 'react';
import Spritesheet from 'react-responsive-spritesheet';
import './style.css';
import image from '../../spritesheet/character/ForteSpriteSheet.png'

class Character extends React.Component {
    constructor() {
        super();
        this.escFunction = this.escFunction.bind(this);
    }
    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    escFunction(event) {
        console.log(event.keyCode)
        if (event.keyCode === 27) {
            this.spritesheeInstance.play();
        }
    }

    myFunctionPlay() {
        this.spritesheeInstance.play();
    }

    myFunctionPause() {
        this.spritesheeInstance.pause();
    }

    myFunctionGetFrame() {
        alert(this.spritesheeInstance.getInfo('frame'));
    }

    myFunctionToggleDirection() {
        if (this.spritesheeInstance.getInfo('direction') === 'forward') {
            this.spritesheeInstance.setDirection('rewind');
        } else if (this.spritesheeInstance.getInfo('direction') === 'rewind') {
            this.spritesheeInstance.setDirection('forward');
        }
    }

    render() {
        return (
            <div onKeyDown={this._handleKeyDown}>
                <Spritesheet
                    className={`my-element__class--style`}
                    // image={`https://raw.githubusercontent.com/danilosetra/react-responsive-spritesheet/master/assets/images/examples/sprite-image-horizontal.png`}
                    image={image}
                    widthFrame={70}
                    heightFrame={140}
                    steps={3}
                    fps={10}
                    // timeout={1000}
                    autoplay={false}
                    loop={true}
                    isResponsive={true}
                    background={`https://raw.githubusercontent.com/danilosetra/react-responsive-spritesheet/master/assets/images/examples/sprite-image-background.png`}
                    backgroundSize={`cover`}
                    backgroundRepeat={`no-repeat`}
                    backgroundPosition={`center center`}
                    getInstance={spritesheet => {
                        this.spritesheeInstance = spritesheet;
                    }}
                    onEachFrame={spritesheet => {
                        if (spritesheet.getInfo('frame') == 1){
                            spritesheet.pause()
                            setTimeout(() => {
                                spritesheet.play()
                              }, 3000);
                        }
                      }}
                />
                <div>
                    <button onClick={this.myFunctionPlay.bind(this)}>play</button>
                    <button onClick={this.myFunctionPause.bind(this)}>pause</button>
                    <button onClick={this.myFunctionGetFrame.bind(this)}>alert current frame</button>
                    <button onClick={this.myFunctionToggleDirection.bind(this)}>toggle direction</button>
                </div>
            </div>
        );
    }
}

export default Character;