/*

	This is where drawing and animations and such will occur.

*/

var cast = window.cast || {};

(function() {
	Board.TEST = true;
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
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0, -1,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  0,  0,  0,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
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

	Board.levelTwo = [
		[-1, -1,  0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
		[-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 
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
				spell = Game.newSpell('fireball', player.x, player.y);
				this.shoot(spell, angle, distance/500, this.switchPlayer);
			}
		},

		/** 
		 * End a players turn and move to the next player
		 */
		switchPlayer : function(self) {
			self = typeof self === 'undefined' ? this : self;
			self.stopMovement();
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
			if(!this.isShooting) {

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
								spell = Game.newSpell('fireball', player.x, player.y);
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
					this.stopMovement();
				}
			} else { //we are shooting, stop moving
				this.stopMovement();

			}
		},

		stopMovement : function() {
			if(typeof this.keydownId !== 'undefined') {
				clearInterval(this.keydownId);
				this.keydownId = undefined;
				this.playerOne.stopWalk();
				this.playerTwo.stopWalk();
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
					character.moveX(character.x + character.speed);

					if(this.level.detectCollision(character, false)) {
						character.moveX(character.x - character.speed);
					} else {
						this.moveCharacter(character); //detect drop
					}

				} else if (direction === 'left') {
					character.moveX(character.x - character.speed);

					if(this.level.detectCollision(character)) {
						character.moveX(character.x + character.speed);
					} else {
						this.moveCharacter(character); //detect drop
					}

				} else { //no direction

					character.moveY(character.y + character.speed);

					if(this.level.detectDrop(character, false)) {
						character.moveY(character.y - character.speed);

					} else {

						this.moveCharacter(character); //detect drop
					}
				}

			}

		},

		//TODO: explosion is occuring under tiles
		//TODO: Add variables to a config file to allow easy tinkering
		//TODO: if we add spells that have different trajectories, move shoot to spell file
		shoot : function(spell, angle, power, callback) {
			var self = this,
				intervalId,
				power = (power > 0.8 ? 0.8 : power), //TODO: config file
				velocity = power,              //TODO: config file
				//power = (power > 300 ? 300 : power), //TODO: config file
				//velocity = power / 500,              //TODO: config file
				xSpeed = velocity * Math.cos(angle),
				ySpeed = velocity * Math.sin(angle),
				gravity = 0,
				wait = 0,
				animId, tempSpell;

			this.stopMovement();
			this.isShooting = true;
			//this.mProjectiles.push(spell);
			(function animate() {
				//Detecting collisions between speed jumps allows us to incrase speed without breaking collision
				var betweenSpeedX = spell.x + (xSpeed * (spell.speed / 2)),
					betweenSpeedY = spell.y + (ySpeed * (spell.speed / 2));

				animId = window.requestAnimationFrame(animate);

				spell.moveX(spell.x + (xSpeed * spell.speed));
				spell.moveY(spell.y + (ySpeed * spell.speed));
				spell.moveY(spell.y + gravity);
				gravity += 1.5; //TODO: config file

				if(wait < spell.speed) {
					//give time to not instantly collide with self
					wait += spell.speed/2;
				} else {
					//Temp spell is used to detect in between jumps because large jumps are
							//needed for the poor chromecast performance
					tempSpell = Game.newSpell(spell.type, betweenSpeedX, betweenSpeedY, true);

					if (self.level.detectCollision(spell, true)  || self.detectHit(spell) ||
						self.level.detectCollision(tempSpell, true) || self.detectHit(tempSpell)) {  

						cancelAnimationFrame(animId);

						spell.explode(function() {
							self.isShooting = false;

							//detect if a character has to drop down
							self.moveCharacter(self.playerOne);
							self.moveCharacter(self.playerTwo);
							if(typeof callback !== 'undefined') {
								callback(self);
							}
						})
					}
					tempSpell = undefined;
				}

			})();
		},

		/**
		 * Check if the tile at {x,y} has hit another character.
		 * @param {Object} spell The spell being casted
		 */
		detectHit : function(spell) {
			var character,
				sWidth = spell.sprite.width,
				sHeight = spell.sprite.height,
				isHit = false;

				hitSuccess = function(player, hit) {
					if(hit && spell.destroy) {
						player.hp -= spell.damage;
						if(player.hp <= 0) {
							this.endGame();
						}
						isHit = true;
					}
				};


			this.playerOne.checkHit(spell, hitSuccess);
			this.playerTwo.checkHit(spell, hitSuccess);

			return isHit;
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

	    	if(!Board.TEST) return;

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