var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height"),
  transform = d3.zoomIdentity;

var g = svg.append("g");

var boothSpecs = {
  width: 40,
  height: 50,
  gutterX: 35,
  gutterY: 17,
  rows: 7
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
  .attr("id", function(d) {
    return "booth-" + d.id;
  })
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
    return "translate(" + transX + " " + transY + ")";
  });

boothGroups
  .append("text")
  .text(function(d) {
    return d.id;
  })
  .attr("dx", 5)
  .attr("dy", 45)
  .attr("font-size", "10px");

boothGroups
  .append("rect")
  .attr("width", boothSpecs.width)
  .attr("height", boothSpecs.height)
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-width", "1px");

boothReservations.forEach(function(res) {
  var selectorString = "g#booth-" + res.boothId;
  var boothGroup = d3.select(selectorString);
  boothGroup
    .select("rect")
    .attr("fill", "#FF5733")
    .attr("stroke", "steelblue")
    .attr("fill-opacity", 0.5);
  boothGroup
    .append("text")
    .attr("font-size", "9px")
    .attr("font-weight", "bold")
    .attr("dy", 15)
    .attr("dx", 5)
    .text(res.orgName);
});

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
