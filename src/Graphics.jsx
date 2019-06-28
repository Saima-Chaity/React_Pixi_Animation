import React, { Component } from 'react';
import * as PIXI from 'pixi.js';
import * as particles from 'pixi-particles';

class Graphics extends Component{
  constructor(props){
    super(props)

    this.stage = new PIXI.Container();
    this.renderer = new PIXI.autoDetectRenderer({transparent:false, antialias:true, autoResize:true})
    this.renderer.resize(window.innerWidth/1.5, window.innerHeight/1.8);
    this.renderer.backgroundColor = 0x000000;
    this.circle = null;
    this.rect = null;
    this.star = null;
    this.texture = null;
    this.sprite = null;
    this.spriteRect = null;
    this.circleArray = [];
    this.shapeArray = [];
    this.colors = ['26a3ff', '13ce66', 'ff49db', 'af8dd1', '9162bf', 'ff7849', 'ffc82c']
  }

  componentDidMount(){
    this.updateContainer.appendChild(this.renderer.view);
    this.getAllTheShapes(this.circle = "circle");
    setTimeout(()=>{
      this.getAllTheShapes(this.rect = "rect");
    }, 5000)
    setTimeout(()=>{
      this.getAllTheShapes(this.star = "star");
    }, 10000)
  }

  getAllTheShapes = (value)=>{
    var circleArray = [];
    var containerPadding = 150;
    var spriteBounds = new PIXI.Rectangle(-containerPadding + 30,
                                    -containerPadding,
                                    window.innerWidth/1.5,
                                    window.innerHeight/1.8);

    var colors = ['26a3ff', '13ce66', 'ff49db', 'af8dd1', '9162bf', 'ff7849', 'ffc82c']
    for(var i=0; i<60; i++) {
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

      // this.sprite.on("mouseover", () =>{
      //   console.log("moved")
      //   this.sprite.scale.x = 3;
      //   this.sprite.scale.y = 3;
      // })

      circleArray.push(this.sprite);
      this.stage.addChild(this.sprite);
    }

    var tick = 0;
    var animate = () => {
    for (var i = 0; i < circleArray.length; i++)
    {
      circleArray[i].direction += circleArray[i].turningSpeed * 0.01;
      circleArray[i].position.x += Math.sin(circleArray[i].direction) * circleArray[i].speed + Math.random(30, 40);
      circleArray[i].position.y += Math.cos(circleArray[i].direction) * circleArray[i].speed + Math.random(30, 40);
      circleArray[i].rotation = circleArray[i].direction + Math.PI / 2;

      if (circleArray[i].position.x < spriteBounds.x && circleArray[i].position.x > 0)
      {
        circleArray[i].position.x += spriteBounds.width - Math.random(30, 40);
      }
      else if(circleArray[i].position.x > spriteBounds.width - 20)
      {
        circleArray[i].position.x -= spriteBounds.width + Math.random(30, 40)
      }
      else if(circleArray[i].position.x < 0){
        circleArray[i].position.x +=  Math.random(20, 30) * this.renderer.width/1.5;
      }

      if(circleArray[i].position.y < spriteBounds.y && circleArray[i].position.y > 0)
      {
        circleArray[i].position.y += spriteBounds.height - Math.random(30, 40)
      }
      else if(circleArray[i].position.y > spriteBounds.height)
      {
        circleArray[i].position.y -= spriteBounds.height + Math.random(30, 40)
      }
      else if(circleArray[i].position.y < 0){
        circleArray[i].position.y +=  Math.random(20, 30) * this.renderer.height;
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
      <div ref={(c) => this.updateContainer = c}></div>
    );
  }
}

export default Graphics;
