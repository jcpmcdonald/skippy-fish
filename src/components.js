

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
		this.requires('2D, Canvas, Color, Collision, Persist')
			.attr({
				x: 30,
				y: 10,
				w: 80,
				h: 30
			})
			.color('rgb(255, 125, 40)');
		
		this.bind("EnterFrame", this.update);
	},
	
	update: function(data){
		var deltaTime = (data.dt/ 1000);
		var depth;
		
		if(!this.dead){
			this._velocity.y += (this._acceleration * deltaTime);
			this.y -= (this._velocity.y * deltaTime);
			this.skipDistance += (this._velocity.x * deltaTime);
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
				console.log("skip reset");
				this.skippedThisFall = false;
			}
		}
		
		if(this.airbornOnce && depth > 30){
			this.dead = true;
		}
		
		if(this.skip){
			this.skip = false;
			
			if(this.airbornOnce && !this.skippedThisFall){
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
					
					
					console.dir({depth: depth, percentPerfect: percentPerfect, velocity: this._velocity.y});
					
					this.skipCount++;
					this.skippedThisFall = true;
				}
			}
		}
	},
	
	
	reset: function(){
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
		this.requires('2D, Canvas, Color, Persist')
			.attr({
				x: -100,
				y: Game.waterSurface() + 50,
				w: 180,
				h: 80
			})
			.color('rgb(255, 50, 20)');
		
		this.bind("EnterFrame", this.update);
	},
	
	update: function(data){
		
	},
	
	reset: function(){
		Game.killer.x = -this.w;
		Game.killer.y = Game.waterSurface() + 50; 
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


