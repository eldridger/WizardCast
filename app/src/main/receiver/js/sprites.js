
var INTERVAL = 200,
sprites = {


	background : {
		image  : null,
		ready  : false,
		source : 'images/background.png',
	},

	fireball : {
		image   : null,
		destroy : true,
		ready   : false,
		source  : 'images/tile_sheet.png',
		width   :  32,
		height  :  32,
		frame   :  3,
		totalFrames : 2 //rows
	},

	wizard : {
		image        : null,
		ready        : false,
		source       : 'images/wizard_sheet.png',
		width        : 32,
		height       : 64,
		frame        : 0,
		totalFrames  : 3, //rows
		animate      : false,
		walk         : function() {
			var self = this;
			this.frame += 1;

			this.id = setInterval(function() {
				if (self.frame === self.totalFrames - 1) {
					self.frame = 0;
				} else {
					self.frame += 1;
				}
			}, INTERVAL);
		},
		stopWalk : function () {
			clearInterval(this.id);
			this.frame = 0;
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