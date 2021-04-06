// Shader test
// https://itp-xstory.github.io/p5js-shaders/#/./docs/setting-up-shaders-in-p5


var balls = [];

class Ball{
	constructor(x,y){
	this.x = x;
	this.y = y;
	this.r = 40;
	
	this.x1 = this.x-this.r;
	this.x2 = this.x+this.r;
	this.y1 = this.y-this.r;
	this.y2 = this.y+this.r;

	let angle = random(0,2 * PI);
	this.speed_x  = random(2,5) * Math.cos(angle);
	this.speed_y  = random(2,5) * Math.sin(angle);
	}
	update(){
		this.x += this.speed_x;
		if (this.x > width || this.x < 0){
			this.speed_x *= -1;
		}		
		this.y += this.speed_y;		
		if (this.y > height || this.y < 0){
			this.speed_y *= -1;
		}
		
		this.x1 = this.x-this.r;
		this.x2 = this.x+this.r;
		this.y1 = this.y-this.r;
		this.y2 = this.y+this.r;
	}
	show(){
		noFill();
		stroke(255);
		ellipse(this.x, this.y, this.r*2,this.r*2);
	}	
	
}



let theShader;

function preload(){
	theShader = loadShader('onecolor.vert', 'onecolor.frag');
}

function setup(){
	createCanvas(710,400,WEBGL);
	noStroke();

	for (i = 0; i < 5; i++){
		balls.push( new Ball(random(0,width), random(0,height)));
	}


}

function draw(){
	
	// update
		for (var i = 0; i < balls.length; i++){
		balls[i].update();
	}

	
	shader(theShader);

	theShader.setUniform('resolution', [width,height]);
	theShader.setUniform('mouse', map(mouseX,0,width,0,7));
	theShader.setUniform('time',frameCount *0.01);

	theShader.setUniform('ball_0_x',balls[0].x);
	theShader.setUniform('ball_0_y',balls[0].y);
	theShader.setUniform('ball_0_r',balls[0].r);

	theShader.setUniform('ball_1_x',balls[1].x);
	theShader.setUniform('ball_1_y',balls[1].y);
	theShader.setUniform('ball_1_r',balls[1].r);


	rect(0,0,width,height);
	// print out the framerate
	//print(frameRate());
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}


