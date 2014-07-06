

var Game = {
	
	fish: null,
	killer: null,
	cloud: null,
	
	assetsLoaded: false,
	DOMReady: false,
	
	maxSkips: 0,
	maxDistance: 0,
	maxAltitude: 0,
	
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
		
		Game.maxSkips = Crafty.storage('maxSkips') | 0;
		Game.maxDistance = Crafty.storage('maxDistance') | 0;
		Game.maxAltitude = Crafty.storage('maxAltitude') | 0;
		
		Crafty.load([
				'assets/Fish.png', 
				'assets/Shark.png',
				'assets/Cloud.png',
				'assets/Splash.png',
				'assets/water.mp3',
				'assets/water.ogg',
				'assets/water.wav',
				'assets/waterReentry.mp3',
				'assets/waterReentry.ogg',
				'assets/waterReentry.wav',
				'assets/swim.mp3',
				'assets/swim.ogg',
				'assets/swim.wav',
				'assets/bubbles.mp3',
				'assets/bubbles.ogg',
				'assets/bubbles.wav',
				'assets/scream.mp3',
				'assets/scream.ogg',
				'assets/scream.wav',
				'assets/boneCracking.mp3',
				'assets/boneCracking.ogg',
				'assets/boneCracking.wav'
			], function(){
			
			Crafty.sprite(105, 37, 'assets/Fish.png', {
				spr_fish: [0, 0]
			});
			
			Crafty.sprite(300, 129, 'assets/Shark.png', {
				spr_shark: [0, 0]
			});
			
			Crafty.sprite(199, 132, 'assets/Cloud.png', {
				spr_cloud: [0, 0]
			});
			
			Crafty.sprite(57, 12, 'assets/Splash.png', {
				spr_splash: [0, 0]
			});
			
			Crafty.audio.add({
				water_splash: ['assets/water.mp3',
							   'assets/water.ogg',
							   'assets/water.wav',]
			});
			
			Crafty.audio.add({
				water_reentry: ['assets/waterReentry.mp3',
							   'assets/waterReentry.ogg',
							   'assets/waterReentry.wav',]
			});
			
			Crafty.audio.add({
				water_swim: ['assets/swim.mp3',
							   'assets/swim.ogg',
							   'assets/swim.wav',]
			});
			
			Crafty.audio.add({
				water_bubbles: ['assets/bubbles.mp3',
							   'assets/bubbles.ogg',
							   'assets/bubbles.wav',]
			});
			
			Crafty.audio.add({
				water_scream: ['assets/scream.mp3',
							   'assets/scream.ogg',
							   'assets/scream.wav',]
			});
			
			Crafty.audio.add({
				boneCracking: ['assets/boneCracking.mp3',
							   'assets/boneCracking.ogg',
							   'assets/boneCracking.wav',]
			});
			
			Game.assetsLoaded = true;
			Game.start();
			
		});
		
		
	},
	
	start: function() {
		if(Game.assetsLoaded && Game.DOMReady)
		{
			//console.log('start');
			Game.water = Crafty.e("Water");
			
			Game.fish = Crafty.e("Fish");
			Game.fish.x = -Game.fish.w;
			Game.fish.y = Game.waterSurface() + 200;
			
			Game.killer = Crafty.e("Killer Fish");
			Game.killer.x = -Game.killer.w;
			Game.killer.y = Game.waterSurface() + 50;
			
			Game.cloud = Crafty.e("Cloud");
			
			Crafty.scene('Menu');
		}
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
	
	Crafty.audio.play("water_swim");
	
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
		.call(function(){
			Crafty.audio.play("water_bubbles");
			Game.fish.animate("scaredSwim", -1);		// Freak out
		})
		.to({x: 350}, 1, createjs.Ease.quadOut);
	
	// Angle upward
	createjs.Tween
		.get(Game.fish)
		.wait(5)
		//.to({rotation: -25}, 0.8, createjs.Ease.quadIn)
		.wait(0.7)
		.call(function(){ Game.fish.animate("tailStraight"); });
		//.wait(0.8)
		//.to({rotation: 0}, 0.5, createjs.Ease.quadOut);
		
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
	//console.log("End Game");
	
	if(Game.fish.skipCount > Game.maxSkips){
		Game.maxSkips = Game.fish.skipCount;
		Crafty.storage('maxSkips', Game.maxSkips);
		$("#skipRecord").show();
	} else {
		$("#skipRecord").hide();
	}
	
	if(Game.fish.skipDistance > Game.maxDistance){
		Game.maxDistance = Game.fish.skipDistance;
		Crafty.storage('maxDistance', Game.maxDistance);
		$("#distanceRecord").show();
	} else {
		$("#distanceRecord").hide();
	}
	
	if(Game.fish.maxHeight < Game.maxAltitude){
		Game.maxAltitude = Game.fish.maxHeight;
		Crafty.storage('maxAltitude', Game.maxAltitude);
		$("#altitudeRecord").show();
	} else {
		$("#altitudeRecord").hide();
	}
	
	$("#mostSkips").text(Game.maxSkips);
	$("#mostDistance").text((Game.maxDistance / 10).toFixed(2) + "m");
	$("#mostAltitude").text(-(Game.maxAltitude / 100).toFixed(2) + "m");
	
	Crafty.e("Splash")._speed = 0;
	Crafty.audio.play("water_reentry");
	
	
	Game.fish.animate('scaredSwim', -1);
	Game.killer.animate("mouthOpen");
	createjs.Tween.get(Crafty.viewport).to({y: -300}, 2);
	
	createjs.Tween
		.get(Game.fish)
		.call(function(){
			Crafty.audio.play("water_scream");
			Crafty.audio.play("water_swim");
		})
		.to({rotation: 0}, 0.5);
	
	createjs.Tween
		.get(Game.fish)
		.to({x: 450, y: Game.waterSurface() + 200}, 2, createjs.Ease.quadOut)
		.call(function(){
			Game.fish.visible = false;
		});
	
	createjs.Tween
		.get(Game.killer)
		.wait(1.2)
		.call(function(){ Game.killer.animate("eating", 10);
			Crafty.audio.play("boneCracking"); });
	
	createjs.Tween
		.get(Game.killer)
		.to({x: 400, y: Game.waterSurface() + 160}, 2, createjs.Ease.quadOut)
		.wait(0.8)
		.call(function(){
			Game.killer.animate("mouthClosed", 1);
			createjs.Tween.get(Crafty.viewport).to({y: 0}, 1);
			Crafty.audio.play("water_swim");
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




