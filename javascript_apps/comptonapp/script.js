var data_orig = [];
var data_orig2 = [];
data_orig[0] = {x: 0, y: 0};
data_orig2[0] = {x: 0, y: 0};
for(var i = 0; i < 181; i++){
  data_orig[i] = {x: i, y: 1000/(1 + (1000/511)*(1 - Math.cos(i*Math.PI/180)))};
  data_orig2[i] = {x: i, y: 1000 - 1000/(1 + (1000/511)*(1 - Math.cos(i*Math.PI/180)))};
}

var keys = ["Outgoing Electron", "Outgoing Gamma Ray"];


var svg = d3.select("#comptonapp")
            .classed("svg-container", true)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 700 400")
            .classed("svg-content-responsive", true);

// Add X axis
var x = d3.scaleLinear()
          .domain([0, 180]) // axis limits
          .range([ 0, 500 ]);

svg.append("g")
   .attr("transform", "translate(120," + 350 + ")") // x-axis shift
   .call(d3.axisBottom(x));

// text label for the x axis
svg.append("text")
   .attr("transform",
         "translate(" + 400 + " ," + 395 + ")")
   .style("text-anchor", "middle")
   .text("Angle (degrees)");

// Add Y axis
var y = d3.scaleLinear()
          .domain([0, 1500]) // axis limits
          .range([330, 0 ]);

svg.append("g")
  .attr("transform", "translate(" + 120 + ",20)") // y-axis shift
  .call(d3.axisLeft(y));

// text label for the y axis
svg.append("text")
    .attr("transform", "rotate(-90)") // vertical text
    .attr("y", 50)
    .attr("x", -150)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Energy (keV)");

var line1 = svg
  .append('g')
  .append("path")
    .datum(data_orig)
    .attr("d", d3.line() // .curve(d3.curveStepAfter)
      .x(function(d) {return x(d.x) + 120;})
      .y(function(d) {return y(d.y) + 20;})
    )
    .attr("stroke", "steelblue")
    .style("stroke-width", 2.5)
    .style("fill", "none");

var line2 = svg
  .append('g')
  .append("path")
    .datum(data_orig2)
    .attr("d", d3.line() // .curve(d3.curveStepAfter)
      .x(function(d) {return x(d.x) + 120;})
      .y(function(d) {return y(d.y) + 20;})
    )
    .attr("stroke", "orange")
    .style("stroke-width", 2.5)
    .style("fill", "none");

  var color = d3.scaleOrdinal()
      .domain([0,2])
      .range(["orange", "steelblue"]);

  var size = 15
  
  svg.selectAll("mylines")
    .data(keys)
    .enter()
    .append("line")
      .attr("x1", 430)
      .attr("x2", 455)
      .attr("y1", function(d,i){ return 25 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("y2", function(d,i){ return 25 + i*(size+5)})
      .attr("stroke", function(d){ return color(d)})
      .style("stroke-width", 2.5);

  svg.selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
      .attr("x", 450 + size*1.2)
      .attr("y", function(d,i){ return 20 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
      //.style("fill", function(d){ return color(d)})
      .text(function(d){ return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle");

function updatecomptonplot(event){
  var energy = document.getElementById("energyinput").value;

  var data = [];
  var data2 = [];
  data[0] = {x:0, y:0};
  data2[0] = {x:0, y:0};
  for(var i = 0; i < 181; i++){
    data[i] = {x: i, y: energy/(1 + (energy/511)*(1 - Math.cos(i*Math.PI/180)))}
    data2[i] = {x: i, y: energy - energy/(1 + (energy/511)*(1 - Math.cos(i*Math.PI/180)))}
  }

  line1
    .datum(data)
    .transition()
    .duration(0)
    .attr("d", d3.line() //.curve(d3.curveStepAfter)
      .x(function(d) {return x(d.x) + 120;})
      .y(function(d) {return y(d.y) + 20;})
    );

  line2
    .datum(data2)
    .transition()
    .duration(0)
    .attr("d", d3.line() // .curve(d3.curveStepAfter)
      .x(function(d) {return x(d.x) + 120;})
      .y(function(d) {return y(d.y) + 20;})
    );
}
