import * as d3 from 'd3';
import _ from 'lodash';

var canvas = document.querySelector("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height,
    color = d3.scaleSequential(d3.interpolateRainbow).domain([0, 1000]),
    randomX = d3.randomNormal(0.0),
    randomY = d3.randomNormal(0);

render();


var counter = 0;

function render() {
  var x0 = width / 2,
      y0 = height / 4,
      mainWalk = randomWalk(x0, y0, 1000);

  var lines = [
    'RANDOM WALK',
    'DJ TRIPTYCH',
    'BED VYNE COCKTAIL',
    'FRIDAY',
    '13 JAN 2017', 
    // 'no dress no cover',
  ];

  var lineno = counter++ % lines.length

  context.clearRect(0, 0, width, height);
  context.lineJoin = "round";
  context.lineCap = "round";
  context.lineWidth = 1.5;
  context.strokeStyle = "black";

  // var ytext = 300 + lineno * 20;
  var ytext = 300;
  var textl = context.measureText(lines[lineno]).width;
  var xtext = 0 + (480 - textl) / 2;
  console.log(xtext)
  context.font = 'bold 25px sans-serif';
  context.fillStyle = 'black';
  context.fillText(lines[lineno], xtext, ytext);

  renderWalk(mainWalk);

  context.globalCompositeOperation = "multiply";
  context.lineWidth = 1;
  for (var i = 0; i < mainWalk.length; i += 1) {
    var branchStart = mainWalk[i],
        x0 = branchStart[0],
        y0 = branchStart[1];
    for (var j = 0; j < 1; ++j) {
      //context.strokeStyle = color(i + (Math.random() - 0.5) * 50);
      context.strokeStyle = '#eee';
      var x1 = x0, y1 = y0;
      for (var k = 0, m = 20; k < m; ++k) {
        context.globalAlpha = (m - k - 1) / m;
        var pieceWalk = randomWalk(x1, y1, 10),
            pieceEnd = pieceWalk[pieceWalk.length - 1];
        renderWalk(pieceWalk);
        x1 = pieceEnd[0];
        y1 = pieceEnd[1];
      }
      context.globalAlpha = 1;
    }
  }
  setTimeout(render, 0);
}

function renderWalk(walk) {
  var i, n = walk.length;
  context.beginPath();
  context.moveTo(walk[0][0], walk[0][1]);
  for (i = 1; i < n; ++i) {
    context.lineTo(walk[i][0], walk[i][1]);
  }
  context.stroke();
}

function randomWalk(x0, y0, n) {
  var points = new Array(n), i;
  points[0] = [x0, y0];
  for (i = 1; i < n; ++i) {
    points[i] = [
      x0 += randomX() * 2,
      y0 += randomY() * 2
    ];
  }
  return points;
}
