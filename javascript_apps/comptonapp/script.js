var data_orig = [];
var data_orig2 = [];
var data_orig3 = [];
data_orig[0] = {x: 0, y: 0};
data_orig2[0] = {x: 0, y: 0};
data_orig3[0] = {x:1, y:1};
for(var i = 0; i < 181; i++){
  data_orig[i] = {x: i, y: 1000/(1 + (1000/511)*(1 - Math.cos(i*Math.PI/180)))};
  data_orig2[i] = {x: i, y: 1000 - 1000/(1 + (1000/511)*(1 - Math.cos(i*Math.PI/180)))};
}
var part1, theta;
for(var i = 0; i < 361; i++){
  theta = i*Math.PI/180;
  part1 = 1/(1 + ((1000/511) * (1 - Math.cos(theta))));
  data_orig3[i] = {x: theta, y: Math.pow(part1, 2) * (part1 + 1/part1 - Math.pow(Math.sin(theta), 2))/2};
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
   .attr("transform", "translate(70," + 350 + ")") // x-axis shift
   .call(d3.axisBottom(x));

// text label for the x axis
svg.append("text")
   .attr("transform",
         "translate(" + 330 + " ," + 395 + ")")
   .style("text-anchor", "middle")
   .attr("font-family", "sans-serif")
   .text("Angle (degrees)");

// Add Y axis
var y = d3.scaleLinear()
          .domain([0, 1500]) // axis limits
          .range([330, 0 ]);

yAxis = svg.append("g")
           .attr("transform", "translate(" + 70 + ",20)") // y-axis shift
           .call(d3.axisLeft(y));

// text label for the y axis
svg.append("text")
   .attr("transform", "rotate(-90)") // vertical text
   .attr("y", 5)
   .attr("x", -160)
   .attr("dy", "1em")
   .style("text-anchor", "middle")
   .attr("font-family", "sans-serif")
   .text("Energy (keV)");

var line1 = svg
  .append('g')
  .append("path")
    .datum(data_orig)
    .attr("d", d3.line() // .curve(d3.curveStepAfter)
      .x(function(d) {return x(d.x) + 70;})
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
      .x(function(d) {return x(d.x) + 70;})
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
.style("font-size", "15px")
      .text(function(d){ return d})
      .style("alignment-baseline", "middle");

var svg2 = d3.select("#comptonapptooltip")
             .classed("svg-container", true)
             .append("svg")
             .attr("preserveAspectRatio", "xMinYMin meet")
             .attr("viewBox", "0 0 250 40")
             .classed("svg-content-responsive", true);

var tooltip = svg2.append("g")
                  .style("display", "none");

tooltip.append("rect")
       .attr("class", "tooltipbox")
       .attr("fill", "#eee")
       .style("opacity", 1)
       .attr("width", 85)
       .attr("height", 50)
       .attr("x", 0)
       .attr("y", 0);

tooltip.append("text")
       .attr("class", "tooltiptext1")
       .attr("x", 2)
       .attr("y", 10);

tooltip.append("text")
       .attr("class", "tooltiptext2")
       .attr("x", 2)
       .attr("y", 22);

tooltip.append("text")
       .attr("class", "tooltiptext3")
       .attr("x", 2)
       .attr("y", 34);

svg.append("rect")
    .attr("class", "overlay")
    .attr("width", 500)
    .attr("height", 330)
    .attr("x", 70)
    .attr("y", 20)
    .on("mouseover", function() { tooltip.style("display", null);})
    .on("mouseout",  function() { tooltip.style("display", "none");})
    .on("mousemove", mousemove);


  function mousemove() {
      var x0 = x.invert(d3.mouse(this)[0]),
           i = Math.round(x0-1-43+19),
          d0 = Math.round(data_orig[i].y*10)/10,
          d1 = Math.round(data_orig2[i].y*10)/10;
      tooltip.attr("x", 70);
      tooltip.attr("y", 20);
      tooltip.select(".tooltiptext1").text("Angle: " + i + " Degrees");
      tooltip.select(".tooltiptext2").text("Outgoing Gamma-ray Energy: " + d0 + " keV");
      tooltip.select(".tooltiptext3").text("Outgoing Electron Energy: " + d1 + " keV");
  }

function updatecomptonplot(event){
  var energy = document.getElementById("energyinput").value;

  for(var i = 0; i < 181; i++){
    data_orig[i] = {x: i, y: energy/(1 + (energy/511)*(1 - Math.cos(i*Math.PI/180)))}
    data_orig2[i] = {x: i, y: energy - energy/(1 + (energy/511)*(1 - Math.cos(i*Math.PI/180)))}
  }

  y.domain([0,energy*1.2])
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

  line1
    .datum(data_orig)
    .transition()
    .duration(1000)
    .attr("d", d3.line() //.curve(d3.curveStepAfter)
      .x(function(d) {return x(d.x) + 70;})
      .y(function(d) {return y(d.y) + 20;}));

  line2
    .datum(data_orig2)
    .transition()
    .duration(1000)
    .attr("d", d3.line() // .curve(d3.curveStepAfter)
      .x(function(d) {return x(d.x) + 70;})
      .y(function(d) {return y(d.y) + 20;})
    );
}





// second app starts here
var svg3 = d3.select("#comptonapp2")
             .classed("svg-container", true)
             .append("svg")
             .attr("preserveAspectRatio", "xMinYMin meet")
             .attr("viewBox", "0 0 700 400")
             .classed("svg-content-responsive", true);

var g = svg3.append("g")
   	        .attr("transform", "translate(" + 700 / 2 + "," + 400 / 2 + ")");

 var innerRadius = 0,
     outerRadius = 320 / 2 - 6;

 var fullCircle = 2 * Math.PI;

 var x2 = d3.scaleLinear()
            .range([0, fullCircle]);

 var y2 = d3.scaleLinear()
 		        .range([innerRadius, outerRadius]);

 var line3 = d3.lineRadial()
 		           .angle(function(d){return x2(d.x);})
 		           .radius(function(d){return y2(d.y);});

x2.domain([0,2*Math.PI]);
y2.domain([0,1]);

var linePlot = g.append("path")
	              .datum(data_orig3)
                .attr("fill", "none")
                .attr("stroke", "#4099ff")
                .attr("d", line3)
                .attr("transform", function(d) { return "rotate(" + 90 + ")"; });

var yAxis2 = g.append("g")
              .attr("text-anchor", "middle");

var yTick = yAxis2
              .selectAll("g")
              .data(y2.ticks(5))
              .enter().append("g"); // inner rings

yTick.append("circle")
     .attr("fill", "none")
     .attr("stroke", "black")
     .style("stroke-dasharray", ("3, 3"))
     .attr("stroke-width", 0.5)
		 .attr("opacity", 0.4)
     .attr("r", y2);

yTick.append("circle")
     .attr("fill", "none")
     .attr("stroke", "black")
     .attr("stroke-width", 0.5)
		 .attr("opacity", 1)
     .attr("r", 154);

var labels = yTick.append("text")
                  .attr("x", function(d) {return y2(d);})
                  .attr("dy", "0.3em")
                  .text(function(d) {return d;})
                  .attr("font-size", 12)
                  .attr("font-weight", "bold");

var xAxis2 = g.append("g");

var xTick = xAxis2
              .selectAll("g")
              .data(d3.range(0, 360, 20))
              .enter().append("g")
              .attr("transform", function(d) { return "rotate(" + -d + ")"; }); //  degree values

xTick.append("line")
     .attr("x2", 154)
     .attr("stroke", "black")
     .style("stroke-dasharray", ("3, 3"))
     .attr("stroke-width", 0.5)
     .attr("opacity", 0.4);

xTick.append("text")
     .attr("x", 160 + 6)
     .attr("dy", ".35em")
     .attr("transform", function(d) { return "rotate(" + d + ",177,0)"; })
     .text(function(d) { return d + "°"; })
     .attr("font-size", 12);

function updatecomptonplot2(event){
  var energy = document.getElementById("energyinput2").value;

  for(var i = 0; i < 361; i++){
    theta = i*Math.PI/180;
    part1 = 1/(1 + ((energy/511) * (1 - Math.cos(theta))));
    data_orig3[i] = {x: theta, y: Math.pow(part1, 2) * (part1 + 1/part1 - Math.pow(Math.sin(theta), 2))/2};
  }

  linePlot
    .datum(data_orig3)
    .transition()
    .attr("d", line3)
    .attr("stroke", "steelblue");
}
