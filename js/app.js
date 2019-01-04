/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

// Declare objects
let game = null;
let phrase = null;

// Start game and reset previous
$("#btn__reset").on("click", () => {
  // Remove old phrase
  $("#phrase ul li").remove();
  $("#overlay")
    .removeClass()
    .addClass("start");

  // Reset button states
  $("#qwerty button")
    .addClass("key")
    .removeClass("wrong chosen")
    .prop("disabled", false);

  // Reset lifes
  $(".tries img")
    .attr("src", "images/liveHeart.png")
    .removeClass("redLife");

  // Create new Game object
  game = new Game();

  // Start game method
  game.startGame();
});

// Button click event
$("#qwerty").on("click", e => {
  let button = e.target.innerHTML;
  passHandler(button);
});

// Keyboard events
$(document).keypress(function(e) {
  // Get enter and start game
  if (!$("#overlay").is(":hidden")) {
    let keycode = e.keyCode ? e.keyCode : e.which;
    if (keycode == "13") {
      $("#btn__reset").click();
    }
  } else {
    // Get letters and call handler
    // Check if letter was already chosen -> prevent from unwanted action like removeLife()
    let disabledLetters = [];
    let button = String.fromCharCode(e.which);

    // List of disabled letters
    $(`#qwerty button:disabled`).each(function(item) {
      disabledLetters.push($(this).html());
    });

    // if disabled ignore keypress
    if (disabledLetters.indexOf(button) === -1) {
      passHandler(button);
    }
  }
});

// Calling the handler
const passHandler = button => {
  let regex = /^[a-z]$/;

  if (regex.test(button)) {
    game.handleInteraction(button);
  }
};
