// Javascript to handle logic

// On page load
$(document).ready(function() {

// FUNCTIONS 
// ===============================================

	// Function to handle click event on form submission for game search
	$('#gameSearchBtn').click(function(event) {

		// Prevents the form from automatically running on its own
		event.preventDefault();

		// Grabs input from game search
		var gameSearch = $('#gameSearch').val().trim();

		// Log to test button click
		console.log(gameSearch);
		
	})

// Function to handle click event off game searched
	$('button').click(function() {

		// In this case, the "this" keyword refers to the button that was clicked
		var game = $(this).attr("data-name");

		// Constructing a URL to search Giantbomb for the game searched
		var queryURL = "https://www.giantbomb.com/api/search/?api_key=4aa71062a0badcab727772a041b2d0acf478a829&format=jsonp&json_callback=success&query=" + game + "&resources=game";
		
		// Perform AJAX GET req
		$.ajax({
			url: queryURL,
			method: "GET",
			

		})
		.done(function(response) {
			var results = response.data;

			console.log("Game: " + game);
			console.log(response);
		})
	})


});