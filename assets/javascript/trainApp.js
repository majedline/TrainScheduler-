// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDgKk07YUbY3sTatPugxSk6M_aGw1DQFyY",
    authDomain: "majed-test-project.firebaseapp.com",
    databaseURL: "https://majed-test-project.firebaseio.com",
    projectId: "majed-test-project",
    storageBucket: "majed-test-project.appspot.com",
    messagingSenderId: "487935117737",
    appId: "1:487935117737:web:27636ecc0a271650"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
  var trainRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newtrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    rate: trainRate
  };

  // Uploads train data to the database
  database.ref().push(newtrain);

  // Logs everything to console
  console.log(newtrain.name);
  console.log(newtrain.destination);
  console.log(newtrain.start);
  console.log(newtrain.rate);

  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().role;
  var trainStart = childSnapshot.val().start;
  var trainRate = childSnapshot.val().rate;

  // train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainRate);

  // Prettify the train start
  var trainStartPretty = moment.unix(trainStart).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var trainMonths = moment().diff(moment(trainStart, "X"), "months");
  console.log(trainMonths);

  // Calculate the total billed rate
  var trainBilled = trainMonths * trainRate;
  console.log(trainBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainStartPretty),
    $("<td>").text(trainMonths),
    $("<td>").text(trainRate),
    $("<td>").text(trainBilled)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume train start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case