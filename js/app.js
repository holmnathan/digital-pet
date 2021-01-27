"use strict";

// ----- User Interface -----
// Get the DOM elements needed to run game.
const userInterface = {
  petScreen: document.getElementById("pet"),
  stats: document.getElementById("stats"),
  alertMessage: document.getElementById("alert")
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

const generateStars = (rating, max) => {
  console.log(`rating: ${rating}, max: ${max}`);
  let output = "";
  const emptyStar = ( max - rating );
  let i = 0;
  
  for (i = 0; i < rating; i += 1) {
    output += "★"
  }
  if (emptyStar > 0) {
    for (i = 0; i < emptyStar; i += 1) {
      output += "☆"
    }
  }
  
  return output;
}

const printRating = (rating) => {
  const ratingValue = pet.needs[rating];
  const textNode = generateStars(ratingValue.value, ratingValue.max);
  const html = document.getElementById(`stat-${rating}`);
  
  console.log(`#stat-${rating}`)
  console.log(html);
  
  html.querySelector("p").textContent = textNode;
}

// ----- Handle Action -----
// Takes a string and executes a matching function.
const handleAction = (action) => {
  switch (action) {
    case "feed":
      pet.adjustStat("hunger","increase");
      pet.adjustStat("hunger","increase");
      printRating("hunger");
      break;
    case "discipline":
      pet.adjustStat("discipline","increase");
      pet.adjustStat("discipline","increase");
      pet.adjustStat("happiness","decrease");
      printRating("discipline");
      printRating("happiness");
      break;
    case "play":
      pet.adjustStat("happiness","increase");
      pet.adjustStat("happiness","increase");
      pet.adjustStat("discipline","decrease");
      printRating("discipline");
      printRating("happiness");
      break;
    case "medicine":
      pet.adjustStat("health","increase");
      pet.adjustStat("health","increase");
      pet.adjustStat("discipline","decrease");
      printRating("discipline");
      printRating("health");
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
    lifeExpectancy: 50
  },
  needs: {
    hunger: {name: "Hunger", value: 5, max: 10},
    happiness: {name: "Happiness", value: 5, max: 10},
    discipline: {name: "Discipline", value: 5, max: 10},
    health: {name: "Health", value: 5, max: 10}
  },
  adjustStat: function(statName, operator) {
    if (operator === "increase" && this.needs[statName].value < this.needs[statName].max) {
      this.needs[statName].value += 1;
    } else if (operator === "decrease" && this.needs[statName].value > 0) {
      this.needs[statName].value -= 1;
    }
    console.log(this.needs[statName].name, generateStars(this.needs[statName].value, this.needs[statName].max));
    }   
  }

// ----------------------------------------------------------------------------

const adjustLife = (operator, amount) => {
  console.log(typeof pet.stats.lifeExpectancy);
  if (operator === "increase") {
      pet.stats.lifeExpectancy += amount;
    } else if (operator === "decrease") {
      pet.stats.lifeExpectancy -= amount;
    }
}

const globalTimerLogic = () => {
  if (pet.stats.age < pet.stats.lifeExpectancy) {
    console.log(pet.stats.age, pet.stats.lifeExpectancy);
    pet.stats.age += 1
  } else {
    clearInterval(globalTime);
    console.log("Game Over")
  }
}

const hideAlert = (e) => {
  e.preventDefault;
  userInterface.alertMessage.classList.add("hidden");
}

const showAlert = (alertType) => {
  const title = userInterface.alertMessage.querySelector("header");
  const message = userInterface.alertMessage.querySelector("p");
  const button = userInterface.alertMessage.querySelector("button");
  
  title.textContent = alertType.title;
  message.textContent = alertType.message;
  
  userInterface.alertMessage.classList.remove("hidden");
  
  button.addEventListener("click", hideAlert);
  
};

showAlert({title: "Test", message: "Yes Please!"});

const testbutton1 = document.createElement("button");
const textText1 = document.createTextNode("Increase Life");
const testbutton2 = document.createElement("button");
const textText2 = document.createTextNode("Decrease Life");
const testbutton3 = document.createElement("button");
const textText3 = document.createTextNode("Pause");
const testbutton4 = document.createElement("button");
const textText4 = document.createTextNode("Resume");

testbutton1.appendChild(textText1);
testbutton2.appendChild(textText2);
testbutton3.appendChild(textText3);
testbutton4.appendChild(textText4);

document.querySelector("body").appendChild(testbutton1);
document.querySelector("body").appendChild(testbutton2);
document.querySelector("body").appendChild(testbutton3);
document.querySelector("body").appendChild(testbutton4);

const globalTime = setInterval(globalTimerLogic, 1000);

testbutton1.addEventListener("click", () => {adjustLife("increase", 3)});
testbutton2.addEventListener("click", () => {adjustLife("decrease", 10)});