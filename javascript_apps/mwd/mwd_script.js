var svg2 = d3.select("#tracemwd2")
            .classed("svg-container", true)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 690 380")
            .classed("svg-content-responsive", true);

var decay = 6000;
var flat_top = 250;
var rise_time = 100;
var threshold = 100;
var av_window = 10;
var peaking_time = 10;
var diff_width = 175;
var delay = 100;

var keys = ["Trace", "Diff Trace", "Trigger", "Averaging Window"];

// Read the data
d3.csv("./trace.csv",

  function(data) {

    var risetimegroups = [{colname: "10", group: "10 ns"},
                          {colname: "50", group: "50 ns"},
                          {colname: "100", group: "100 ns"},
                          {colname: "150", group: "150 ns"},
                          {colname: "200", group: "200 ns"},
                          {colname: "250", group: "250 ns"}];

    var flattopgroups = [{colname: "50", group: "50 ns"},
                         {colname: "100", group: "100 ns"},
                         {colname: "150", group: "150 ns"},
                         {colname: "200", group: "200 ns"},
                         {colname: "250", group: "250 ns"},
                         {colname: "300", group: "300 ns"},
                         {colname: "350", group: "350 ns"}];

    var decaygroups = [{colname: "4000", group: "4 us"},
                       {colname: "5000", group: "5 us"},
                       {colname: "6000", group: "6 us"},
                       {colname: "7000", group: "7 us"},
                       {colname: "8000", group: "8 us"},
                       {colname: "9000", group: "9 us"},
                       {colname: "10000", group: "10 us"}];

    var avwindowgroups = [{colname: "10", group: "10 ns"},
                          {colname: "50", group: "50 ns"},
                          {colname: "100", group: "100 ns"}];

    var thresholdgroups = [{colname: "50", group: "50 mV"},
                           {colname: "100", group: "100 mV"},
                           {colname: "150", group: "150 mV"},
                           {colname: "200", group: "200 mV"}];

    var delaygroups = [{colname: "10", group: "10 ns"},
                       {colname: "50", group: "50 ns"},
                       {colname: "100", group: "100 ns"},
                       {colname: "150", group: "150 ns"},
                       {colname: "200", group: "200 ns"}];

    // // add the options to the button
    d3.select("#selectrisetime")
      .selectAll('myOptions')
        .data(risetimegroups)
      .enter()
        .append('option')
      .text(function (d) {return d.group;}) // text showed in the menu
      .attr("value", function (d) { return d.colname; }) // corresponding value returned by the button

    d3.select("#selectflattop")
      .selectAll('myOptions')
        .data(flattopgroups)
      .enter()
        .append('option')
      .text(function (d) {return d.group;}) // text showed in the menu
      .attr("value", function (d) { return d.colname; }) // corresponding value returned by the button

    d3.select("#selectdecay")
      .selectAll('myOptions')
        .data(decaygroups)
      .enter()
        .append('option')
      .text(function (d) {return d.group;}) // text showed in the menu
      .attr("value", function (d) { return d.colname; }) // corresponding value returned by the button

    d3.select("#selectavwindow")
      .selectAll('myOptions')
        .data(avwindowgroups)
      .enter()
        .append('option')
      .text(function (d) {return d.group;}) // text showed in the menu
      .attr("value", function (d) { return d.colname; }) // corresponding value returned by the button

    d3.select("#selectthreshold")
      .selectAll('myOptions')
        .data(thresholdgroups)
      .enter()
        .append('option')
      .text(function (d) {return d.group;}) // text showed in the menu
      .attr("value", function (d) { return d.colname; }) // corresponding value returned by the button

    d3.select("#selectdelay")
      .selectAll('myOptions')
        .data(delaygroups)
      .enter()
        .append('option')
      .text(function (d) {return d.group;}) // text showed in the menu
      .attr("value", function (d) { return d.colname; }) // corresponding value returned by the button

    // Add X axis
    var x = d3.scaleLinear()
              .domain([0, 5000]) // axis limits
              .range([ 0, 600 ]);

    var xAxis = svg2.append("g")
                    .attr("transform", "translate(70," + 310 + ")") // x-axis shift
                    .call(d3.axisBottom(x));

    // text label for the x axis
    svg2.append("text")
       .attr("transform",
             "translate(" + 390 + " ," + 360 + ")")
       .style("text-anchor", "middle")
       .text("Time (ns)");

    // Add Y axis
    var y = d3.scaleLinear()
              .domain([0, 600]) // axis limits
              .range([300, 0 ]);

    var yAxis = svg2.append("g")
              .attr("transform", "translate(" + 70 + ",10)") // y-axis shift
              .call(d3.axisLeft(y));

    // text label for the y axis
    svg2.append("text")
        .attr("transform", "rotate(-90)") // vertical text
        .attr("y", 10)
        .attr("x", -150)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Amplitude (mV)");

    // Initialize line with group a
    var line = svg2
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70})
          .y(function(d) { return y(d.y) + 10})
        )
        .attr("stroke", "steelblue")
        .style("stroke-width", 1.5)
        .style("fill", "none");

    var line2 = svg2
      .append('g')
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 0)
      .attr("stroke-width", 1)
      .attr("stroke", "white")
      .attr("opacity", 0);

    var line3 = svg2
      .append('g')
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 0)
      .attr("stroke-width", 1)
      .attr("stroke", "white")
      .attr("opacity", 0);

    var line5 = svg2 // CFD line
      .append('g')
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 0)
      .attr("stroke-width", 1)
      .attr("stroke", "white")
      .attr("opacity", 0);

    var energylab = svg2
        .append("text")
        .attr("y", 310 - (300/600)*800)
        .attr("x", 70 + (600/1500)*1400)
        .attr("dy", "0em")
        .style("text-anchor", "middle")
        .text("")
        .attr("opacity", 0);

    var tracelab = svg2
        .append("text")
        .attr("y", 310 - (300/600)*700)
        .attr("x", 70 + (600/1500)*1400)
        .attr("dy", "0em")
        .style("text-anchor", "middle")
        .text("")
        .attr("opacity", 0);

    var difftracelab = svg2
        .append("text")
        .attr("y", 310 - (300/600)*600)
        .attr("x", 70 + (600/1500)*1400)
        .attr("dy", "0em")
        .style("text-anchor", "middle")
        .text("")
        .attr("opacity", 0);

    var thresholdlab = svg2
        .append("text")
        .attr("y", 310 - (300/600)*500)
        .attr("x", 70 + (600/1500)*1400)
        .attr("dy", "0em")
        .style("text-anchor", "middle")
        .text("")
        .attr("opacity", 0);

    var avwindowlab = svg2
        .append("text")
        .attr("y", 310 - (300/600)*400)
        .attr("x", 70 + (600/1500)*1400)
        .attr("dy", "0em")
        .style("text-anchor", "middle")
        .text("")
        .attr("opacity", 0);

    var line4 = svg2 // CFD line
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70})
          .y(function(d) { return y(d.y) + 10})
        )
        .attr("stroke", "steelblue")
        .style("stroke-width", 1.5)
        .style("fill", "none")
        .attr("opacity", 0);

    function resetPulse(){


      x.domain([0,5000])
          xAxis.transition().duration(1000).call(d3.axisBottom(x))

      y.domain([0,600])
          yAxis.transition().duration(1000).call(d3.axisLeft(y))

        // // Give these new data to update line

        line2
          .transition()
          .duration(10)
          .attr("y1", 0)
          .attr("y2", 0)
          .attr("x1", 0)
          .attr("x2", 0)
          .attr("stroke", "white")
          .attr("opacity", 0);

        line3
          .transition()
          .duration(10)
          .attr("y1", 0)
          .attr("y2", 0)
          .attr("x1", 0)
          .attr("x2", 0)
          .attr("stroke", "white")
          .attr("opacity", 0);

        line4
          .transition()
          .duration(10)
          .attr("y1", 0)
          .attr("y2", 0)
          .attr("x1", 0)
          .attr("x2", 0)
          .attr("stroke", "white")
          .attr("opacity", 0);

        line5
          .transition()
          .duration(10)
          .attr("y1", 0)
          .attr("y2", 0)
          .attr("x1", 0)
          .attr("x2", 0)
          .attr("stroke", "white")
          .attr("opacity", 0);

        energylab
            .transition()
            .duration(0)
            .attr("y", 310 - (300/600)*800)
            .attr("x", 70 + (600/1500)*1400)
            .attr("dy", "0em")
            .text("")
            .attr("opacity", 0);

        tracelab
            .transition()
            .duration(0)
            .attr("y", 310 - (300/600)*700)
            .attr("x", 70 + (600/1500)*1400)
            .attr("dy", "0em")
            .text("")
            .attr("opacity", 0);

        difftracelab
            .transition()
            .duration(0)
            .attr("y", 310 - (300/600)*600)
            .attr("x", 70 + (600/1500)*1400)
            .attr("dy", "0em")
            .text("")
            .attr("opacity", 0);

        thresholdlab
            .transition()
            .duration(0)
            .attr("y", 310 - (300/600)*500)
            .attr("x", 70 + (600/1500)*1400)
            .attr("dy", "0em")
            .text("")
            .attr("opacity", 0);

        avwindowlab
            .transition()
            .duration(0)
            .attr("y", 310 - (300/600)*400)
            .attr("x", 70 + (600/1500)*1400)
            .attr("dy", "0em")
            .text("")
            .attr("opacity", 0);

      line
        .datum(data)
        .transition()
        .duration(500)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70 })
          .y(function(d) { return y(d.y) + 10 })
        )
        .attr("stroke", "steelblue")
}

    // A function that update the chart
    function updateStage1() {

      var trace_output = [];
      // mwd stage 1

      trace_output[0] = {x:0, y:0};

      for(var i = 1; i < 5000; i++){
        trace_output[i] = {x: data[i].x, y: data[i].y-(1-(1/decay))*data[i-1].y + trace_output[i-1].y };
      }

      x.domain([0,5000])
          xAxis.transition().duration(1000).call(d3.axisBottom(x))

      y.domain([0,600])
          yAxis.transition().duration(1000).call(d3.axisLeft(y))

      // // Give these new data to update line

      line2
        .transition()
        .duration(10)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("stroke", "white")
        .attr("opacity", 0);

      line3
        .transition()
        .duration(10)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("stroke", "white")
        .attr("opacity", 0);

      line4
        .transition()
        .duration(10)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("stroke", "white")
        .attr("opacity", 0);

      line5
        .transition()
        .duration(10)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("stroke", "white")
        .attr("opacity", 0);

      energylab
          .transition()
          .duration(0)
          .attr("y", 310 - (300/600)*800)
          .attr("x", 70 + (600/1500)*1400)
          .attr("dy", "0em")
          .text("")
          .attr("opacity", 0);

      tracelab
          .transition()
          .duration(0)
          .attr("y", 310 - (300/600)*700)
          .attr("x", 70 + (600/1500)*1400)
          .attr("dy", "0em")
          .text("")
          .attr("opacity", 0);

      difftracelab
          .transition()
          .duration(0)
          .attr("y", 310 - (300/600)*600)
          .attr("x", 70 + (600/1500)*1400)
          .attr("dy", "0em")
          .text("")
          .attr("opacity", 0);

      thresholdlab
          .transition()
          .duration(0)
          .attr("y", 310 - (300/600)*500)
          .attr("x", 70 + (600/1500)*1400)
          .attr("dy", "0em")
          .text("")
          .attr("opacity", 0);

      avwindowlab
          .transition()
          .duration(0)
          .attr("y", 310 - (300/600)*400)
          .attr("x", 70 + (600/1500)*1400)
          .attr("dy", "0em")
          .text("")
          .attr("opacity", 0);

      line
        .datum(trace_output)
        .transition()
        .duration(500)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70 })
          .y(function(d) { return y(d.y) + 10 })
        )
        .attr("stroke", "steelblue")
    }

    // A function that update the chart
    function updateStage2() {

      var trace_output = [];
      var trace_output2 = [];

      trace_output[0] = {x:0, y:0};
      trace_output2[0] = {x:0, y:0};

      for(var i = 1; i < 5000; i++){
        // mwd stage 1
        trace_output[i] = {x: data[i].x, y: data[i].y-(1-(1/decay))*data[i-1].y + trace_output[i-1].y };

        // mwd stage 2
        if(i <= flat_top){
          trace_output2[i] = {x: data[i].x, y: 0};
        }
        else{
          trace_output2[i] = {x: data[i].x, y: Math.round(trace_output[i].y - trace_output[i-flat_top].y)};
        }
      }

      x.domain([0,1500])
          xAxis.transition().duration(1000).call(d3.axisBottom(x))

      y.domain([0,600])
          yAxis.transition().duration(1000).call(d3.axisLeft(y))

      energylab
          .transition()
          .duration(0)
          .attr("y", 310 - (300/600)*800)
          .attr("x", 70 + (600/1500)*1400)
          .attr("dy", "0em")
          .text("")
          .attr("opacity", 0);

      tracelab
          .transition()
          .duration(0)
          .attr("y", 310 - (300/600)*700)
          .attr("x", 70 + (600/1500)*1400)
          .attr("dy", "0em")
          .text("")
          .attr("opacity", 0);

      difftracelab
          .transition()
          .duration(0)
          .attr("y", 310 - (300/600)*600)
          .attr("x", 70 + (600/1500)*1400)
          .attr("dy", "0em")
          .text("")
          .attr("opacity", 0);

      thresholdlab
          .transition()
          .duration(0)
          .attr("y", 310 - (300/600)*500)
          .attr("x", 70 + (600/1500)*1400)
          .attr("dy", "0em")
          .text("")
          .attr("opacity", 0);

      avwindowlab
          .transition()
          .duration(0)
          .attr("y", 310 - (300/600)*400)
          .attr("x", 70 + (600/1500)*1400)
          .attr("dy", "0em")
          .text("")
          .attr("opacity", 0);

      line2
        .transition()
        .duration(10)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("stroke", "white")
        .attr("opacity", 0);

      line3
        .transition()
        .duration(10)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("stroke", "white")
        .attr("opacity", 0);

      line4
        .transition()
        .duration(10)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("stroke", "white")
        .attr("opacity", 0);

      line5
        .transition()
        .duration(10)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("stroke", "white")
        .attr("opacity", 0);

      line
        .datum(trace_output2)
        .transition()
        .duration(500)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70 })
          .y(function(d) { return y(d.y) + 10 })
        )
        .attr("stroke", "steelblue")

    }

    // A function that update the chart
    function updateStage3() {

      var trace_output = [];
      var trace_output2 = [];
      var trace_output3 = [];

      trace_output[0] = {x:0, y:0};
      trace_output2[0] = {x:0, y:0};

      trace_output3[0] = {x:0, y:0};
      for(var i = 1; i < 5000; i++){
        trace_output3[i] = {x: 0, y: 0}; // initialise
      }

      for(var i = 1; i < 5000; i++){
        // mwd stage 1
        trace_output[i] = {x: data[i].x, y: data[i].y-(1-(1/decay))*data[i-1].y + trace_output[i-1].y };

        // mwd stage 2
        if(i <= flat_top){
          trace_output2[i] = {x: data[i].x, y: 0};
        }
        else{
          trace_output2[i] = {x: data[i].x, y: Math.round(trace_output[i].y - trace_output[i-flat_top].y)};
        }

        // mwd stage 3
        av = 0;
        if(i >= rise_time) {
          for(var ii = 0; ii < rise_time; ii++){
            av += trace_output2[i - ii].y;
          }
          av /= rise_time;
          trace_output3[i] = {x: data[i].x, y: Math.round(av)};
        }
      }

      x.domain([0,1500])
          xAxis.transition().duration(1000).call(d3.axisBottom(x))

      y.domain([0,600])
          yAxis.transition().duration(1000).call(d3.axisLeft(y))

      energylab
          .transition()
          .duration(0)
          .attr("y", 310 - (300/600)*800)
          .attr("x", 70 + (600/1500)*1400)
          .attr("dy", "0em")
          .text("")
          .attr("opacity", 0);

      tracelab
          .transition()
          .duration(0)
          .attr("y", 310 - (300/600)*700)
          .attr("x", 70 + (600/1500)*1400)
          .attr("dy", "0em")
          .text("")
          .attr("opacity", 0);

      difftracelab
          .transition()
          .duration(0)
          .attr("y", 310 - (300/600)*600)
          .attr("x", 70 + (600/1500)*1400)
          .attr("dy", "0em")
          .text("")
          .attr("opacity", 0);

      thresholdlab
          .transition()
          .duration(0)
          .attr("y", 310 - (300/600)*500)
          .attr("x", 70 + (600/1500)*1400)
          .attr("dy", "0em")
          .text("")
          .attr("opacity", 0);

      avwindowlab
          .transition()
          .duration(0)
          .attr("y", 310 - (300/600)*400)
          .attr("x", 70 + (600/1500)*1400)
          .attr("dy", "0em")
          .text("")
          .attr("opacity", 0);

      line2
        .transition()
        .duration(10)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("stroke", "white")
        .attr("opacity", 0);

      line3
        .transition()
        .duration(10)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("stroke", "white")
        .attr("opacity", 0);

      line4
        .transition()
        .duration(10)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("stroke", "white")
        .attr("opacity", 0);

      line5
        .transition()
        .duration(10)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("stroke", "white")
        .attr("opacity", 0);

      line
        .datum(trace_output3)
        .transition()
        .duration(500)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70 })
          .y(function(d) { return y(d.y) + 10 })
        )
        .attr("stroke", "steelblue")

    }

    // A function that update the chart
    function updateEnergy() {

      var trace_output = [];
      var trace_output2 = [];
      var trace_output3 = [];
      var trace_output4 = [];

      var diff = [];
      var diff2 = [];
      var energy = 0;
      var start = 0;
      var end = 0;

      trace_output[0] = {x:0, y:0};
      trace_output2[0] = {x:0, y:0};
      trace_output3[0] = {x:0, y:0};
      trace_output4[0] = {x:0, y:0};


      diff[0] = 0;
      diff2[0] = 0;
      for(var i = 1; i < 5000; i++){
        trace_output3[i] = {x: 0, y: 0}; // initialise
        trace_output4[i] = {x: 0, y: 0};
        diff[i] = 0;
        diff2[i] = 0;
      }

      var buff = 0;

      for(var i = 1; i < 5000; i++){
        // mwd stage 1
        trace_output[i] = {x: data[i].x, y: data[i].y-(1-(1/decay))*data[i-1].y + trace_output[i-1].y };

        // mwd stage 2
        if(i <= flat_top){
          trace_output2[i] = {x: data[i].x, y: 0};
        }
        else{
          trace_output2[i] = {x: data[i].x, y: Math.round(trace_output[i].y - trace_output[i-flat_top].y)};
        }

        // mwd stage 3
        av = 0;
        if(i >= rise_time) {
          for(var ii = 0; ii < rise_time; ii++){
            av += trace_output2[i - ii].y;
          }
          av /= rise_time;
          trace_output3[i] = {x: data[i].x, y: Math.round(av)};
        }


        if (i >= diff_width){
          buff = trace_output3[i].y - trace_output3[i-diff_width].y;
          if (buff > 0) diff[i] = buff;
          buff = diff[i] - diff[i-diff_width];
          diff2[i] = buff;// + 1000;
        }

        trace_output4[i] = {x: data[i].x, y: diff2[i]}

      }

      // loop through cfd trace
      for(var i = 1; i < 1200; i++){

        if (diff2[i] > threshold){

          // move to centre of flat top
          i = i + delay;

          var start = i;

          // average energy over window
          for (var ii = i; ii < i + av_window; ii++){
            energy = energy + trace_output3[ii].y;
          }

          var end = start + av_window;

          energy /= av_window;

          // move to the end of the peak if average
          i = 1190;

        }
      }

      x.domain([0,1500])
          xAxis.transition().duration(1000).call(d3.axisBottom(x))

      // y.domain([-400,400])
      //     yAxis.transition().duration(1000).call(d3.axisLeft(y))

          y.domain([0,600])
              yAxis.transition().duration(1000).call(d3.axisLeft(y))


      line
        .datum(trace_output3)
        .transition()
        .duration(500)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70 })
          .y(function(d) { return y(d.y) + 10 })
        )
        .attr("stroke", "steelblue")

      line2
        .transition()
        .duration(500)
        .attr("y1", 310 - (300/600)*(energy - 50))
        .attr("y2", 310 - (300/600)*(energy + 50))
        .attr("x1", 70 + (600/1500)*end)
        .attr("x2", 70 + (600/1500)*end)
        .attr("stroke", "red")
        .attr("opacity", 0.9);

      line3
        .transition()
        .duration(500)
        .attr("y1", 310 - (300/600)*(energy - 50))
        .attr("y2", 310 - (300/600)*(energy + 50))
        .attr("x1", 70 + (600/1500)*start)
        .attr("x2", 70 + (600/1500)*start)
        .attr("stroke", "red")
        .attr("opacity", 0.9);

      line4
        .datum(trace_output4)
        .transition()
        .duration(500)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70 })
          .y(function(d) { return y(d.y) + 10 })
        )
        .attr("stroke", "grey")
        .attr("opacity", 0)
        .style("stroke-dasharray", ("3, 3"));

    line5
      .transition()
      .duration(500)
      .attr("y1", 310 - (300/600)*(threshold))
      .attr("y2", 310 - (300/600)*(threshold))
      .attr("x1", 70)
      .attr("x2", 70 + (600/1500)*1500)
      .attr("stroke", "green")
      .attr("opacity", 0.9)
      .style("stroke-dasharray", ("3, 3"));

      energylab
          .transition()
          .duration(100)
          .attr("y", 310 - (300/800)*800)
          .attr("x", 38 + (600/1500)*1300)
          .attr("dy", "1em")
          .text(energy + " keV")
          .attr("opacity", 1);

      tracelab
          .transition()
          .duration(100)
          .attr("y", 310 - (300/800)*750)
          .attr("x", 21 + (600/1500)*1300)
          .attr("dy", "1em")
          .text("Trace")
          .attr("fill", "steelblue")
          .attr("opacity", 1);

      difftracelab
          .transition()
          .duration(100)
          .attr("y", 310 - (300/800)*700)
          .attr("x", 36 + (600/1500)*1300)
          .attr("dy", "1em")
          .text("Diff Trace")
          .attr("fill", "grey")
          .attr("opacity", 0);

      thresholdlab
          .transition()
          .duration(100)
          .attr("y", 310 - (300/800)*700)
          .attr("x", 27 + (600/1500)*1300)
          .attr("dy", "1em")
          .text("Trigger")
          .attr("fill", "green")
          .attr("opacity", 1);

      avwindowlab
          .transition()
          .duration(100)
          .attr("y", 310 - (300/800)*650)
          .attr("x", 70 + (600/1500)*1300)
          .attr("dy", "1em")
          .text("Averaging Window")
          .attr("fill", "red")
          .attr("opacity", 1);

    }

    // When the button is changed, run the updateChart function
    d3.select("#stage1mwdbutton").on("click", function(d) {

      decay = d3.select("#selectdecay").property("value");
      flat_top = d3.select("#selectflattop").property("value");
      rise_time = d3.select("#selectrisetime").property("value");

      document.getElementById("selectdecay").style.backgroundColor = "#a2c6db";
      document.getElementById("selectrisetime").style.backgroundColor = "white";
      document.getElementById("selectflattop").style.backgroundColor = "white";
      document.getElementById("selectavwindow").style.backgroundColor = "white";
      document.getElementById("selectthreshold").style.backgroundColor = "white";
      document.getElementById("selectdelay").style.backgroundColor = "white";

      updateStage1()

      document.getElementById("mwdinfo").innerHTML = "<b>MWD Stage 1:</b> The <b>decay</b> of the signal is accounted for to acheive a flat response.";
      document.getElementById("mwdinfo").style.borderColor = "black";
    })

    d3.select("#stage2mwdbutton").on("click", function(d) {

      decay = d3.select("#selectdecay").property("value");
      flat_top = d3.select("#selectflattop").property("value");
      rise_time = d3.select("#selectrisetime").property("value");

      document.getElementById("selectdecay").style.backgroundColor = "#a2c6db";
      document.getElementById("selectrisetime").style.backgroundColor = "white";
      document.getElementById("selectflattop").style.backgroundColor = "#a2c6db";
      document.getElementById("selectavwindow").style.backgroundColor = "white";
      document.getElementById("selectthreshold").style.backgroundColor = "white";
      document.getElementById("selectdelay").style.backgroundColor = "white";

      updateStage2()

      document.getElementById("mwdinfo").innerHTML = "<b>MWD Stage 2:</b> The signal is differentiated using a running-difference. The width of the differencing window is adjusted to provide an optimal trapezoid <b>flat top</b>.";
      document.getElementById("mwdinfo").style.borderColor = "black";
    })

    d3.select("#stage3mwdbutton").on("click", function(d) {

      decay = d3.select("#selectdecay").property("value");
      flat_top = d3.select("#selectflattop").property("value");
      rise_time = d3.select("#selectrisetime").property("value");

      document.getElementById("selectdecay").style.backgroundColor = "#a2c6db";
      document.getElementById("selectrisetime").style.backgroundColor = "#a2c6db";
      document.getElementById("selectflattop").style.backgroundColor = "#a2c6db";
      document.getElementById("selectavwindow").style.backgroundColor = "white";
      document.getElementById("selectthreshold").style.backgroundColor = "white";
      document.getElementById("selectdelay").style.backgroundColor = "white";

      updateStage3()

      document.getElementById("mwdinfo").innerHTML = "<b>MWD Stage 3:</b> A moving average is applied to the signal to reduce noise fluctuations. The filter width is set as (and determines) the trapezoid <b>risetime</b>.";
      document.getElementById("mwdinfo").style.borderColor = "black";
    })

    d3.select("#energybutton").on("click", function(d) {

      decay = d3.select("#selectdecay").property("value");
      flat_top = d3.select("#selectflattop").property("value");
      rise_time = d3.select("#selectrisetime").property("value");
      threshold = parseInt(d3.select("#selectthreshold").property("value"));
      av_window = parseInt(d3.select("#selectavwindow").property("value"));
      delay = parseInt(d3.select("#selectdelay").property("value"));

      document.getElementById("selectdecay").style.backgroundColor = "#a2c6db";
      document.getElementById("selectrisetime").style.backgroundColor = "#a2c6db";
      document.getElementById("selectflattop").style.backgroundColor = "#a2c6db";
      document.getElementById("selectavwindow").style.backgroundColor = "#a2c6db";
      document.getElementById("selectthreshold").style.backgroundColor = "#a2c6db";
      document.getElementById("selectdelay").style.backgroundColor = "#a2c6db";

      updateEnergy()

      document.getElementById("mwdinfo").innerHTML = "<b>MWD Stage 4:</b> The trapezoid is sampled to determine the corresponding energy. Once the <b>CFD treshold</b> value is met, and after a chosen delay, the sampling starts. The number of samples in the averaging window is determined by the <b>Av window time</b>.";
      document.getElementById("mwdinfo").style.borderColor = "black";
    })

    d3.select("#stagereset").on("click", function(d) {

      document.getElementById("selectdecay").style.backgroundColor = "white";
      document.getElementById("selectrisetime").style.backgroundColor = "white";
      document.getElementById("selectflattop").style.backgroundColor = "white";
      document.getElementById("selectavwindow").style.backgroundColor = "white";
      document.getElementById("selectthreshold").style.backgroundColor = "white";
      document.getElementById("selectdelay").style.backgroundColor = "white";

      resetPulse()
      document.getElementById("mwdinfo").innerHTML = "The MWD algorithm input is a typical slow-decaying charge sensitive preamplifer output.";
      document.getElementById("mwdinfo").style.borderColor = "black";
    })

  }
)
