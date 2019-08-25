var Canvas = require('canvas');

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

//Rotate text
ctx.font = "bold 24px verdana, sans-serif";
ctx.fillStyle = "#00FFFF";

var x = 320;
var y = 200;    
ctx.save();
ctx.textAlign = "center";
ctx.translate(x, y);
ctx.rotate((Math.PI/180) * 45);
ctx.fillText("blabla~~~", 0, 0);
ctx.restore();

//Rotete arrow
ctx.fillStyle = '#A9A9A9';
var x2 = 400;
var y2 = 150;    
ctx.save();
ctx.translate(x2, y2);
ctx.rotate(-(Math.PI/180) * 30);
var arrow_x = 0;
var arrow_y = 0;
ctx.beginPath();
ctx.moveTo(arrow_x, arrow_y);
ctx.lineTo(arrow_x, arrow_y + 26);
ctx.lineTo(arrow_x + 100, arrow_y + 26);
ctx.lineTo(arrow_x + 100, arrow_y + 52);
ctx.lineTo(arrow_x + 150, arrow_y + 13);
ctx.lineTo(arrow_x + 100, arrow_y - 26);
ctx.lineTo(arrow_x + 100, arrow_y);
ctx.lineTo(arrow_x + 100, arrow_y);
ctx.closePath();

ctx.fill();
ctx.restore();

const image = new Canvas.Image();
image.src = './gallery_7.jpg';
var width = 140 * (image.width / image.height); // this will be 300
var height = 140; // this will be 400
ctx.drawImage(image, 400, 220,width,height);


var fs = require('fs'),
out = fs.createWriteStream(__dirname + '/mission3.png')
stream = canvas.pngStream();

stream.on('data', function(chunk){out.write(chunk); });
stream.on('end', function(){console.log('saved png'); }); 