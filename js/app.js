  "use strict";
  
  // Define Object Prototypes
  // ============================================================================
  // 
  // const rules = {
  //   tooStrict
  // }
  
  
  const game = {
    start: function (petName) {
  // ----- Alert Message -----
  function eventMessagePrototype(title, message) {
    this.title = title;
    this.message = message;
  }
  
  // ----- Game Action Prototype -----
  function actionPrototype(domElement) {
    this.domElement = domElement;
    this.dataset = domElement.dataset;
    this.name = this.domElement.getAttribute("id")
    // The corresponding rating the action changes:
    this.change = this.dataset.change;
    // Maximum score:
    this.max = parseInt(this.dataset.max);
    // Generate initial value at half the maximum score:
    this.score = Math.floor(this.max / 2); 
    // How frequently to decrease the score:
    this.depletionRate = parseInt(this.dataset.depletionRate); 
    // A list of corresponding alert messages:
    this.high = {name: this.dataset.high, messages: []};
    this.low = {name: this.dataset.low, messages: []};
    // Print the action score to DOM:
    this.print = function() { 
      const textNode = generateStars(this.score, this.max);
      const html = document.getElementById(`stat-${this.change}`);
      
      html.querySelector("p").textContent = textNode;
    };
    // Adjust action score by amount:
    this.adjustScore = function(amount) { 
      console.log(this.name, "Adjust Score");
      this.score = handleSumLimit(this.score, amount, 0, this.max, false);
      this.print();
      if (this.score === 0) {
          this.alert("low")
        } else if (this.score === this.max) {
          this.alert("high")
        }
      // console.log(`Adjust Score: ${amount}, New ${this.change} Score: ${this.score}`);
    };
    this.selectToggle = function() {
      // console.log(`selectToggle: ${this.change}, classList: ${this.domElement.classList}`)
      this.domElement.classList.toggle("selected-action");
    };
      this.alert = function(value) {
        const randomInt = Math.floor(Math.random() * this[value].messages.length);
        const message = this[value].messages[randomInt];
        const alertButton = gameInterface.alert.querySelector("button")
        
        gameInterface.alert.querySelector("header").textContent = message.title;
        gameInterface.alert.querySelector("p").textContent = message.message;
        
        handlePetUi.setFlag(`sprite-${this[value].name}`)
        gameInterface.alert.classList.remove("hide")
        
        alertButton.addEventListener("click", () => {gameInterface.alert.classList.add("hide"); console.log("CLICK")});
        
      };
      this.timer = setInterval( () => this.adjustScore(-1), 10000 * this.depletionRate);
    }
  
  
  // ----- Pet Prototype -----
  function petPrototype(name) {
    this.name = name;
    this.age = 0;
    // Generate a random life expectancy above 50 to 100:
    this.lifeExpectancy = Math.floor(Math.random() * (100-50) + 50 );
    this.print = function() {
      gameInterface.info.querySelector("#pet-name p").textContent = this.name;
      gameInterface.info.querySelector("#pet-age p").textContent = this.age;
    }
    this.adjustLife = (amount) => {
      this.lifeExpectancy = handleSumLimit(this.lifeExpectancy, amount, 1, 100, false);
      // console.log(`Adjust Life: ${amount}, New Life Expectancy: ${this.lifeExpectancy}`);
    };
  }
  
  // Global Variables
  // ============================================================================
  
  const gameInterface = {
    screen: document.getElementById("pet"), // Where the pet will be rendered
    actions: document.getElementById("game-actions"), // Game actions
    controls: document.getElementById("game-controller"), // Game Controls
    stats: document.getElementById("stats"), // Game Stats
    info: document.getElementById("info"),
    alert: document.getElementById("alert"), // Alert Messages
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
   const gamePet = new petPrototype(petName);
   
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
    // console.log(`handleSumLimit:\n${sum1} + ${sum2}, Minimum: ${min} & Maximum: ${max}, Loop: ${loop}\nOutput Value: ${output}`);
    
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
  
  console.log("GAME ACTIONS:",gameAction)
  
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
    // console.log(`Stars Generated: ${output}`)
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
        // gamePet.setMood();
    }
  }
  
  // ----- Handle Pet User Interface -----
  // Display the pet's response on screen.
  const handlePetUi = {
    defaultImage: gameInterface.screen.querySelector(".default"),
    setFlag: function(actionName) {
      const currentImage = gameInterface.screen.querySelector(".selected") ? gameInterface.screen.querySelector(".selected") : null;
      // gameInterface.screen.textContent = gamePet.moodTypes[gamePet.mood];
      const replacementImage = document.getElementById(actionName);
      
      this.defaultImage.classList.remove("default");
      if (currentImage) {
        currentImage.classList.remove("selected");
      }
      replacementImage.classList.add("selected");
    },
    removeFlag: function(actionName) {
      const currentImage = gameInterface.screen.querySelector(".selected");
      
      currentImage.classList.remove("selected");
      this.defaultImage.classList.add("selected");
    }
  }
  
  const findAction = (action, arrayName) => {
    const index = arrayName.map((action) => {return action.change}).indexOf(action);
      // console.log(`findAction index: ${index}`);
      return arrayName[index];
    }
  
  // Run Code
  // ============================================================================
  
  gamePet.print();
  
  const happy = document.getElementById("sprite-happy");
  const sad = document.getElementById("sprite-sad");
  
  console.log(parseInt(window.getComputedStyle(happy).getPropertyValue("animation-duration"))* 1000);
  
  // Highlight the first item in actions menu when page loads.
  gameAction[0].selectToggle();
  
  // Assign Event Listeners to game controls
  for (let button of gameControl.buttons) {
    button.addEventListener("click",handleButton);
  }
  
  // ----------------------------------------------------------------------------
  
  const globalTimerLogic = () => {
    if (gamePet.age < gamePet.lifeExpectancy) {
      console.log(gamePet.age, gamePet.lifeExpectancy);
      gamePet.age += 1
      gamePet.print();
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
  
  // const testbutton1 = document.createElement("button");
  // const textText1 = document.createTextNode("Increase Life");
  // const testbutton2 = document.createElement("button");
  // const textText2 = document.createTextNode("Decrease Life");
  // const testbutton3 = document.createElement("button");
  // const textText3 = document.createTextNode("Decrease Value");
  // const testbutton4 = document.createElement("button");
  // const textText4 = document.createTextNode("Resume");
  // 
  // testbutton1.appendChild(textText1);
  // testbutton2.appendChild(textText2);
  // testbutton3.appendChild(textText3);
  // testbutton4.appendChild(textText4);
  // 
  // document.querySelector("body").appendChild(testbutton1);
  // document.querySelector("body").appendChild(testbutton2);
  // document.querySelector("body").appendChild(testbutton3);
  // document.querySelector("body").appendChild(testbutton4);
  // 
  const globalTime = setInterval(globalTimerLogic, 5000);
  // 
  // testbutton1.addEventListener("click", () => {gamePet.adjustLife(3)});
  // testbutton2.addEventListener("click", () => {gamePet.adjustLife(-10)});
  // testbutton3.addEventListener("click", () => {gameAction[gameControl.selectedIndex].adjustScore(-1);
  // });
  gameAction[0].high.messages.push(new eventMessagePrototype("Too Full", `Click okay for your ${gamePet.name} to use the bathroom.`));
  gameAction[0].low.messages.push(new eventMessagePrototype("Too Hungry!", `${gamePet.name} needs to eat to stay alive!` ));
  
  gameAction[1].high.messages.push(new eventMessagePrototype("Too Strict", `${gamePet.name} turned evil.`));
  gameAction[1].low.messages.push(new eventMessagePrototype("Too Lazy", `${gamePet.name} needs discipline.`));
  
  gameAction[2].high.messages.push(new eventMessagePrototype("Happy", `${gamePet.name} is really enjoying life right now!`));
  gameAction[2].low.messages.push(new eventMessagePrototype("Sad", `Don't forget to play with ${gamePet.name}!`));
  
  gameAction[3].high.messages.push(new eventMessagePrototype("Stoner", `${gamePet.name} has taken too many drugs!`));  
  gameAction[3].low.messages.push(new eventMessagePrototype("Sick", `${gamePet.name} needs medication.`));
  
},
  stop: function() {
    
  }
}

const gameDomTemplates = document.querySelectorAll("template");

const templateChange = (newValue, oldValue) => {
  
  if (!oldValue) {
    document.querySelector("body").appendChild(newValue);
  } else {
    console.log(oldValue, newValue)
    document.querySelector("body").replaceChild(oldValue, newValue);
  }
}

const welcome = gameDomTemplates[1].content.querySelector("main");
const gamer = gameDomTemplates[0].content.querySelector("main")

templateChange(welcome);

const startGame = (e) => {
  e.preventDefault()
  
  const inputName = document.getElementById("input-name").value;
  
  // templateChange(gameDomTemplates[0].content.querySelector("main"), gameDomTemplates[1].content.querySelector("main"));
  // 
  
  document.querySelector("body").replaceChild(gamer, welcome);
  
  game.start(inputName)
}
const buttonStart = document.getElementById("submit-name");

buttonStart.addEventListener("click", startGame);

