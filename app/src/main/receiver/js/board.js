/*

	This is where drawing and animations and such will occur.

*/

var cast = window.cast || {};

(function() {
	Board.INTERVAL = 1000 / 60; //ms

	// -1 = empty, 0 = ground
	Board.levelOne = [
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0, -1,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0,  0,  0, -1,  0,  0,  0,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
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
		var self = this,
			i;

		this.isShooting = false;
		this.isMoving = false;
		this.mCurrentLevel = Board.levelOne;
		this.needsUpdate = true;
		this.mContext = context;
		this.mProjectiles = [];
		this.mCharacters = [];

		loadImages();

		this.characterOne = new Character(sprites.wizard);
		this.characterTwo = new Character(sprites.wizard, true);
		this.characterTwo.x = (this.mCurrentLevel[0].length - 1) * 32;

		this.currentPlayer = this.characterOne;
		this.generateLevel(this.mCurrentLevel);

		//Find Start location for character one
		for ( i = 0; i < this.mCurrentLevel.length && this.characterOne.y === 0; i++) {
			if (this.mCurrentLevel[i][0] > -1) {
				this.characterOne.y = (32 * i) - this.characterOne.sprite.height;
			}

			if (this.mCurrentLevel[i][this.mCurrentLevel[0].length - 1] > -1) {
				this.characterTwo.y = (32 * i) - this.characterTwo.sprite.height;
			}
		}

		this.mCharacters.push(this.characterOne);
		this.mCharacters.push(this.characterTwo);

	}

	Board.prototype = {

		/**
		 * Start the game loop
		 */
		start: function() {
			var self = this;
			setInterval(
				function() {
					if (self.needsUpdate) {
						self.render();
					}
				}, Board.INTERVAL);

		},

		/**
		 * Function to bind to the click listener TODO: will have to be modified to handle chromecast input
		 * @param {Event} event the click event
		 */
		handleClick : function(event) {
			var x, y;

			x = event.pageX - 25; // to allign with tip of mouse pointer
			y = event.pageY - 25;
			if (!this.isShooting) {
				this.shoot(x, y);
			}
		},

		/** 
		 * Handler for movement events
		 * @param {String} event JSON string formatted event information
		 */
		handleEvent : function(event) {
			//Eventually will parse JSON from game.onMessage
			var self = this,
				sprite = this.currentPlayer.sprite,
				type = event.type,
				keyCode = event.keyCode,

				//keycodes for keyboard buttons
				left  = 37,
				up    = 38,
				right = 39,
				down  = 40,
				message, obj;

			//If the event comes from chromecast
			if(type === 'message') {
				message = event.data;
				obj = JSON.parse(message);

				switch(obj.command) {
					case 'MOVE':
						//We start and stop moving with one event each and don't need the events in between
						if(!this.isMoving) {
							this.isMoving = true;
							type = 'keydown';
							keyCode = obj.message;
						} else {
							type = 'skip';
						}
						break;
					case 'ACTION':
						if(obj.message === 'RELEASE') {
							this.isMoving = false;
							type = 'keyup';
						}
						break;
					case 'SHOOT':
						this.shoot(obj.data.power, obj.data.angle);
						break;
					default:
						break;

				}
			}

			if(type === 'keydown') {
				this.currentPlayer.walk();

				this.keydownId = setInterval(
					function() {
						switch(keyCode){
							case 'LEFT':
							case left:
								self.moveCharacter('left');
								break;
							case 'RIGHT':
							case right:
								self.moveCharacter('right');
								break;
							case 'UP':
							case up:
								break;
							case 'DOWN':
							case down:
								break;
						}

					}, Board.INTERVAL);

			} else if (type === 'keyup') {
				clearInterval(this.keydownId);
				this.currentPlayer.stopWalk();
			}
		},

		/**
		 * Move the character
		 * @param {Object} character object with sprite, x, y, etc.
		 * @param {String} direction
		 */
		moveCharacter : function (direction) {
			var character = this.currentPlayer,
				wizard = this.currentPlayer.sprite,
				level = this.mCurrentLevel,
				xOffset = 0,
				yOffset = 0;

			if(wizard.ready) {

				if (direction === 'right') {
					xOffset = (wizard.width / 2); //Right bound
					yOffset = (wizard.height / 2) - 1; //Bottom

					if(!this.detectCollision(wizard,
						character.x + character.speed, character.y, xOffset, yOffset)) {

							character.x += character.speed;
							this.moveCharacter(); //Detect drop
					}

				} else if (direction === 'left') {
					xOffset = -1 * (wizard.width / 2); //Left bound
					yOffset = (wizard.height / 2) - 1; //Bottom

					if(!this.detectCollision(wizard,
						character.x - character.speed, character.y, xOffset, yOffset)) {

							character.x -= character.speed;
							this.moveCharacter(); //Detect drop
					}

				} else { //no direction
					yOffset = (wizard.height / 2); //Bottom bound

					if(!this.detectCollision(wizard,
						character.x, character.y + character.speed, xOffset, yOffset)) {

							character.y += character.speed;
							this.moveCharacter(); //Detect drop
					}
				}

			}

		},

		/**
		 * Shoot a Projectile TODO: will have to be modified to handle chromecast input
		 * @param {int} clickX x coordinate of click event
		 * @param {int} clickY y coordinate of click event
		 */
		shoot: function(clickX, clickY) {
			//TODO: change parameters to angle and power for chromecast input.g
			var self = this,
				intervalId,
				//Change later when CharacterTwo is implemented
				distanceX =  clickX - this.currentPlayer.x,
				distanceY = clickY - this.currentPlayer.y,
				distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY))
				angle = Math.atan2(distanceY, distanceX),
				velocity = distance / 400, //When chromecast controls are implemented this will be set by flick
				gravity = .1,

				spell = new Spell('fireball', this.currentPlayer.x, this.currentPlayer.y);

			this.isShooting = true;
			this.mProjectiles.push(spell);

			intervalId = setInterval(
				function() {
					var xSpeed = velocity * Math.cos(angle),
						ySpeed = velocity * Math.sin(angle);

					spell.x = spell.x + (xSpeed * spell.speed);
					spell.y = spell.y + (ySpeed * spell.speed);
					spell.y += gravity;
					gravity += .1;

					if (self.detectCollision(spell.sprite, spell.x, spell.y) || self.detectHit(spell)) {

						clearInterval(intervalId);
						self.isShooting = false;
						for(i in self.mProjectiles) {                //Remove spell
							if (self.mProjectiles[i].id === 'spell') {
								self.mProjectiles.splice(i, 1);
								//TODO: Make this the current spell in case there is a splitting spell w/ mult. projectiles
							}
						}
					}
				}, Board.INTERVAL);
		},

		/**
		 * Check if the tile at {x,y} has hit another character.
		 * @param {Object} spell The spell being casted
		 */
		detectHit : function(spell) {
			var character;
			for (i in this.mCharacters) {
				character = this.mCharacters[i];
				if (spell.x > character.x && spell.x < character.x + character.sprite.width) {
					if(spell.y > character.y && spell.y < character.y + character.sprite.width) {
						character.health -= spell.damage;
						return true;
					}
				}
			}
			return false;
		},
		

		/**
		 * check if the tile at {x, y} is empty or not
		 * @param {int} x x coord
		 * @param {int} y y coord
		 * @return {boolean} true if hit, false if no hit
		 */
		detectCollision : function(sprite, x, y, xOffset, yOffset) {
			var level = this.mCurrentLevel,
				tile = -1,
				row, col;

			if (typeof xOffset !== 'undefined') {
				x = x + xOffset;
			}
			if (typeof yOffset !== 'undefined') {
				y = y + yOffset;
			}

			//If offsets are not defined, these refer to the middle of a tile
			row = Math.floor((y + (sprite.height / 2)) / 32);
			col = Math.floor((x + (sprite.width / 2)) / 32);

			if (typeof level[row] !== 'undefined' && typeof level[row][col] !== 'undefined') {
				tile = level[row][col];
			} else {
				//Out of screen
				return true;
			}

			if (tile > -1) {
				if (sprite.destroy) {
					this.mCurrentLevel[row][col] = -1;       //Remove tile
					this.generateLevel(this.mCurrentLevel); //Update Level
				}
				return true;
			}
			return false;
		},

		/**
		 * Renders background, level, and all objects to the screen
		 */
		render: function() {
			var background = sprites.background,
				ground = sprites.groundTile,
				tileWidth = ground.width,
				tileHeight = ground.height,
			tempCanvas, tempContext, canvas, tileRow, tileCol, currTile, sprite;

			if(background.ready) {

				//Setup Temp canvas for double buffering
				tempCanvas = document.createElement('canvas');
				tempContext = tempCanvas.getContext('2d');
				canvas = document.getElementById('board');
				tempCanvas.width = canvas.width;
				tempCanvas.height = canvas.height;

				//Draw Background
				tempContext.drawImage(background.image, 0, 0);

				//Draw Level Array
				for (r = 0; r < this.mCurrentLevel.length; r++) {
					for (c = 0; c < this.mCurrentLevel[0].length; c++) {

						currTile = this.mCurrentLevel[r][c];
						tileRow = (currTile / ground.totalFrames) | 0; //Bitwise OR = Math.floor
						tileCol = (currTile % ground.totalFrames) | 0;

						tempContext.drawImage(sprites.groundTile.image,
							tileCol * tileWidth, tileRow * tileHeight, tileWidth, tileHeight,
							(c * tileWidth), (r * tileHeight), tileWidth, tileHeight 
						);

					}
				}

				//Draw projectiles
				for (obj in this.mProjectiles) {
					this.mProjectiles[obj].draw(tempContext);
				}
				//Draw characters
				for (obj in this.mCharacters) {
					this.mCharacters[obj].draw(tempContext);
				}

				//Draw temp canvas to real canvas
				this.mContext.drawImage(tempCanvas, 0, 0);
			}
		},

		/**
		 * Generate level tiles and write them to mCurrentLevel array
		 * @param {Array} 2D array with Level info
		 */
		generateLevel : function(level) {
			var rowTileCount = level.length,
				colTileCount = level[0].length,
				tile = 0, tileLeft = -1, tileRight = -1,
				tileAbove = -1, tileBelow = -1,
				c, r;

			for (r = 0; r < rowTileCount; r++) {
				for (c = 0; c < colTileCount; c++) {
					//see ground_tile_reference for map
					tile = level[r][c];

					if (tile !== -1) {

						tileBelow = (typeof (level[r+1])    !== 'undefined') ? level[r+1][c] : -1;
						tileAbove = (typeof (level[r-1])    !== 'undefined') ? level[r-1][c] : -1;
						tileRight = (typeof (level[r][c+1]) !== 'undefined') ? level[r][c+1] : -1;
						tileLeft  = (typeof (level[r][c-1]) !== 'undefined') ? level[r][c-1] : -1;

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

						//set tile
						this.mCurrentLevel[r][c] = tile;
					}
				}
			}

			this.moveCharacter(this.characterOne); //Update Character
		},

		/**
		 * Get Context
		 * @return {CanvasRenderingContext2D} 
		 */
		getContext : function() {
			return this.mContext;
		}

	}; //end prototype


	//expose public functions and APIs
	cast.Board = Board;
})();