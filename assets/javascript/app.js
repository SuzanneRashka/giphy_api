//javascript, jQuery

var animals = ["goat", "cow", "horse", "sheep"];

function displayGiphy() {
    var animal = $(this.attr("data-name"));
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=BX0itqePi01jzKkvmct3rqC41VPzzLEk&limit=2"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#gallery").text(JSOMM.stringify(response));
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
        $("#buttons-display").append(a)
    }
}

$("#add-animal").on("click", function () {
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    animals.push(animal);
    renderButtons();
})
// Called to display what is in the arry to begin with
renderButtons();

$(document).on("click", ".button-display", displayGiphy);


// problems
// data-name not doing stuff????