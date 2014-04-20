
var ANIMATION_INTERVAL = 100,
sprites = {


	background : {
		image  : null,
		ready  : false,
		source : 'images/background.png',
	},

	fireball : {
		image     : null,
		destroy   : true,
		ready     : false,
		source    : 'images/fireball.png',
		width     :  32,
		height    :  32,
		frame     :  0,
		framesRow :  4,
		totalFrames : 20 //rows
	},

	wizard : {
		image        : null,
		ready        : false,
		source       : 'images/wizard_sheet.png',
		width        : 32,
		height       : 64,
		totalFrames  : 3,
		framesPerRow : 3,
		animate      : false,
		flip         : function() {
			//TODO: make a flipped version of the sprite sheet
			//      or adjust frame info.
			this.source = 'images/wizard_sheet.png';
		}
	},

	groundTile : {
		image        : null,
		ready        : false,
		source       : 'images/ground_tiles.png',
		width        : 32,
		height       : 32,
		frame        : 0,
		framesPerRow : 4
	}
};

/**
 * Construct a new spell
 * @Constructor
 */
function Spell(type, startX, startY) {
	//TODO: move to entity system
	this.id = 'spell';
	this.x = startX;
	this.y = startY;
	this.speed = 50;
	this.damage = 10;

	switch(type) {
		case 'fireball':
			this.sprite = sprites.fireball;
			break;
	}
	this.frame = sprites.fireball.frame;

	//destroys tiles on collision. Maybe make this a function when diff. spells are implemented.
	this.destroy = true;
	this.draw = draw;

	this.explode = function(callback) {
		var self = this;
		self.destroy = false; //to only do damage once

		self.frame = 4;
		self.explodeId = setInterval(function() {
			//if (self.frame === self.sprite.framesRow - 1) {
		//		self.frame = 0;
		//	} else {
				self.frame += 1;
		//	}

			if(self.frame > self.sprite.totalFrames) {
				clearInterval(self.explodeId);

				if(typeof callback !== 'undefined') {
					callback();
				}
			}
		}, ANIMATION_INTERVAL / 2);

	}

}

/**
 * draw object to context
 * @param {CanvasRenderingContext2D}  context to draw to
 * @param {Object} calling object used to reassign "this"
 */
function draw(context, object) {
	//TODO: once spell is moved to entity system, remove this
	var sprite, frameRow, frameCol;

	self = (typeof object !== 'undefined') ? object : this;

	sprite = self.sprite,
	frameRow = (self.frame / sprite.framesRow) | 0,
	frameCol = (self.frame % sprite.framesRow) | 0;
	if (sprite.ready) {
		context.drawImage(sprite.image,
			frameCol * sprite.width, frameRow * sprite.height, 
			sprite.width, sprite.height, 
			self.x, self.y, 
			sprite.width, sprite.height  
		);
	}
};

/**
 * Load images to memory
 */
function loadImages() {

	var sprite, key;

	for(key in sprites) {
		sprite = sprites[key];
		sprite.image = new Image();
		sprite.image.src = sprite.source;
		sprite.image.onload = (function(key, sprite) {
			return function() {
				sprite.ready = true;
				console.log(key +' image is ready!');
			}
		})(key, sprite);
	};
};