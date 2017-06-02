// Javascript to handle logic

// On page load
$(document).ready(function() {

    // Log to test JS is working
    // console.log('Hi I am loaded');

    // FUNCTIONS 
    // ===============================================            

    // Function that runs Giant Bomb API logic
    function callGiantBombApi() {

        // VARIABLES 
        // ===============================================

        // API Key
        var apikey = "4aa71062a0badcab727772a041b2d0acf478a829";

        // Base URL
        var baseUrl = "http://www.giantbomb.com/api";

        // Construct ajax url
        var GamesSearchUrl = baseUrl + '/search/?api_key=' + apikey + '&format=jsonp';

        // Log to test URL
        // console.log("GamesSearchUrl", GamesSearchUrl);

        // Grabs input from game search
        var gameSearch = $('#gameSearch').val().trim();

        // var query = game;
        // console.log(gameSearch);

        // send off the query
        $.ajax({
                method: 'GET',
                dataType: 'jsonp',
                // crossDomain: true,
                jsonp: 'json_callback',
                url: GamesSearchUrl + '&query=' + gameSearch + '&resources=game&limit=1'
            })
            .done(function(data) {

                // Log of JSON object for referencing data
                console.log(data);

                // OBJECT VARIABLES 
                // ===============================================

                // Variable to get url from JSON obj
                var imageURL = data.results[0].image.medium_url;

                // Variable to get game rating
                var rating = data.results[0].original_game_rating[0].name;

                var convertedRating = rating.slice(5,7);

                // Variable to add image source
                var image = $("<img class='text-center panel panel-default'>").attr("src", imageURL);

                // Game title from Obj
                var objTitle = data.results[0].name;

                // Game brief desc
                var briefDesc = data.results[0].deck;

                // Game desc from Obj
                var objDesc = data.results[0].description;

                // Link back to Giant Bomb page URL
                var giantBombUrl = data.results[0].site_detail_url;

                console.log(giantBombUrl);

                var giantBombLink = $('<a>').attr('href', giantBombUrl).text("Link Back To GiantBomb.com");

                // console.log(data.results[0].description);

                // JQUERY TO DOM 
                // ===============================================

                // Manipulate image to the DOM
                $('#gameImage').html(image);

                // Manipulate title to DOM
                $('#gameTitle').html("<class='panel panel-default panel-heading'>" + objTitle);

                // Manipulate rating to DOM
                $('#gameRating').html("Rating: " + convertedRating);

                // Manipulate brief description to DOM
                $('#briefDesc').html(briefDesc);

                // Manipulate description to DOM
                $('#gameDesc').html("<class='panel-body'>" + objDesc);

                // Link appended to DOM
                $('#giantBombLink').append(giantBombLink);

            });
    }

    // Function to handle click event off game searched
    $('#gameSearchBtn').click(function() {

        // Hide on load content, on click
        // Hide index title
        $('#siteTitle').css("display", "none");
        // Hide search button
        $('#gameSearchBtn').css("display", "none");
        // Hide search input
        $('#gameSearch').css("display", "none");

        // Call to Giant Bomb API
        callGiantBombApi();

        // Call to YouTube API

        // Call to Spotify API

        // Create user form and append reveiws
    });
});