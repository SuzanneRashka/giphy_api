//javascript, jQuery

var animals = ["goat", "cow", "horse", "sheep", "sharp objects", "game of thrones", "bob\'s burgers"];
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

        response.data.forEach(function (gif) {

            var imageTag = $("<img>");
            imageTag.attr("src", gif.images.fixed_height_still.url);
            imageTag.addClass("gif-container");
            imageTag.attr('id', 'img-text')
            imageTag.attr("alt", gif.title);
            $("<p>").addClass("center");
            $("#img-text").html(gif.rating);
            $("#gallery").prepend(imageTag);

        })

        $('.gif-container').on('click', function () {
            // if imgSrc has _still, then animate
            // else change to still
        });

    });
}

$('.gif-container').on('click', function () {
    $(this).data()



});

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