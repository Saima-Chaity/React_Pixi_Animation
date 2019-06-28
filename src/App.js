import React, { Component } from 'react';
import Graphics from "./Graphics";
import ParticleEmitter from './ParticleEmitter';
import Explosion from './Explosion';

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
        <Explosion />
      </div>
    );
  }
}

export default App;
