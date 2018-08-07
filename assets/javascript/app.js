//javascript, jQuery

var animals = ["goat", "cow", "horse", "sheep"];
var animal;

function displayGiphy() {
    animal = $(this).attr("data-name");

    // var queryURL = "https://api.giphy.com/v1/gifs/search?&api_key=BX0itqePi01jzKkvmct3rqC41VPzzLEk&limit=2tag=horse";
    var queryUrl = "http://api.giphy.com/v1/gifs/search?q=+" + animal + "&limit=1&api_key=BX0itqePi01jzKkvmct3rqC41VPzzLEk";

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        // $("#gallery").text(JSON.stringify(response));
        console.log(response);
        var imageUrl = response.data.image_original_url; /// still image
        var imageTag = $("<img>");
        imageTag.attr("src", imageUrl);
        imageTag.attr("alt", response.data.title);
        $("#gallery").prepend(imageTag);
    });
}

function renderButtons() {
    // Deleting the movie buttons prior to adding new movie buttons
    $("#buttons-display").empty();

    for (var i = 0; i < animals.length; i++) {

        var a = $("<button>");
        // add class to each button for styling
        a.addClass("button-display");
        a.attr("data-name", animals[i]);
        // text of value
        a.text(animals[i]);
        $("#buttons-display").append(a);
    }
}
// adding user input into array
$("#add-animal").on("click", function () {
    event.preventDefault(); // will refresh page without
    animal = $("#animal-input").val().trim();
    animals.push(animal);
    renderButtons();
    $("#animal-input").val('');

})
// Called to display what is in the array to begin with
renderButtons();

$(document).on("click", ".button-display", displayGiphy);


// problems
// data-name not doing stuff????