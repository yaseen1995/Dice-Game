/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice, limit, winningscore;




init();



document.querySelector('.btn-roll').addEventListener('click', function() { // callback function not called by us, but another function

    if(gamePlaying) {

    var dice = Math.floor(Math.random() * 6) + 1;

    var dicetwo = Math.floor(Math.random() * 6) + 1;

    var diceDOM = document.querySelector('.dice'); // This way you can retirve the css class

      diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    var diceDOMtwo = document.querySelector('.dice-two'); // This way you can retirve the css class

      diceDOMtwo.style.display = 'block';
      diceDOMtwo.src = 'dice-' + dicetwo + '.png';

    // update round score if rolled number was noy 1.


    if(dice === 6 && lastDice === 6) {

      document.getElementById('score-' + activePlayer).textContent = '0';
      document.getElementById('current-' + activePlayer).textContent = '0';

      nextPlayer();

    }

    lastDice = dice;


    if(dice === 1 || dicetwo === 1 ) {


      document.getElementById('current-' + activePlayer).textContent = '0';

      nextPlayer();

    }


    else if (dice !== 1 && dicetwo !== 1) {

      roundScore = roundScore + dice + dicetwo;

      document.querySelector('#current-' + activePlayer).textContent = roundScore;

    }

    else {

      if(activePlayer === 0) {
        activePlayer = 1; // reason is because player 0 is changing to player 1
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');

        hideDice();

      }

      else {
        activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-1').textContent = '0';
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.player-1-panel').classList.remove('active');

        hideDice();


      }

    }

}

});


document.querySelector('.btn-hold').addEventListener('click', function() {

  if (gamePlaying) {


    scores[activePlayer] += roundScore;

    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


      limit = document.getElementById('limitScore').value;

      if(limit) {
               limit = limit;
            }
            else {
              limit = 100;
            }


    if(scores[activePlayer] >= limit) {

      document.querySelector('#score-' + activePlayer).textContent = 'WINS!';
      hideDice();
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      gamePlaying = false;
    }

    else
    {
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

  hideDice();

}

document.querySelector('.btn-new').addEventListener('click', init);


function hideDice(){

  document.getElementById('dice').style.display = 'none';
  document.getElementById('dice-two').style.display = 'none';
}

function init() {

  scores = [0,0];
  activePlayer = 0; // if 0 we want 1, if 1 we want 0
  roundScore = 0;

    hideDice();

    document.getElementById('score-0').textContent =   '0'; // This way you can directly retrive the id from html if you dont need the class
    document.getElementById('score-1').textContent =   '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('.btn-roll').style.display = 'block';

    gamePlaying = true;


}


//activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // active player is currently 0, it will change in the else to 1 so the next
//                                                           player can play
//roundScore = 0;


//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#score-0').textContent;
//document.querySelector('.dice').style.display = 'none';
