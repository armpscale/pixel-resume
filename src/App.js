import React from 'react';
import {
    ParallaxProvider
} from 'react-scroll-parallax';
import './App.css';
import Resume from './components/resume';


class App extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <ParallaxProvider>
                <div className = "App" >
                    <Resume />
                </div>
            </ParallaxProvider>
        );
    }
}

export default App;