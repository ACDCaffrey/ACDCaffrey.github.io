

// from w3resource
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
let data = []


function roll(){

  var rolls = document.getElementById("roll_input").value;
  data = new Array(rolls);

  for(let i = 0; i < (rolls); i++){
    var num = Math.floor(Math.random() * Math.floor(6)) + 1;
    data[i] = num;
  }

  chart.data = [{
    "number": "One",
    "times": countOccurrences(data, 1)
  }, {
    "number": "Two",
    "times": countOccurrences(data, 2)
  }, {
    "number": "Three",
    "times": countOccurrences(data, 3)
  }, {
    "number": "Four",
    "times": countOccurrences(data, 4)
  }, {
    "number": "Five",
    "times": countOccurrences(data, 5)
  }, {
    "number": "Six",
    "times": countOccurrences(data, 6)
  }];

}



am4core.useTheme(am4themes_animated);

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);

// Create axes
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "number";
categoryAxis.renderer.grid.template.location = 0;
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "Occurrences";
valueAxis.title.fontSize = 24;
valueAxis.fontFamily = "sans-serif";
valueAxis.title.fontWeight = "bold";

// initial data
chart.data = [{
  "number": "One",
  "times": countOccurrences(data, 1)
}, {
  "number": "Two",
  "times": countOccurrences(data, 2)
}, {
  "number": "Three",
  "times": countOccurrences(data, 3)
}, {
  "number": "Four",
  "times": countOccurrences(data, 4)
}, {
  "number": "Five",
  "times": countOccurrences(data, 5)
}, {
  "number": "Six",
  "times": countOccurrences(data, 6)
}];

valueAxis.min = 0;
valueAxis.maxPrecision = 0;

// Create series
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "times";
series.dataFields.categoryX = "number";
series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
series.columns.template.fillOpacity = .8;
series.stroke = "#3445e0"
series.fill = "#3445e0";


var bullet = series.bullets.push(new am4charts.LabelBullet());
bullet.label.text = "{times}";
bullet.label.verticalCenter = "top";
bullet.label.dy = 10;
bullet.label.fontSize = 20;
bullet.radius = 20;
