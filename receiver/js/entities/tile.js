
//tile.js
(function() {

	Game.newTile = function(x, y) {
		var sprite = sprites.groundTile,
			entity;

		x = typeof x !== 'undefined' ? x : 0;
		y = typeof y !== 'undefined' ? y : 0;

		entity = Game.createEntity({
			sprite : sprite,
			name   : 'tile',
			x      : x,
			y      : y,
			frame  : 0,
			width  : sprite.width,
			height : sprite.height,
			hide   : false,
			neighborList : {}
		}, [Game.component.tile]);

		return entity;
	}

	Game.component.tile = {

		addNeighbor : function(neighbor, location) {
			if (typeof this.neighborList[location] === 'undefined' ||
						this.neighborList[location] === -1) {

				this.neighborList[location] = neighbor;
			}
		},

		draw : function(context) {
			if(!this.hide) {
				Game.component.drawable.draw(context, this);
			}
		},

		destroy : function() {
			var i;

			//remove tile
			this.hide = true;
			//change neighbor frames
			for (i in this.neighborList) {
				this.neighborList[i].determineFrame();
			}
		},

		determineFrame : function() {
			var aboveEmpty = true,
				belowEmpty = true,
				rightEmpty = true,
				leftEmpty  = true;

			//If undefined, tile if off the sceen
			if (typeof this.neighborList['above'] !== 'undefined') {
				aboveEmpty = this.neighborList['above'].hide;
			}

			if (typeof this.neighborList['below'] !== 'undefined') {
				belowEmpty = this.neighborList['below'].hide;
			}

			if (typeof this.neighborList['right'] !== 'undefined') {
				rightEmpty = this.neighborList['right'].hide;
			}

			if (typeof this.neighborList['left'] !== 'undefined') {
				leftEmpty = this.neighborList['left'].hide;
			}

			if (aboveEmpty && leftEmpty && rightEmpty ) {
				this.frame = 4;
			}  else if (aboveEmpty && rightEmpty) {
				this.frame = 7;
			} else if (aboveEmpty && leftEmpty) {
				this.frame = 5;
			} else if (aboveEmpty) {
				this.frame = 6;
			} else if (belowEmpty && leftEmpty && rightEmpty) {
				this.frame = 1;
			} else if (belowEmpty && leftEmpty) {
				this.frame = 9;
			} else if (belowEmpty && rightEmpty) {
				this.frame = 11;
			} else if (belowEmpty) {
				this.frame = 10;
			} else if (leftEmpty) {
				this.frame = 12;
			} else if (rightEmpty) {
				this.frame = 13;
			}

		}
	}
})();