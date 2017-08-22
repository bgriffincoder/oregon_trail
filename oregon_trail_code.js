(function() {

  //A traveler has a few properties: an amount of food (number), a name (string), and an isHealthy (boolean).
  function traveler(incomingFood,passengerName,areYouHealthy) {
    let amount = incomingFood;
    let name = passengerName;
    let isHealthy = areYouHealthy;

    //sets the new food amount
    this.setFoodAmount = function (newFoodAmount) {
      amount = newFoodAmount;
    }

    //returns the current food amount
    this.getFoodAmount = function() {
      return amount;
    }

    //sets the passenger's healthy status to not healthy
    this.setIsNotHealthy = function() {
      isHealthy = false;
    }

    //sets the passenger's healthy stauts to now being ehalthy
    this.setIsHealthy = function() {
      isHealthy = true;
    }

    //returns health status of passenger
    this.getHealthStatus = function() {
      return isHealthy;
    }

  } //end of traveler

  //A wagon has a few properties as well: a passengers list (array) and a capacity (number).
  function wagon(passengerManifest, maxCapacity){
    let passengerList = passengerManifest;
    let capacity = maxCapacity;

    //Returns an array of wagon travelers
    this.getPassengerList = function() {
      return passengerList;
    }

    //Adds a new traveler to the wagon
    this.setPassengerList = function(newPassenger) {
      passengerList.push(newPassenger);
      return passengerList;
    }

    //Returns how many spots are left in the wagon
    this.getCapacity = function(){
      return capacity;
    }

    //Sets the new capacity of the wagon
    this.setCapacity = function(newCapacity){
      capacity = newCapacity;
    }

  } //end of wagon

  //Create a random amount of food
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }

  //Create a new traveler object with the specified name, a random amount of food, and isHealthy = true.
  function makeTraveler(name) {
    let foodAmount = getRandomIntInclusive(1,100);
    return new traveler(foodAmount,name,true);
  }

  //Create a new wagon with an empty passenger list and the specified capacity.
  function makeWagon(capacity) {
    return new wagon([],capacity);
  }

  //Gives true/false for head(true)/tails(false)
  function coinFlip() {
      return (Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails';
  }

  //50% chance to increase the traveler's food by 100 (successful hunt), and 50% to increase it by 0 (unsuccessful hunt).
  function hunt(traveler) {
    let headOrTails = coinFlip();
    if (headOrTails=="heads") {
      traveler.setFoodAmount(traveler.getFoodAmount() + 100);
    }
  }

  //Consumes 20 of the traveler's food. If the traveler doesn't have 20 food, the traveler is no longer healthy.
  function eat(traveler) {
    traveler.setFoodAmount(traveler.getFoodAmount() - 20);
    if(traveler.getFoodAmount() < 20) {
      traveler.setIsNotHealthy();
    }
  }

  //Add the traveler to the wagon if there is space. If there is not enough capacity, don't add them.
  function join(wagonIncoming, passengerIncoming) {
    if(wagonIncoming.getCapacity() > 0)
    {
      wagonIncoming.setPassengerList(passengerIncoming);
      wagonIncoming.setCapacity(wagonIncoming.getCapacity()-1);
    } else {
      console.log("There's no room left in the wagon!");
    }
  }

  //Return true if there is at least one unhealthy person in the wagon. Return false if not.
  function quarantine(wagon) {
    let myWagonArray = wagon.getPassengerList();
    for(let i = 0; i < myWagonArray.length; i++) {
      if(myWagonArray[i].getHealthStatus() == false) {
        return true;
      }
    }
    return false;
  }

  //Return the total amount of food among all occupants of the wagon.
  function food(wagon) {
    let myWagonFoodArray = wagon.getPassengerList();
    let foodAmountTotal = 0;
    for(let i = 0; i < myWagonFoodArray.length; i++) {
      foodAmountTotal = foodAmountTotal + myWagonFoodArray[i].getFoodAmount();
    }
    return foodAmountTotal;
  }

  // Create a wagon called 'wagonVehice'
  let wagonVehicle = makeWagon(5);
  // Create a traveler with the name 'Henrietta' called 'traveler'
  let travelerRider1 = makeTraveler('Henrietta');
  // Create a traveler with the name 'Juan' called 'traveler2'
  let travelerRider2 = makeTraveler('Juan');

  hunt(travelerRider1); // maybe get more food
  eat(travelerRider1);
  eat(travelerRider2); //Juan is hungry
  join(wagonVehicle, travelerRider1);
  join(wagonVehicle, travelerRider2);
  console.log("Henrietta's food: " + travelerRider1.getFoodAmount());
  console.log("Juan's food: " + travelerRider2.getFoodAmount());
  console.log("Is someone quarantined on the wagon? " + quarantine(wagonVehicle));
  console.log("The total food left is on the wagon is: " + food(wagonVehicle));







})()
