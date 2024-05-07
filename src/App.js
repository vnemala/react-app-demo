import React, { Component } from "react";
import "./App.css"
import Child1 from "./Child1";
import Child2 from "./Child2";
import * as d3 from 'd3'
import tips from './SampleDataset.csv'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {data:[],
      target: "A"};
    
  }
  targetDropdown = (event) => {
    const selectedVariable = event.target.value;
    this.setState({ target: selectedVariable }, () => {
      this.render();
    });
  }
  componentDidMount() {
    var self=this
    d3.csv(tips,function(d) {
      return {
        x:parseFloat(d.x),
        y:parseFloat(d.y),
        category:d.category
      }
    }).then(function(csv_data) {
      self.setState({data:csv_data})
      console.log(csv_data)
    })
    .catch(function(err) {
      console.log(err)
    })
  }

  render() {
    return <div className="parent">
      <div style={{ backgroundColor: "#d3d3d3", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          Select Target:
          <select value={this.state.target} onChange={this.targetDropdown}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
      <div className="child1"><Child1 data1={this.state.data} data2 = {this.state.target}></Child1></div>
      <div className="child2"><Child2 data2={this.state.data}></Child2></div>
    </div>
  }
}

export default App;