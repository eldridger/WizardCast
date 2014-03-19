/**
 * Game functions, mostly for handling events.
 */


var cast = window.cast || {};

(function() {
    Game.NAMESPACE = 'urn:x-cast:com.wizardcast.helloworld';
    Game.TEST_MODE = true; //set to true to test without chromecast
 
	/**
	 * Creates a Game Object
	 * @param {board} board an optional game board
	 * @constructor
	 */
	function Game(board) {
		this.mBoard = board;
		this.mCurrentPlayer = 1;

		if (!Game.TEST_MODE) {
			displayDebug('Wizardcast started without test_mode');

			cast.receiver.logger.setLevelValue(0);

			this.castReceiverManager_ = cast.receiver.CastReceiverManager.getInstance();

			//bind onReady event manager
			this.castReceiverManager_.onReady = this.onReady.bind(this);

			//bind onSenderConnected event manager
			this.castReceiverManager_.onSenderConnected =
				this.onSenderConnected.bind(this);

			//bind onSenderDisconnected event manager
			this.castReceiverManager_.onSenderDisconnected =
				this.onSenderDisconnected.bind(this);

			//bind onSystemVolumeChanged event manager
			this.castReceiverManager_.onSystemVolumeChanged =
				this.onSystemVolumeChanged.bind(this);

			// create a castMessageBus to handle messages for custom namespace
			this.castMessageBus_ =
				this.castReceiverManager_.getCastMessageBus(Game.NAMESPACE);

			// bind onMessage event handler
			this.castMessageBus_.onMessage = this.onMessage.bind(this);

			// Initialize the CastReceiverManager with an application status message
			this.castReceiverManager_.start({
				statusText: "Application is starting"
			});

		} else {
			displayDebug('Wizardcast: TEST_MODE. Chromecast connections disabled');
		}

		displayDebug('Receiver Manager Started');

		this.mBoard.start();
		displayDebug('Game Started');
	}

	function setTestMode() {

	}

     // utility function to display the text message in the input field
    function displayText(text) {
        console.log(text);
        document.getElementById("message").innerHTML = text;
        window.castReceiverManager.setApplicationState(text);
    }

    // Display a debug message in the bottom left of the screen and console
    function displayDebug(text) {
      console.log(text);

      if(Game.TEST_MODE) {
        //If test_mode, we can just debug through console and don't need this.
        document.getElementById("debug_message").innerHTML = text;
      }
      //this.castReceiverManager_.setApplicationState(text);
    }

	//Adds event listening functions to Game.prototype
	Game.prototype = {

		/**
		 * Player join event: registers a new player or prevents
		 * new player from joining if invalid
		 * @param {string} senderId the sender that is trying to join
		 * @param {Object | String} message the name of the player
		*/
		onJoin: function(senderId, message) {
			//TODO
		},

		/**
		 * Player leave event: determines which player is leaving,
		 * unregisters that player, then ends game if there are no players
		 * @param {string} senderId sender ID of player
		*/
		onLeave: function(senderId) {
			//TODO
		},

		/**
		* Broadcasts a message to all of this object's known channels.
		* @param {Object|string} message the message to broadcast.
		*/
	    broadcast: function(message) {
	      this.castMessageBus_.broadcast(message);
	    },

		/**
		 * Handler for ready event
		 * @param {event} event the ready event
		*/
		onReady: function(event) {
            displayDebug('Received Ready event: ' + JSON.stringify(event.data));
            window.castReceiverManager.setApplicationState("Application status is ready...");
		},

		/**
		* Sender Connected Event
		* @param {event} event the sender connected event
		*/
		onSenderConnected: function(event) {
		console.log('onSenderConnected. Total number of senders: ' + 
			this.castReceiverManager_.getSenders().length);
		},

		/**
		* Sender Disconnected Event
		* If all senders are disconnected, closes the application
		* @param {event} event the sender disconnected event
		*/
		onSenderDisconnected: function(event) {
			console.log('onSenderDisconnected. Total number of senders: ' +
				this.castReceiverManager_.getSenders().length);
			if (this.castReceiverManager_.getSenders().length === 0) {
				window.close();
			}
		},

		/**
		 * Sender System Volume Changed event
		 * @param {event} event the sender volume changed event
		*/
		onSystemVolumeChanged: function(event) {
            displayDebug('Received System Volume Changed event: ' + event.data['level'] + ' ' +
                event.data['muted']);
		},

		/**
		* Message received event; determines event message and command,
		* and choose function to call based on them.
		* @param {event} event the event to be processed
		*/
		onMessage: function(event) {
	        var message = event.data,
	            senderId = event.senderId,
	            obj = JSON.parse(message);

	        //alert(message);
	        //console.log('Message [' + event.senderId + ']: ' + event.data);
	        //displayText("message: "
	        //    message + ". obj: " + obj + ". obj.command: " + obj.command + ". obj.text: " + obj.text);

	        ///////////////////////////////////////////////////////////////////////////////////////Commands from Sender
	        //if (obj.command = 'disply_text' && obj.text != null) {
	            // display the message from the sender
	            //displayText(obj.text);
	        //}
	        displayText(message);
	        // inform all senders on the CastMessageBus of the incoming message event
	        // sender message listener will be invoked
	        window.messageBus.send(event.senderId, event.data);
		}
	};

	//expose public functions and APIs
	cast.Game = Game;

})();