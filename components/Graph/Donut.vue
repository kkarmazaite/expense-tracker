<template>
  <div id="donutGraph"> </div>
</template>
<script lang="ts" setup>
import * as d3 from "d3";
import 'd3-transition';

interface SVGPathElement {
  _current: { startAngle: number, endAngle: number }
}

const initializeGraph = (chartData: number[]) => {
  const noData = (Math.max(...chartData) === 0) ? 1 : 0
  const data = ref([
    noData,
    ...chartData,
  ])

  const container: any = d3.select("#donutGraph")

  container.selectAll("svg")
    .remove()

  const width: number = container.node().getBoundingClientRect().width
  const height: number = container.node().getBoundingClientRect().height

  const svg = container.append("svg")
    .attr("width", width)
    .attr("height", height)

  const radius = Math.min(width, height) / 2
  const innerRadius = radius / 3
  const g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  const color = d3.scaleOrdinal([
    '#999999',
    '#22c55e',
    '#ef4444',
  ]);

  // Generate the pie
  const pie = d3.pie();

  // Generate the arcs
  const arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(radius - innerRadius)

  //Generate groups
  const arcs = g.selectAll("arc")
    .data(pie(data.value))
    .enter()
    .append("g")
    .attr("class", "arc")

  //Draw arc paths
  arcs.append("path")
    .attr("d", arc)
    .style("fill", (i: string) => color(i))
    .each(function(this: SVGPathElement) {
      this._current = {
        startAngle: 0,
        endAngle: 0, 
      }
    })
    .transition()
    .duration(750)
    .attrTween("d", function(this: SVGPathElement, d:any) {
      const i = d3.interpolate(this._current, d)
      this._current = i(0)
      return function(t:any) {
        return arc(i(t))
      }
    })
}

defineExpose({
  initializeGraph,
});

</script>