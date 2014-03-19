

var sprites = {
   //.

	background : {
		image  : null,
		ready  : false,
		source : 'images/background.png',
	},

	wizard : {
		image  : null,
		ready  : false,
		source : 'images/tile_sheet.png',
		width  :  32,
		height :  64
	},

	groundTile : {
		image  : null,
		ready  : false,
		source : 'images/ground_tiles.png',
		width  : 32,
		height : 32,
		tilesPerRow : 4
	},
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