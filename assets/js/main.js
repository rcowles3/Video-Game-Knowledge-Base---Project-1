// Javascript to handle logic

// On page load
$(document).ready(function() {

    // Log to test JS is working
    // console.log('Hi I am loaded');

    // // Initialize Firebase
    // var config = {
    //     apiKey: "AIzaSyAx1a2HO0Q7v7yk4JFHOVVLwNs8Pu6O8z0",
    //     authDomain: "video-game-search-project.firebaseapp.com",
    //     databaseURL: "https://video-game-search-project.firebaseio.com",
    //     // projectId: "video-game-search-project",
    //     storageBucket: "video-game-search-project.appspot.com",
    //     // messagingSenderId: "299555008620"
    // };
    // firebase.initializeApp(config);

    // // Variable to reference firebase DB.
    // var database = firebase.database();

    // // FUNCTIONS 
    // // ===============================================            

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

                // Checking whether game rating is null or not
                var checkRating = data.results[0].original_game_rating;

                // console.log(data.results[0].original_game_rating);

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

                // console.log(giantBombUrl);

                var giantBombLink = $('<a>').attr('href', giantBombUrl).text("Link Back To GiantBomb.com");

                // console.log(data.results[0].description);

                // JQUERY TO DOM 
                // ===============================================

                // Manipulate image to the DOM
                $('#gameImage').html(image);

                // Manipulate title to DOM
                $('#gameTitle').html("<class='panel panel-default panel-heading'>" + objTitle);

                // If else statment to check whether game rating is available for searched game
                if (checkRating == null) {

                    // Variable for no game ratings
                    var rating = console.log("Sorry, game has no rating to display.");
                } else {

                    // Variable to get game rating
                    var rating = data.results[0].original_game_rating[0].name;

                    // Grab just rating from string
                    var convertedRating = rating.slice(5, 7);

                    // Manipulate rating to DOM
                    $('#gameRating').html("Rating: " + convertedRating);
                }

                // Manipulate brief description to DOM
                $('#briefDesc').html(briefDesc);

                // Manipulate description to DOM
                $('#gameDesc').html("<class='panel-body'>" + objDesc);

                // Link appended to DOM
                $('#giantBombLink').append(giantBombLink);

            });
    };

    function youTubeApi() {

        // Variable to retrieve search input
        var videos = $('#gameSearch').val().trim();

        // console.log(videos); // Log to make sure correct

        // Variable for baseUrl
        var baseURL = "https://www.googleapis.com/youtube/v3/";

        // Variable for API Key
        var apiKey = "AIzaSyD_owzmaKsqcncuux1E5mbgvPk3y7WrZF0";

        // Video Search queryURL
        var videoSearch = baseURL + "search?&q=" + videos + "&part=snippet&type=video&key=" + apiKey;

        console.log(videoSearch); // Double check url

        // Sned of ajax call
        $.ajax({
                url: videoSearch,
                method: "GET",
                // maxResults: 4, 
                dataType: 'jsonp'
            })
            .done(function(response) {

                // Log json obj
                console.log(response);

                // Create var to grab vid id from for videos
                var videoId = response.items[0].id.videoId;

                // check vid id
                console.log(videoId);

                $('#popVids').html("<iframe width='400' height='300' src='https://www.youtube.com/embed/" + videoId + "' frameborder='0' allowfullscreen></iframe>");
            })
    };

    // Function to create user input form
    function userReviews() {

        // Title
        $('#userInput').html("<h3>Submit Feedback</h3>")

        // Reviewer name
        $('#userInput').append("<id='reviewerName' data-parsley-validate=><label for='Reviewers Name'>Name:</label><input type='text' class='form-control form-group' name='s' required='' data-parsley-palindrome=''>");

        // Reviewer Comments
        $('#userInput').append("<id='reviewersComments' data-parsley-validate=><label for='Reviewers Comments'>Comments:</label><textarea type='text' class='form-control form-group' name='s' required='' data-parsley-palindrome=''>");

        // Radio buttons to rate app
        $('#userInput').append("<label for='appRating'><h3>Rating: </h3></label>");
        $('#userInput').append("<div><label class='radio-inline'><input type='radio' name='appRating' id='1star' value='1' required=''> 1 </label>" +
            "<label class='radio-inline'><input type='radio' name='appRating' id='1star' value='1' required=''> 2 </label>" +
            "<label class='radio-inline'><input type='radio' name='appRating' id='1star' value='1' required=''> 3 </label>" +
            "<label class='radio-inline'><input type='radio' name='appRating' id='1star' value='1' required=''> 4 </label>" +
            "<label class='radio-inline'><input type='radio' name='appRating' id='1star' value='1' required=''> 5 </label></div>");

        // Submit button
        $('#userInput').append("<div><button type='submit' class='btn btn-default'>Submit</button></div></form>");
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
        youTubeApi();

        // Call to Spotify API


        // Call to create form on submission
        userReviews();
    });
});
