
//componentSystem.js
(function() {

	Game.entityList = [];
	Game.component = {};

	Game.createEntity = function(properties, components) {
		var prop,
			entity = {}

		//Add properties to entity object
		for(prop in properties) {
			entity[prop] = properties[prop];
		}

		//Add component to entity object
		components.forEach(function(component) {
			for(prop in component) {
				if(entity.hasOwnProperty(prop)) {
					throw "Entity property conflict! " + prop;
				}
				entity[prop] = component[prop];
			}
		});

		this.entityList.push(entity);
		return entity;
	}

	Game.removeEntity = function(entity) {
		for(i in this.entityList) {
			if (this.entityList[i] === entity) {
				this.entityList.splice(i, 1);
				return true;
			}
		}
		return false;
	}

	Game.drawEntities = function(context) {
		var entity;
		for (i in this.entityList) {
			entity = this.entityList[i];

			if(entity.draw && (typeof entity.hide === 'undefined' || !entity.hide)) {
				entity.draw(context);
			}
		}
	}

	Game.component.isText = {
		draw : function(context, self){ 
			context.font = '25pt Calibri';
			context.fillText(this.text, this.x, this.y);
		}
	}

	Game.component.moveable = {
		/**
		 * Change x and y values
		 * @param {int} x  x value to move to
		 * @param {int} y  y value to move to
		 */
		move : function(x, y) {
			this.x = x;
			this.y = y;
		},

		/**
		 * Change x value
		 * @param {int} x  x value to move to
		 */
		moveX : function(x) {
			this.move(x, this.y);
		},

		/**
		 * Change y value
		 * @param {int} y  y value to move to
		 */
		moveY : function(y) {
			this.move(this.x, y);
		}

	}

	Game.component.drawable = {
		draw : function(context, self) {
			var self = typeof self !== 'undefined' ? self : this,
				sprite = self.sprite,
				//spritesheet data
				frameRow = (self.frame / self.sprite.framesPerRow) | 0,
				frameCol = (self.frame % self.sprite.framesPerRow) | 0,

				//starting coordinates for clipping
				sx = frameCol * sprite.width,  
				sy = frameRow * sprite.height;

				if(sprite.ready) {
					context.drawImage(sprite.image,
						sx, sy, sprite.width, sprite.height,
						self.x, self.y, sprite.width, sprite.height);

					if(self.drawHealthBar) {
						self.drawHealthBar(context);
					}
				}
		}
	}
})();