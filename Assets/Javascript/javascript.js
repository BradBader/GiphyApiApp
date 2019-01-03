sourceValue = 0;
var preGif = [
    "Jean Claude Van Damme",
    "Chuck Norris",
    "The Rock",
    "Arnold Schwarzenegger",
    "Sylvester Stalone",
    "Dolph Lundgren",
    "Bruce Willis",
    "Steven Seagal",
    "Kurt Russell",
    "Chow Yun-Fat",
    "Wesley Snipes",
]


function buttonPrepare() {
    $("#buttons").empty()
    for (var i = 0; i < preGif.length; i++) {
        console.log(preGif[i]);
        var buttonDiv = $('<button>');
        buttonDiv.addClass("button btn-large pulse grey lighten-1 m10")
        buttonDiv.attr("data-person", preGif[i]);
        buttonDiv.text(preGif[i]);
        $("#buttons").prepend(buttonDiv);
    }

}

function buttonAddClicks() {
    $(".btn-large").on("click", function () {
        var person = $(this).attr("data-person");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=vuDIut7JuzLOgIvsvBwLWSuecCkvOEKs&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                results = response.data;


                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='col l3 m2 s12 ctr'>");
                    var rating = results[i].rating;
                    var p = $("<p class='shdowone whitefont'>").text("Rating: " + rating);
                    stillImage = $("<img class='stillGif'>");
                    stillImage.attr("src", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-still", results[i].images.fixed_height_still.url).attr("data-state", "still").attr("class", "gif"),
                        stillSource = results[i].images.fixed_height_still.url;
                    animatedSource = results[i].images.fixed_height.url;
                    $(stillImage).on("click", function () {
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
                    gifDiv.prepend(p);
                    gifDiv.prepend(stillImage);
                    $("#gifs-appear-here").prepend(gifDiv);
                }

            })
    })

}

function addGifClicks() {
    $(".gif").on("click", function () {
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
}


$(document).ready(function () {
    buttonPrepare();
    buttonAddClicks();
    addGifClicks();
    $("#add-Gif").on("click", function (event) {
        event.preventDefault();
        var addingGif = $("#form-input").val().trim();
        if (addingGif != "") {
            console.log("this if is working")
            $("#form-input").empty()
            preGif.push(addingGif);
            setTimeout(function () { buttonPrepare() }, 400);
            setTimeout(function () { buttonAddClicks() }, 400);
        }

    })
}
);


