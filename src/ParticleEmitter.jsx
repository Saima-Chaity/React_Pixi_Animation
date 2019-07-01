import React, { Component } from 'react';
import * as PIXI from 'pixi.js';
import * as particles from 'pixi-particles';
import SideMenu from './SideMenu';
import rainbow from "./rainbow.png";
import './App.css';

class ParticleEmitter extends Component{
  constructor(props){
    super(props)

    this.state = {
      nextAnimation : false,
      numberOfParticles : 0,
      minStartingRotation : 0,
      maxStartingRotation : 0,
      changeProperties: false,
      spawnType : '',
      spawnCircleX : '',
      spawnCircleY : '',
      spawnCircleR : '',
      spawnRectX : '',
      spawnRectY : '',
      spawnRectW : '',
      spawnRectH : '',
      ownerPosX : 0,
      ownerPosY : 0,
    }

    this.stage = new PIXI.ParticleContainer(10000, {
      scale: true,
      position: true,
      rotation: true,
      uvs: true,
      alpha: true
    });
    this.renderer = new PIXI.autoDetectRenderer({width:window.innerWidth / 1.5, height: window.innerHeight/1.8, transparent:false, antialias:true, autoResize:true, resolution:2, clearBeforeRender: true})
    this.renderer.resize(window.innerWidth / 1.5, window.innerHeight/1.8);
    this.renderer.backgroundColor = 0x000000;
    this.circle = null;
    this.texture = null;
    this.sprite = null;
    this.emitter = '';
  }

  componentDidMount(){
    this.updateContainer.appendChild(this.renderer.view);
    document.addEventListener('mousemove', this.onMouseMove)
    this.getParticles();
    this.emitter.updateOwnerPos(window.innerWidth / 3, window.innerHeight / 3.5);
  }

  changeProperties = () => {
    this.setState({changeProperties : true})
  }

  showNextAnimation = () => {
    this.setState({nextAnimation: true})
  }

  onMouseMove = (event) => {
    if((event.clientX < 850 && event.clientY < 290)){
      this.emitter.emit = true;
      this.emitter.resetPositionTracking();
      this.emitter.updateOwnerPos(event.offsetX || event.layerX, event.offsetY || event.layerY);  
    }
    else{
      this.emitter.emit = true;
      this.emitter.resetPositionTracking();
      this.emitter.updateOwnerPos(window.innerWidth / 3, window.innerHeight / 3.5);
    }
  }

  onNumberOfParticleValueChange = (val) => {
    this.setState({numberOfParticles : val})
  }

  onMinStartingRotationValue = (val) => {
    this.setState({minStartingRotation : val}); 
    this.onParticlesValueSubmit();
  }

  onMaxStartingRotationValue = (val) => {
    this.setState({maxStartingRotation : val}); 
    this.onParticlesValueSubmit();
  }

  onSpawnTypeCircleClick = (val) => {
    this.setState(
      { spawnType : val },
        () => {
          this.onParticlesValueSubmit();
        }
    );
  }

  onSpawnTypeRectClick = (val) => {
    this.setState(
      { spawnType : val },
        () => {
          this.onParticlesValueSubmit();
        }
    );
  }

  onSpawnCircleXValueChange = (val) => {
    this.setState(
      { spawnCircleX : val },
        () => {
          this.onParticlesValueSubmit();
        }
    );
  }

  onSpawnCircleYValueChange = (val) => {
    this.setState(
      { spawnCircleY : val },
        () => {
          this.onParticlesValueSubmit();
        }
    );
  }

  onSpawnCircleRValueChange = (val) => {
    this.setState(
      { spawnCircleR : val },
        () => {
          this.onParticlesValueSubmit();
        }
    );
  }

  onSpawnRectXValueChange = (val) => {
    this.setState(
      { spawnRectX : val },
        () => {
          this.onParticlesValueSubmit();
        }
    );
  }

  onSpawnRectYValueChange = (val) => {
    this.setState(
      { spawnRectY : val },
        () => {
          this.onParticlesValueSubmit();
        }
    );
  }

  onSpawnRectWValueChange = (val) => {
    this.setState(
      { spawnRectW : val },
        () => {
          this.onParticlesValueSubmit();
        }
    );
  }

  onSpawnRectHValueChange = (val) => {
    this.setState(
      { spawnRectH : val },
        () => {
          this.onParticlesValueSubmit();
        }
    );
  }

  onParticlesValueSubmit = () => {
    this.emitter.cleanup();
    this.emitter.emit = false;
    this.getParticles();
  }

  getParticles = ()=>{
    this.emitter = new particles.Emitter(
      this.stage,
      [PIXI.Texture.from(rainbow)],
      {
        alpha: {
          list: [
            {
              value: 0.8,
              time: 0
            },
            {
              value: 1,
              time: 1
            }
          ],
          isStepped: false
        },
        scale: {
          list: [
            {
              value: 0.09,
              time: 0
            },
            {
              value: 0.01,
              time: 1
            }
          ],
          isStepped: false
        },
        color: {
          list: [
            {
              value: "e9eb2e",
              time: 0
            },
            {
              value: "e9eb2e",
              time: 1
            }
          ],
          isStepped: false
        },
        speed: {
          list: [
            {
              value: 200,
              time: 0
            },
            {
              value: 100,
              time: 1
            }
          ],
          isStepped: false
        },
        startRotation: {
          min: parseInt(`${this.state.minStartingRotation > 0 ? this.state.minStartingRotation : 0}`),
          max: parseInt(`${this.state.maxStartingRotation > 0 ? this.state.maxStartingRotation : 360}`)
        },
        rotationSpeed: {
          min: 0,
          max: 0
        },
        lifetime: {
          min: 0.2,
          max: 0.8
        },
        blendMode: "normal",
        frequency: 0.001,
        particlesPerWave: 1,
        emitterLifetime: -1,
        maxParticles: parseInt(`${this.state.numberOfParticles > 0 ? this.state.numberOfParticles : 500}`),
        pos: {
          x: 0,
          y: 0
        },
        ownerPos:{
          x: parseInt(`${this.state.ownerPosX ? this.state.ownerPosX : 400}`),
          y: parseInt(`${this.state.ownerPosY ? this.state.ownerPosY : 150}`)
        },
        addAtBack: false,
        spawnType: `${this.state.spawnType != '' ? this.state.spawnType : "circle"}`,
        spawnCircle: {
          x: parseInt(`${this.state.spawnCircleX ? this.state.spawnCircleX : 0}`),
          y: parseInt(`${this.state.spawnCircleY ? this.state.spawnCircleY : 0}`),
          r: parseInt(`${this.state.spawnCircleR > 0 ? this.state.spawnCircleR : 5}`),
        },
        spawnRect: {
          x: parseInt(`${this.state.spawnRectX ? this.state.spawnRectX : 0}`),
          y: parseInt(`${this.state.spawnRectY ? this.state.spawnRectY : 0}`),
          w: parseInt(`${this.state.spawnRectW ? this.state.spawnRectW : 5}`),
          h: parseInt(`${this.state.spawnRectH ? this.state.spawnRectH : 10}`),
        }
      }
  );

  this.emitter.updateOwnerPos(window.innerWidth / 3, window.innerHeight / 3);

  var elapsed = Date.now();    
  var updateFrame = () => {
   
    requestAnimationFrame(updateFrame);
    var now = Date.now();
    var delta = (now - elapsed) * 0.001;
    this.emitter.update(delta);
    elapsed = now;
    this.emitter.playOnceAndDestroy();
    this.renderer.render(this.stage); 
  };
  this.emitter.cleanup();
  this.emitter.emit = true;
  updateFrame();
  }

  render(){
    return (   
      <div className="wrapper">
        {this.state.nextAnimation == false ?
        <div>
          <div ref={(c) => this.updateContainer = c}></div>
          <button className="properties" onClick = {this.changeProperties}>Properties</button>
        </div>
        : ''}   
        <div className="SideBar">
          {this.state.changeProperties ?
          <SideMenu 
            numberOfParticles = {this.state.numberOfParticles}
            updateRange = {this.updateRange}
            onNumberOfParticleValueChange = {this.onNumberOfParticleValueChange}
            onParticlesValueSubmit = {this.onParticlesValueSubmit}

            onMinStartingRotationValue = {this.onMinStartingRotationValue}
            onMaxStartingRotationValue = {this.onMaxStartingRotationValue}
            minStartingRotation = {this.state.minStartingRotation}
            maxStartingRotation = {this.state.maxStartingRotation}

            onSpawnTypeCircleClick = {this.onSpawnTypeCircleClick}
            onSpawnTypeRectClick = {this.onSpawnTypeRectClick}
            spawnType = {this.state.spawnType}

            onSpawnCircleXValueChange = {this.onSpawnCircleXValueChange}
            onSpawnCircleYValueChange = {this.onSpawnCircleYValueChange}
            onSpawnCircleRValueChange = {this.onSpawnCircleRValueChange}

            spawnCircleX = {this.state.spawnCircleX}
            spawnCircleY = {this.state.spawnCircleY}
            spawnCircleR = {this.state.spawnCircleR}

            onSpawnRectXValueChange = {this.onSpawnRectXValueChange}
            onSpawnRectYValueChange = {this.onSpawnRectYValueChange}
            onSpawnRectWValueChange = {this.onSpawnRectWValueChange}
            onSpawnRectHValueChange = {this.onSpawnRectHValueChange}

            spawnRectX = {this.state.spawnRectX}
            spawnRectY = {this.state.spawnRectY}
            spawnRectW = {this.state.spawnRectW}
            spawnRectH = {this.state.spawnRectH}
            /> : ''}
          </div>
      </div>
    );
  }
}

export default ParticleEmitter;
