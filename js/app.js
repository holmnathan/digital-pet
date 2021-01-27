"use strict";

// ----- User Interface -----
// Get the DOM elements needed to run game.
const userInterface = {
  petScreen: document.getElementById("pet")
}

// ----- Player Controls -----
// Define how the user will interact with the app:
// - The player can cycle through a list of game actions, using the "Left" and "Right" buttons,
// - The player can see the currently highlighted action from the list,
// - The player can execute a selected action by pressing the "Select" button.

const playerControls = {
  actions: document.querySelectorAll("#actions li"), // Get game actions
  buttons: document.querySelectorAll("#game-controller button"), // Get buttons
  selectedAction: 0 // Current user selection
}

// ----- Select Previous -----
// Return the previous item index from an array (Start over when last item is reached)
const selectPrevious = (index, array) => {
  if ( index === 0 ) {
    index = ( array.length - 1 );
  } else {
    index -= 1;
  }
  return index;
}

// ----- Select Next -----
// Return the next item index from an array (Start over when last item is reached)
const selectNext = (index, array) => {
  if ( index === array.length - 1 ) {
    index = 0;
  } else {
    index += 1;
  }
  return index;
}

// ----- Toggle Selection Class -----
// Highlight the selected action by toggling it's "selected-action" class
// Class is styled in main.css
const toggleSelectionClass = () => {
  playerControls.actions[playerControls.selectedAction].classList.toggle("selected-action");
}

// ----- Handle Action -----
// Takes a string and executes a matching function.
const handleAction = (action) => {
  switch (action) {
    case "feed":
      pet.adjustStat("hunger","increase");
      break;
    case "discipline":
      pet.adjustStat("discipline","increase");
      break;
    case "play":
      pet.adjustStat("happiness","increase");
      break;
    case "medicine":
      pet.adjustStat("health","increase");
      break;
    case "cleanup":
      pet.adjustStat("hunger","decrease");
  }
}

// ----- Handle Button -----
// Toggles selected game item classes in CSS and assigns button actions.
const handleButton = (e) => {
  switch (e.target.value) {
    case "left":
      toggleSelectionClass();
      playerControls.selectedAction = selectPrevious(playerControls.selectedAction, playerControls.actions);
      toggleSelectionClass();
      break;
    case "right":
      toggleSelectionClass();
      playerControls.selectedAction = selectNext(playerControls.selectedAction, playerControls.actions);
      toggleSelectionClass();
      break;
    case "select":
      handleAction(playerControls.actions[playerControls.selectedAction].getAttribute("id"));
  }
}
// ----- Handle Pet User Interface -----
// Display the pet's response on screen.
const handlePetUi = (petClass) => {
  const currentClass = userInterface.petScreen.classList;
  userInterface.petScreen.classList.remove(currentClass);
  userInterface.petScreen.classList.add(petClass);
}

// Highlight the first item in actions menu when page loads.
toggleSelectionClass();

// Assign Event Listeners to game controls
for (let button of playerControls.buttons) {
  button.addEventListener("click",handleButton);
}

// ----------------------------------------------------------------------------

const pet = {
  stats: {
    name: "",
    age: 0,
    lifeStage: 0,
    lifeExpectancy: 0
  },
  needs: {
    hunger: {value: 3, max: 10},
    happiness: {value: 4, max: 10},
    discipline: {value: 2, max: 10},
    health: {value: 5, max: 10}
  },
  adjustStat: function(statName, operator) {
    if (this.needs[statName].value > 0 && this.needs[statName].value < this.needs[statName].max) {
    switch (operator) {
      case "increase":
        this.needs[statName].value += 1;
        break;
      case "decrease":
        this.needs[statName].value -= 1;
      }
      console.log(this.needs["statName"], this.needs[statName].value);
    }   
  }
}