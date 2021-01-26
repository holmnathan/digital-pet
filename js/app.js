// ----- Navigation -----

// Define game Controls Object
const gameControls = {
  actions: ["play","feed","medicine","discipline"],
  currentSelection: 0,
  handleSelection() {
    console.log(this.actions[gameControls.currentSelection]);
  },
  handleChange() {
    console.log(gameControls.actions.length);
    
    if (gameControls.currentSelection === gameControls.actions.length - 1) {
      gameControls.currentSelection = 0;
    } else {
      gameControls.currentSelection += 1;
    }
    console.log(gameControls.currentSelection, gameControls.actions[gameControls.currentSelection]);
    actionsUl.children[gameControls.currentSelection - 1].classList.toggle("selected-action");
    actionsUl.children[gameControls.currentSelection].classList.toggle("selected-action");
    // actionsUl[gameControls.currentSelection].classList.toggle("selected-action");
  }
};

// Get navigation
const gameNav = document.getElementById("game-navigation");

// Get actions UL
const actionsUl = document.getElementById("actions");

// Get buttons
const navigationButtons = gameNav.querySelectorAll("button");

// Add game actions to page
for (action of gameControls.actions) {
  const actionLi = document.createElement("li");
  const actionText = document.createTextNode(action);
  
  actionLi.setAttribute("value", action);
  actionLi.appendChild(actionText);
  actionsUl.appendChild(actionLi);
};

navigationButtons[2].addEventListener("click", gameControls.handleChange);
