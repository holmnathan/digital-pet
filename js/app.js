const gameControls = {
  animals: ["moo", "bah", "meow"],
  colors: {val1: "red", val2: "green", val3: "blue"},
  testMethod: function(test) {
    console.log(this.animals[test]);
  }
}

gameControls.testMethod(0);