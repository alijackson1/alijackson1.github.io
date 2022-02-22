const card_deck = [
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-anchor",
    "fa-leaf",
    "fa-bicycle",
    "fa-diamond",
    "fa-bomb",
    "fa-leaf",
    "fa-bomb",
    "fa-bolt",
    "fa-bicycle",
    "fa-paper-plane-o",
    "fa-cube"];

  const deck = document.querySelector(".deck");
  const moves = document.querySelector(".moves");
  const playAgain = document.querySelector(".playAgain");
  const restart = document.querySelector(".restart");
  const stars = document.querySelector(".stars");

  const modal = document.querySelector(".modal");
  const modalText = document.querySelector(".modalText");
  let timer = document.querySelector(".timer");
  const liStars = stars.getElementsByTagName("li");




    let interval;
    let second = 0;
    let minute = 0;
    let timeStart = false;

   

    let cards_open = [];
    let matches = 0;
    let numberOfMoves = moves.textContent;
    let numberOfStars = 3;

/* Start game */

  function startNewGame() {
    	resetTimer();
    	timer.style.display = "none";
    	timeStart = false;
    	timer.textContent = minute + " Minuten " + second + " Sekunden";
    	shuffle(card_deck); 
    	cards_open = [];
    	matches = 0;
    	moves.textContent = 0;
    	numberOfMoves = moves.textContent;

    
    	for (let i = 0; i < card_deck.length; i++) {
    		let deck_element = deck.getElementsByTagName("li");
    		let class_element = deck_element[i].getAttribute("class");
    		deck_element[i].className = "";
    		deck_element[i].classList.add("card");

    		let icon_element = deck.getElementsByTagName("i");
    		let icon_class = icon_element[i].getAttribute("class");
    		icon_element[i].className = "";
    		icon_element[i].classList.add("fa", card_deck[i]);
    	}

    


    }


function flipCard(card) {
    	card.classList.add("open", "show");

    }


function youHaveAMatch() {
	cards_open[0].classList.remove("open", "show");
	cards_open[0].classList.add("match");
	cards_open[1].classList.remove("open", "show");
	cards_open[1].classList.add("match");
	cards_open = [];
	matches++;
}



function addMove(card) {
    if (!card.classList.contains("match")) {
        numberOfMoves++;
        moves.innerText = numberOfMoves;
    }

  if (numberOfMoves == 15) {
    numberOfStars = 3;
    stars.removeChild(liStars[0]);

  }
  else if (numberOfMoves == 20){
    numberOfStars = 1;
    stars.removeChild(liStars[1]);
  }
}



function notDSame() {
  setTimeout(function () {
  cards_open[0].classList.remove("open", "show");
  cards_open[1].classList.remove("open", "show");
  cards_open  = [];
}, 900);

}

playAgain.addEventListener("click", function () {

  modal.style.display = "none";
  startNewGame();

});

restart.addEventListener("click", function () {
  startNewGame();

});


deck.addEventListener("click", function (e) {
  let card = e.target;

  if (e.target !== e.currentTarget) {
    if (!timeStart) {
  		 startTimer();
  		 timeStart = true;
  		timer.style.display = "inline-block";
  	}
     if (!card.classList.contains("open")) {

       if (cards_open.length < 2) {
        flipCard(card);
        cards_open.push(card);

      }

      if (cards_open.length  === 2) {
       addMove(card);

      if (cards_open[0].innerHTML === cards_open[1].innerHTML) {
        youHaveAMatch();
     }else {
      notDSame();
    }

  }
  endGame();
}
}
})

function resetTimer() {
	clearInterval(interval);
	second = 0;
	minute = 0;
}

function startTimer() {
	interval = setInterval(function() {
		timer.textContent = minute + " minuten " + second + " sekunden ";
		second++;
		if (second === 60) {
			minute++;
			second = 0;

    }

	}, 1000)

}
  function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

startNewGame();
