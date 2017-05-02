$(document).ready(function() {

	var players = [];
	var roles = [];
	var alive = [];
	var role = "";
	var a = 0,
		b = 0,
		c = 1,
		d = 1;

	$("#input").hide();
	$("#game").hide();

	$("#play").on("click", function() {

		$("#start-field").hide();
		$("#game").show();

	});

	$("#add").on("click", function() {

		$("#field").hide();
		$("#input").show();
		$("#name").val("");
		$("#name").select();

	});

	$("#enter").on("click", function() {

		var name = $("#name").val();

		if (name == "" || players.indexOf(name) != -1) {
			$("#player_entered").html("Enter another name");
		} else {

			players.push(name);

			$("#player_entered").html("");
			$("#game_players").prepend("<p>Player " + name + " entered.</p>");

			$("#input").hide();
			$("#field").show();

			console.log(players);

			if (players.length == 7) {
				$("#field").append("<div><button id='start' class='btn btn-primary'>Start Game</button></div><br><br>");
			}

			if (players.length >= 15) {
				$("#add").prop("disabled", true);
			}

		}

	});

	$(document).on("click", "#start", function() {

		if (players.length <= 11) {
			a = 2;
			b = players.length - 4;
		} else {
			a = 3;
			b = players.length - 5;
		}

		$("#field").html("");

		for (var i = 0; i < players.length; i++) {

			var random = Math.floor(Math.random() * 4 + 1);

			if (random == 1 && a > 0) {
				roles.push("werewolf");
				alive.push(1);
				a--;
			} else if (random == 2 && b > 0) {
				roles.push("villager");
				alive.push(1);
				b--;
			} else if (random == 3 && c > 0) {
				roles.push("seer");
				alive.push(1);
				c--;
			} else if (random == 4 && d > 0) {
				roles.push("doctor");
				alive.push(1);
				d--;
			} else {
				i--;
			}

		}

		$("h2").html("");
		$("#field").html("<p>ca detaje para lojes</p><div><button id='continue'>Continue</button></div>");

	});

	function dayPlay(){


		$('#field').html('<button id="dayVote">End Discussion</button>');
		$(document).on('click', '#dayVote', function(){
			$('#field').html('Stop talking. The night falls and it is time to execute a suspect, which you think a werewolf');
			voting(0);
		});

		function voting(k){

			$('#field').html('Player ' + players[k] + " vote a suspect.<br><br>");

			for (var i = 0; i < players.length; i++){

				if(k==i) continue;

					$("#field").append("<div><p>Vote " + players[i] + "?</p><button class='voting' id='vote-" + String(i) + "'>VOTE</button></div><br>");

			}

			$(document).on("click", ".voting", function(){

				k++;
				if(k<players.length){
				setTimeout(voting(k),10);

			}else{
				nightPlay(0);
			}

			});

		//$('#field').html('<p>The morning has come.<br>The victim of last night was...</p>');

		//$('#field').append('<p>Start talking to each other to find out who the werewolf are.</p>');

	}

			}

	$(document).on("click", "#continue", function() {

		function nightPlay(j) {

			function nextPlayer() {
				j++;

				if (j < players.length) {
					setTimeout(
						nightPlay(j), 100
					);
				} else {
					// ketu fut funksionin per diten


						dayPlay();

				}
			}

			$("#field").html("<p>Are you " + players[j] + "?</p><div><button id='yes'>YES</button></div>");

			$(document).on("click", "#yes", function() {

				//if (alive[j] === 1) {

				if (roles[j] == "werewolf") {
					$("#field").html("<div><img class='images' src='cards/werewolf.png'</div><br>");
					$("#field").append("<p>Choose a player to kill.</p><br><br>");
				} else if (roles[j] == "villager") {
					$("#field").html("<div><img class='images' src='cards/villager.jpeg'</div><br>");
					$("#field").append("<p>Choose a player to suspect.</p><br><br>");
				} else if (roles[j] == "seer") {
					$("#field").html("<div><img class='images' src='cards/seer.jpeg'</div><br>");
					$("#field").append("<p>Choose a player to foretell.</p><br><br>");
				} else if (roles[j] == "doctor") {
					$("#field").html("<div><img class='images' src='cards/doctor.jpeg'</div><br>");
					$("#field").append("<p>Choose a player to heal.</p><br><br>");
				}

				for (var i = 0; i < players.length; i++) {

					if (i == j) {
						continue;
					}

					if (roles[j] == "werewolf") {
						$("#field").append("<div><p>Kill " + players[i] + "?</p><button class='action' id='kill-" + String(i) + "'>YES</button></div><br>");
					} else if (roles[j] == "seer") {
						$("#field").append("<div><p>Foretell " + players[i] + "?</p><button class='action' id='foretell-" + String(i) + "'>YES</button></div><br>");
					} else if (roles[j] == "doctor") {
						$("#field").append("<div><p>Heal " + players[i] + "?</p><button class='action' id='heal-" + String(i) + "'>YES</button></div><br>");
					} else if (roles[j] == "villager") {
						$("#field").append("<div><p>Suspect " + players[i] + "?</p><button class='action' id='suspect-" + String(i) + "'>YES</button></div><br>");
					}

				}

				$(document).on("click", ".action", function() {

					console.log($(this).prop("id"));
					nextPlayer();

				});

				//} else {
				//$("#field").html("<p>You are dead</p>");
				//nextPlayer();
				//}

			});

		}

		nightPlay(0);

	});

});
