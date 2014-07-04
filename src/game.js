

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
		
		Crafty.scene('Menu');
	},
};


Crafty.scene('Menu', function(){
	$("#title").show();
	$("#clickToStart").show();
	
	$("#gameContainer").one('mousedown', function(e) {
		$("#title").hide("slide", { direction: "right" }, 900);
		$("#clickToStart").hide("slide", { direction: "right" }, 600);
		
		Game.fish = Crafty.e("Fish");
		
		Tween.get(Game.fish).to({x: 100}, 1000).call(Crafty.scene('Game'));
	});
	
});


Crafty.scene('Game', function(){
	
	Crafty.addEvent(this, $("#gameContainer")[0], 'mousedown', function(e) {
		console.log('mousedown at (' + e.clientX + ', ' + e.clientY + ')');
	});
	
	
	//Game.fish = Crafty.e("Fish");
	
	
	this.bind("EnterFrame", function(data)
	{
		var deltaTime = data.dt / 1000;
		
		//console.log(Crafty.lastEvent);
		
		// Make the ocean come up to meet the fish
		Crafty.viewport.y = -(Game.fish.y / 4);
	});
});


