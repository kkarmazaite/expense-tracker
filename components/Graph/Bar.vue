<template>
    <div id="barGraph"> </div>
</template>
<script lang="ts" setup>
import * as d3 from "d3";
import { IBarGraph } from "~~/types/IBarGraph";

const initializeGraph = (chartData: IBarGraph[]) => {
  const container: any = d3.select("#barGraph")

  container.selectAll("svg")
    .remove()

  // set the dimensions and margins of the graph
  const margin = {
    top: 30,
    right: 30,
    bottom: 20,
    left: 40, 
  }
  const width: number = container.node().getBoundingClientRect().width - margin.left - margin.right
  const height: number = container.node().getBoundingClientRect().height - margin.top - margin.bottom

  // append the svg object to the body of the page
  const svg = container
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr(
      "transform",
      "translate(" + margin.left + "," + margin.top + ")",
    );

  // X axis
  const x = d3.scaleBand()
    .range([
      0,
      width,
    ])
    .domain(chartData.map(function (d) { return d.group; }))
    .padding(0.2);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(12,0)")
    .style("text-anchor", "end");

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([
      0,
      Math.max(...chartData.map((p) => p.value), 10),
    ])
    .range([
      height,
      0,
    ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll("mybar")
    .data(chartData)
    .enter()
    .append("rect")
    .attr("x", (d: IBarGraph) => x(d.group))
    .attr("y", (d: IBarGraph) => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", (d: IBarGraph) => height - y(d.value))
    .attr("fill", "#ef4444")
    .append("svg:title")
    .text((d: IBarGraph) => d.valueDisplay)



}
defineExpose({
  initializeGraph,
});
</script>