import React, { Component } from 'react';
import ParticleEmitter from './ParticleEmitter';

class App extends Component{
  constructor(props){
    super(props)

    this.state={}
  }

  render(){
    return (
      <div>
        <ParticleEmitter />
      </div>
    );
  }
}

export default App;
