/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gamePlaying) {
		//Get the random number
			dice = Math.floor(Math.random() * 6) + 1;
			//change the image
			document.querySelector('.dice').style.display = 'block';
			document.querySelector('.dice').src = 'dice-' + dice + '.png';
			//update the roundscore if it is not 1
			if(dice !== 1) {
				roundScore += dice;
				document.getElementById('current-' + activePlayer).textContent = roundScore;
			} else {
				//nextplayer
				nextPlayer();
			}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	//Add current score to global score
	if(gamePlaying) {
		scores[activePlayer] += roundScore;
		//update the UI
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
		//check if the player won the game
		if(scores[activePlayer] >= 100) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';

			document.querySelector('.player-0-panel').classList.remove('active');
			document.querySelector('.player-1-panel').classList.remove('active');

			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			gamePlaying = false;

		} else {
			//nextplayer
			nextPlayer();
		}
	}
});



function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;

		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';


	//document.getElementById('current-' + activePlayer).textContent = dice;
	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';

	document.querySelector('.dice').style.display = 'none';

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');

	document.querySelector('.player-0-panel').classList.add('active');
}