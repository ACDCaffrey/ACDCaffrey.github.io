/*
 *  INIT COUNTER TO SHOW 000000
 */
var display = new SegmentDisplay("display");
display.pattern         = "######";
display.displayAngle    = 10;
display.digitHeight     = 20;
display.digitWidth      = 12;
display.digitDistance   = 2.5;
display.segmentWidth    = 2.5;
display.segmentDistance = 0.5;
display.segmentCount    = 7;
display.cornerType      = 3;
display.colorOn         = "#3d599e";
display.colorOff        = "#f5f5f5";
display.draw();
display.setValue('      ');
// ********************************************************************



var start_btn = document.getElementById('start');
var distance;

start_btn.addEventListener('click', function(ev) {
  // Get the distance value to use in the calculations:
  distance = document.getElementById('distance').value;
  ev.preventDefault();
  ev.target.disabled = true;
  animate_counter();
});


function l(a) {
  console.log(a);
}



function animate_counter() {

  var time = 10;
  var counts =  54;

  var I1 = 941;
  var d1 = 1;

  var dx = distance;
  var Ix = Number(((I1*d1*d1)/Math.pow(dx,2)).toFixed(0));
  var Ix = Number((Ix*gaussianRandom(0.1, 1.9)).toFixed(0));

  // Create an array the length of counts:
  var count_intervals = new Array(Ix);

  // Assign regular time intervals multiplied by some random factor:
  var reg_time_interval = time/Ix;
  for(var i = 0; i < count_intervals.length; i++) {
    count_intervals[i] = reg_time_interval*(Math.random()*(1.900 - 0.100) + 0.100);
  }
  var counter = document.getElementById('counter');
  var counts = 1;


  // Self-invoking function to simulate randomness on the counts coming in:
  (function count(i) {
    var interval = count_intervals[i-1];
    setTimeout(function() {
      var counts_as_string = counts.toString();
      var disp = (counts_as_string).padStart(6, ' ');
      display.setValue(disp);
      counts++;
      if (--i) { 
        count(i);
      } else {
        start_btn.disabled = false;
      }
    }, interval*1000);
  })(count_intervals.length);
}



/*
 * PAIR OF FUNCTIONS TO PROVIDE A GAUSSIAN-DISTRIBUTED
 * RANDOM NUMBER (APPROXIMATE USING CLT) BETWEEN START 
 * AND END VALUES
 */
function gaussianRand() {
  var rand = 0;
  
  var samp_size = 50;
  for (var i = 0; i < samp_size; i += 1) {
    rand += Math.random();
  }

  return rand / samp_size;
}

function gaussianRandom(start, end) {
  return start + gaussianRand() * (end - start);
}
// ********************************************************
