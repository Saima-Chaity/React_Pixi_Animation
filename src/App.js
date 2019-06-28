import React, { Component } from 'react';
import Graphics from "./Graphics";
import ParticleEmitter from './ParticleEmitter';

class App extends Component{
  constructor(props){
    super(props)

    this.state={}
  }

  render(){
    return (
      <div>
        <Graphics />
        <ParticleEmitter />
      </div>
    );
  }
}

export default App;
