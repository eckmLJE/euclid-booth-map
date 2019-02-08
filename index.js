var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height"),
  transform = d3.zoomIdentity;

var g = svg.append("g");

var boothSpecs = {
  width: 30,
  height: 40,
  gutterX: 30,
  gutterY: 15,
  rows: 8
};

var counters = {
  currentRow: 0,
  currentColumn: 0
};

var boothGroups = g
  .selectAll("g")
  .data(boothData)
  .enter()
  .append("g")
  .attr("transform", function(d) {
    var transX, transY;
    if (counters.currentRow === boothSpecs.rows) {
      counters.currentColumn += 1;
      counters.currentRow = 0;
    }
    transX =
      boothSpecs.gutterX +
      counters.currentColumn * (boothSpecs.width + boothSpecs.gutterX);
    transY =
      boothSpecs.gutterY +
      counters.currentRow * (boothSpecs.height + boothSpecs.gutterY);
    counters.currentRow += 1;
    console.log(counters.currentRow);
    return "translate(" + transX + " " + transY + ")";
  });

boothGroups
  .append("rect")
  .attr("width", boothSpecs.width)
  .attr("height", boothSpecs.height)
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-width", "1px");

svg.call(
  d3
    .zoom()
    .scaleExtent([1 / 2, 8])
    .on("zoom", zoomed)
);

function zoomed() {
  g.attr("transform", d3.event.transform);
}

var rects = document.querySelectorAll("rect");
rects.forEach(function(rect) {
  rect.addEventListener("mouseenter", console.log);
});
