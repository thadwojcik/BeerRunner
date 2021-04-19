/******************************
This file contains the various objects used to maintain data on the screen
******************************/


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
	this.visible = false;
		
	this.draw = function(){
		//if within the 'game board' then draw away  
		if((speed > 0 && this.x < globalCanvas.width) 
			 || (speed < 0 && this.x+img.width > 0)){
				globalContext.beginPath();
				globalContext.drawImage(img,this.x,this.y, this.width,100);
				globalContext.stroke();
				this.x += this.dx;
		}
		else{
			this.visible = true;
		}
	}
}

/******************************
 * booze object - maintains state of the various boozes and renders them on the page 
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
		globalContext.beginPath();
		globalContext.drawImage(img,this.x,this.y,width,height);
		globalContext.stroke();
	}
	
	this.reInit = function(){
		this.x = getRndInteger(0,globalCanvas.width);
		this.y = getRndInteger(0,globalCanvas.height);
		this.lifespan = getRndInteger(800,3000);// number of game ticks to live
	}
}

function character(leftImg, rightImg, x, y){			
	const spriteWidth = 166;
	const spriteHeight = 285;
	const renderWidth = 100;
	const renderHeight = 160;

	this.leftCharacterImage = leftImg;
	this.rightCharacterImage = rightImg;
	this.currentFrameIndex = 0;
	
	this.x=x;
	this.y=y;
	this.direction = "left";
	// these arrays hold the individual frames of the sprite
	this.leftSpriteArray=[];
	this.rightSpriteArray=[];
	
	//initialize the frame arrays
	var runningWidth=0;
	var runningHeight=0;
	var k=0;
	for(var i=0;i<3;i++){
		for(var j=0;j<7;j++){
			this.leftSpriteArray[k]=new characterFrameDimensions(runningWidth,runningHeight);
			this.rightSpriteArray[k]=new characterFrameDimensions(runningWidth,runningHeight);
			runningWidth+=spriteWidth;
			k++;
		}
		runningHeight+=spriteHeight;
		runningWidth=0;
	}
	
	this.getFrameWidth = function(){
		//should match our renderWidth = 100;
		return 100;
	}

	this.getFrameHeight = function(){
		//should match our renderHeight	= 160;
		return 160;
	}
	
	this.draw = function(){		
		globalContext.beginPath();	

		if(this.direction==="left"){

			if(this.leftSpriteArray.length == this.currentFrameIndex){
				this.currentFrameIndex = 0;
			}

			globalContext.drawImage(this.leftCharacterImage,
				this.leftSpriteArray[this.currentFrameIndex].spriteX,
				this.leftSpriteArray[this.currentFrameIndex].spriteY,
				spriteWidth,
				spriteHeight,
				this.x,
				this.y,				
				renderWidth,
				renderHeight);
		}
		else{
			if(this.rightSpriteArray.length == this.currentFrameIndex){
				this.currentFrameIndex = 0;
			}
			globalContext.drawImage(this.rightCharacterImage,
				this.rightSpriteArray[this.currentFrameIndex].spriteX,
				this.rightSpriteArray[this.currentFrameIndex].spriteY,
				spriteWidth,
				spriteHeight,
				this.x,
				this.y,
				renderWidth,
				renderHeight);
		}
		globalContext.stroke();				
	}
}

function characterFrameDimensions(spritex, spritey){
	this.spriteX = spritex;
	this.spriteY = spritey;	
}