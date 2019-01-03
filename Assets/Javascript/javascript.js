sourceValue = 0;
added = false;
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
        var buttonDiv = $('<button>');
        if ( i >= (preGif.length-1) && added == true) {
            console.log("if triggered")
            buttonDiv.addClass("button btn-large grey lighten-1 pulse m10")
            buttonDiv.attr("data-person", preGif[i]);
            buttonDiv.text(preGif[i]);
            $("#buttons").prepend(buttonDiv);
        } else {
            buttonDiv.addClass("button btn-large grey lighten-1 m10")
            buttonDiv.attr("data-person", preGif[i]);
            buttonDiv.text(preGif[i]);
            $("#buttons").prepend(buttonDiv);
        }

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
                    var pRating = $("<p class='shdowone whitefont'>").text("Rating: " + rating);
                    var title = results[i].title;
                    pTitle = $("<p class='shdowone whitefont'>").text(title);
                    stillImage = $("<img>");
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
                    gifDiv.prepend(pTitle);
                    gifDiv.prepend(pRating);
                    gifDiv.prepend(stillImage);
                    $("#gifs-appear-here").prepend(gifDiv);
                }

            })
    })

}

$(document).ready(function () {
    buttonPrepare();
    buttonAddClicks();
    $("#add-Gif").on("click", function (event) {
        event.preventDefault();
        addingGif = $("#form-input").val().trim();
        added = true;
        console.log(added);
        if (addingGif != "") {
            $("#form-input").empty()
            preGif.push(addingGif);
            setTimeout(function () { buttonPrepare() }, 400);
            setTimeout(function () { buttonAddClicks() }, 400);
        }

    })
}
);


