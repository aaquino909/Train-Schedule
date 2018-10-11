
$(document).ready(function () {

  //Initialize Firebase
  var config = {
    apiKey: "AIzaSyDsG8NPyteR8sFGiTYcWxL1Eg9PSou5XCE",
    authDomain: "train-schedule-90c79.firebaseapp.com",
    databaseURL: "https://train-schedule-90c79.firebaseio.com",
    projectId: "train-schedule-90c79",
    storageBucket: "",
    messagingSenderId: "39294880869"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Initial Values
  var name = "";
  var dest = "";
  var time = 0;
  var freq = 0;

  // Capture Button Click
  $("#submit").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();

    //stores input into variables
    name = $("#name-input").val().trim();
    dest = $("#dest-input").val().trim();
    time = $("#time-input").val().trim();
    freq = $("#freq-input").val().trim();

    //CALCULATIONS 
    timeConverted = moment(time, "hh:mm").subtract(1, "years");
    currentTime = moment();
    diffTime = moment().diff(moment(timeConverted), "minutes");
    tRemainder = diffTime % freq;
    minutesAway = freq - tRemainder;
    nextTrain = moment().add(minutesAway, "minutes");
    nextArrival = moment(nextTrain).format("hh:mm");


    //pushes input varibales into db 
    database.ref().push({ //set only replaces use .push
      name: name,
      dest: dest,
      time: time,
      freq: freq,
      nextArrival, nextArrival,
      minutesAway, minutesAway,
      dateAdded: firebase.database.ServerValue.TIMESTAMP

    });

    //clears the values on the form when you click submit
    $('#name-input').val('');
    $('#dest-input').val('');
    $('#time-input').val('');
    $('#freq-input').val('');

  });
  //on value does everytime an event is changed ...use child_added

  database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
    // console.log(sv);
    // // Console.loging the last user's data
    // console.log(snapshot.key);
    // console.log(sv.name);
    // console.log(sv.dest);
    // console.log(sv.time);
    // console.log(sv.freq);
    // console.log(sv.nextArrival);
    // console.log(sv.minutesAway);

    // Change the HTML to reflect
    //assign a td to a variable//give it ID of namedisplay. append to table
    var tbody = $("<tbody>");
    tbody.addClass("tbody-display");
    tbody.attr("id", snapshot.key);
    $("#table").append(tbody);
    var dateID = $(tbody); //parent element 

    var nameDisplay = $("<td>");
    nameDisplay.addClass("name-display");
    nameDisplay.text(sv.name);
    $(dateID).append(nameDisplay); //appended each element to the parent element so its easier to delete

    var destDisplay = $("<td>");
    destDisplay.addClass("dest-display");
    destDisplay.text(sv.dest);
    $(dateID).append(destDisplay);


    var freqDisplay = $("<td>");
    freqDisplay.addClass("freq-display");
    freqDisplay.text(sv.freq);
    $(dateID).append(freqDisplay);

    var nextArrivalDisplay = $("<td>");
    nextArrivalDisplay.addClass("nextArrival-display");
    nextArrivalDisplay.text(sv.nextArrival);
    $(dateID).append(nextArrivalDisplay);

    var minutesAwayDisplay = $("<td>");
    minutesAwayDisplay.addClass("minutesAway-display");
    minutesAwayDisplay.text(sv.minutesAway);
    $(dateID).append(minutesAwayDisplay);

    var deleteButton = $("<td>");
    deleteButton.addClass("btn btn-primary delete-button");
    deleteButton.attr("id", "delete");
    deleteButton.text("remove");
    $(dateID).append(deleteButton);

    // $("#name-display").text(sv.name);
    // $("#role-display").text(sv.role);
    // $("#date-display").text(sv.date);
    // $("#rate-display").text(sv.rate);

    // Handle the errors
  }, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
  //deletes item and row from html and databse
  $(document).on("click", "#delete", function () {
    dataRef = firebase.database();
    $(this).closest('tbody').remove(); //removes row using the parent element
    getKey = $(this).parent().attr('id'); //captures the dateAdded ID thats in the opject
    // console.log(getKey);
    dataRef.ref().child(getKey).remove(); //removes database object thats related to the key


  });
});

//useful code
// ref.child('users').orderByChild('name').equalTo('John Doe').on("value", function(snapshot) {
//   console.log(snapshot.val());
//   snapshot.forEach(function(data) {
//       console.log(data.key);
//   });
// });

// Find all dinosaurs whose height is exactly 25 meters.
// var ref = firebase.database().ref("dinosaurs");
// ref.orderByChild("height").equalTo(25).on("child_added", function(snapshot) {
//   console.log(snapshot.key);
// });

    // // use dateAdded ID to remove item from database
    // var ref = firebase.database().ref("train-schedule-90c79");
    // ref.on("child_added", function(snapshot) {
    //     console.log(snapshot.val());
    //   });

    // var root = database.ref();
    // var urlRef = root.child("train-schedule-90c79");
    // urlRef.once("value", function (snapshot) {
    //   snapshot.forEach(function (child) {
    //     console.log(child.key + ": " + child.val());
    //   });

    // });