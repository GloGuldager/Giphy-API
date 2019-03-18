//Array of My Topics
var topics = ["Tennis", "Walking", "Wine", "Chocolate", "Roadtrip", "Trains", "Mountains", "Zumba"];

//function displayTopicGifs when buttons are pushed
//included function to empty row for images every time button is pushed. I prefer it this way. Did not like it when
//screen wasn't cleared.

function displayTopicGifs() {
    $(".row").empty();

    var gifTopic = $(this).attr("data-topic");

    // Constructing a URL to search Giphy for topics from my array as well as from user input
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifTopic + "&api_key=17f3JO9jM3wsnPgNiSDOLWj2q4YqNpTt&limit=10";

    // ajax call function to go to giphy.com and get images based on search criteria. Include rating if g or pg (not above)
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After images come back from the API
        .then(function (response) {
            // Storing an array of results in the results variable
            var results = response.data;

            // Looping over every result image and rating
            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div for the gifs with col attribute to help in CSS sizing and layout
                    var gifDiv = $("<div class='col'>");

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Creating an image tag
                    var topicImage = $("<img>");

                    // Assign attribute of src URL, animate and still URLs, animate and still "states" and class of gif
                    topicImage.attr("src", results[i].images.fixed_height_still.url);
                    topicImage.attr("data-animate", results[i].images.fixed_height.url);
                    topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                    topicImage.attr("data-state", "still");
                    topicImage.addClass("gif");

                    // Appending images and ratings to the variables
                    gifDiv.append(topicImage);
                    gifDiv.append(p);
                    //writing images and ratings to the DOM
                    $(".row").prepend(gifDiv);
                }
            }
        });
}

// Function that loops through topics array and creates/displays buttons for each topic
function renderButtons() {

    // Empty buttons div on rendering to not get repeat buttons
    $("#buttons-view").empty();

    // for loop to go through topics array and add a button per topic to buttons div
    for (var i = 0; i < topics.length; i++) {

        //create variable to hold button info for each button as it goes through loop
        var button = $("<button>");
        // Add class to each button of "topic"
        button.addClass("topic-btn");
        //Add attribute to each button of "data-topic"
        button.attr("data-topic", topics[i]);
        // Add text to each button from each string in array
        button.text(topics[i]);
        // write the button to the buttons div on the DOM
        $("#buttons-view").append(button);
    }
}

// Create click event on field for user to submit topics and create new buttons
$("#add-topic").on("click", function (event) {
    //keep submit functionality in form from rewriting the screen
    event.preventDefault();
    // create variable to hold user input for a new topic
    var topic = $("#topic-input").val().trim();

    // add the text being held in the topic variable to the topics array from the beginning
    topics.push(topic);

    // run renderButtons function created above to create buttons for all topics including user input topics
    renderButtons();
});

//create click event for all gif images that have been written to the DOM. Used function from class example.
$(document).on("click", ".gif", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
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

//click event for AlL buttons. Initial topic buttons as well as user input buttons
$(document).on("click", ".topic-btn", displayTopicGifs);
renderButtons();


