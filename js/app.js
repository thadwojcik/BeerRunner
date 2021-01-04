/*********************************
Main application script. 
Depends on gameObjects.js

**********************************/

var c = document.getElementById("myCanvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
var ctx = c.getContext("2d");

const ROADWIDTH = 100;


// initialize sprites
var teslaImgRight = document.getElementById("teslaRight");
var chevyImgRight = document.getElementById("chevyRight"); 
var jeepImgRight = document.getElementById("jeepRight");
var ferarriImgRight = document.getElementById("ferarriRight");
var truckImgRight = document.getElementById("truckRight");
var trainImgRight = document.getElementById("trainRight"); 

var teslaImgLeft = document.getElementById("teslaLeft");
var chevyImgLeft = document.getElementById("chevyLeft"); 
var jeepImgLeft = document.getElementById("jeepLeft");
var ferarriImgLeft = document.getElementById("ferarriLeft");
var truckImgLeft = document.getElementById("truckLeft");
var trainImgLeft = document.getElementById("trainLeft");

var flight = document.getElementById("flight"); 
var pitcher = document.getElementById("pitcher");
var mug = document.getElementById("mug");
var tequila = document.getElementById("tequila");
var whiskey = document.getElementById("whiskey");

var road = document.getElementById("road");
var track = document.getElementById("track");
var positions = new roadPositions();
var boozePositions = new boozePositions();

var myCharacter = new character(document.getElementById("character"),getRndInteger(0,c.width),getRndInteger(0,c.height));


/**************************************
 * Event Handlers
 *************************************/
window.addEventListener("keydown", function(e) {
    const keyName = e.key;
	const speed = 3;  
	
	// space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }	
  if(keyName == "ArrowLeft")
	myCharacter.x-=speed;
  if(keyName == "ArrowRight")
	myCharacter.x+=speed;
  if(keyName == "ArrowUp")
	myCharacter.y-=speed;
  if(keyName == "ArrowDown")
	myCharacter.y+=speed;
}, false);

 
// document.addEventListener('keydown', (event) => {
  // const keyName = event.key;
  
  // if(keyName == "ArrowLeft")
	// myCharacter.x--;
  // if(keyName == "ArrowRight")
	// myCharacter.x++;
  // if(keyName == "ArrowUp")
	// myCharacter.y--;
  // if(keyName == "ArrowDown")
	// myCharacter.y++;
	
// }, false);

// document.addEventListener('keyup', (event) => {
  // const keyName = event.key;

  // // As the user releases the Ctrl key, the key is no longer active,
  // // so event.ctrlKey is false.
  // if (keyName === 'Control') {
    // alert('Control key was released');
  // }
// }, false);

var test = 0;

/******************************
 * main game loop
*/
function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,innerWidth,innerHeight);
	
	ctx.drawImage(road,0,positions.roadY0,window.innerWidth,ROADWIDTH);
	drawTrack();
	ctx.drawImage(road,0,positions.roadY1,window.innerWidth,ROADWIDTH);
	ctx.drawImage(road,0,positions.roadY2,window.innerWidth,ROADWIDTH);		
	
	var roadPicker = getRndInteger(0,3)
	
	// determine if there is a free road or track and if so randomly add a new vehicle
	if(positions.road0==null && roadPicker==0){		
		positions.road0 = pickOneRandomCar(roadPicker);
	}
	if(positions.road1==null && roadPicker==1){	
		positions.road1 = pickOneRandomCar(roadPicker);
	}
	if(positions.road2==null && roadPicker==2){
		positions.road2 = pickOneRandomCar(roadPicker);
	}
	if(positions.track == null && roadPicker==3){
		positions.track = new vehicle(trainImgRight, c.width, positions.trackY,trainImgRight.width,-10);
	}
	
	// render cars and train
	if(positions.road0!=null && positions.road0.offscreen == false)
		positions.road0.draw();
	else
		positions.road0=null;
	if(positions.road1!=null && positions.road1.offscreen == false)	
		positions.road1.draw();
	else
		positions.road1=null;
	if(positions.road2!=null && positions.road2.offscreen == false)
		positions.road2.draw();
	else
		positions.road2=null;
	if(positions.track!=null && positions.track.offscreen == false)
		positions.track.draw();
	else
		positions.track=null;
	
	if(getRndInteger(1,10) == 7){		
		for(var i=0;i<boozePositions.boozeLocs.length;i++){
			if(boozePositions.boozeLocs[i].lifespan == 0){
				boozePositions.boozeLocs[i].reInit();
			}
		}
	}
		
	for(var i=0;i<boozePositions.boozeLocs.length;i++){
		if(boozePositions.boozeLocs[i].lifespan > 0){
			boozePositions.boozeLocs[i].draw();
			boozePositions.boozeLocs[i].lifespan--;
		}		
	}
	
	myCharacter.draw();
	
	ctx.stroke();
}

animate();

/******************************
 * object to store info about the road positions and which vehicles are running on which road
*/
function roadPositions(){
	this.trackY = 300;	
	this.roadY0 = 100;	
	this.roadY1 = 600;
	this.roadY2 = 750;

	// references intended to store instances of vehicle objects so we know the road is in use
	this.road0 = null;
	this.road1 = null;
	this.road2 = null;
	this.track = null;	
}

/******************************
 *  Object to store and maintain position of the boozes
 *  We want the beers to show up twice as often as the hard 
 *  stuff so we add two of them to the list. Not sure how
 *  I feel about this approach yet. 
*/
function boozePositions(){
	this.boozeLocs = [];
		
	this.boozeLocs.push(new booze(flight,75,50,50));
	this.boozeLocs.push(new booze(pitcher,50,50,50));
	this.boozeLocs.push(new booze(mug,50,50,50));
	this.boozeLocs.push(new booze(flight,75,50,50));
	this.boozeLocs.push(new booze(pitcher,50,50,50));
	this.boozeLocs.push(new booze(mug,50,50,50));
	this.boozeLocs.push(new booze(tequila,25,25,50));
	this.boozeLocs.push(new booze(whiskey,25,30,50));	
}

/******************************
 * pick a single vehicle at random - will create a new vehicle object and assign it a "road" (i.e. the y position)
*/
function pickOneRandomCar(road){
	var carPicker = getRndInteger(0,9);
	if(carPicker == 0)
		return new vehicle(teslaImgRight, c.width, positions["roadY"+road],100,-getRndInteger(3,10));
	if(carPicker == 1)
		return new vehicle(teslaImgLeft, 0, positions["roadY"+road],100,getRndInteger(3,10));
	if(carPicker == 2)
		return new vehicle(chevyImgRight, c.width, positions["roadY"+road],100,-getRndInteger(1,5));
	if(carPicker == 3)
		return new vehicle(chevyImgLeft, 0, positions["roadY"+road],100,getRndInteger(1,5));
	if(carPicker == 4)
		return new vehicle(jeepImgRight, c.width, positions["roadY"+road],100,-getRndInteger(1,7));
	if(carPicker == 5)
		return new vehicle(jeepImgLeft, 0, positions["roadY"+road],100,getRndInteger(1,7));
	if(carPicker == 6)
		return new vehicle(ferarriImgRight, c.width, positions["roadY"+road],150,-getRndInteger(7,15));
	if(carPicker == 7)
		return new vehicle(ferarriImgLeft, 0, positions["roadY"+road],150,getRndInteger(7,15));
	if(carPicker == 8)
		return new vehicle(truckImgRight, c.width, positions["roadY"+road],300,-getRndInteger(3,10));
	if(carPicker == 9)
		return new vehicle(truckImgLeft, 0, positions["roadY"+road],300,getRndInteger(3,10));
}

function pickOneRandomBooze(){
	var boozePicker = getRndInteger(0,4);	
	
	if(boozePicker == 0)
		return new booze(flight,75,50,50);
	if(boozePicker == 1)
		return new booze(pitcher,50,50,50);
	if(boozePicker == 2)
		return new booze(mug,50,50,50);
	if(boozePicker == 3)
		return new booze(tequila,25,25,50);	
	if(boozePicker == 4)
		return new booze(whiskey,25,30,50);
}

/******************************
 * draw the train track - special logic used to draw segments instead of stretching the track
 * since that caused distortion of the image
*/
function drawTrack(){
	var trackSegments=window.innerWidth/track.width;
	var offSet=0;
	for (var i=0;i<trackSegments;i++){
		ctx.drawImage(track,offSet,300,track.width,ROADWIDTH);
		offSet += track.width;
	}	
}

/******************************
 * generate a random integer 
 * min: minimum value
 * max: maxiumum value
*/
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//sprite credit: https://www.hiclipart.com/free-transparent-background-png-clipart-mqyww