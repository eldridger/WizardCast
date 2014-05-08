
//tile.js
(function() {

	Game.newSpell = function(spell, startx, starty, temp) {
		var temp = (typeof temp === 'undefined') ? false : temp,
			entity,
			sprite,
			compArr = [Game.component.moveable,
					   Game.component.explodes];

		if(!temp) {
			compArr.push(Game.component.drawable);
		}

		switch(spell) {
			case 'fireball':
				sprite = sprites.fireball;
				break;
		}

		entity = Game.createEntity({
			sprite  : sprite,
			type    : spell,
			name    : 'spell',
			x       : startx,
			y       : starty,
			speed   : 50,
			damage  : 10,
			destroy : true,
			frame   : 0,
			width   : sprite.width,
			height  : sprite.height

		}, compArr);

		return entity;
	}

	Game.component.explodes = {
		explode : function(callback) {
			var self = this;

			self.frame = 4;

			self.explodeId = setInterval(function() {
				self.frame +=1;

				if(self.frame > self.sprite.totalFrames) {
					clearInterval(self.explodeId);
					Game.removeEntity(this);
					if(typeof callback !== 'undefined') {
						callback();
					}
				}
			}, 50);
		}
	}

})();