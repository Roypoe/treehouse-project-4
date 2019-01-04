/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /**
   * Display phrase on game board
   */
  addPhraseToDisplay() {
    let html = ``;
    for (let i = 0; i < this.phrase.length; i++) {
      if (this.phrase[i] === " ") {
        html += `<li class="space"> </li>`;
      } else {
        html += `<li class="hide letter ${this.phrase[i]}">${
          this.phrase[i]
        }</li>`;
      }
    }
    $("#phrase ul").append(html);
  }

  /**
   * Checks if passed letter is in phrase
   * @param (string) letter - Letter to check
   */
  checkLetter(letter) {
    if (this.phrase.indexOf(letter) != -1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Displays passed letter on screen after a match is found
   * @param (string) letter - Letter to display
   */
  showMatchedLetter(letter) {
    $(`.${letter}`)
      .addClass("show spin")
      .removeClass("hide");
  }
}
