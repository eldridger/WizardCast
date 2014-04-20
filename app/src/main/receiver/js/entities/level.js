
//level.js
(function() {

	//Expose constructor globally
	window.Level = Level;

	function Level(arr) {
		var rowTileCount = arr.length,
			colTileCount = arr[0].length,
			tileLeft,
			tileRight,
			tileAbove,
			tileBelow,
			tile, c, r, x, y;

		this.currentLevel = arr;
		this.rows = rowTileCount;
		this.cols = colTileCount;

		//Add tiles to currentLevel Array
		for(r = 0; r < rowTileCount; r++) {
			for(c = 0; c < colTileCount; c++) {

				x = c * sprites.groundTile.width;
				y = r * sprites.groundTile.height;

				tile = Game.newTile(x, y);

				if(arr[r][c] === -1) {
					tile.hide = true;
				} else {
					tile.hide = false;
				}

				this.currentLevel[r][c] = tile;
			}
		}

		//Add neighbor info, this way we dont check entire level after a tile is destroyed
		for (r = 0; r < rowTileCount; r++) {
			for (c = 0; c < colTileCount; c++) {

				if(typeof (this.currentLevel[r+1]) !== 'undefined') {
					tileBelow = this.currentLevel[r+1][c];
				}
				if(typeof (this.currentLevel[r-1]) !== 'undefined') {
					tileAbove = this.currentLevel[r-1][c];
				}
				if(typeof (this.currentLevel[r][c+1]) !== 'undefined') {
					tileRight = this.currentLevel[r][c+1];
				}
				if(typeof (this.currentLevel[r][c-1]) !== 'undefined') {
					tileLeft = this.currentLevel[r][c-1];
				}

				tile = this.currentLevel[r][c];

				if(tileBelow !== undefined) {
					tile.addNeighbor(tileBelow, 'below');
				}

				if(tileAbove !== undefined) {
					tile.addNeighbor(tileAbove, 'above');
				}

				if(tileRight !== undefined) {
					tile.addNeighbor(tileRight, 'right');
				}

				if(tileLeft !== undefined) {
					tile.addNeighbor(tileLeft, 'left');
				}

				if(!tile.hide) {
					tile.determineFrame();
				}
			}
		}
	}

	Level.prototype = {

		detectCollision : function(x, y, destroy) {
			var tileRow = Math.floor(y / 32),
				tileCol = Math.floor(x / 32),
				destroy = typeof destroy !== 'undefined' ? destroy : false,
				tile;

			if (typeof this.currentLevel[tileRow] !== 'undefined' &&
				typeof this.currentLevel[tileRow][tileCol] !== 'undefined') {

				tile = this.currentLevel[tileRow][tileCol];

				if(!tile.hide) {
					if(destroy) {
						tile.destroy();
					}
					return true;
				}
			}

			return false;
		}
	}


})();