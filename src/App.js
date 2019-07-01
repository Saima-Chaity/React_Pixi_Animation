import React, { Component } from 'react';
import Explosion from "./Explosion";

class App extends Component{
  constructor(props){
    super(props)

    this.state={}
  }

  render(){
    return (
      <div>
        <Explosion />
      </div>
    );
  }
}

export default App;
