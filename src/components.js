

Crafty.c("Fish", {
	init: function(){
		this.requires('2D, Canvas, Color, Gravity, Collision')
			.attr({
				x: 30,
				y: 10,
				w: 80,
				h: 30
			})
			.color('rgb(255, 125, 40)')
			.gravity();
		
	},
	
	
});


Crafty.c("Water", {
	init: function(){
		this.requires('2D, Canvas, Color')
			.attr({
				x: 0,
				y: Game.height() - 150,
				w: Game.width(),
				h: 150
			})
			.color('rgb(0, 0, 180)');
	},
	
});
