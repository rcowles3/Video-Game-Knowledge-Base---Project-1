// Javascript to handle logic

// On page load
$(document).ready(function() {

    // Log to test JS is working
    // console.log('Hi I am loaded');

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
        
        // If else to check if game is valid

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

    // Function that run YouTube API logic
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
        $('#formTitle').append("<h3>Submit Feedback</h3>")

        // Reviewer name
        $('#reviewerName').append("<id='reviewerName' data-parsley-validate=><label for='Reviewers Name'>Name:</label><input type='text' class='form-control form-group' name='s' required='' data-parsley-palindrome=''>");

        // Reviewer Comments
        $('#reviewerComments').append("<id='reviewersComments' data-parsley-validate=><label for='Reviewers Comments'>Comments:</label><textarea type='text' class='form-control form-group' name='s' required='' data-parsley-palindrome=''>");

        // Radio buttons to rate app
        $('#reviewerRating').append("<label for='appRating'><h3>Rating: </h3></label>");
        $('#reviewerRating').append("<div><label class='radio-inline reviewerRating'><input type='radio' name='appRating' value='1' required=''> 1 </label>" +
            "<label class='radio-inline reviewerRating'><input type='radio' name='appRating' value='2' required=''> 2 </label>" +
            "<label class='radio-inline reviewerRating'><input type='radio' name='appRating' value='3' required=''> 3 </label>" +
            "<label class='radio-inline reviewerRating'><input type='radio' name='appRating' value='4' required=''> 4 </label>" +
            "<label class='radio-inline reviewerRating'><input type='radio' name='appRating' value='5' required=''> 5 </label></div>");

        // Submit button
        $('#reviewerSubmitBtn').append("<div><button id='userSubmit' type='submit' class='btn btn-default'>Submit</button></div>");
    }

    // FUNCTIONS TO HANDLE CLICK EVENTS
    // ===============================================  

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

    // Function to initialize and send reviews to Firebase
    $('#reviewerSubmitBtn').click(function() {

    	// Testing click submission
    	console.log("testing click function");
    	
    	// Method to prevent form from running on its own
        event.preventDefault();

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyAx1a2HO0Q7v7yk4JFHOVVLwNs8Pu6O8z0",
            authDomain: "video-game-search-project.firebaseapp.com",
            databaseURL: "https://video-game-search-project.firebaseio.com",
            // projectId: "video-game-search-project",
            storageBucket: "video-game-search-project.appspot.com",
            // messagingSenderId: "299555008620"
        };
        firebase.initializeApp(config);

        // Variable to reference firebase DB.
        var database = firebase.database();

        // Get input values from from
        reviewerName = $('#reviewerName').val().trim();
        reviewerComments = $('#reviewerComments').val().trim();
        reviewerRating = $('#reviewerRating').val().trim();

        // Log to check if input is retrieved properly
        console.log(reviewerName, reviewerComments, reviewerRating);

        // Push input data to firebase 
        database.ref().push({
            reviewerName: reviewerName,
            reviewerComments: reviewerComments,
            reviewerRating: reviewerRating
        });

        // Reset form after submit
        // $('#userInput').get(0).reset();
    });

});
