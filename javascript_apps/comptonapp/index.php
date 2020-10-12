
<html lang="en-GB">
<head>
  <title>Signal Timing</title>
  <link rel="stylesheet" type="text/css" href="/stylesheet.css">
  <meta charset="UTF-8">
  <meta name="description" content="Time to die">
  <meta name="keywords" content="signal, nuclear instrumentation, timing, cfd">
  <meta name="author" content="adamcaffrey">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://d3js.org/d3.v6.min.js"></script>
</head>

<body>

  <div id="main_wrapper">

    <label for="energyInput">Enter a gamma-ray energy:</label>
    <input type="number" value = 1000 id="energyinput" onchange="updatecomptonplot()">

    <div id="comptonapp"></div>

  </div>

  <script src="script.js"></script>

</body>
</html>
