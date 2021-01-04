
var c = document.getElementById("myCanvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
var ctx = c.getContext("2d");

// ctx.fillStyle="rgba(255,0,0,1)";
// ctx.fillRect(100,100,100,100);

// ctx.fillStyle="rgba(255,255,0,0.5)";
// ctx.fillRect(200,300,200,200); 


// //line  
// ctx.beginPath();
// ctx.moveTo(200,200);
// ctx.lineTo(400, 500);
// ctx.lineTo(200, 300);
// ctx.strokeStyle="#aabbff";
// ctx.stroke();
  
   
// arc (in radians)
// ctx.beginPath();
// ctx.arc(300,300,35,0,Math.PI * 2,false);
// ctx.strokeStyle="#blue";
// ctx.stroke();

// for(var i=0;i<10;i++){ta0
	// var x = Math.random() * window.innerWidth;
	// var y = Math.random() * window.innerHeight;
	// ctx.beginPath();
	// ctx.arc(x,y,35,0,Math.PI * 2,false);
	// ctx.strokeStyle="rgba(255,0,0,1)";
	
	// ctx.stroke();	
// }


//https://www.youtube.com/watch?v=vxljFhP2krI
//animating groups: https://www.youtube.com/watch?v=yq2au9EfeRQ


var x = 300;
var dx = 1;
var y = 300;

var img = document.getElementById("tesla");

function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,innerWidth,innerHeight);
	ctx.beginPath();
	ctx.drawImage(img,x,300);
	ctx.stroke();
	x+=dx ;
}
// function animate(){
	// requestAnimationFrame(animate);
	// ctx.clearRect(0,0,innerWidth,innerHeight);
	// ctx.beginPath();
	////arc (in radians)
	// ctx.arc(x,300,35,0,Math.PI * 2,false);
	// ctx.strokeStyle="#blue";
	// ctx.stroke();
	// x+=dx ;
// }
// window.setInterval(animate,10);
animate();
// videos/first-try-12497618
 //videos/cuckold-young-couple-10184445