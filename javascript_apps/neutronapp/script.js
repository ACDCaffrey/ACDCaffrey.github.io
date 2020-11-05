var data_orig = [];
data_orig[0] = {x: 0, y: 0};
for(var i = 0; i < 181; i++){
  data_orig[i] = {x: i, y: (Math.pow(10, 2) + 2*10*Math.cos(i*Math.PI/180) + 1)/Math.pow(10 + 1, 2)};
}

var svg = d3.select("#neutronapp")
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
          .domain([0, 1.2]) // axis limits
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
   .text("Energy (MeV)");

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

var svg2 = d3.select("#neutronapptooltip")
             .classed("svg-container", true)
             .append("svg")
             .attr("preserveAspectRatio", "xMinYMin meet")
             .attr("viewBox", "0 0 250 30")
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
          d0 = Math.round(data_orig[i].y*100)/100;
      tooltip.attr("x", 70);
      tooltip.attr("y", 20);
      tooltip.select(".tooltiptext1").text("Angle: " + i + " Degrees");
      tooltip.select(".tooltiptext2").text("Outgoing Gamma-ray Energy: " + d0 + " MeV");
  }

function updateneutronplot(event){
  var mass = document.getElementById("massinput").value;

  for(var i = 0; i < 181; i++){
    data_orig[i] = {x: i, y: (Math.pow(parseFloat(mass), 2) + 2*parseFloat(mass)*Math.cos(i*Math.PI/180) + 1)/Math.pow(parseFloat(mass) + 1, 2)}
  }

  line1
    .datum(data_orig)
    .transition()
    .duration(1000)
    .attr("d", d3.line() //.curve(d3.curveStepAfter)
      .x(function(d) {return x(d.x) + 70;})
      .y(function(d) {return y(d.y) + 20;}));

}
