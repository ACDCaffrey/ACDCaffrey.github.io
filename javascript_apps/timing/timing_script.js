var svg = d3.select("#pulseplot")
            .classed("svg-container", true)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 690 380")
            .classed("svg-content-responsive", true);

// Read the data
d3.csv("./rfile.csv",

  function(data) {

    var delay = 150;

    // Add X axis
    var x = d3.scaleLinear()
              .domain([0, 1260]) // axis limits
              .range([ 0, 600 ]);

    svg.append("g")
      .attr("transform", "translate(70," + 310 + ")") // x-axis shift
      .call(d3.axisBottom(x));

    // text label for the x axis
    svg.append("text")
       .attr("transform",
             "translate(" + 390 + " ," + 360 + ")")
       .style("text-anchor", "middle")
       .text("Time (ns)");

    // Add Y axis
    var y = d3.scaleLinear()
              .domain([0, 1.1]) // axis limits
              .range([300, 0]);

    yAxis = svg.append("g")
       .attr("transform", "translate(" + 70 + ",10)") // y-axis shift
       .call(d3.axisLeft(y));

    // text label for the y axis
    svg.append("text")
        .attr("transform", "rotate(-90)") // vertical text
        .attr("y", 10)
        .attr("x", -150)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Normalised Amplitude");

    var data_early = [];
    data_early[0] = {x: 0, y: 0};

    var zero_line = [];
    zero_line[0] = {x: 0, y: 0};


    for(var i = delay; i < 1221; i++){
      data_early[(i-delay)] = {x: (i-delay), y: data[i].y_500};
      zero_line[(i-delay)] = {x: i, y: 0};
    }

    // Initialize line with group a
    var line = svg
      .append('g')
      .append("path")
        .datum(data_early)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70})
          .y(function(d) { return y(d.y) + 10})
        )
        .attr("stroke", "steelblue")
        .style("stroke-width", 1.5)
        .style("fill", "none")

    var line2 = svg
      .append('g')
      .append("path")
        .datum(zero_line)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70})
          .y(function(d) { return y(d.y) + 10})
        )
        .attr("stroke", "steelblue")
        .style("stroke-dasharray", ("3, 3"))
        .style("stroke-width", 1.5)
        .style("fill", "none")

    function reset() {

      y.domain([0,1.1])
          yAxis.transition().duration(1000).call(d3.axisLeft(y));

      line
        .datum(data_early)
        .transition()
        .duration(500)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70 })
          .y(function(d) { return y(d.y) + 10 })
        )
        .attr("stroke", "steelblue")

      line2
        .datum(zero_line)
        .transition()
        .duration(0)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70 })
          .y(function(d) { return y(d.y) + 10 })
        )

        document.getElementById("cfdinfo").innerHTML = "";
        document.getElementById("cfdinfo").style.borderColor = "white";

    }

    function cfdstage1() {

      y.domain([0,1.1])
          yAxis.transition().duration(1000).call(d3.axisLeft(y));


      var cfd_stage1 = [];
      cfd_stage1[0] = {x: 0, y: 0};

      for(var i = 0; i < (1221-delay); i++){
        cfd_stage1[i] = {x: i, y: data_early[i].y * 0.3}
      }

      line
        .datum(cfd_stage1)
        .transition()
        .duration(500)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70 })
          .y(function(d) { return y(d.y) + 10 })
        )
        .attr("stroke", "steelblue")

      line2
        .datum(zero_line)
        .transition()
        .duration(100)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70 })
          .y(function(d) { return y(d.y) + 10 })
        )

        document.getElementById("cfdinfo").innerHTML = "<b>CFD Stage 1:</b> The input pulse (which could be the preamplifier output or the output of a fast timing amplifier) is attenuated by a constant fraction f, which corresponds to the desired fraction of the full amplitude.";
        document.getElementById("cfdinfo").style.borderColor = "black";

    }

    function cfdstage2(){

      y.domain([-1.1,1.1])
          yAxis.transition().duration(1000).call(d3.axisLeft(y));


      line
        .datum(data)
        .transition()
        .duration(500)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70 })
          .y(function(d) { return y(d.y_500*-1) + 10 })
        )
        .attr("stroke", "steelblue")

        document.getElementById("cfdinfo").innerHTML = "<b>CFD Stage 2:</b> Secondly, the input waveform is inverted and delayed by a time greater than the pulse rise time.";
        document.getElementById("cfdinfo").style.borderColor = "black";

      line2
        .datum(zero_line)
        .transition()
        .duration(100)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70 })
          .y(function(d) { return y(d.y) + 10 })
        )

    }

    function cfdstage3(){

      var cfd_stage3 = [];
      cfd_stage3[0] = {x: 0, y: 0};

      for(var i = 0; i < (1221-delay); i++){
        if(i < (1221-delay)){
          cfd_stage3[i] = {x: i, y: (data[i].y_500 * -1)+(data_early[i].y * 0.3)};
        }
        else{
          cfd_stage3[i] = {x: i, y: (data[i].y_500 * -1)};
        }
      }

      y.domain([-1.1,1.1])
          yAxis.transition().duration(1000).call(d3.axisLeft(y));

      line
        .datum(cfd_stage3)
        .transition()
        .duration(500)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70 })
          .y(function(d) { return y(d.y) + 10 })
        )
        .attr("stroke", "steelblue")

      line2
        .datum(zero_line)
        .transition()
        .duration(100)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70 })
          .y(function(d) { return y(d.y) + 10 })
        )

        document.getElementById("cfdinfo").innerHTML = "<b>CFD Stage 3:</b> The attenuated pulse and the delayed/inverted pulse are then summed.";
        document.getElementById("cfdinfo").style.borderColor = "black";

    }

    d3.select("#resetbutton").on("click", function(d) {
      reset()
    })

    d3.select("#cfdstage1").on("click", function(d) {
      cfdstage1()
    })

    d3.select("#cfdstage2").on("click", function(d) {
      cfdstage2()
    })

    d3.select("#cfdstage3").on("click", function(d) {
      cfdstage3()
    })
  }
)
