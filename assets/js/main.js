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
        var videoSearch = baseURL + "search?&q=" + videos + "&part=snippet&chart=mostPopular&videoCategoryId=20&type=video&maxResults=4&key=" + apiKey;


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

                // Title
                $('#vidsTitle').append("<h3>Popular YouTube Videos</h3>");

                //created for loop and set to only loop 4 times "i<4"
                for (var i = 0; i < 4; i++) {
                    // videoId with response of i
                    var videoId = response.items[i].id.videoId;
                    console.log(response.items[i]);
                    // loop appends videos together within the loop using ".append"
                    $('#popVids').append("<iframe width='250' height='250' src='https://www.youtube.com/embed/" + videoId + "' frameborder='0' allowfullscreen></iframe>");
                }
            })
    };

    // Function to create user input form
    function userReviews() {

        // Title
        $('#formTitle').append("<h3>Submit Feedback</h3>");

        // Reviewer name
        $('#reviewerName').append("<data-parsley-validate=><label for='Reviewers Name'>Name:</label><input id='nameInput' type='text' class='form-control form-group' name='s' required='' data-parsley-palindrome=''>");

        // Reviewer Comments
        $('#reviewerComments').append("<data-parsley-validate=><label for='Reviewers Comments'>Comments:</label><textarea id='commentsInput' type='text' class='form-control form-group' name='s' required='' data-parsley-palindrome=''>");

        // Radio buttons to rate app
        $('#reviewerRating').append("<label for='appRating'><h3>Rating: </h3></label>");
        $('#reviewerRating').append("<div><label class='radio-inline'><input class='reviewerRating' type='radio' name='appRating' value='1' required=''> 1 </label>" +
            "<label class='radio-inline'><input class='reviewerRating'  type='radio' name='appRating' value='2' required=''> 2 </label>" +
            "<label class='radio-inline'><input class='reviewerRating' type='radio' name='appRating' value='3' required=''> 3 </label>" +
            "<label class='radio-inline'><input class='reviewerRating' type='radio' name='appRating' value='4' required=''> 4 </label>" +
            "<label class='radio-inline'><input class='reviewerRating' type='radio' name='appRating' value='5' required=''> 5 </label></div>");

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
        $('#siteSubTitle').css("display", "none");
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

        // Parsley form testing
        // parsleyForm();
    });

    // Function to initialize and send reviews to Firebase
    $('#reviewerSubmitBtn').click(function(event) {

    	// $("#reviewerSubmitBtn").on('submit', function(e){
     //        e.preventDefault();
     //        var form = $(this);

     //        form.parsley().validate();

     //        if (form.parsley().isValid()){
     //            alert('valid');
     //        }
     //    });

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
        reviewerName = $('#nameInput').val().trim();
        reviewerComments = $('#commentsInput').val().trim();
        reviewerRating = $('.reviewerRating').val().trim();

        // Log to check if input is retrieved properly
        console.log('reviewName', reviewerName, 'reviewerComments', reviewerComments, 'reviewRating', reviewerRating);

        // Push input data to firebase 
        database.ref().push({
            reviewerName: reviewerName,
            reviewerComments: reviewerComments,
            reviewerRating: reviewerRating
        });

        // Reset form after submit
        // $('#userInput').reset();

        // Watcher function to check if values in firebase database has changed, if so, render html to page. 
        database.ref().on("child_added", function(snapshot) {

            // Render snapshot data to html
            $('#displayFormName').append(snapshot.val().reviewerName);
            $('#displayFormComments').append(snapshot.val().reviewerComments);
            $('#displayFormRating').append(snapshot.val().reviewerRating + "<br>");
        });
    });

    function parsleyForm() {
        // Title
        $('#formTitle').append("<h3>Submit Feedback</h3>");
        $('#parsleyForm').append("<id='appForm' data-parsley-validate=''>" +
            "<label for='reviewerName'>Name * :</label>" +
            "<input type='text' id='nameInput' class='form-control' name='reviewerName' required=''>");
        $('#parsleyForm').append("<id='appForm' data-parsley-validate=''>" +
            "<label for='reviewerComments'>Comments * :</label>" +
            "<textarea type='text' id='commentsInput' class='form-control' name='reviewerComments' required=''>");
        $('#parsleyForm').append("<id='appForm' data-parsley-validate=''>" +
            "<label for='reviewerRating'>Rating * :</label><p>" +
            " 1: <input type='radio' name=appRating class='reviewerRating' id='1star' value='1' required=''>" +
            " 2: <input type='radio' name=appRating class='reviewerRating' id='2star' value='2' required=''>" +
            " 3: <input type='radio' name=appRating class='reviewerRating' id='3star' value='3' required=''>" +
            " 4: <input type='radio' name=appRating class='reviewerRating' id='4star' value='4' required=''>" +
            " 5: <input type='radio' name=appRating class='reviewerRating' id='5star' value='5' required=''>");

        $('#parsleyForm').append("<input type='submit' id='reviewerSubmitBtn' class='btn btn-default' value='Submit'>");

        // $(function() {
        //     $('#parsleyForm').parsley().on('field:validated', function() {
        //             var ok = $('.parsley-error').length === 0;
        //             $('.bs-callout-info').toggleClass('hidden', !ok);
        //             $('.bs-callout-warning').toggleClass('hidden', ok);
        //         })
        //         .on('form:submit', function() {
        //             return false; // Don't submit form for this demo
        //         });
        // });
    }

});
