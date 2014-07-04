

var Game = {
	
	fish: null,
	
	width: function(){
		return 800;
	},
	
	height: function(){
		return 500;
	},
	
	// Initialize and start our game
	load: function() {
		// Start crafty and set a background color so that we can see it's working
		//Crafty.init("100%", "100%", "viewport");
		//Crafty.init("100%", "100%", "gameContainer");
		Crafty.init("800", "500", "viewport");
		
		Crafty.background('#aaaaaa');
		
	},
	
	start: function() {
		console.log('start');
		
		Crafty.scene('Game');
	},
};


Crafty.scene('Game', function(){
	
	
	Game.water = Crafty.e("Water");
	Game.fish = Crafty.e("Fish");
	
	
	this.bind("EnterFrame", function(data)
	{
		var deltaTime = data.dt / 1000;
		
		
	});
});


