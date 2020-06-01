var canvas = document.getElementById("game");

var c  = canvas.getContext('2d');


const 	GAME_WIDTH = 800;
const   GAME_HEIGHT = 600;
var score = 0;
var life = 3;



//  Classes
class Game {
	constructor(gamewidth,gameheight){
		this.gamewidth = gamewidth;
		this.gameheight = gameheight;
	}
	start(){
		this.stick =  new Stick(this);
		this.blackball = new Blackball(this);
		this.greenball = new Greenball(this);
		this.redball = new Redball(this);
		this.blueball = new Blueball(this)

		var blackballs = [];
	
		
		this.gameObject = [
			this.blackball ,
			this.greenball,
			this.redball,
			this.blueball,
			this.stick,
			
		];


		new InputHandler(this.stick);

	}
	draw(c){
		c.fillStyle= "black";
		c.font="30px Arial";
		c.fillText("life ",30,30);
		c.fillStyle="black";
		c.font="30px Arial";
		c.fillText(life,80,30);
		c.fillStyle= "black";
		c.font="30px Arial";
		c.fillText("score :",600,30);
		this.gameObject.forEach(object => object.draw(c));	
		c.fillStyle="black";
		c.font="30px Arial";
		c.fillText(score,700,30);

	}
	update(change){
		this.gameObject.forEach(object => object.update(change));	
	
	}
}


class Blackball{
	constructor(game){
		// bx - ball x position
		// by - ball y position
	this.image = document.getElementById('blackball');
	this.bx=800;
	this.by=100;
	this.velocity=2;
	this.stick=game.stick;
	//add code here
	}

	draw(c){
		c.drawImage(this.image,this.bx,this.by,15,15);
	 //add code here
		
	}

	update(){
		this.bx-=this.velocity;
		if(this.bx<10)
		{
			this.collission=Math.abs(this.stick.sy-this.by);
			if(this.collission<70)
			{
				score+=5;
			}
			else
			{
				life-=1;
			}
			this.by= Math.floor(Math.random()*(500-100)+100);
			 this.velocity=Math.floor(Math.random()*(7-1)+1);
				this.bx=800;
		}
		// add code here
		}

	}


// Greeen ball


class Greenball{
	constructor(game){
	  //add code here
	  this.image = document.getElementById('greenball');
	  this.bx=800;
	  this.by=500;
	  this.stick=game.stick;
	  this.velocity=5;
	}

	draw(c){

	// add code here
	c.drawImage(this.image,this.bx,this.by,15,15);
		
	}

	update(){
		this.bx-=this.velocity;
		if(this.bx<10)
		{
				
			this.collission=Math.abs(this.stick.sy-this.by);
			if(this.collission<70)
			{
				score+=5;
//				console.log("HIT!!!!");
			}
			else
			{
				life-=1;
			}
			this.by= Math.floor(Math.random()*(500-100)+100);
			  this.velocity=Math.floor(Math.random()*(4-2)+1);
				this.bx=800;
		}

       //add code here		

	}


}

class Redball{
	constructor(game){
	   //add code here
	   this.image = document.getElementById('redball');
	   this.bx=800;
	   this.by=300;
	   this.stick=game.stick;
	   this.velocity=8;
	}

	draw(c){

		//add code here
		c.drawImage(this.image,this.bx,this.by,15,15);
	}

	update(){
        //add code here		
		this.bx-=this.velocity;
		if(this.bx<10)
		{	
			this.collission=Math.abs(this.stick.sy-this.by);
			if(this.collission<60)
			{
				life-=1;
			}
			this.by= Math.floor(Math.random()*(600-200)+200);
			 this.velocity=Math.floor(Math.random()*(6-4)+4);
				this.bx=800;
		}
	}
}
// blue ball

class Blueball{
	constructor(game){
		//add code here
		this.bx=800;
		this.by= Math.floor(Math.random()*(500-100)+100);
		this.velocity=4;
		this.stick=game.stick;
		this.image = document.getElementById('blueball');
	}

	draw(c){

		//add code here
		c.drawImage(this.image,this.bx,this.by,15,15);
	}

	update(){
		this.bx-=this.velocity;
		if(this.bx<10)
		{	
			this.collission=Math.abs(this.stick.sy-this.by);
			if(this.collission<70)
			{
				score+=5;
			}
			else
			{
				life-=1;
			}
		
			this.by= Math.floor(Math.random()*(500-100)+100);
			this.velocity=Math.floor(Math.random()*(5-4)+4);
			this.bx=800;
		}
		
	 //add code here

	}
}


class Stick{
    constructor(game){	
		// sx - Stick x position
		// sy - Stick y position
		// po - Stick Moving Direction + = UP - = Down
	this.sx=10;
	this.sy=10;
	this.po="";
	 // add code here
	}
	
	moveUp(){
		//add code here
		this.po="-";
		this.update();
		
	}
	moveDown(){
		// add code here
		this.po="+";
		this.update();
	}

    draw(c){
		// add code here
		c.fillStyle="yellow";
		c.fillRect(this.sx,this.sy,10,50);

	}
	update(change) {
		if(this.po==="+")
		{
			this.sy+=10;
			if(this.sy>550){this.sy-=10;}
		}
		else if(this.po==="-")
		{
			this.sy-=10;
			if(this.sy<=0){this.sy=10;}
		}
	
      // add code here
	}
}

class InputHandler{
	constructor(stick){
	document.addEventListener('keyup', (event) =>{
	
		switch(event.keyCode){
			case 38:
				stick.moveUp();
				console.log("UP");
				break;
			case 40:
				stick.moveDown();
				console.log("DOWN");
				break;
		}
	});
	}
}

// Classes end

//  Raw code

var previous =0;

var game = new Game(GAME_WIDTH,GAME_HEIGHT);
game.start();

function gameLoop(position){
	var change = position - previous;
	previous = position;
	c.clearRect(0,0,innerWidth,innerHeight);
	
	game.draw(c);
	game.update(change);
if(life>0){
	requestAnimationFrame(gameLoop);
	console.log(life);
}
if(life<=0)
{
	alert("You lose! \n Your score: "+score+"\n Press ok to refresh the game");
	location.reload();
}

}

function disableScroll() { 
    // Get the current page scroll position 
    scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, 
  
        // if any scroll is attempted, set this to the previous value 
        window.onscroll = function() { 
            window.scrollTo(scrollLeft, scrollTop); 
        }; 
} 

disableScroll();
requestAnimationFrame(gameLoop);

