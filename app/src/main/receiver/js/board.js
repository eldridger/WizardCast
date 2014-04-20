/*

	This is where drawing and animations and such will occur.

*/

var cast = window.cast || {};

(function() {
	Board.mShowTestVersion = '1.0'; //Change to see if new files are loaded on Drive yet.
	Board.FPS = 10;
	Board.INTERVAL = 1000 / Board.FPS; //ms

	// -1 = empty, 0 = ground
	Board.levelOne = [
		[-1, -1,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
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

		this.endGame = false;
		this.width = document.getElementById('board').width;
		this.height = document.getElementById('board').height;
		this.isShooting = false;
		this.isMoving = false;
		this.level = new Level(Board.levelOne);
		this.mCurrentLevel = this.level.currentLevel;
		this.needsUpdate = true;
		this.mContext = context;
		this.mProjectiles = [];
		this.mCharacters = [];

		loadImages();

		this.playerOne = Game.newPlayer('player1', false);
		this.playerTwo = Game.newPlayer('player2', true);

		this.playerTwo.moveX((this.mCurrentLevel[0].length - 1) * 32);

		this.currentPlayer = this.playerOne;
		//this.generateLevel(this.mCurrentLevel);

		//Find Start location for character one
		for ( i = 0; i < this.mCurrentLevel.length && this.playerOne.y === 0; i++) {
			if (!this.mCurrentLevel[i][0].hide) {
				this.playerOne.moveY((32 * i) - this.playerOne.sprite.height);
			}
		}

		for ( i = 0; i < this.mCurrentLevel.length && this.playerTwo.y === 0; i++) {
			if (!this.mCurrentLevel[i][this.mCurrentLevel[0].length - 1].hide) {
				this.playerTwo.moveY((32 * i) - this.playerTwo.sprite.height);
			}
		}

		this.mCharacters.push(this.playerOne);
		this.mCharacters.push(this.playerTwo);

		if(typeof Board.mShowTestVersion !== 'undefined') {
			this.versionEntity = Game.createEntity({
				x : 1210,
				y : 25,
				text : Board.mShowTestVersion
			}, [Game.component.isText]);
		}
	}

	Board.prototype = {

		/**
		 * Start the game loop
		 */
		start: function() {
			var self = this,
				loopId;

			(function game() {
				loopId = window.requestAnimationFrame(game);
				self.render();
				if(self.endGame) {
					window.cancelAnimationFrame(loopId);
					loopId = undefined;
				}
			})();
		},

		/**
		 * Function to bind to the click listener TODO: will have to be modified to handle chromecast input
		 * @param {Event} event the click event
		 */
		handleClick : function(event) {
			var player = this.currentPlayer,
				x = event.pageX - 25, // to allign with tip of mouse pointer
				y = event.pageY - 25,
				distanceX = x - player.x,
				distanceY = y - player.y,
				distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY)),
				angle = Math.atan2(distanceY, distanceX),
				spell;

				if(distance > 1000) {
					distance = 1000;
				}

			if (!this.isShooting) {
				this.isShooting = true;
				spell = new Spell('fireball', player.x, player.y);
				this.shoot(spell, angle, distance, this.switchPlayer);
			}
		},

		/** 
		 * End a players turn and move to the next player
		 */
		switchPlayer : function(self) {
			self = typeof self === 'undefined' ? this : self;
			if(self.currentPlayer === self.playerOne) {
				self.currentPlayer = self.playerTwo;
			} else if (self.currentPlayer === self.playerTwo) {
				self.currentPlayer = self.playerOne;
			}
		},

		/** 
		 * Handler for movement events
		 * @param {String} event JSON string formatted event information
		 */
		handleEvent : function(event) {
			//Eventually will parse JSON from game.onMessage
			var self = this,
				player = this.currentPlayer,
				sprite = player.sprite,
				type = event.type,
				keyCode = event.keyCode,

				//keycodes for keyboard buttons
				left  = 37,
				up    = 38,
				right = 39,
				down  = 40,
				message, innerMessage, obj, spell;
			//If the event comes from chromecast
			this.displayDebug(event.type);
			if(type === 'message') {
				message = event.data;
				obj = JSON.parse(message);
				//this.displayDebug(obj.command + "    " + obj.message);

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
						if(!this.isShooting) {
							this.isShooting = true;
							innerMessage = JSON.parse(obj.message);
							//TODO: type of spell will eventually be sent from android
							spell = new Spell('fireball', player.x, player.y);
							this.shoot(spell, innerMessage.angle, innerMessage.power, this.switchPlayer);
							this.displayDebug('distance: ' + JSON.parse(obj.message).power + " angle: " + innerMessage.angle);
						}

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
								self.moveCharacter(player, 'left');
								break;
							case 'RIGHT':
							case right:
								self.moveCharacter(player, 'right');
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
		moveCharacter : function (character, direction) {
			var wizard = character.sprite,
				level = this.mCurrentLevel,
				xOffset = 0,
				yOffset = 0;

			if(wizard.ready) {

				if (direction === 'right') {
					xOffset = (wizard.width) + character.speed; //Right bound + speed
					yOffset = wizard.height - (wizard.height / 2);

					if(!this.level.detectCollision(xOffset + character.x, character.y, false)               //detect top (no offset)
						&& !this.level.detectCollision(xOffset + character.x, yOffset + character.y, false) //detect bottom
						&& (xOffset + character.x) > 0 && (xOffset + character.x) < this.width) {
					//if(!this.detectCollision(character, xOffset, yOffset)) {

							character.moveX(character.x + character.speed);
							this.moveCharacter(character); //Detect drop
					}

				} else if (direction === 'left') {
					xOffset = -1 * (wizard.width / 2) + character.speed;; //Left bound + speed

					if(!this.level.detectCollision(xOffset + character.x, yOffset + character.y, false)
						&& (xOffset + character.x) > 0 && (xOffset + character.x) < this.width) {
					//if(!this.detectCollision(character, xOffset, yOffset)) {

							character.moveX(character.x - character.speed);
							this.moveCharacter(character); //Detect drop
					}

				} else { //no direction
					yOffset = (wizard.height) + 1; //Bottom bound + 1

					if(!this.level.detectCollision(xOffset + character.x, yOffset + character.y, false)
						&& yOffset + character.y > 0 && yOffset + character.y < this.height) {
					//if(!this.detectCollision(character, xOffset, yOffset)) {

							character.y += character.speed;
							this.moveCharacter(character); //Detect drop
					}
				}

			}

		},

		//TODO: move spell and shooting functionality to the entity system
		//TODO: Also, explosion is occuring under tiles
		//TODO: Add variables to a config file to allow easy tinkering
		shoot : function(spell, angle, power, callback) {
			var self = this,
				intervalId,
				power = (power > 300 ? 300 : power), //TODO: config file
				velocity = power / 500,              //TODO: config file
				xSpeed = velocity * Math.cos(angle),
				ySpeed = velocity * Math.sin(angle),
				gravity = 0,
				animId;

			this.isShooting = true;
			this.mProjectiles.push(spell);

			(function animate() {
				//Detecting collisions between speed jumps allows us to incrase speed without breaking collision
				var betweenSpeedX = xSpeed * (spell.speed / 2),
					betweenSpeedY = ySpeed * (spell.speed / 2);

				animId = window.requestAnimationFrame(animate);

				spell.x = spell.x + (xSpeed * spell.speed);
				spell.y = spell.y + (ySpeed * spell.speed);
				spell.y += gravity;
				gravity += 1; //TODO: config file

				if (self.level.detectCollision(spell.x, spell.y, true)  || self.detectHit(spell) ||
					self.level.detectCollision(betweenSpeedX, betweenSpeedY, true)) {  

					cancelAnimationFrame(animId);

					spell.explode(function() {
						self.isShooting = false;
						if(typeof callback !== 'undefined') {
							callback(self);
						}
					})
				}

			})();
			/*
			intervalId = setInterval(
				function() {

					spell.x = spell.x + (xSpeed * spell.speed);
					spell.y = spell.y + (ySpeed * spell.speed);
					spell.y += gravity;
					gravity += .1;

					//Give it a few milliseconds because the spell starts under char.
					    //hopefully we won't need this after optimizing for better chromecast performance
					setTimeout(function() {
						if (self.level.detectCollision(spell.x, spell.y, true)  || self.detectHit(spell)) {

							clearInterval(intervalId);

							spell.explode(function() {
								self.remove(spell, self.mProjectiles);

								self.isShooting = false;

								if(typeof callback !== 'undefined') {
									callback(self);
								}
							});
						}
					}, 500);
			}, Board.INTERVAL);
*/
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
						if(spell.destroy) {
							character.hp -= spell.damage;
							if(character.hp <= 0) {
								this.endGame(character);
							}
							return true;
						}
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
		detectCollision : function(entity, xOffset, yOffset) {
			var sprite = entity.sprite,
				x = entity.x,
				y = entity.y,
				level = this.mCurrentLevel,
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

		endGame : function(loser) {
			this.endGame = true;
			//TODO: display winner screen
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

				//Draw projectiles
				for (obj in this.mProjectiles) {
					this.mProjectiles[obj].draw(tempContext);
				}

				//draw all entities
				Game.drawEntities(tempContext);

				//Draw temp canvas to real canvas
				this.mContext.fillRect(0, 0, canvas.width, canvas.height);
				this.mContext.drawImage(tempCanvas, 0, 0);

			}
		},
		/**
		 * Remove object from draw array
		 * @param {Object} object to remove
		 * @param {Array} array array to remove from
		 */
		remove : function (object, array) {
						
			for(i in array) {                //Remove spell
				if (array[i] === object) {
					array.splice(i, 1);
				}
			}
		},

		/**
		 * Get Context
		 * @return {CanvasRenderingContext2D} 
		 */
		getContext : function() {
			return this.mContext;
		},


	    // Display a debug message in the bottom left of the screen and console
	    displayDebug : function(text, drawX, drawY) {
			var x = typeof drawX !== 'undefined' ? drawX : 20,
	    		y = typeof drawY !== 'undefined' ? drawY : 20;

	    	if(typeof this.debugEntity !== 'undefined') {
	    		Game.removeEntity(this.debugEntity);
	    	}
			this.debugEntity = Game.createEntity({
				x      : x,
				y      : y,
				text   : text
			}, [Game.component.isText]);

	     	//console.log(text);

	      //this.castReceiverManager_.setApplicationState(text);
	    }

	}; //end prototype


	//expose public functions and APIs
	cast.Board = Board;
})();