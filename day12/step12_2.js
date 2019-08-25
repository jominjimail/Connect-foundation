var Canvas = require('canvas');
var Image = Canvas.Image;
const canvas = Canvas.createCanvas(600, 400);
var ctx = canvas.getContext('2d');

//background
ctx.fillStyle = '#3CB371';
ctx.fillRect(0, 0, 600, 400);

//colorful body
var grd = ctx.createLinearGradient(110, 220, 110, 360);
grd.addColorStop(0, "#00FA9A");
grd.addColorStop(1, "#FF00FF");

ctx.fillStyle = grd;
ctx.fillRect(110, 220, 140, 140);

//head
ctx.fillStyle = '#FFFFFF';
ctx.beginPath();
ctx.arc(180, 150, 70, 0, 2 * Math.PI); // Outer circle
ctx.fill();
ctx.closePath();

//eye
ctx.fillStyle = '#000000';
ctx.beginPath();
ctx.arc(210, 120, 10, 0, 2 * Math.PI); // Outer circle
ctx.fill();
ctx.closePath();

//mouth
//참고 http://www.codeblocq.com/2016/04/Create-a-Pie-Chart-with-HTML5-canvas/
var endAngle = Math.PI * 0.2;
var beginAngle = Math.PI * 1.9;
ctx.fillStyle = '#000080';
ctx.beginPath();
ctx.moveTo(180, 150);
ctx.arc(180, 150 , 70, beginAngle, endAngle);
ctx.lineTo(180, 150);
ctx.stroke();
ctx.fill();
ctx.closePath();

//leg1
ctx.beginPath();
ctx.moveTo(160, 360);
ctx.lineTo(120, 400);
ctx.closePath();
ctx.stroke();

//dotted leg2
ctx.beginPath();
ctx.setLineDash([5, 15]);
ctx.moveTo(200, 360);
ctx.lineTo(240, 400);
ctx.closePath();
ctx.stroke();

//text
// 참고 : https://stackoverflow.com/questions/3167928/drawing-rotated-text-on-a-html5-canvas
ctx.font = "bold 24px verdana, sans-serif";
ctx.fillStyle = "#00FFFF"; 
ctx.fillText('Hello world', 270, 150);

var fs = require('fs'),
out = fs.createWriteStream(__dirname + '/mission2.png')
stream = canvas.pngStream();

stream.on('data', function(chunk){out.write(chunk); });
stream.on('end', function(){console.log('saved png'); }); 