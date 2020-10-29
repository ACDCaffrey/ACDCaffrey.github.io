var svg = d3.select("#pulseplot")
            .classed("svg-container", true)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 690 380")
            .classed("svg-content-responsive", true);

d3.csv("./rfile2.csv",
  function(data){

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

    svg.selectAll("path").remove();

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
                 .y(function(ldata){return y(ldata.y)});

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
      .attr("stroke-dasharray", totalLength + " " + 50)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)
      .attr("stroke", 'black');

    path2
      .attr("stroke-dasharray", totalLength + " " + 50)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0)
      .attr("stroke", 'black');

    var dataFilter1 = data.map(function(d){return {x: d.x, y: d["pp"]} })
    var dataFilter2 = data.map(function(d){return {x: d.x, y: d["pp"]} })

    var dataFilter1b = data.map(function(d){return {x: d.x, y: d["pp"]} })
    var dataFilter2b = data.map(function(d){return {x: d.x, y: d["pp"]} })

    var dataFilter3 = data.map(function(d){return {x: d.x, y: d["tp"]} })
    var dataFilter4 = data.map(function(d){return {x: d.x, y: d["tp"]} })

    var dataFilter3b = data.map(function(d){return {x: d.x, y: d["tp"]} })
    var dataFilter4b = data.map(function(d){return {x: d.x, y: d["tp"]} })

    var dataFilter5 = data.map(function(d){return {x: d.x, y: d["lp"]} })
    var dataFilter6 = data.map(function(d){return {x: d.x, y: d["lp"]} })

    var dataFilter5b = data.map(function(d){return {x: d.x, y: d["lp"]} })
    var dataFilter6b = data.map(function(d){return {x: d.x, y: d["lp"]} })

    var dataFilter5b2 = data.map(function(d){return {x: d.x, y: d["lp"]} })
    var dataFilter6b2 = data.map(function(d){return {x: d.x, y: d["lp"]} })

    for(var i = 0; i < 50; i++){
      dataFilter1[i].y = parseFloat(dataFilter1[i].y) + 310;
      dataFilter2[i].y = parseFloat(dataFilter2[i].y) + 310;

      dataFilter1[i].x = parseFloat(dataFilter1[i].x) + 45;
      dataFilter2[i].x = parseFloat(dataFilter2[i].x) + 200;

      // 3000 for 155. 122 = 2361, 123 = 2380, 245 = 4742

      dataFilter3[i].y = parseFloat(dataFilter3[i].y) + 310;
      dataFilter4[i].y = parseFloat(dataFilter4[i].y) + 310;

      dataFilter3[i].x = parseFloat(dataFilter3[i].x) + 200;
      dataFilter4[i].x = parseFloat(dataFilter4[i].x) + 355;

      dataFilter5[i].y = parseFloat(dataFilter5[i].y) + 310;
      dataFilter6[i].y = parseFloat(dataFilter6[i].y) + 310;

      dataFilter5[i].x = parseFloat(dataFilter5[i].x) + 355;
      dataFilter6[i].x = parseFloat(dataFilter6[i].x) + 600;

      // inverted pulses start here

      dataFilter1b[i].y = 380 - parseFloat(dataFilter1b[i].y) - 310;
      dataFilter2b[i].y = 380 - parseFloat(dataFilter2b[i].y) - 310;

      dataFilter1b[i].x = parseFloat(dataFilter1b[i].x) + 45;
      dataFilter2b[i].x = parseFloat(dataFilter2b[i].x) + 200;

      dataFilter3b[i].y = 380 - parseFloat(dataFilter3b[i].y) - 310;
      dataFilter4b[i].y = 380 - parseFloat(dataFilter4b[i].y) - 310;

      dataFilter3b[i].x = parseFloat(dataFilter3b[i].x) + 200;
      dataFilter4b[i].x = parseFloat(dataFilter4b[i].x) + 355;

      dataFilter5b[i].y = 380 - parseFloat(dataFilter5b[i].y) - 310;
      dataFilter6b[i].y = 380 - parseFloat(dataFilter6b[i].y) - 310;
      dataFilter6b2[i].y = 380 - parseFloat(dataFilter6b2[i].y) - 310;

      dataFilter5b[i].x = parseFloat(dataFilter5b[i].x) + 355;
      dataFilter6b[i].x = parseFloat(dataFilter6b[i].x) + 477;
      dataFilter6b2[i].x = parseFloat(dataFilter6b2[i].x) + 600;

    }

    // console.log(dataFilter);

    var pathbottom = svg.append("path")
                        .attr("d", line(dataFilter1))
                        .attr("stroke-width", "2")
                        .attr("fill", "none");

    var pathbottom2 = svg.append("path")
                         .attr("d", line(dataFilter2))
                         .attr("stroke-width", "2")
                         .attr("fill", "none");

    var pathbottom3 = svg.append("path")
                         .attr("d", line(dataFilter3))
                         .attr("stroke-width", "2")
                         .attr("fill", "none");

    var pathbottom4 = svg.append("path")
                         .attr("d", line(dataFilter4))
                         .attr("stroke-width", "2")
                         .attr("fill", "none");

    var pathbottom5 = svg.append("path")
                         .attr("d", line(dataFilter5))
                         .attr("stroke-width", "2")
                         .attr("fill", "none");

    var pathtop = svg.append("path")
                     .attr("d", line(dataFilter1b))
                     .attr("stroke-width", "2")
                     .attr("fill", "none");

    var pathtop2 = svg.append("path")
                      .attr("d", line(dataFilter2b))
                      .attr("stroke-width", "2")
                      .attr("fill", "none");

    var pathtop3 = svg.append("path")
                      .attr("d", line(dataFilter3b))
                      .attr("stroke-width", "2")
                      .attr("fill", "none");

    var pathtop4 = svg.append("path")
                      .attr("d", line(dataFilter4b))
                      .attr("stroke-width", "2")
                      .attr("fill", "none");

    var pathtop5 = svg.append("path")
                      .attr("d", line(dataFilter5b))
                      .attr("stroke-width", "2")
                      .attr("fill", "none");

    var pathtop6 = svg.append("path")
                      .attr("d", line(dataFilter6b))
                      .attr("stroke-width", "2")
                      .attr("fill", "none");

    var pathtop7 = svg.append("path")
                      .attr("d", line(dataFilter6b))
                      .attr("stroke-width", "2")
                      .attr("fill", "none");


    pathbottom
      .transition()
      .attr("d", line(dataFilter2))
      .delay(1400)
      .attr("stroke", 'black')
      .duration(3000)
      .ease(d3.easeLinear)
      .on("end", function() {
        d3.select(this).attr("opacity", 0);
      });

    pathtop
      .transition()
      .attr("d", line(dataFilter2b))
      .delay(1000)
      .attr("stroke", 'black')
      .duration(3000)
      .ease(d3.easeLinear)
      .on("end", function() {
        d3.select(this).attr("opacity", 0);
      });

    pathbottom2
      .transition()
      .attr("d", line(dataFilter3))
      .attr("stroke", 'black')
      .delay(4400)
      .duration(300)
      .on("end", function() {
        d3.select(this).attr("opacity", 0);
      });

    pathtop2
      .transition()
      .attr("d", line(dataFilter3b))
      .attr("stroke", 'black')
      .delay(4000)
      .duration(300)
      .on("end", function() {
        d3.select(this).attr("opacity", 0);
      });

    pathbottom3
      .transition()
      .attr("d", line(dataFilter4))
      .delay(4700)
      .attr("stroke", 'black')
      .duration(3000)
      .ease(d3.easeLinear)
      .on("end", function() {
        d3.select(this).attr("opacity", 0);
      });

    pathtop3
      .transition()
      .attr("d", line(dataFilter4b))
      .delay(4300)
      .attr("stroke", 'black')
      .duration(3000)
      .ease(d3.easeLinear)
      .on("end", function() {
        d3.select(this).attr("opacity", 0);
      });

    pathbottom4
      .transition()
      .attr("d", line(dataFilter5))
      .attr("stroke", 'black')
      .delay(7700)
      .duration(300)
      .on("end", function() {
        d3.select(this).attr("opacity", 0);
      });


    pathtop4
      .transition()
      .attr("d", line(dataFilter5b))
      .attr("stroke", 'black')
      .delay(7300)
      .duration(300)
      .on("end", function() {
        d3.select(this).attr("opacity", 0);
      });

    pathbottom5
      .transition()
      .attr("d", line(dataFilter6))
      .delay(8000)
      .attr("stroke", 'black')
      .duration(4742)
      .ease(d3.easeLinear);

    pathtop5
      .transition()
      .attr("d", line(dataFilter6b))
      .delay(7600)
      .attr("stroke", 'black')
      .duration(2361)
      .ease(d3.easeLinear)
      .on("end", function() {
        d3.select(this).attr("opacity", 0);
      });


    pathtop6 // delay
      .transition()
      .attr("d", line(dataFilter6b))
      .attr("stroke", 'black')
      .delay(9961)
      .duration(400)
      .on("end", function() {
        d3.select(this).attr("opacity", 0);
      });

    pathtop7
      .transition()
      .attr("d", line(dataFilter6b2))
      .delay(10361)
      .attr("stroke", 'black')
      .duration(2380)
      .ease(d3.easeLinear);

  }

  d3.select("#powerranger").on("click", function(d) {
    gogopowerrangers();
  })

});
