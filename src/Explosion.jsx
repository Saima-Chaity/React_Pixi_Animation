/* eslint-disable no-unused-expressions */

import React, { Component } from 'react';
import * as PIXI from 'pixi.js';
import * as particles from 'pixi-particles';
import Graphics from "./Graphics";
import circle_yellow from "./circle.png";
import { TweenMax } from "gsap/TweenMax";

class Explosion extends Component{
  constructor(props){
    super(props)

    this.state = {
      nextAnimation : false,
      numberOfParticles : 0,
      minStartingRotation : 0,
      maxStartingRotation : 0,
      changeProperties: false,
    }
  }

  componentDidMount(){
    this.stage = new PIXI.Container();
    this.renderer = new PIXI.autoDetectRenderer({transparent:false, antialias:true, autoResize:true})
    this.renderer.resize(window.innerWidth/1.5, window.innerHeight/1.8);
    this.renderer.backgroundColor = 0x000000;
    this.updateContainer.appendChild(this.renderer.view);
    this.drawStar();
  }

  showNextAnimation = () => {
    this.setState({nextAnimation: true})
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

    var animate = () => {
      requestAnimationFrame(animate);
      this.sprite.rotation -=0.05;
      this.renderer.render(this.stage);
    }
    animate();
    this.getStars();
  };

  getStars = () => {
    this.getStar('0000ff')
    var values = [{x:200,y:110}, {x:400,y:180}]
    this.generateSprite("-350", "-200", values);
    setTimeout(() => {
      this.getStar('008000')
      var values = [{x:0,y:300},{x:400,y:180}]
      this.generateSprite("-250", "1500", values);
    }, 5)
    setTimeout(() => {
      this.getStar('FF0000')
      var values = [{x:1350,y:-550},{x:400,y:180}]
      this.generateSprite("1250", "-500", values);
    }, 10)
    setTimeout(() => {
      this.getStar('ffff00')
      var values = [{x:950,y:550},{x:400,y:180}]
      this.generateSprite("1250", "1000", values);
    }, 15)
    setTimeout(() => {
      this.getParticles();
    }, 5)
  }

  getStar = (color) => {
    this.star = new PIXI.Graphics();
    this.star.beginFill('0X' + color);
    this.star.drawStar(20, 20, 10, 20, 5, 3);
    this.star.endFill();
  }

  generateSprite = (X, Y, values) => {
    this.texture = this.renderer.generateTexture(this.star)
    this.starSprite = new PIXI.Sprite(this.texture);
    this.starSprite.alpha = 1;
    this.starSprite.scale.x = 0.9;
    this.starSprite.scale.y = 0.9;
    this.starSprite.anchor.set(0.5);
    this.starSprite.position.x = this.renderer.width / 2;
    this.starSprite.position.y = this.renderer.height / 2;
    this.getTween(X, Y, values);
    this.stage.addChild(this.starSprite);
    this.renderer.render(this.stage);
  }

  getTween = (X, Y, values) => {
    TweenMax.fromTo(this.starSprite, 2, {
      angle: 360,
      repeat: 1,
      startAt:{angle:0},
      x: X,
      y: Y,
    },
    {
      angle: 0,
      bezier:
     {
      values:values,
     }
    });
  }

  getParticles = ()=>{
    this.emitter = new particles.Emitter(
      this.stage,
      [PIXI.Texture.from(circle_yellow)],
      {
        alpha: {
          list: [
            {
              value: 0.8,
              time: 0
            },
            {
              value: 0,
              time: 1
            }
          ],
          isStepped: false
        },
        scale: {
          list: [
            {
              value: 0.099,
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
          min: 90,
          max: 70
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
        emitterLifetime: 2.8,
        maxParticles: 300,
        pos: {
          x: 0,
          y: 0
        },
        ownerPos:{
          x: this.renderer.width / 2,
          y: this.renderer.height / 2
        },
        addAtBack: false,
        spawnType: "circle",
        spawnCircle: {
          x: 0,
          y: 0,
          r: 3,
        },
      }
  );

  this.emitter.updateOwnerPos(this.renderer.width / 1.2, this.renderer.height / 1.1);
  var elapsed = Date.now();    
  var updateFrame = () => {
    requestAnimationFrame(updateFrame);
    var now = Date.now();
    var delta = (now - elapsed) * 0.001;
    this.emitter.update(delta);
    elapsed = now;
    if(this.emitter.spawnPos.x > -305){
      this.emitter.spawnPos.x -= 2;
      this.emitter.spawnPos.y -= 1;
    }
    this.renderer.render(this.stage); 
  };
  this.emitter.cleanup();
  this.emitter.emit = true;
  updateFrame();

  this.emitter.playOnce(() => {
    this.stage.removeChildAt(3),
    this.stage.removeChildAt(2),
    this.stage.removeChildAt(1),
    this.stage.removeChildAt(0),
    this.explode("FFD027", this.renderer.width / 2, this.renderer.height / 2)

    setTimeout(() =>{
      this.counter +=1;
      this.explode("268AFF", this.renderer.width / 2 - 30, this.renderer.height / 2);
    }, 600)

    setTimeout(() =>{
      this.counter +=1;
      this.explode("c42af0", this.renderer.width / 2 - 70, this.renderer.height / 2);
    }, 900)
  
    setTimeout(() =>{
      this.counter +=1;
      this.explode("7828FD", this.renderer.width / 2 + 70, this.renderer.height / 2);
    }, 1200)
    })
  }

  explode = (color, x, y) => {
    this.emitter = new particles.Emitter(
      this.stage,
      [PIXI.Texture.from(circle_yellow)],
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
          "max": 1
        },
        "blendMode": "normal",
        "particlesPerWave" : 10,
        "frequency": 0.001,
        "emitterLifetime": 0.01,
        "maxParticles": 100,
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
  }

  render(){
    return (
      <div>
        {this.state.nextAnimation == false ?
        <div>
          <div ref={(c) => this.updateContainer = c}></div>
          <button className="next" onClick={this.showNextAnimation}>Next</button>  
        </div>
        : <Graphics/>}
      </div>
    );
  }
}

export default Explosion;
