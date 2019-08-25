var Canvas = require('canvas');
var Image = Canvas.Image;
const canvas = Canvas.createCanvas(600, 400);
var ctx = canvas.getContext('2d');

//background
ctx.fillStyle = '#3CB371';
ctx.fillRect(0, 0, 600, 400);

//body
ctx.fillStyle = '#FFFFFF';
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
var endAngle = Math.PI * 0.2;
var beginAngle = Math.PI * 1.9;
ctx.fillStyle = '#000000';
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

//leg2
ctx.beginPath();
ctx.moveTo(200, 360);
ctx.lineTo(240, 400);
ctx.closePath();
ctx.stroke();

// 참고 : https://stackoverflow.com/questions/35137936/can-i-let-node-js-generate-a-canvas-without-an-html-page
var fs = require('fs'),
out = fs.createWriteStream(__dirname + '/mission1.png')
stream = canvas.pngStream();

stream.on('data', function(chunk){out.write(chunk); });
stream.on('end', function(){console.log('saved png'); }); 