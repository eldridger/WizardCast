
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
		framesPerRow :  4,
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