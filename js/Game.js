/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
  }

  /**
   * Creates phrases for use in game
   * @return {array} An array of phrases that could be used in the game
   */
  createPhrases() {
    return [
      "First things first",
      "Still waters run deep",
      "Strike while the iron is hot",
      "Practice makes perfect",
      "Look before you leap"
    ];
  }

  /**
   * Selects random phrase from phrases property
   * @return {Object} Phrase object chosen to be used
   */
  getRandomPhrase() {
    let number = Math.floor(Math.random() * Math.floor(this.phrases.length));
    return this.phrases[number];
  }

  /**
   * Begins game by selecting a random phrase and displaying it to user
   */
  startGame() {
    $("#overlay").fadeOut("slow");
    this.activePhrase = this.getRandomPhrase();
    phrase = new Phrase(this.activePhrase);
    phrase.addPhraseToDisplay();
  }

  /**
  * Checks for winning move
  * @return {boolean} True if game has been won, false if game wasn't
  won
  */
  checkForWin() {
    if (!$("li").hasClass("hide")) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */
  removeLife() {
    this.missed += 1;
    for (let i = 0; i < this.missed; i++) {
      $(".tries img")
        .eq(i)
        .addClass("redLife")
        .delay(400)
        .queue(function(next) {
          $(this).attr("src", "images/lostHeart.png");
          next();
        });
    }

    if (this.missed === 5) {
      this.gameOver("lost");
    }
  }

  /**
   * Displays game over message
   * @param {string} gameWon - Whether or not the user won the game
   */
  gameOver(gameWon) {
    $("#overlay").fadeIn("slow");
    if (gameWon === "lost") {
      $("#overlay h1").text("You lose");
      $("#overlay")
        .addClass("lose")
        .removeClass("start");
    } else if (gameWon === "won") {
      $("#overlay h1").text("You win");
      $("#overlay")
        .addClass("win")
        .removeClass("start");
    }
  }

  /**
   * Handles onscreen keyboard button clicks
   * @param (content) button - The clicked button element
   */
  handleInteraction(content) {
    let button = $(`#qwerty button:contains('${content}')`);

    button.prop("disabled", true);

    if (!phrase.checkLetter(content)) {
      button.addClass("wrong");
      this.removeLife();
    } else {
      button.addClass("chosen");
      phrase.showMatchedLetter(content);

      if (this.checkForWin()) {
        this.gameOver("won");
      }
    }
  }
}
