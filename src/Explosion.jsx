import React, { Component } from 'react';
import * as PIXI from 'pixi.js';
import * as particles from 'pixi-particles';
import sparkle from "./sparkle.png";
import sparkleInBlue from "./sparkleInBlue.png";
import { TweenMax, Linear } from 'gsap';

class Explosion extends Component{
  constructor(props){
    super(props)

    this.state = {
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
    }

    this.stage = new PIXI.Container();
    this.renderer = new PIXI.autoDetectRenderer({transparent:false, antialias:true, autoResize:true})
    this.renderer.resize(window.innerWidth/1.5, window.innerHeight/1.8);
    this.renderer.backgroundColor = 0x000000;
    this.star = null;
    this.texture = null;
    this.sprite = null;
    this.exploded = false;
    this.counter = 0;
    this.interval = '';
  }

  componentDidMount(){
    this.updateContainer.appendChild(this.renderer.view);
    // document.addEventListener('mousedown', this.onMouseDown)
    this.drawStar();
  }

  onMouseDown = (event) => {
    this.emitter.emit = true;
    this.emitter.resetPositionTracking();
    this.emitter.updateOwnerPos(event.layerX || event.offsetX, event.layerY || event.offsetY);  
  }

  drawStar = ()=>{
    this.star = new PIXI.Graphics();
    this.star.beginFill(0x3134A1);
    this.star.drawStar(50, 50, 10, 50, 18, 5);
    this.star.endFill();

    this.texture = new PIXI.RenderTexture.create(this.star.width, this.star.height);
    this.renderer.render(this.star, this.texture);

    this.sprite = new PIXI.Sprite(this.texture);
    this.sprite.position.x = 700;
    this.sprite.position.y = 390;
    this.sprite.position.x = this.renderer.width / 2;
    this.sprite.position.y = this.renderer.height / 2;
    this.sprite.scale.set(0.5);

    this.stage.addChild(this.sprite);
    this.renderer.render(this.stage);

    TweenMax.fromTo(this.sprite, 3,{
      angle: 360,
      rotation: 360,
      repeat: -1,
      yoyo: true,
      x: this.renderer.width / 2,
      ease: Linear.easeInOut
    },
    {
      x:-700,
      rotation: 360,
      repeat: -1,
      yoyo: true,
      ease: Linear.easeInOut
    }
    )

    var animate = () => {
      requestAnimationFrame(animate);
      this.sprite.position.x -=0.9;
      this.sprite.position.y -= 0.9;
      if(this.sprite.position.x < 480 && this.exploded == false ){
        this.exploded = true;
        this.sprite.visible = false;
        this.stage.removeChild(this.sprite);
        this.explode();
      }
      this.renderer.render(this.stage);
    }
    animate();
  };

  explode = () => {
    this.emitter = new particles.Emitter(
      this.stage,
      [PIXI.Texture.from(sparkle)],
      {
        "alpha": {
          "start": 1,
          "end": 0.7
        },
        "scale": {
          "start": 0.29,
          "end": 0.01
        },
        "color": {
          "start": "FFD027",
          "end": "FFD027"
        },
        "speed": {
          "start": 500,
          "end": 0
        },
        "startRotation": {
          "min": 0,
          "max": 360
        },
        "rotationSpeed": {
          "min": 0,
          "max": 200
        },
        "lifetime": {
          "min": 0.5,
          "max": 1
        },
        "blendMode": "normal",
        "ease": [
          {
            "s": 0,
            "cp": 0.329,
            "e": 0.548
          },
          {
            "s": 0.548,
            "cp": 0.767,
            "e": 0.876
          },
          {
            "s": 0.876,
            "cp": 0.985,
            "e": 1
          }
        ],
        "particlesPerWave" : 10,
        "frequency": 0.001,
        "emitterLifetime": 0.01,
        "maxParticles": 10,
        "pos": {
          "x": 0,
          "y": 0
        },
        "addAtBack": true,
        "spawnType": "circle",
        "spawnCircle": {
          x: 0,
          y: 0, 
          r: 10
        }
      }
  );

  this.emitter.updateOwnerPos(this.renderer.width / 2, this.renderer.height / 2);
  var elapsed = Date.now();    
  var updateFrame = () => {
    requestAnimationFrame(updateFrame);
    var now = Date.now();
    var delta = (now - elapsed) * 0.001;
    this.emitter.update(delta);
    elapsed = now;
    this.renderer.render(this.stage); 
  };
  updateFrame();
  this.emitter.emit = true;

  setTimeout(() =>{
    this.counter +=1;
    this.explode2("FFD027", this.renderer.width / 2 - 30, this.renderer.height / 2);
  }, 600)

  setTimeout(() =>{
    this.counter +=1;
    this.explode2("162C9A", this.renderer.width / 2 - 70, this.renderer.height / 2);
  }, 900)

  setTimeout(() =>{
    this.counter +=1;
    this.explode2("C90000", this.renderer.width / 2 + 70, this.renderer.height / 2);
  }, 1200)
}

  explode2 = (color, x, y) => {
    this.counter += 1
    this.emitter = new particles.Emitter(
      this.stage,
      [PIXI.Texture.from(sparkleInBlue)],
      {
        "alpha": {
          "start": 1,
          "end": 0.1
        },
        "scale": {
          "start": 0.1,
          "end": 0.01
        },
        "color": {
          "start": color,
          "end": color
        },
        "speed": {
          "start": 500,
          "end": 0
        },
        "startRotation": {
          "min": 0,
          "max": 360
        },
        "rotationSpeed": {
          "min": 0,
          "max": 200
        },
        "lifetime": {
          "min": 0.5,
          "max": 0.5
        },
        "blendMode": "normal",
        "particlesPerWave" : 10,
        "frequency": 0.001,
        "emitterLifetime": 0.1,
        "maxParticles": 10,
        "pos": {
          "x": 0,
          "y": 0
        },
        "addAtBack": true,
        "spawnType": "circle",
        "spawnCircle": {
          x: 0,
          y: 0, 
          r: 15
        }
      }
  );

  this.emitter.updateOwnerPos(x, y);
  var elapsed = Date.now();    
  var updateFrame = () => {
    requestAnimationFrame(updateFrame);
    var now = Date.now();
    var delta = (now - elapsed) * 0.001;
    this.emitter.update(delta);
    elapsed = now;
    this.renderer.render(this.stage); 
  };
  updateFrame();
  this.emitter.emit = true;
  };

  render(){
    return (
      <div ref={(c) => this.updateContainer = c}></div>
    );
  }
}

export default Explosion;
