import React, { Component } from 'react';
import * as PIXI from 'pixi.js';
import * as particles from 'pixi-particles';
import ParticleEmitter from './ParticleEmitter';
import { TweenMax } from "gsap/TweenMax";

class Graphics extends Component{
  constructor(props){
    super(props)

    this.state = {
      nextAnimation : false,
    }

    this.stage = new PIXI.Container();
    this.renderer = new PIXI.autoDetectRenderer({transparent:false, antialias:true, autoResize:true})
    this.renderer.resize(window.innerWidth/1.5, window.innerHeight/1.8);
    this.renderer.backgroundColor = 0x000000;
    this.popCounter = 0;
    this.colors = ['26a3ff', '13ce66', 'ff49db', 'af8dd1', '9162bf', 'ff7849', 'ffc82c']
  }

  componentDidMount(){
    this.updateContainer.appendChild(this.renderer.view);

    this.getAllTheShapes(this.circle = "circle");
    setTimeout(()=>{
      this.getAllTheShapes(this.rect = "rect");
    }, 2000)
    setTimeout(()=>{
      this.getAllTheShapes(this.star = "star");
    }, 4000)
  }

  showNextAnimation = () => {
    this.setState({nextAnimation: true})
  }

  getAllTheShapes = (value)=>{
    var arrayOfShapes = [];
    var containerPadding = 150;
    var spriteBounds = new PIXI.Rectangle(-containerPadding + 30,
                                    -containerPadding,
                                    window.innerWidth/1.5,
                                    window.innerHeight/1.8);

    var colors = ['26a3ff', '13ce66', 'ff49db', 'af8dd1', '9162bf', 'ff7849', 'ffc82c']
    for(var i=0; i<50; i++) {
      if(value == "circle"){
        this.circle = new PIXI.Graphics();
        this.circle.beginFill('0x'+colors[Math.floor(Math.random() * colors.length)]);
        this.circle.drawCircle(8, 8, 8);
        this.circle.endFill();
        this.texture = new PIXI.RenderTexture.create(this.circle.width, this.circle.height);
        this.renderer.render(this.circle, this.texture);
      }
      else if(value == "rect"){
        this.rect = new PIXI.Graphics();
        this.rect.beginFill('0x'+colors[Math.floor(Math.random() * colors.length)]);
        this.rect.drawRect(8, 8, 20, 22);
        this.rect.endFill();
        this.texture = new PIXI.RenderTexture.create(this.rect.width, this.rect.height);
        this.renderer.render(this.rect, this.texture);
      }
      else{
        this.star = new PIXI.Graphics();
        this.star.beginFill('0x'+colors[Math.floor(Math.random() * colors.length)]);
        this.star.drawStar(8, 8, 5, 12, 3, 3);
        this.star.endFill();
        this.texture = new PIXI.RenderTexture.create(this.star.width, this.star.height);
        this.renderer.render(this.star, this.texture);
      }

      this.sprite = new PIXI.Sprite(this.texture);
      this.sprite.anchor.set(0.5);
      this.sprite.scale.set(0.8 + Math.random() * 0.3);
      this.sprite.direction = Math.random() * Math.PI * 2;
      this.sprite.turningSpeed = Math.random() + 0.8;
      this.sprite.speed = 0.3 + Math.random() * 1;
      this.sprite.blendMode = PIXI.BLEND_MODES.LUMINOSITY;
      this.sprite.position.x = Math.random() * this.renderer.width / 2;
      this.sprite.position.y = Math.random() * this.renderer.height / 2;
      this.sprite.buttonMode = true;
      this.sprite.interactive = true;

      this.stage.addChild(this.sprite);
      arrayOfShapes.push(this.sprite);
    }

    var tick = 0;
    var animate = () => {
    for (var i = 0; i < arrayOfShapes.length; i++)
    {
      arrayOfShapes[i].direction += arrayOfShapes[i].turningSpeed * 0.01;
      arrayOfShapes[i].position.x += Math.sin(arrayOfShapes[i].direction) * arrayOfShapes[i].speed + Math.random(30, 40);
      arrayOfShapes[i].position.y += Math.cos(arrayOfShapes[i].direction) * arrayOfShapes[i].speed + Math.random(30, 40);
      arrayOfShapes[i].rotation = arrayOfShapes[i].direction + Math.PI / 2;

      if (arrayOfShapes[i].position.x < spriteBounds.x && arrayOfShapes[i].position.x > 0)
      {
        arrayOfShapes[i].position.x += spriteBounds.width - Math.random(30, 40);
      }
      else if(arrayOfShapes[i].position.x > spriteBounds.width - 20)
      {
        arrayOfShapes[i].position.x -= spriteBounds.width + Math.random(30, 40)
      }
      else if(arrayOfShapes[i].position.x < 0){
        arrayOfShapes[i].position.x +=  Math.random(20, 30) * this.renderer.width/1.5;
      }

      if(arrayOfShapes[i].position.y < spriteBounds.y && arrayOfShapes[i].position.y > 0)
      {
        arrayOfShapes[i].position.y += spriteBounds.height - Math.random(30, 40)
      }
      else if(arrayOfShapes[i].position.y > spriteBounds.height)
      {
        arrayOfShapes[i].position.y -= spriteBounds.height + Math.random(30, 40)
      }
      else if(arrayOfShapes[i].position.y < 0){
        arrayOfShapes[i].position.y +=  Math.random(20, 30) * this.renderer.height;
      }
    }

    tick += 0.1;
    this.renderer.render(this.stage);
    requestAnimationFrame(animate);
  }
  animate();
  };

  render(){
    return (
      <div>
        {this.state.nextAnimation == false ?
        <div>
          <div ref={(c) => this.updateContainer = c}></div>
          <button className="next" onClick={this.showNextAnimation}>Next</button>  
        </div>
        : <ParticleEmitter/>}
      </div>
    );
  }
}

export default Graphics;
