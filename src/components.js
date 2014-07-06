

Crafty.c("Fish", {
	_acceleration: -200,
	_velocity: {x: 10, y:0},
	skip: false,
	airbornOnce: false,
	skippedThisFall: false,
	dead: false,
	
	skipCount: 0,
	skipDistance: 0,
	maxHeight: 0,
	
	init: function(){
		this.requires('2D, Canvas, Collision, Persist, spr_fish, SpriteAnimation')
			.attr({
				x: 30,
				y: 10,
				w: 80,
				h: 30
			})
			.reel('tailStraight', 10, 0, 0, 1)
			.reel('tailUp', 10, 1, 0, 1)
			.reel('tailDown', 10, 2, 0, 1)
			.reel('swim', 400, [[0,0], [1,0], [2,0]])
			.reel('swimFast', 300, [[0,0], [1,0], [2,0]])
			.reel('skip', 200, [[0,0], [1,0], [2,0]])
			.reel('scaredSwim', 300, [[0,1], [1,1], [2,1]])
			//.animate('tailDown')
			;
		
		this.animate('swim', -1);
		
		this.bind("EnterFrame", this.update);
	},
	
	update: function(data){
		var deltaTime = (data.dt/ 1000);
		var depth;
		
		if(!this.dead){
			this._velocity.y += (this._acceleration * deltaTime);
			this.y -= (this._velocity.y * deltaTime);
			this.skipDistance += (this._velocity.x * deltaTime);
			
			Game.cloud._x -= this._velocity.x * deltaTime * 0.5;
		}
		depth = this.y + this.h - Game.waterSurface();
		
		if(depth < this.maxHeight)
		{
			this.maxHeight = depth;
		}
		
		if(depth < -5){
			this.airbornOnce = true;
			if(this._velocity.y > 0)
			{
				//console.log("skip reset");
				this.skippedThisFall = false;
			}
		}
		
		if(this.airbornOnce && depth > 30){
			this.dead = true;
		}
		
		if(this.skip && !this.dead){
			this.skip = false;
			
			if(this.airbornOnce && !this.skippedThisFall){
				this.animate("skip", 1);
				
				var percentPerfect = 1 - (Math.abs(depth - 10) / 20);
				
				if(this._velocity.y < 0 && depth < 30 && depth > -10){
					this._velocity.y = -(this._velocity.y * 1.4 * percentPerfect) - 30;
					
					var jumpQuality = "";
					if(percentPerfect > 0.90){
						jumpQuality = "Perfect!";
					}
					else if(percentPerfect > 0.75)
					{
						jumpQuality = "Great!";
					}
					else if(percentPerfect > 0.5)
					{
						jumpQuality = "Good";
					}
					else
					{
						jumpQuality = "Poor";
					}
					
					$("#jumpQuality").text(jumpQuality);
					$("#jumpQuality").show();
					$("#jumpQuality").fadeOut(800);
					
					
					//console.dir({depth: depth, percentPerfect: percentPerfect, velocity: this._velocity.y});
					
					this.skipCount++;
					this.skippedThisFall = true;
				}
			}
		}
	},
	
	
	reset: function(){
		
		Game.fish.animate("swim", -1);
		
		this.x = -Game.fish.w;
		this.y = Game.waterSurface() + 200;
		
		this.visible = true;
		
		this._velocity.y = 0;
		this.skip = false;
		this.airbornOnce = false;
		this.skippedThisFall = false;
		this.dead = false;
		
		this.skipCount = 0;
		this.skipDistance = 0;
		this.maxHeight = 0;
	},
});


Crafty.c("Killer Fish", {
	init: function(){
		this.requires('2D, Canvas, Persist, spr_shark, SpriteAnimation')
			.attr({
				x: -100,
				y: Game.waterSurface() + 50,
				w: 180,
				h: 80
			})
			.reel('mouthClosed', 10, 0, 0, 1)
			.reel('mouthOpen', 10, 1, 0, 1)
			.reel('eating', 150, 0, 0, 2)
			;
			//.color('rgb(255, 50, 20)');
			
			this.animate("mouthClosed");
		
		this.bind("EnterFrame", this.update);
	},
	
	update: function(data){
		
	},
	
	reset: function(){
		Game.killer.x = -this.w;
		Game.killer.y = Game.waterSurface() + 50; 
		
		this.animate("mouthClosed");
	},
});


Crafty.c("Water", {
	init: function(){
		this.requires('2D, Canvas, Color, Persist')
			.attr({
				x: 0,
				y: Game.waterSurface(),
				w: Game.width(),
				h: Game.height() - Game.waterSurface() + 800
			})
			.color('#004F98');
	},
	
});


Crafty.c("Cloud", {
	init: function(){
		this.requires('2D, Canvas, Persist, spr_cloud')
			.attr({
				x: Game.width() - 100,
				y: 100,
				w: 150,
				h: 150
			});
	},
});


Crafty.c("Splash", {
	init: function(){
		this.requires('2D, Canvas, Persist, spr_cloud')
			.attr({
				x: Game.width() - 100,
				y: 100,
				w: 150,
				h: 150
			});
	},
});

