//javascript, jQuery

var animals = [
  "Rocky",
  "Forrest Gump",
  "Guardians of the Galaxy",
  "Avatar",
  "Mad Men",
  "Pulp Fiction",
  "Toy Story",
  "Sharp Objects",
  "Game of Thrones",
  "Bob's Burgers",
  "The Wolf of Wallstreet",
  "Breaking Bad",
  "Avengers: Inifinity War",
  "The Sopranos",
  "Black Panther",
  "Mission Impossible"
];
var animal;

function displayGiphy() {
  animal = $(this).attr("data-name");

  var queryUrl =
    "https://api.giphy.com/v1/gifs/search?q=+" +
    animal +
    "&limit=1&api_key=BX0itqePi01jzKkvmct3rqC41VPzzLEk";

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    response.data.forEach(function (gif) {
      var imgStill = gif.images.fixed_height_still.url;
      var imgAnimate = gif.images.fixed_height.url;
      var divTag = $("<div>").addClass("img-card");
      var imageTag = $("<img>");

      imageTag.attr("data-still", imgStill);
      imageTag.attr("data-animate", imgAnimate);
      imageTag.attr("data-state", "still");
      imageTag.attr("alt", gif.title);
      imageTag.addClass("gif");

      var pTag = $("<p>")
        .addClass("rating")
        .text("Rating : " + gif.rating);

      divTag.append(imageTag).append(pTag);

      $("#gallery").prepend(divTag);

    });
  });
};

$("#gallery").on("click", ".gif", function () {
  // data.state, data.animate, data.state
  console.log("clicking on gif");
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

function renderButtons() {
  // Deleting the movie buttons prior to adding new movie buttons
  $("#buttons-display").empty();

  for (var i = 0; i < animals.length; i++) {
    var a = $("<button>");
    // add class to each button for styling
    a.addClass("btn btn-info");
    a.attr("data-name", animals[i]);
    // text of value
    a.text(animals[i]);
    $("#buttons-display").append(a);
  }
}
// adding user input into array
$("#add-animal").on("click", function () {
  event.preventDefault(); // will refresh page without
  animal = $("#animal-input")
    .val()
    .trim();
  animals.push(animal);
  renderButtons();
  $("#animal-input").val("");
});
// Called to display what is in the array to begin with
renderButtons();

$(document).on("click", ".btn", displayGiphy);