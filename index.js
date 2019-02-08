var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height"),
  transform = d3.zoomIdentity;

var g = svg.append("g");

g.selectAll("rect")
  .data(rects)
  .enter()
  .append("rect")
  .attr("x", function(d) {
    return d.x;
  })
  .attr("y", function(d) {
    return d.y;
  })
  .attr("width", function(d) {
    return d.width;
  })
  .attr("height", function(d) {
    return d.height;
  });
//   .call(d3.drag().on("drag", dragged));

svg.call(
  d3
    .zoom()
    .scaleExtent([1 / 2, 8])
    .on("zoom", zoomed)
);

function zoomed() {
  g.attr("transform", d3.event.transform);
}

function dragged(d) {
  d3.select(this)
    .attr("x", (d.x = d3.event.x))
    .attr("y", (d.y = d3.event.y));
}

var rects = document.querySelectorAll("rect");
rects.forEach(function(rect) {
  rect.addEventListener("mouseenter", console.log);
});
