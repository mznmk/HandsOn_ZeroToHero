let game = {
	// member
	startTime: null,
	displayArea: document.getElementById("display-area"),
	// method
	start: function() {
		game.startTime = new Date();
		document.body.onkeydown = game.stop;
	},
	stop: function() {
		stopTime = new Date();
		seconds = (stopTime - game.startTime) / 1000;
		if (4.5 <= seconds && seconds <= 5.5) {
			game.displayArea.innerText = `Great !!! ${seconds} secs !!!`;
		} else {
			game.displayArea.innerText = `Oh No ... ${seconds} secs ...`;
		};
		document.body.onkeydown = null;
	}
};

if (confirm('press OK, and when you think "already passed 10sec ...", press any key!')) {
	game.start();
};