/*

	This is where drawing and animations and such will occur.
k
*/

var cast = window.cast || {};

(function() {
	Board.INTERVAL = 1000 / 60; //ms
	Board.levelOne = [
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], 
		[ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], 
		[ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], 
		[ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], 
		[ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0] ];

	/**
	 * creates empty board
	 * @param {CanvasRenderingContext2D} context the 2D context of the canvas
	 * @constructor
	*/
	function Board(context) {
		var self = this;
		this.needsUpdate = true;
		this.mContext = context;
		console.log("context: " + this.mContext);

		loadImages();

		//preload image files and set flags
		//this.bgImage = new Image();
		//this.tileSetImage = new Image();
		//this.bgReady = false;
		//this.tileSetReady = false;

		//this.bgImage.src = "images/background.png";
		//this.tileSetImage.src = 'images/tile_sheet.png';

		this.characterOne = {
			speed : 256,
			x     : 0,
			y     : 0
		};
		this.characterTwo = {
			speed : 256,
			x     : 0,
			y     : 0
		};

	}

	Board.prototype = {

		start: function() {
			var self = this;
			setInterval(
				function() {
					if (self.needsUpdate) {
						self.render();
					}
				}, Board.INTERVAL);

		},

		render: function() {
			var tempCanvas = document.createElement('canvas'),
				tempContext = tempCanvas.getContext('2d'),
				canvas = document.getElementById('board'),
				background = sprites.background;

			tempCanvas.width = canvas.width;
			tempCanvas.height = canvas.height;

			if(background.ready) {
				//Draw to temp context first (double buffering)
				tempContext.drawImage(background.image, 0, 0);
				this.generateLevel(tempContext, Board.levelOne);
				this.testAnimation(tempContext, Board.levelOne);

				this.mContext.drawImage(tempCanvas, 0, 0);
			}
		},

		testAnimation: function(context, level) {
			//basic collision detection up in here
			var wizard = sprites.wizard,
			row, col, tileUnderCharacter;
			if(wizard.ready) {
				row = ((this.characterOne.y + 64) / 32) | 0;
				col = ((this.characterOne.x) + 32) / 32 | 0;
				tileUnderCharacter = level[row][col-1];

				this.drawSprite(context, wizard, this.characterOne);
				
				if(tileUnderCharacter < 0) {
					//If not a factor of 32, it does not line up to tiles well.
					this.characterOne.y += 8;
				} else {
					this.needsUpdate = false;
				}
			}
		},

		drawSprite : function(context, sprite, character) {
			context.drawImage(sprite.image,
				0, 0, //temp. hardcoded
				sprite.width, sprite.height, character.x, character.y,
				sprite.width, sprite.height);
		},

		generateLevel: function(context, level) {
			var self = this,
				ground = sprites.groundTile,
				width = ground.width,
				height = ground.height,
				tileSize = 32,
				rowTileCount = level.length,
				colTileCount = level[0].length,
				imageNumTiles = ground.tilesPerRow,
				tile = 0, tileLeft = -1, tileRight = -1,
				tileAbove = -1, tileBelow = -1,
				tileRow, tileCol, c, r

			if(ground.ready) {
				for (r = 0; r < rowTileCount; r++) {
					for (c = 0; c < colTileCount; c++) {
						//see ground_tile_reference for map
						tile = level[r][c];

						if (tile !== -1) {
							tileBelow = (typeof (level[r+1])    !=='undefined') ? level[r+1][c] : -1;
							tileAbove = (typeof (level[r-1])    !=='undefined') ? level[r-1][c] : -1;
							tileRight = (typeof (level[r][c+1]) !=='undefined') ? level[r][c+1] : -1;
							tileLeft  = (typeof (level[r][c-1]) !=='undefined') ? level[r][c-1] : -1;

							if (tileAbove === -1 && tileLeft === -1 && tileRight === -1) {
								tile = 4;
							}  else if (tileAbove === -1 && tileRight === -1) {
								tile = 7;
							} else if (tileAbove === -1 && tileLeft === -1) {
								tile = 5;
							} else if (tileAbove === -1) {
								tile = 6;
							} else if (tileBelow === -1 && tileLeft === -1 && tileRight === -1) {
								tile = 1;
							} else if (tileBelow === -1 && tileLeft === -1) {
								tile = 9;
							} else if (tileBelow === -1 && tileRight === -1) {
								tile = 11;
							} else if (tileBelow === -1) {
								tile = 10;
							} else if (tileLeft === -1) {
								tile = 12;
							} else if (tileRight === -1) {
								tile = 13;
							}


							// row/col of tile reference
							tileRow = (tile / imageNumTiles) | 0; //Bitwise OR = Math.floor
							tileCol = (tile % imageNumTiles) | 0;

							context.drawImage(ground.image, (tileCol * tileSize),
									(tileRow * tileSize), tileSize, tileSize, (c*tileSize),
									(r*tileSize), tileSize, tileSize);
						}
					}
				}
			}
		}

	}; //end prototype


	//expose public functions and APIs
	cast.Board = Board;
})();