

/*
 *  GLOBAL VARIABLES
 */
var selected_series = null;
var is_log = false;
var frm = document.getElementById('controls');
frm.addEventListener("submit", function(ev) {
  ev.preventDefault();
});

// **************************************************************







/*
 *  SET UP THE CHART AND ADD A BLANK LINESERIES
 */

// Chart options
var chart = am4core.create("chart", am4charts.XYChart);
chart.cursor = new am4charts.XYCursor();
chart.cursor.behavior = "none";
chart.legend = new am4charts.Legend();

// X axis:
var x_axis = chart.xAxes.push(new am4charts.ValueAxis());
x_axis.title.text = "Distance (cm)";
x_axis.min = 0;
x_axis.max = 10;

// Y axis:
var y_axis = chart.yAxes.push(new am4charts.ValueAxis());
y_axis.title.text = "Counts";
y_axis.min = 0;
y_axis.max = 1200;

// Series:
var series = chart.series.push(new am4charts.LineSeries());
series.name = "Counts vs. Distance";
series.dataFields.valueX = "x";
series.dataFields.valueY = "y";
series.strokeOpacity = 0; // Turn the connecting line off
series.data = [];
var plot_bullet = series.bullets.push(new am4charts.Bullet());

// Bullet:
//var bullet = series[0].series.bullets.push(new am3charts.Bullet());
var circle = plot_bullet.createChild(am4core.Circle);
circle.width = 10;
circle.height = 10;
circle.horizontalCenter = "middle";
circle.verticalCenter = "middle";


/*
 *  PUSH LINE OF BEST FIT SERIES ONTO SERIES LIST
 */
var cu_lobf = chart.series.push(new am4charts.LineSeries());
cu_lobf.name = "Line of best fit";
cu_lobf.dataFields.valueX = "x";
cu_lobf.dataFields.valueY = "y";
cu_lobf.strokeOpacity = 1;
cu_lobf.data = [];
// *************************************************************************************








/*
 *  TRACK THE CURSOR POSITION IN AN OBJECT USING THE CURSORPOSITIONCHANGED
 *  EVENTLISTENER, THEN USE THAT VALUE TO DETERMINE WHERE THE USER CLICKED
 *  ON THE CHART.
 */
let cursor_position = {
  x:null,
  y:null
};

chart.cursor.events.on("cursorpositionchanged", function(ev) {
  let x_axis = ev.target.chart.xAxes.getIndex(0);
  let y_axis = ev.target.chart.yAxes.getIndex(0);
  cursor_position.x = x_axis.positionToValue(x_axis.toAxisPosition(ev.target.xPosition));
  cursor_position.y = y_axis.positionToValue(y_axis.toAxisPosition(ev.target.yPosition));
  update_coordinate_display(cursor_position);
});

chart.plotContainer.events.on("hit", function(ev) {
  series.addData({"x":cursor_position.x,"y":cursor_position.y});
}, this);

function update_coordinate_display(pos) {
  let coords = document.getElementById('coords');
  coords.innerHTML = "Cursor position: (" + (pos.x).toFixed(1) + "," + (pos.y).toFixed(1) + ")";
}
// ****************************************************************************************




/*
 *  FUNCTION TO SORT LIST OF OBJECTS BASED ON X VALUE:
 */
function compare(a,b) {
  if(a.x < b.x) {
    return -1;
  }
  if(a.x > b.x) {
    return 1;
  }
  return 0;
}






/*
 *  HANDLE CONTROL CHANGES AS BEFORE
 */
var log_btn          = document.getElementById('toggle_log');
var grad_slider      = document.getElementById('slope');
var intercept_slider = document.getElementById('intercept');

/*
 * TOGGLE LOG/LINEAR
 */
log_btn.addEventListener("click", function(ev) {
  ev.preventDefault();
  if(y_axis.logarithmic) {
    // Change to linear and hide trendline
    is_log = false;
    cu_lobf.setVisibility(false);
    y_axis.min = x_axis.min = 0;
    y_axis.logarithmic = x_axis.logarithmic = false;
    log_btn.textContent = 'Log scale';
  } else {
    // Change to logarithmic and show trendline
    is_log = true;
    cu_lobf.setVisibility(true);
    y_axis.min = x_axis.min = 1;
    y_axis.logarithmic = x_axis.logarithmic = true;
    log_btn.textContent = 'Linear scale';
  }
});


/*
 * UPDATE THE LINE OF BEST FIT BASED ON INPUT SLIDERS
 */
grad_slider.addEventListener("input", function(ev) {
  ev.preventDefault();
  document.getElementById('slope_value').innerHTML = ev.target.value;
  var lp = calculate_lobf_y();
  if(lp.length > 0) {
    cu_lobf.data = [];
    cu_lobf.addData({"x":lp[0][0],"y":lp[0][1]});
    cu_lobf.addData({"x":lp[1][0],"y":lp[1][1]});
  }
});

intercept_slider.addEventListener("input", function(ev) {
  ev.preventDefault();
  document.getElementById('intercept_value').innerHTML = ev.target.value;
  var lp = calculate_lobf_y();
  if(lp.length > 0) {
    cu_lobf.data = [];
    cu_lobf.addData({"x":lp[0][0],"y":lp[0][1]});
    cu_lobf.addData({"x":lp[1][0],"y":lp[1][1]});
  }
});

function calculate_lobf_y() {
  let line_points = [];

  let slope     = Number(document.getElementById('slope').value);
  let intercept = Number(document.getElementById('intercept').value);
  let x0 = 1;
  let x1 = 10;

  if(is_log) {
    line_points.push([x0, Math.pow(x0,slope)*intercept]);
    line_points.push([x1, Math.pow(x1,slope)*intercept]);
    document.getElementById('error').innerHTML = '';
  } else {
    document.getElementById('error').innerHTML = 'Change to log scale to view line of best fit!';
  }

  return line_points;
}
// ****************************************************************************************
