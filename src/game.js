

var Game = {
	
	fish: null,
	
	width: function(){
		return 800;
	},
	
	height: function(){
		return 500;
	},
	
	waterSurface: function(){
		return this.height() - 120;
	},
	
	// Initialize and start our game
	load: function() {
		// Start crafty and set a background color so that we can see it's working
		//Crafty.init("100%", "100%", "viewport");
		//Crafty.init("100%", "100%", "gameContainer");
		Crafty.init("800", "500", "viewport");
		
		Crafty.background('#87CEEB');
		
	},
	
	start: function() {
		console.log('start');
		Game.water = Crafty.e("Water");
		
		Game.fish = Crafty.e("Fish");
		Game.fish.x = -Game.fish.w;
		Game.fish.y = Game.waterSurface() + 200;
		
		Crafty.scene('Menu');
	},
};


Crafty.scene('Menu', function(){
	$("#title").show();
	$("#clickToStart").show();
	
	$("#gameContainer").one('mousedown', function(e) {
		$("#title").hide("slide", { direction: "right" }, 900);
		$("#clickToStart").hide("slide", { direction: "right" }, 600);
		
		//Game.fish._velocity = 1000;
		Crafty.scene('Game');
	});
	
	
		
	this.bind("EnterFrame", function(data){
		createjs.Tween.tick(data.dt/1000, false);
	});
});


Crafty.scene('Game', function(){
	
	var airborn = false;
	//Game.fish.tween({x: 50}, 2000);
	
	createjs.Tween.get(Crafty.viewport).to({y: -(Game.fish.y / 4)}, 2).wait(0.5).call(function(){ airborn = true; });
	createjs.Tween.get(Game.fish).wait(2).to({x: 50}, 2, createjs.Ease.quadOut);
	createjs.Tween.get(Game.fish._velocity).wait(1.5).to({y: 300}, 2, createjs.Ease.quadOut);
	
	
	
	Crafty.addEvent(this, $("#gameContainer")[0], 'mousedown', function(e) {
		
	});
	
	
	//Game.fish = Crafty.e("Fish");
	
	
	this.bind("EnterFrame", function(data)
	{
		var deltaTime = data.dt / 1000;
		
		createjs.Tween.tick(deltaTime, false);
		
		//console.log(Crafty.lastEvent);
		
		// Make the ocean come up to meet the fish
		if(airborn){
			Crafty.viewport.y = -(Game.fish.y / 4);
		}
		//createjs.Tween.get(Crafty.viewport).to({y: -(Game.fish.y / 4)}, 1);
	});
});


