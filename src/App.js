import React from 'react';
import './App.css';
import Character from './components/character';

class App extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="App">
        <Character />
      </div>
    );
  }
}

export default App;
