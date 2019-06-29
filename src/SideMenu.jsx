import React, { Component } from 'react';
import './App.css';


class SideMenu extends Component{
  constructor(props){
    super(props)
  }

  onNumberOfParticleValueChange = (e) => {
    this.props.onNumberOfParticleValueChange(e.target.value);
  }

  onMinStartingRotationValue = (e) =>{
    this.props.onMinStartingRotationValue(e.target.value);
  }

  onMaxStartingRotationValue = (e) =>{
    this.props.onMaxStartingRotationValue(e.target.value);
  }

  onParticlesValueSubmit = () => {
    this.props.onParticlesValueSubmit();
  }

  onSpawnTypeCircleClick = (event) => {
    this.props.onSpawnTypeCircleClick(event.target.value);
  }

  onSpawnTypeRectClick = (event) => {
    this.props.onSpawnTypeRectClick(event.target.value);
  }

  onSpawnCircleXValueChange = (event) => {
    this.props.onSpawnCircleXValueChange(event.target.value);
  }

  onSpawnCircleYValueChange = (event) => {
    this.props.onSpawnCircleYValueChange(event.target.value);
  }

  onSpawnCircleRValueChange = (event) => {
    this.props.onSpawnCircleRValueChange(event.target.value);
  }

  onSpawnRectXValueChange = (event) => {
    this.props.onSpawnRectXValueChange(event.target.value);
  }

  onSpawnRectYValueChange = (event) => {
    this.props.onSpawnRectYValueChange(event.target.value);
  }
  onSpawnRectWValueChange = (event) => {
    this.props.onSpawnRectWValueChange(event.target.value);
  }

  onSpawnRectHValueChange = (event) => {
    this.props.onSpawnRectHValueChange(event.target.value);
  }

  render(){
    return (
      <div>
        <h3>Properties</h3>
        <label>Max Particles :</label>
        <input type="number" value={this.props.numberOfParticles > 0 ? this.props.numberOfParticles : 500} onChange={this.onNumberOfParticleValueChange}/>
        <button type="submit" onClick={this.onParticlesValueSubmit}>Submit</button>
        <br/>
        <br/>

        <label>Min Starting Rotation :</label>
        <input id="range" type="range"
          value={this.props.minStartingRotation ? this.props.minStartingRotation : 90}
          min={0}
          max={360}
          step={1}
          onChange={this.onMinStartingRotationValue}
        />
        <span className="output">{this.props.minStartingRotation ? this.props.minStartingRotation : 90}</span>

        <br/>
        <br/>
        <label>Max Starting Rotation :</label>
        <input id="range" type="range"
          value={this.props.maxStartingRotation >= 0 ? this.props.maxStartingRotation : 0}
          min={0}
          max={360}
          step={1}
          onChange={this.onMaxStartingRotationValue}
        />
        <span className="output">{this.props.maxStartingRotation ? this.props.maxStartingRotation : 0}</span>

        <br/>
        <br/>
        <label>Spawn Type :</label>
        <button value={"circle"} onClick = {this.onSpawnTypeCircleClick}>Circle</button>
        <button value={"rect"} onClick = {this.onSpawnTypeRectClick}>Rect</button>

        <br/>
        <br/>
        {this.props.spawnType == "circle" ?
          <div>
            <label>x:</label>
            <input id="range" type="range"
              value={this.props.spawnCircleX ? this.props.spawnCircleX : 0}
              min={-500}
              max={500}
              step={1}
              onChange={this.onSpawnCircleXValueChange}
            />
            <span className="output">{this.props.spawnCircleX ? this.props.spawnCircleX : 0}</span>

            <br/>
            <br/>
            <label>y:</label>
            <input id="range" type="range"
              value={this.props.spawnCircleY ? this.props.spawnCircleY : 0}
              min={-250}
              max={250}
              step={1}
              onChange={this.onSpawnCircleYValueChange}
            />
            <span className="output">{this.props.spawnCircleY ? this.props.spawnCircleY : 0}</span>

            <br/>
            <br/>
            <label>r:</label>
            <input id="range" type="range"
              value={this.props.spawnCircleR ? this.props.spawnCircleR : 5}
              min={0}
              max={100}
              step={1}
              onChange={this.onSpawnCircleRValueChange}
            />
            <span className="output">{this.props.spawnCircleR ? this.props.spawnCircleR : 5}</span>
          </div> : ''}

        {this.props.spawnType == "rect" ?
          <div>
            <label>x:</label>
            <input id="range" type="range"
              value={this.props.spawnRectX ? this.props.spawnRectX : 0}
              min={-500}
              max={500}
              step={1}
              onChange={this.onSpawnRectXValueChange}
            />
            <span className="output">{this.props.spawnRectX ? this.props.spawnRectX : 0}</span>

            <br/>
            <br/>
            <label>y:</label>
            <input id="range" type="range"
              value={this.props.spawnRectY ? this.props.spawnRectY : 0}
              min={-250}
              max={250}
              step={1}
              onChange={this.onSpawnRectYValueChange}
            />
            <span className="output">{this.props.spawnRectY ? this.props.spawnRectY : 0}</span>
            
            <br/>
            <br/>
            <label>w:</label>
            <input id="range" type="range"
              value={this.props.spawnRectW ? this.props.spawnRectW : 5}
              min={-1000}
              max={1000}
              step={1}
              onChange={this.onSpawnRectWValueChange}
            />
            <span className="output">{this.props.spawnRectW ? this.props.spawnRectW : 5}</span>

            <br/>
            <br/>
            <label>h:</label>
            <input id="range" type="range"
              value={this.props.spawnRectH ? this.props.spawnRectH : 10}
              min={-250}
              max={250}
              step={1}
              onChange={this.onSpawnRectHValueChange}
            />
            <span className="output">{this.props.spawnRectH ? this.props.spawnRectH : 10}</span>
          </div> : ''}
      </div>
    );
  }
}

export default SideMenu;
