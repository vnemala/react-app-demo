import React, { Component } from "react";
import * as d3 from 'd3'

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.data1);
  }
  componentDidUpdate() {
    var data = this.props.data1
    var target = this.props.data2
    console.log(target)

    //set dimensions and margins of the graph
    var margin = { top: 10, right: 10, bottom: 30, left: 20},
        w = 500 - margin.left - margin.right,
        h = 300 - margin.top - margin.bottom;

    var container = d3.select(".child1_svg")
    .attr("width",w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .select(".g_1")
    .attr("transform",`translate(${margin.left}, ${margin.top})`);

    //Add X axis
    var x_data = data.map(item=>item.x)
    const x_scale = d3.scaleLinear().domain([0,d3.max(x_data)]).range([margin.left, w]);
    container.selectAll(".x_axis_g").data([0]).join('g').attr("class",'x_axis_g')
    .attr("transform",`translate(0, ${h})`).call(d3.axisBottom(x_scale));

    //Add Y axis
    var y_data = data.map(item=>item.y)
    const y_scale = d3.scaleLinear().domain([0,d3.max(y_data)]).range([h,0]);
    container.selectAll(".y_axis_g").data([0]).join('g').attr("class",'x_axis_g')
    .attr("transform",`translate(${margin.left},0)`).call(d3.axisLeft(y_scale));
    
    //Add labels
    container.selectAll(".x_label")
    .data(data)
    .join("g")
    .attr("class",'x_lab')
    .text("X")
    .attr("x", 100 / 2)
    .attr("y", 550);

    container.selectAll(".y_label")
    .data(data)
    .join("g")
    .attr("class",'y_lab')
    .text("Y")
    .attr("x", 100 / 2)
    .attr("y", 550);

    // add points
    
    container.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx",function (d) {
        return x_scale(d.x);
    })
    .attr("cy",function (d) {
        return y_scale(d.y);
    })
    .attr("r",3)
    .style("fill","#69b3a2");
    
  }

  render() {
    return <svg className="child1_svg">
        <g className="g_1"></g>
    </svg>;
  }
}

export default Child1;