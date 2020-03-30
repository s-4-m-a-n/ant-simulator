var startBtn = document.getElementById("start");
var stopBtn = document.getElementById("stop");

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//-------- global variable -------------
var foodX = canvas.width-15;
var foodY = canvas.height-15;
var MaxAnt = 200;
var ants = 0;
var antList = [];
var delay = 10 ; //50 ms

//------------------------------------------






class ant{
	constructor(id){
		this.id = id;
		this.currentPosition = {'X':0 , 'Y':0};
		this.oldPosition = {'X':this.currentPosition.X,'Y':this.currentPosition.Y};
		this.size = 3;
		this.foodFound  = false;
		this.pace = 1;
		this.previousMoveSearching = 'N'; //neutral
		this.previousMoveReturning  = 'N'; //neutral
		this.displayAnt(this.position);
		
	}

	searchFood(){
		var possibleMove = ['f','f','fd','fd','fu','fu','bd','bu','d','d','u','b']; //fd forward-downward ie diagonal 
		var index = parseInt(Math.random()*possibleMove.length);

		var probPrevMove = ['p','p','n'] ; // probability of making previous move , p -> previous , n -> new move
		var index2 =parseInt(Math.random()*probPrevMove.length);



		var move =(probPrevMove[index2] == 'p')? this.previousMoveSearching : possibleMove[index];
		this.previousMoveSearching = move;
		
		this.action(move);

		this.displayAnt(this.previousMoveSearching);

		// if ( (foodX <= this.currentPosition.X-15) && (foodY <= this.currentPosition.Y-15)){
			var dis = Math.sqrt(Math.pow(this.currentPosition.X-foodX,2)+Math.pow(this.currentPosition.Y-foodY,2));
			if(dis < 15){
				this.foodFound = true;
			}
			


	}

	action(direction){

		switch(direction){
			case 'f':   this.oldPosition.X = this.currentPosition.X;
						this.oldPosition.Y = this.currentPosition.Y;
						if (this.currentPosition.X < canvas.width-this.pace){
							// this.currentPosition.X += this.size.x;
							this.currentPosition.X += this.pace;
						}

						break;
		
			case 'd':   
						this.oldPosition.X = this.currentPosition.X;
						this.oldPosition.Y = this.currentPosition.Y;
						if (this.currentPosition.Y < canvas.height-this.pace){
							// this.currentPosition.Y += this.size.y;
							this.currentPosition.Y += this.pace;

						}
						break;
			case 'b': //backward
						this.oldPosition.X = this.currentPosition.X;
						this.oldPosition.Y = this.currentPosition.Y;
						if (this.currentPosition.X > 0 ){
							// this.currentPosition.X -= this.size.x;
							this.currentPosition.X -= this.pace;

						}
						break;
			case 'u':
						this.oldPosition.X = this.currentPosition.X;
						this.oldPosition.Y = this.currentPosition.Y;
						if (this.currentPosition.Y > 0 ){
							// this.currentPosition.Y -= this.size.y;
							this.currentPosition.Y -= this.pace;

						}
						break;
			case 'fd': 
						this.oldPosition.X = this.currentPosition.X;
						this.oldPosition.Y = this.currentPosition.Y;
						if (this.currentPosition.X < canvas.width-this.pace && this.currentPosition.Y < canvas.height-this.pace ){
							// this.currentPosition.X += this.size.x;
							this.currentPosition.X += this.pace;
							this.currentPosition.Y += this.pace;
						}
						break;
			case 'fu':
						this.oldPosition.X = this.currentPosition.X;
						this.oldPosition.Y = this.currentPosition.Y;
						if (this.currentPosition.X < canvas.width-this.pace && this.currentPosition.Y > 0 ){
							// this.currentPosition.Y -= this.size.y;
							this.currentPosition.Y -= this.pace;
							this.currentPosition.X += this.pace;
						}
						break;
			case 'bd':
						this.oldPosition.X = this.currentPosition.X;
						this.oldPosition.Y = this.currentPosition.Y;
						if (this.currentPosition.X > 0 && this.currentPosition.Y < canvas.height-this.pace){
							// this.currentPosition.Y += this.size.y;
							this.currentPosition.Y += this.pace;

							this.currentPosition.X -= this.pace;

						}
						break;
			case 'bu':
						this.oldPosition.X = this.currentPosition.X;
						this.oldPosition.Y = this.currentPosition.Y;
						if (this.currentPosition.X > 0 && this.currentPosition.Y > 0 ){
							this.currentPosition.Y -= this.pace;
							this.currentPosition.X -= this.pace;
						}
						break;
			case 'N':
						break; // dont move 
			default :
						console.log("exception");
		}

	}


	searchSource(){
		
		var possibleMove = ['b','bu','bd','bu','bu','u','u','b','b'];
		var index = parseInt(Math.random()*possibleMove.length);
		

		var probPrevMove = ['p','p','n'] ; // probability of making previous move , p -> previous , n -> new move
		var index2 =parseInt(Math.random()*probPrevMove.length);


		var move =(probPrevMove[index2] == 'p')? this.previousMoveReturning : possibleMove[index];
		this.previousMoveReturning = move;

		this.action(move);
		// switch(move){
		// 	case 'f':
		// 				this.oldPosition.X = this.currentPosition.X;
		// 				this.oldPosition.Y = this.currentPosition.Y;
		// 				if (this.currentPosition.X < canvas.width-this.pace){
		// 					// this.currentPosition.X += this.size.x;
		// 					 this.currentPosition.X += this.pace*2;

		// 				}

		// 				break;
		
		// 	case 'd':
		// 				this.oldPosition.X = this.currentPosition.X;
		// 				this.oldPosition.Y = this.currentPosition.Y;
		// 				if (this.currentPosition.Y < canvas.height-this.pace){
		// 					// this.currentPosition.Y += this.size.y;
		// 					this.currentPosition.Y += this.pace*2;

		// 				}
		// 				break;
		// 	case 'b': //backward
		// 				this.oldPosition.X = this.currentPosition.X;
		// 				this.oldPosition.Y = this.currentPosition.Y;
		// 				if (this.currentPosition.X > 0 ){
		// 					// this.currentPosition.X -= this.size.x;
		// 					this.currentPosition.X -= this.pace*2;

		// 				}
		// 				break;
		// 	case 'u':
		// 					this.oldPosition.X = this.currentPosition.X;
		// 				this.oldPosition.Y = this.currentPosition.Y;
		// 				if (this.currentPosition.Y > 0 ){
		// 					// this.currentPosition.Y -= this.size.y;
		// 					this.currentPosition.Y -= this.pace*2;

		// 				}
		// 				break;
		// 	default :
		// 				console.log("exception");
		// }

		 this.displayAnt(this.previousMoveReturning);
	}


	displayAnt(previousMove){
		// ctx.clearRect(this.oldPosition.X,this.oldPosition.Y,this.size.x,this.size.y);
		// ctx.fillStyle = (this.foodFound==false)?'white':'white';
		// console.log("oldx "+this.oldPosition.X+" oldy "+this.oldPosition.Y+"\n newx"+this.currentPosition.X+" newy "+this.currentPosition.Y+"\n");
		// ctx.fillRect(this.oldPosition.X,this.oldPosition.Y,this.size.x,this.size.y);
		ctx.fillStyle = (this.foodFound==false)?'green':'red';
		// ctx.fillRect(this.currentPosition.X,this.currentPosition.Y,this.size.x,this.size.y);

		// ctx.beginPath();
 	// 	ctx.arc(this.currentPosition.X+parseInt(this.size.x/1.5),this.currentPosition.Y,parseInt(this.size.x/2),0,2*Math.PI);
 	// 	ctx.arc(this.currentPosition.X,this.currentPosition.Y,parseInt(this.size.x/2),0,2*Math.PI);
		
		// ctx.fill();
//pointing ant according to its move
		// ctx.beginPath();
 	// 	ctx.arc(this.currentPosition.X,this.currentPosition.Y,parseInt(this.size/2),0,2*Math.PI);
 	// 	ctx.arc(this.currentPosition.X,this.currentPosition.Y+this.size,parseInt(this.size/2),0,2*Math.PI);		
		// ctx.fill();

if (previousMove == "fd" || previousMove == "N"){ //currentMove
		ctx.beginPath();
 		ctx.arc(this.currentPosition.X,this.currentPosition.Y,parseInt(this.size/2),0,2*Math.PI);
 		ctx.arc(this.currentPosition.X+this.size,this.currentPosition.Y+this.size,parseInt(this.size/2),0,2*Math.PI);		
		ctx.fill();
	}
else if (previousMove == "fu"){
		ctx.beginPath();
 		ctx.arc(this.currentPosition.X,this.currentPosition.Y,parseInt(this.size/2),0,2*Math.PI);
 		ctx.arc(this.currentPosition.X+this.size,this.currentPosition.Y-this.size,parseInt(this.size/2),0,2*Math.PI);		
		ctx.fill();
}
else if (previousMove == "f"){
		ctx.beginPath();
 		ctx.arc(this.currentPosition.X,this.currentPosition.Y,parseInt(this.size/2),0,2*Math.PI);
 		ctx.arc(this.currentPosition.X+this.size,this.currentPosition.Y,parseInt(this.size/2),0,2*Math.PI);		
		ctx.fill();
}
else if (previousMove == "b"){
		ctx.beginPath();
 		ctx.arc(this.currentPosition.X,this.currentPosition.Y,parseInt(this.size/2),0,2*Math.PI);
 		ctx.arc(this.currentPosition.X-this.size,this.currentPosition.Y,parseInt(this.size/2),0,2*Math.PI);		
		ctx.fill();
}
else if (previousMove == "u"){
			ctx.beginPath();
 		ctx.arc(this.currentPosition.X,this.currentPosition.Y,parseInt(this.size/2),0,2*Math.PI);
 		ctx.arc(this.currentPosition.X,this.currentPosition.Y-this.size,parseInt(this.size/2),0,2*Math.PI);		
		ctx.fill();
}
else if (previousMove == "d"){
		ctx.beginPath();
 		ctx.arc(this.currentPosition.X,this.currentPosition.Y,parseInt(this.size/2),0,2*Math.PI);
 		ctx.arc(this.currentPosition.X,this.currentPosition.Y+this.size,parseInt(this.size/2),0,2*Math.PI);		
		ctx.fill();
}
else if (previousMove == "bd"){
		ctx.beginPath();
 		ctx.arc(this.currentPosition.X,this.currentPosition.Y,parseInt(this.size/2),0,2*Math.PI);
 		ctx.arc(this.currentPosition.X-this.size,this.currentPosition.Y+this.size,parseInt(this.size/2),0,2*Math.PI);		
		ctx.fill();
}
else if (previousMove == "bu"){
		ctx.beginPath();
 		ctx.arc(this.currentPosition.X,this.currentPosition.Y,parseInt(this.size/2),0,2*Math.PI);
 		ctx.arc(this.currentPosition.X-this.size,this.currentPosition.Y-this.size,parseInt(this.size/2),0,2*Math.PI);		
		ctx.fill();
}



	
 }


}


let simulation;


// var img = new Image(); 
// img.src = "./ant1.svg";
// img.width = "1";
// img.height ="1";


function startSimulation(){

simulation = setInterval(function(){
	clearScreen();
	displayFood();
	// ctx.drawImage(img,0,0);
	//-- display food at initial condition-- 	
		// if (ants == 0 ){
		// 	ctx.fillStyle = "red";
		// 	ctx.beginPath();
		// 	ctx.arc(foodX,foodY,15,0,2*Math.PI);
		// 	ctx.fill(); 
		// 	}
	//-----------------------------------	

for (i=0;i<ants;i++){
		if(!antList[i].foodFound )
			antList[i].searchFood();
		else
			antList[i].searchSource();
	}

if (ants < MaxAnt){
		createNewAnt = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		rand = parseInt(Math.random()*createNewAnt.length);
		if (rand==1){
			antList[ants] = new ant(ants);
			ants++;
		}
	}



},delay);
}



function stopSimulation(){
 setTimeout(() => { clearInterval(simulation)},0); //6sec
}

function restartSimulation(){
	stopSimulation();
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ants = 0; //reset 
	antList = []; //reset
}

function clearScreen(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

function displayFood(){
	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.arc(foodX,foodY,15,0,2*Math.PI);
	ctx.fill(); 
}