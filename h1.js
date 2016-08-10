var canvasWidth=window.innerWidth;
var canvasHeight=window.innerHeight;
//canvas绘制
var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");
canvas.width=canvasWidth;
canvas.height=canvasHeight;
//绘制图像
var image=new Image();
var radius=50;
var clippingRegion={x:400,y:200,r:radius};
var leftMargin=0;
var topMargin=0;
image.src="image.jpg";
image.onload=function(e){
	$("#div").css("width",canvasWidth+"px");
	$("#div").css("height",canvasHeight+"px");
	$("#image").css("width",image.width+"px");
	$("#image").css("height",image.height+"px");

	leftMargin=(image.width-canvas.width)/2;
	topMargin=(image.height-canvas.height)/2;

	$("#image").css("top",String(-topMargin)+"px");
	$("#image").css("left",String(-leftMargin)+"px");
	initCanvas()
}
//初始化
function initCanvas(){
	var theleft=leftMargin<0?-leftMargin:0;
	var thetop=topMargin<0?-topMargin:0;
	clippingRegion={x:Math.random()*(canvas.width-2*radius-2*theleft)+radius+theleft,
					y:Math.random()*(canvas.height-2*radius-2*thetop)+radius+thetop,r:radius};
					draw(image,clippingRegion);
}
//绘制剪切区域
function setClippingRegion(clippingRegion){
	context.beginPath();
	context.arc(clippingRegion.x,clippingRegion.y,
				clippingRegion.r,0,Math.PI*2,false);
	context.clip();
}
//绘制图像
function draw(image,clippingRegion){
	context.clearRect(0,0,canvas.width,canvas.height);
	context.save();
	setClippingRegion(clippingRegion);
	context.drawImage(image,Math.max(leftMargin,0),Math.max(topMargin,0),
					Math.min(canvas.width,image.width),
					Math.min(canvas.height,image.height),
					leftMargin<0?-leftMargin:0,
					topMargin<0?-topMargin:0,
					Math.min(canvas.width,image.width),
					Math.min(canvas.height,image.height));
	context.restore();
}
//动画显示所有清晰图像
function show(){
	var theAnima=setInterval(
		function(){
			clippingRegion.r+=20;
			if(clippingRegion.r > 2*Math.max(canvas.width,canvas.height)){
				clearInterval(theAnima);
			};
			draw(image,clippingRegion)
		},
		30	
	);
}
//重绘
function reset(){
	initCanvas();
}
canvas.addEventListener("touchstart",function(e){
	e.preventDefault()
})