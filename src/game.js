

var Game = {
	
	fish: null,
	killer: null,
	
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
		
		Game.killer = Crafty.e("Killer Fish");
		Game.killer.x = -Game.killer.w;
		Game.killer.y = Game.waterSurface() + 50;
		
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
	
	var oceanTweenDone = false;
	Game.fish.airbornOnce = false;
	Game.fish._acceleration = 0;
	//Game.fish.tween({x: 50}, 2000);
	
	createjs.Tween
		.get(Crafty.viewport)
		.to({y: -(Game.fish.y / 4)}, 2)
		.wait(0.2)
		.call(function(){ oceanTweenDone = true; });
		
	createjs.Tween
		.get(Game.fish)
		.wait(2)
		.to({_acceleration: -200}, 0, createjs.Ease.quadOut)
		.to({x: 150, y: Game.waterSurface() + 200}, 2, createjs.Ease.quadOut)
		//.wait(2)
		.to({x: 350}, 1, createjs.Ease.quadOut);		// Freak out
		
	createjs.Tween
		.get(Game.fish._velocity)
		.wait(4)
		.to({y: 350}, 1.5, createjs.Ease.sineIn);
	
	createjs.Tween
		.get(Game.killer)
		.wait(3.5)
		.to({x: 90 - Game.killer.w }, 1.5, createjs.Ease.sineIn)
		.wait(0.5)
		.to({x: 40 - Game.killer.w }, 3, createjs.Ease.sineOut);
	
	
	
	Crafty.addEvent(this, $("#gameContainer")[0], 'mousedown', function(e) {
		Game.fish.skip = true;
	});
	
	Crafty.addEvent(this, $("#gameContainer")[0], 'mouseup', function(e) {
		Game.fish.skip = true;
	});
	
	
	//Game.fish = Crafty.e("Fish");
	
	
	this.bind("EnterFrame", function(data)
	{
		var deltaTime = data.dt / 1000;
		
		createjs.Tween.tick(deltaTime, false);
		
		//console.log(Crafty.lastEvent);
		
		// Make the ocean come up to meet the fish
		if(oceanTweenDone){
			Crafty.viewport.y = -(Game.fish.y / 4);
		}
		//createjs.Tween.get(Crafty.viewport).to({y: -(Game.fish.y / 4)}, 1);
		
		if(Game.fish.dead){
			// Play final animation
			Crafty.scene('EndGame');
		}
	});
	
}, function(){
	this.unbind("EnterFrame");
});



Crafty.scene('EndGame', function(){
	console.log("End Game");
	
	$("#skips").text(Game.fish.skipCount);
	$("#distance").text((Game.fish.skipDistance / 10).toFixed(2) + "m");
	$("#altitude").text(-(Game.fish.maxHeight / 100).toFixed(2) + "m");
	
	createjs.Tween.get(Crafty.viewport).to({y: -300}, 2);
	
	createjs.Tween
		.get(Game.fish)
		.to({x: 450, y: Game.waterSurface() + 200}, 2, createjs.Ease.quadOut)
		.call(function(){
			Game.fish.visible = false;
		})
		;
	
	createjs.Tween
		.get(Game.killer)
		.to({x: 450, y: Game.waterSurface() + 180}, 2, createjs.Ease.quadOut)
		.wait(0.8)
		.call(function(){
			createjs.Tween.get(Crafty.viewport).to({y: 0}, 1);
		})
		.wait(0.2)
		.call(function(){
			$("#title").show("slide", { direction: "left" }, 900);
			$("#clickToStart").text("(click anywhere to restart)");
			$("#clickToStart").show("slide", { direction: "left" }, 600);
			$("#score").show("slide", { direction: "left" }, 600);
			
			$("#gameContainer").one('mousedown', function(e) {
				$("#title").hide("slide", { direction: "right" }, 900);
				$("#clickToStart").hide("slide", { direction: "right" }, 600);
				$("#score").hide("slide", { direction: "right" }, 600);
				
				Game.fish.reset();
				Game.killer.reset();
				
				Crafty.scene('Game');
			});
			
		})
		.to({x: 950, y: Game.waterSurface() + 120}, 1, createjs.Ease.cubicIn)
		;
	
	
	
	
	
	this.bind("EnterFrame", function(data){
		var deltaTime = data.dt / 1000;
		createjs.Tween.tick(deltaTime, false);
		
	});
});

