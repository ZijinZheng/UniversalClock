var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
var thinLineWidth = 1;


$('input[name=timezone]').change(function () {
    drawClock();
});

$(document).ready(function () {
    drawClock();
});

ctx.translate(radius, radius);
radius = radius * 0.90;
setInterval(drawClock, 1000);

function drawClock() {
    console.log("drawing...");
    ctx.clearRect(-canvas.height / 2, -canvas.height / 2, canvas.height, canvas.height);
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    // Outer circle
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.lineWidth = thinLineWidth;
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Inner circle
    ctx.beginPath();
    ctx.lineWidth = thinLineWidth;
    ctx.arc(0, 0, radius * 0.7, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawNumbers(ctx, radius) {
    ctx.fillStyle = '#777';
    var ang;
    var num;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    ctx.beginPath();
    ctx.font = radius * 0.1 + "px Monospace";
    ctx.fillText("SUN", 0, -radius * 0.8);

    // Draw minute tick
    for (num = 0; num < 60; num++) {
        ctx.font = radius * 0.05 + "px Monospace";
        ang = num * Math.PI / 30;

        ctx.beginPath();
        ctx.rotate(-ang);
        ctx.translate(0, radius * 1.05);
        ctx.rotate(ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(-ang);
        ctx.translate(0, -radius * 1.05);
        ctx.rotate(ang);

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.rotate(-ang);
        ctx.moveTo(0, -radius * 0.985);
        ctx.lineTo(0, -radius);
        ctx.stroke();
        ctx.rotate(ang);
    }

    for (num = 0; num < 24; num++) {
        ctx.font = radius * 0.1 + "px Monospace";
        ang = num * Math.PI / 12;
        ctx.beginPath();
        ctx.rotate(-ang);
        ctx.translate(0, radius * 0.9);
        ctx.rotate(ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(-ang);
        ctx.translate(0, -radius * 0.9);
        ctx.rotate(ang);

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.rotate(-ang);
        ctx.moveTo(0, -radius * 0.97);
        ctx.lineTo(0, -radius);
        ctx.stroke();
        ctx.rotate(ang);
    }
}

function drawTime(ctx, radius) {
    var now = new Date();

    document.getElementById("UTC").innerHTML = now.toISOString();

    var hour = now.getUTCHours();
    var hourAngTinmezoneOffset = now.getTimezoneOffset() / (-60.0) * Math.PI / 12;
    var minute = now.getMinutes();
    var second = now.getSeconds();


    hourAng = (hour * Math.PI / 12) +
	(minute * Math.PI / (12 * 60)) +
	(second * Math.PI / (12 * 60 * 60));

    for (num = 0; num < 24; num++) {
        ctx.font = radius * 0.05 + "px Monospace";

        if (num == 0) displayNum = "UTC";
        else if (num > 12) displayNum = num - 24;
        else displayNum = "+" + num;

        ang = num * Math.PI / 12 + hourAng;

        ctx.beginPath();
        ctx.rotate(-ang);
        ctx.translate(0, radius * 0.6);
        ctx.rotate(ang);
        ctx.fillText(displayNum.toString(), 0, 0);
        ctx.rotate(-ang);
        ctx.translate(0, -radius * 0.6);
        ctx.rotate(ang);

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.rotate(-ang);
        ctx.moveTo(0, -radius * 0.67);
        ctx.lineTo(0, -radius * 0.7);
        ctx.stroke();
        ctx.rotate(ang);
    }

    // UTC	
    if (document.getElementById("UTC0").checked) drawHand(ctx, hourAng, radius * 0.7, 1.5, 'black');

    // UTC+8	
    hourLocal = hourAng + 8 * Math.PI / 12;
    if (document.getElementById("UTC8").checked) drawHand(ctx, hourLocal, radius * 0.7, 1.5, 'IndianRed');

    // UTC-8	
    hourLocal = hourAng + (-8) * Math.PI / 12;
    if (document.getElementById("UTCm8").checked) drawHand(ctx, hourLocal, radius * 0.7, 1.5, 'DodgerBlue');

    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, thinLineWidth, 'DimGrey');
    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, thinLineWidth, 'Grey');
}

function drawHand(ctx, ang, length, width, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(-ang);
    ctx.lineTo(0, length);
    ctx.stroke();
    ctx.rotate(ang);
}