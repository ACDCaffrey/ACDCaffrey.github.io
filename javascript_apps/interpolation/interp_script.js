var svg = d3.select("#pulseplot")
            .classed("svg-container", true)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 690 380")
            .classed("svg-content-responsive", true);

// Read the data
d3.csv("./rfile.csv",

  function(data) {

    var groups = [ {colname: "y_50", group: "50 MHz"},
                   {colname: "y_100", group: "100 MHz"},
                   {colname: "y_125", group: "125 MHz"},
                   {colname: "y_250", group: "250 MHz"},
                   {colname: "y_500", group: "500 MHz"}];

    // add the options to the button
    d3.select("#selectfrequency")
      .selectAll('myOptions')
        .data(groups)
      .enter()
        .append('option')
      .text(function (d) {return d.group;}) // text showed in the menu
      .attr("value", function (d) { return d.colname; }) // corresponding value returned by the button

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
              .range([300, 0 ]);

    svg.append("g")
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

    // Initialize line with group a
    var line = svg
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70})
          .y(function(d) { return y(d.y_50) + 10})
        )
        .attr("stroke", "steelblue")
        .style("stroke-width", 1.5)
        .style("fill", "none")

    var line2 = svg
      .append('g')
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 0)
      .attr("stroke-width", 1)
      .attr("stroke", "white");

    var line3 = svg
      .append('g')
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 0)
      .attr("stroke-width", 1)
      .attr("stroke", "white");

    var line4 = svg
      .append('g')
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 0)
      .attr("stroke-width", 1)
      .attr("stroke", "white");


    var line2_2 = svg
      .append('g')
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 0)
      .attr("stroke-width", 1)
      .attr("stroke", "white");

    var line3_2 = svg
      .append('g')
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 0)
      .attr("stroke-width", 1)
      .attr("stroke", "white");

    var line4_2 = svg
      .append('g')
      .append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", 0)
      .attr("stroke-width", 1)
      .attr("stroke", "white");

    var rtlabt90 = svg
        .append("text")
        .attr("y", 100)
        .attr("x", -150)
        .attr("dy", "0em")
        .style("text-anchor", "middle")
        .text("");

    var rtlabt10 = svg
        .append("text")
        .attr("y", 100)
        .attr("x", -150)
        .attr("dy", "0em")
        .style("text-anchor", "middle")
        .text("");

    var rtlabt50 = svg
        .append("text")
        .attr("y", 100)
        .attr("x", -150)
        .attr("dy", "0em")
        .style("text-anchor", "middle")
        .text("");

    // A function that update the chart
    function update(selectedGroup) {

      // Create new data with the selection?
      var dataFilter = data.map(function(d){return {x: d.x, y: d[selectedGroup]} })

      console.log(dataFilter);

      line2
        .transition()
        .duration(0)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("x1", 70)
        .attr("x2", 70)
        .attr("stroke", "white")

      line3
        .transition()
        .duration(0)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("x1", 70)
        .attr("x2", 70)
        .attr("stroke", "white")

      line4
        .transition()
        .duration(0)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("x1", 70)
        .attr("x2", 70)
        .attr("stroke", "white")

    line2_2
      .transition()
      .duration(0)
      .attr("y1", 310)
      .attr("y2", 310)
      .attr("x1", 70)
      .attr("x2", 70)
      .attr("stroke", "white")

    line3_2
      .transition()
      .duration(0)
      .attr("y1", 310)
      .attr("y2", 310)
      .attr("x1", 70)
      .attr("x2", 70)
      .attr("stroke", "white")

    line4_2
      .transition()
      .duration(0)
      .attr("y1", 310)
      .attr("y2", 310)
      .attr("x1", 70)
      .attr("x2", 70)
      .attr("stroke", "white")

      rtlabt90
          .transition()
          .duration(0)
          .attr("y", 100)
          .attr("x", -150)
          .attr("dy", "0em")
          .text("");

      rtlabt50
          .transition()
          .duration(0)
          .attr("y", 100)
          .attr("x", -150)
          .attr("dy", "0em")
          .text("");

      rtlabt10
          .transition()
          .duration(0)
          .attr("y", 100)
          .attr("x", -150)
          .attr("dy", "0em")
          .text("");


      // Give these new data to update line
      line
        .datum(dataFilter)
        .transition()
        .duration(500)
        .attr("d", d3.line().curve(d3.curveStepAfter)
          .x(function(d) { return x(d.x) + 70 })
          .y(function(d) { return y(d.y) + 10 })
        )
        .attr("stroke", "steelblue")
    }

    function updateRisetime(selectedGroup){

      var current_data = data.map(function(d){return {x: d.x, y: d[selectedGroup]} })
      var x1 = 0, x2 = 0, x3 = 0;
      var y1 = 0, y2 = 0, y3 = 0;
      var lock1 = 0, lock2 = 0, lock3 = 0;

      for(var i = 0; i < 1200; i++){

        if(current_data[i].y >= 0.9 && lock1 == 0){
          lock1 = 1
          y1 = parseFloat(current_data[i].y);
          x1 = current_data[i].x;
        }

        if(current_data[i].y >= 0.1 && lock2 == 0){
          lock2 = 1
          y2 = parseFloat(current_data[i].y);
          x2 = current_data[i].x;
        }

        if(current_data[i].y >= 0.5 && lock3 == 0){
          lock3 = 1
          y3 = parseFloat(current_data[i].y);
          x3 = current_data[i].x;
        }

      }

      // t90 risetime, 10 and 310, diff is 300. bottom is 310, top is 10. 310 - ? = y.
      // canvas is 300 units, this is equal to an axis height of 1.1. 310 - (?/300)*1.1
      line2
        .transition()
        .duration(500)
        .attr("y1", 310 - (300/1.1)*y1)
        .attr("y2", 310 - (300/1.1)*y1)
        .attr("x1", 70)
        .attr("x2", x1*(600/1260) + 70)
        .attr("stroke", "black")

      line3
        .transition()
        .duration(500)
        .attr("y1", 310 - (300/1.1)*y2)
        .attr("y2", 310 - (300/1.1)*y2)
        .attr("x1", 70)
        .attr("x2", x2*(600/1260) + 70)
        .attr("stroke", "black")

      line4
        .transition()
        .duration(500)
        .attr("y1", 310 - (300/1.1)*y3)
        .attr("y2", 310 - (300/1.1)*y3)
        .attr("x1", 70)
        .attr("x2", x3*(600/1260) + 70)
        .attr("stroke", "black")

    line2_2
      .transition()
      .duration(500)
      .attr("y1", 310)
      .attr("y2", 310 - (300/1.1)*y1)
      .attr("x1", x1*(600/1260) + 70)
      .attr("x2", x1*(600/1260) + 70)
      .attr("stroke", "black")

    line3_2
      .transition()
      .duration(500)
      .attr("y1", 310)
      .attr("y2", 310 - (300/1.1)*y2)
      .attr("x1", x2*(600/1260) + 70)
      .attr("x2", x2*(600/1260) + 70)
      .attr("stroke", "black")

    line4_2
      .transition()
      .duration(500)
      .attr("y1", 310)
      .attr("y2", 310 - (300/1.1)*y3)
      .attr("x1", x3*(600/1260) + 70)
      .attr("x2", x3*(600/1260) + 70)
      .attr("stroke", "black")

      rtlabt90
          .transition()
          .duration(500)
          .attr("y", 310 - (300/1.1)*y1 - 20)
          .attr("x", 140)
          .attr("dy", "1em")
          .text("t90 = " + x1 + " ns");

      rtlabt50
          .transition()
          .duration(500)
          .attr("y", 310 - (300/1.1)*y3 - 20)
          .attr("x", 140)
          .attr("dy", "1em")
          .text("t50 = " + x3 + " ns");

      rtlabt10
          .transition()
          .duration(500)
          .attr("y", 310 - (300/1.1)*y2 - 20)
          .attr("x", 140)
          .attr("dy", "1em")
          .text("t10 = " + x2 + " ns");

    }

    // When the button is changed, run the updateChart function
    d3.select("#selectfrequency").on("change", function(d) {

      // recover the option that has been chosen
      var selectedOption = d3.select(this).property("value");
      // run the updateChart function with this selected option
      update(selectedOption)
    })

    d3.select("#risetimebutton").on("click", function(d) {
      var selectedOption = d3.select("#selectfrequency").property("value");
      updateRisetime(selectedOption)
    })
  }
)
