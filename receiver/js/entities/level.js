
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

		detectDrop : function(entity) {
			var sprite = entity.sprite,
				x = entity.x,
				y = entity.y,
				tile, tileRow, tileCol, corners;

			corners = {
				botLeft  : {
					row  : y + sprite.height - 1,
					col  : x + 5
				},

				botRight : {
					row  : y + sprite.height - 1,
					col  : x + sprite.width - 5
				}
					
			}

			for ( i in corners ) {
				corner = corners[i];
				tileRow = Math.floor(corner.row / 32);
				tileCol = Math.floor(corner.col / 32);

				if(typeof this.currentLevel[tileRow] !== 'undefined' &&
				   typeof this.currentLevel[tileRow][tileCol] !== 'undefined') {

					tile = this.currentLevel[tileRow][tileCol];

					if(!tile.hide) {
						return true;
					}

				} else { //undefined = off screen
					return true;
				}
			}
			return false;
		},

		detectCollision : function(entity, destroy) {
			var sprite = entity.sprite,
				x = entity.x,
				y = entity.y,
				destroy = typeof destroy !== 'undefined' ? destroy : false,
				tile, tileRow, tileCol, i, corner, corners;

			corners = {

				topLeft  : {
					row  : y,
					col  : x
				},

				topRight : {
					row  : y,
					col  : x + sprite.width
				},

				botLeft  : {
					row  : y + sprite.height - 1,
					col  : x
				},

				botRight : {
					row  : y + sprite.height - 1,
					col  : x + sprite.width
				}
			}

			for ( i in corners ) {
				corner = corners[i];
				tileRow = Math.floor(corner.row / 32);
				tileCol = Math.floor(corner.col / 32);

				if(typeof this.currentLevel[tileRow] !== 'undefined' &&
				   typeof this.currentLevel[tileRow][tileCol] !== 'undefined') {

					tile = this.currentLevel[tileRow][tileCol];

					if(!tile.hide) {
						if(destroy) {
							tile.destroy();
						}
						return true;
					}

				} else { //undefined = off screen
					return true;
				}
			}

			return false;
		}
	}


})();