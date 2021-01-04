/******************************
This file contains the various objects used to maintain data on the screen
******************************/

const SPRITE_FRAME_WIDTH = 166; // pixels
const SPRITE_FRAME_HEIGHT = 270;// pixels

/******************************
 * vehicle object - maintains state of the various vehicles and renders them on the page 
 * img: the image to renders
 * x: initial x position
 * y: initial y position
 * width: how wide to draw the image in pixels
 * speed: how fast to scroll the image in the y-axis 
*/
function vehicle(img,x, y, width, speed){
	this.carImg = img;
	this.x = x;
	this.y = y;
	this.width = width;
	this.dx = speed;
	this.offscreen = false;
		
	this.draw = function(){
		//if within the frame then draw away
		if((speed > 0 && this.x < c.width)
			 || (speed < 0 && this.x+img.width > 0)){
				ctx.beginPath();
				ctx.drawImage(img,this.x,this.y, this.width,100);
				ctx.stroke();
				this.x += this.dx;
		}
		else{
			this.offscreen = true;
		}
	}
}

/******************************
 * booze object - maintains state of the various vehicles and renders them on the page 
 * img: the image to renders
 * x: initial x position
 * y: initial y position
 * proof: the strength of the booze!
*/
function booze(img,width,height,proof){
	this.boozeImg = img;
	this.x=0;
	this.y=0;
	this.width = width;
	this.height = height;
	this.proof = proof;		
	this.lifespan = 0;	
	
	this.draw = function(){
		//if within the frame then draw away		
		ctx.beginPath();
		ctx.drawImage(img,this.x,this.y,width,height);
		ctx.stroke();				
	}
	
	this.reInit = function(){
		this.x = getRndInteger(0,c.width);
		this.y = getRndInteger(0,c.height);
		this.lifespan = getRndInteger(800,3000);// number of game ticks to live
	}
}

function character(img, x, y){
	this.characterImage = img;
	this.x=x;
	this.y=y;
	
	this.draw = function(){
		//if within the frame then draw away		
		ctx.beginPath();
		ctx.drawImage(img,this.x,this.y);
		ctx.stroke();				
	}
}