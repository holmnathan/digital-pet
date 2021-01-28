"use strict";

// Define Object Prototypes
// ============================================================================

// ----- Alert Message -----
function eventMessagePrototype(title, message) {
  this.title = title;
  this.message = message;
}

// ----- Game Action Prototype -----
function actionPrototype(domElement) {
  this.domElement = domElement;
  this.dataset = domElement.dataset;
  // The corresponding rating the action changes:
  this.change = this.dataset.change;
  // Maximum score:
  this.max = parseInt(this.dataset.max);
  // Generate initial value at half the maximum score:
  this.score = Math.floor(this.max / 2); 
  // How frequently to decrease the score:
  this.depletionRate = parseInt(this.dataset.depletionRate); 
  // A list of corresponding alert messages:
  this.messages = [];
  // Adjust action score by amount:
  this.adjustScore = function(amount) { 
    this.score = handleSumLimit(this.score, amount, 0, this.max, false);
    console.log(`Adjust Score: ${amount}, New ${this.change} Score: ${this.score}`);
  },
  // Print the action score to DOM:
  this.print = function() { 
    const textNode = generateStars(this.score, this.max);
    const html = document.getElementById(`stat-${this.change}`);
    
    html.querySelector("p").textContent = textNode;
  },
  this.selectToggle = function() {
    console.log(`selectToggle: ${this.change}, classList: ${this.domElement.classList}`)
    this.domElement.classList.toggle("selected-action");
  }
}

// ----- Pet Prototype -----
function petPrototype(name) {
  this.name = name;
  this.age = 0;
  // Generate a random life expectancy above 18 to 100:
  this.lifeExpectancy = Math.floor(Math.random() * (100-18) + 18 );
  this.adjustLife = (amount) => {
    this.lifeExpectancy = handleSumLimit(this.lifeExpectancy, amount, 1, 100, false);
    console.log(`Adjust Life: ${amount}, New Life Expectancy: ${this.lifeExpectancy}`);
  }
}

// Global Variables
// ============================================================================

const gameInterface = {
  screen: document.getElementById("pet"), // Where the pet will be rendered
  actions: document.getElementById("game-actions"), // Game actions
  controls: document.getElementById("game-controller"), // Game Controls
  stats: document.getElementById("stats"), // Game Stats
  alert: document.getElementById("alert") // Alert Messages
}

// ----- Game Controls -----
// Define how the user will interact with the app:
// - The player can cycle through a list of game actions, using the "Left" and "Right" buttons,
// - The player can see the currently highlighted action from the list,
// - The player can execute a selected action by pressing the "Select" button.
const gameControl = {
  // Get buttons
  buttons: document.querySelectorAll("#game-controller button"),
  // Current action sel:
  selectedIndex: 0,
  adjustIndex: function(amount) {
    this.selectedIndex = handleSumLimit(this.selectedIndex, amount, 0, ( gameAction.length - 1 ), true);
  }
 }
 
 // ----- Pet -----
 const gamePet = new petPrototype("Bob");
 
 // Initialize a gameAction array.
 const gameAction = [];

// Functions
// ============================================================================

// ----- Handle Sum Limits -----
// Test the sum of two values against an upper and lower limit,
// Return the sum amount if within range.
const handleSumLimit = (sum1, sum2, min, max, loop) => {
  let output = sum1 + sum2;
  if (output > max) {
    output = loop === true ? min : max;
  } else if (output < min) {
    output = loop === true ? max : min;
  }
  console.log(`handleSumLimit:\n${sum1} + ${sum2}, Minimum: ${min} & Maximum: ${max}, Loop: ${loop}\nOutput Value: ${output}`);
  
  return output;
}

// ----- Get Actions -----
// Instantiate a list of all the game actions and push to the global "gameAction" object
const getActions = () => {
  for (let action of gameInterface.actions.children) {
    gameAction.push(new actionPrototype(action));
  }
}

getActions();

// ----- Generate Star Rating -----
// Returns a text string of stars
const generateStars = (rating, max) => {
  const emptyStar = ( max - rating );
  let output = "";
  let i = 0;
  
  for (let i = 0; i < rating; i += 1) {
    output += "★"
  }
  
  if (emptyStar > 0) {
    for (i = 0; i < emptyStar; i += 1) {
      output += "☆"
    }
  }
  
  return output;
}

// ----- Handle Button -----
// Toggles selected game item classes in CSS and assigns button actions.
const handleButton = (e) => {
  switch (e.target.value) {
    case "left":
    console.log(`Left Button: ${gameAction[gameControl.selectedIndex]}`)
      gameAction[gameControl.selectedIndex].selectToggle();
      gameControl.adjustIndex(-1);
      gameAction[gameControl.selectedIndex].selectToggle();
      break;
    case "right":
      gameAction[gameControl.selectedIndex].selectToggle();
      gameControl.adjustIndex(1);
      gameAction[gameControl.selectedIndex].selectToggle();
      break;
    case "select":
      gameAction[gameControl.selectedIndex].adjustScore(1);
      gameAction[gameControl.selectedIndex].print();
  }
}

// ----- Handle Pet User Interface -----
// Display the pet's response on screen.
const handlePetUi = (petClass) => {
  const currentClass = gameInterface.petScreen.classList;
  gameInterface.petScreen.classList.remove(currentClass);
  gameInterface.petScreen.classList.add(petClass);
}

// Run Code
// ============================================================================

// Highlight the first item in actions menu when page loads.
gameAction[0].selectToggle();

// Assign Event Listeners to game controls
for (let button of gameControl.buttons) {
  button.addEventListener("click",handleButton);
}

// ----------------------------------------------------------------------------

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
  gameInterface.alertMessage.classList.add("hidden");
}

const showAlert = (alertType) => {
  const title = gameInterface.alertMessage.querySelector("header");
  const message = gameInterface.alertMessage.querySelector("p");
  const button = gameInterface.alertMessage.querySelector("button");
  
  title.textContent = alertType.title;
  message.textContent = alertType.message;
  
  gameInterface.alertMessage.classList.remove("hidden");
  
  button.addEventListener("click", hideAlert);
  
};

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

// const globalTime = setInterval(globalTimerLogic, 1000);

testbutton1.addEventListener("click", () => {gamePet.adjustLife(3)});
testbutton2.addEventListener("click", () => {gamePet.adjustLife(-10)});