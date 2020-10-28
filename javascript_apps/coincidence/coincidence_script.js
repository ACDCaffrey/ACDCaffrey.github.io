
var logic_pulse;
logic_pulse = d3.csv("/lp.csv",
  function(data){
  return data;
});

console.log(logic_pulse[[PromiseResult]]);

var svg = d3.select("#pulseplot")
            .classed("svg-container", true)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 690 380")
            .classed("svg-content-responsive", true);

var x = d3.scaleLinear().domain([0, 690]).range([0, 690]);
var y = d3.scaleLinear().domain([0, 380]).range([0, 380]);

svg.append("rect")
   .attr("x", 30)
   .attr("y", 100)
   .attr("width", 80)
   .attr("height", 40)
   .attr("fill", "white")
   .attr("stroke", "black");

svg.append("rect")
   .attr("x", 30)
   .attr("y", 240)
   .attr("width", 80)
   .attr("height", 40)
   .attr("fill", "white")
   .attr("stroke", "black");

svg.append("circle")
   .attr("cx", 70)
   .attr("cy", 190)
   .attr("r", 5)

svg.append("text")
   .attr("x", 2)
   .attr("y", 195)
   .text("Source");

svg.append("line")
   .attr("x1", 110)
   .attr("x2", 625)
   .attr("y1", 120)
   .attr("y2", 120)
   .attr("stroke", "black");

svg.append("line")
   .attr("x1", 110)
   .attr("x2", 625)
   .attr("y1", 260)
   .attr("y2", 260)
   .attr("stroke", "black");

 svg.append("rect")
    .attr("x", 190)
    .attr("y", 100)
    .attr("width", 70)
    .attr("height", 40)
    .attr("fill", "white")
    .attr("stroke", "black");

 svg.append("rect")
    .attr("x", 190)
    .attr("y", 240)
    .attr("width", 70)
    .attr("height", 40)
    .attr("fill", "white")
    .attr("stroke", "black");

svg.append("rect")
  .attr("x", 350)
  .attr("y", 100)
  .attr("width", 70)
  .attr("height", 40)
  .attr("fill", "white")
  .attr("stroke", "black");

svg.append("rect")
  .attr("x", 350)
  .attr("y", 240)
  .attr("width", 70)
  .attr("height", 40)
  .attr("fill", "white")
  .attr("stroke", "black");

svg.append("line")
   .attr("x1", 625)
   .attr("x2", 625)
   .attr("y1", 260)
   .attr("y2", 120)
   .attr("stroke", "black");

svg.append("rect")
   .attr("x", 590)
   .attr("y", 170)
   .attr("width", 70)
   .attr("height", 40)
   .attr("fill", "white")
   .attr("stroke", "black");

svg.append("rect")
   .attr("x", 470)
   .attr("y", 100)
   .attr("width", 70)
   .attr("height", 40)
   .attr("fill", "white")
   .attr("stroke", "black");

svg.append("text")
   .attr("x", 33)
   .attr("y", 126)
   .text("Detector 1");

svg.append("text")
   .attr("x", 209)
   .attr("y", 126)
   .text("TFA");

svg.append("text")
  .attr("x", 369)
  .attr("y", 126)
  .text("CFD");

svg.append("text")
   .attr("x", 485)
   .attr("y", 126)
   .text("Delay");

svg.append("text")
   .attr("x", 610)
   .attr("y", 197)
   .text("TAC");

svg.append("text")
  .attr("x", 33)
  .attr("y", 265)
  .text("Detector 2");

svg.append("text")
   .attr("x", 209)
   .attr("y", 265)
   .text("TFA");

svg.append("text")
   .attr("x", 369)
   .attr("y", 265)
   .text("CFD");

function gogopowerrangers(){
  repeat();
}

function repeat(){

    var ldata1 = [
      {x: 70, y: 185},
      {x: 70, y: 140}
    ]

    var ldata2 = [
      {x: 70, y: 195},
      {x: 70, y: 240}
    ]

    var line = d3.line()
                 .x(function(ldata){return x(ldata.x)})
                 .y(function(ldata){return y(ldata.y)})
                 .curve(d3.curveNatural)

    svg.selectAll("path").remove();

    var path1 = svg.append("path")
                  .attr("d", line(ldata1))
                  .attr("stroke-width", "2")
                  .attr("fill", "none");

    var path2 = svg.append("path")
                  .attr("d", line(ldata2))
                  .attr("stroke-width", "2")
                  .attr("fill", "none");

    var totalLength = path1.node().getTotalLength();

    path1
      .attr("stroke-dasharray", totalLength + " " + 10)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)
      .attr("stroke", 'black');

    path2
      .attr("stroke-dasharray", totalLength + " " + 10)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)
      .attr("stroke", 'black')
      .on("end", repeat);

}

// Read the data
// d3.csv("./lp.csv",
//
//   function(data) {
//
//     var delay = 150;
//
//     // Add X axis
//     var x = d3.scaleLinear()
//               .domain([0, 1260]) // axis limits
//               .range([ 0, 600 ]);
//
//     svg.append("g")
//       .attr("transform", "translate(70," + 310 + ")") // x-axis shift
//       .call(d3.axisBottom(x));
//
//     // text label for the x axis
//     svg.append("text")
//        .attr("transform",
//              "translate(" + 390 + " ," + 360 + ")")
//        .style("text-anchor", "middle")
//        .text("Time (ns)");
//
//     // Add Y axis
//     var y = d3.scaleLinear()
//               .domain([0, 100]) // axis limits
//               .range([300, 0]);
//
//     yAxis = svg.append("g")
//        .attr("transform", "translate(" + 70 + ",10)") // y-axis shift
//        .call(d3.axisLeft(y));
//
//     // text label for the y axis
//     svg.append("text")
//         .attr("transform", "rotate(-90)") // vertical text
//         .attr("y", 10)
//         .attr("x", -150)
//         .attr("dy", "1em")
//         .style("text-anchor", "middle")
//         .text("Normalised Amplitude");
//
//     // Initialize line with group a
//     var logic_line1 = svg
//       .append('g')
//       .append("path")
//         .datum(data)
//         .attr("d", d3.line()
//           .x(function(d) { return x(d.x) + 70})
//           .y(function(d) { return y(d.y) + 10})
//         )
//         .attr("stroke", "steelblue")
//         .style("stroke-width", 1.5)
//         .style("fill", "none")
//
//   var logic_line2 = svg
//     .append('g')
//     .append("path")
//       .datum(data)
//       .attr("d", d3.line()
//         .x(function(d) { return x(d.x) + 70})
//         .y(function(d) { return y(d.y) - 50})
//       )
//       .attr("stroke", "steelblue")
//       .style("stroke-width", 1.5)
//       .style("fill", "none")
//
//     logic_line1
//       .attr('cx', 40)

    // for(var step = 0; step < 500; step++){
    //
    //     logic_line1
    //       .datum(data)
    //       .transition()
    //       .ease(d3.easeLinear)
    //       .duration(5000)
    //       .attr("d", d3.line()
    //         .x(function(d) { return x(d.x) + step })
    //         .y(function(d) { return y(d.y)})
    //       )
    //       .attr("stroke", "steelblue")
    //
    //     logic_line2
    //       .datum(data)
    //       .transition()
    //       .ease(d3.easeLinear)
    //       .duration(5000)
    //       .attr("d", d3.line()
    //         .x(function(d) { return x(d.x) + step })
    //         .y(function(d) { return y(d.y) - 50})
    //       )
    //       .attr("stroke", "steelblue")
    //
    // }


//   }
// )
