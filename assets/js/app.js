$(document).ready(function () {

  // Initialize Firebase
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

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    name = $("#name-input").val().trim();
    dest = $("#dest-input").val().trim();
    time = $("#time-input").val().trim();
    freq = $("#freq-input").val().trim();
        timeConverted = moment(time, "hh:mm").subtract(1, "years");
        currentTime = moment();
        diffTime = moment().diff(moment(timeConverted), "minutes");
        tRemainder = diffTime % freq;
        minutesAway = freq - tRemainder;
        nextTrain = moment().add(minutesAway, "minutes");
        nextArrival = moment(nextTrain).format("hh:mm");



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
    console.log(sv);
    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.dest);
    console.log(sv.time);
    console.log(sv.freq);
    console.log(sv.nextArrival);
    console.log(sv.minutesAway);

    // Change the HTML to reflect
    //assign a td to a variable//give it ID of namedisplay. append to table
    var tbody = $("<tbody>");
    tbody.addClass("tbody-display");
    tbody.attr("id", sv.dateAdded);
    $("#table").append(tbody);
    var dateID =  $(tbody);

    var nameDisplay = $("<td>");
    nameDisplay.addClass("name-display");
    nameDisplay.text(sv.name);
    $(dateID).append(nameDisplay);

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

  $(document).on("click", "#delete", function(){
    
    console.log($(this).html());
     $(this).closest('tbody').remove();
     getKey = $(this).parent().attr('id');
     console.log(getKey);
     //use dateAdded ID to remove item from database

});

});

