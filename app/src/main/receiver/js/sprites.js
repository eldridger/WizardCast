
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
		framesRow    : 3,
		animate      : false,
		flip         : function() {
			//TODO: make a flipped version of the sprite sheet
			//      or adjust frame info.
			this.source = 'images/wizard_sheet.png';
		}
	},

	groundTile : {
		image       : null,
		ready       : false,
		source      : 'images/ground_tiles.png',
		width       : 32,
		height      : 32,
		frame       : 0,
		totalFrames : 4
	}
};

function GroundTile(sprite) {

};

/**
 * Construct a new character
 * @Constructor
 */
function Character(sprite, isFlipped) {
	this.sprite = sprite;
	this.destroy = false;
	this.id = 'character'; //not sure if needed rightnow
	this.speed = 5;
	this.x = 0;
	this.y = 0;
	this.health = 100;
	this.frame = 0;

	if (typeof isFlipped !== 'undefined' && isFlipped === true)  {
		this.sprite.flip();
	}

	this.walk = function() {
		var self = this;
		this.frame += 1;

		this.walkId = setInterval(function() {
			if (self.frame === self.sprite.framesRow - 1) {
				self.frame = 0;
			} else {
				self.frame += 1;
			}
		}, ANIMATION_INTERVAL);
	};

	this.stopWalk = function () {
		clearInterval(this.walkId);
		this.frame = 0;
	};

	this.draw = function(context) {
		var healthWidth = 32 * (this.health / 100);
		//draw health then draw sprite
		//context.rect(this.x,this.y - 16, this.sprite.width,5);
		context.fillStyle = 'black';
		context.fillRect(this.x,this.y - 16, this.sprite.width,5);
		//context.rect(this.x, this.y - 16, healthWidth,5);
		context.fillStyle = 'red';
		context.fillRect(this.x, this.y - 16, healthWidth,5);
		//context.lineWidth = 2;

		draw(context, this);
	};

};

/**
 * Construct a new spell
 * @Constructor
 */
function Spell(type, startX, startY) {
	this.id = 'spell';
	this.x = startX;
	this.y = startY;
	this.speed = 5;
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