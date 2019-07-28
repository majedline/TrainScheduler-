const firebaseConfig = {
  apiKey: "AIzaSyDzERFd15F3RKLAQdJDWZhz8Mjc4zThtSg",
  authDomain: "a7-train-db.firebaseapp.com",
  databaseURL: "https://a7-train-db.firebaseio.com",
  projectId: "a7-train-db",
  storageBucket: "a7-train-db.appspot.com",
  messagingSenderId: "951351935006",
  appId: "1:951351935006:web:859902709e6a17b1"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainNameInput = $("#train-name-input").val().trim();
  var destinationInput = $("#destination-input").val().trim();
  var firstTrainTimeInput = $("#first-train-time-input").val().trim();
  var frequencyInput = $("#frequency-input").val().trim();

  var newtrain = {
    name: trainNameInput,
    destination: destinationInput,
    firstTrainTime: firstTrainTimeInput,
    frequency: frequencyInput
  };

  // Uploads train data to the database
  database.ref().push(newtrain);

  console.log("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
});



database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainNamedb = childSnapshot.val().name;
  var destinationdb = childSnapshot.val().destination;
  var firstTrainTimedb = childSnapshot.val().firstTrainTime;
  var frequencydb = childSnapshot.val().frequency;

  console.log(trainNamedb);
  console.log(destinationdb);
  console.log(firstTrainTimedb);
  console.log(frequencydb);

  var currentTime = moment();
  console.log(currentTime);

  getNextTrain(frequencydb, firstTrainTimedb);

  // Create the new row
  var $newRow = $("<tr>").append(
    $("<td>").text(trainNamedb),
    $("<td>").text(destinationdb),
    $("<td>").text(frequencydb),
    $("<td>").text(nextTrainFormatted),
    $("<td>").text(frequencydb - tRemainder),
  );

  // Append the new row to the table
  $("#train-table > tbody").append($newRow);
});



var tRemainder = 0;
var nextTrainFormatted = 0;
function getNextTrain(tFrequency, firstTime) {

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  // Time apart (remainder)
  tRemainder = diffTime % tFrequency;

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  nextTrainFormatted =  moment(nextTrain).format("hh:mm");

}