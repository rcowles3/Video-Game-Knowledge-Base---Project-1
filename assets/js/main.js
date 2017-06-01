// Javascript to handle logic

// On page load
$(document).ready(function() {

            console.log('Hi I am loaded');

            // FUNCTIONS 
            // ===============================================            

            // Function to handle click event off game searched
            $('#gameSearchBtn').click(function() {

            	$('#gameSearchBtn').css("display", "none");
            	$('#gameSearch').css("display", "none");

                // API Key
                var apikey = "4aa71062a0badcab727772a041b2d0acf478a829";

                // Base URL
                var baseUrl = "http://www.giantbomb.com/api";

                // Construct ajax url
                var GamesSearchUrl = baseUrl + '/search/?api_key=' + apikey + '&format=jsonp';

                // Log to test URL
                console.log("GamesSearchUrl", GamesSearchUrl);

                // Grabs input from game search
                var gameSearch = $('#gameSearch').val().trim();

                // var query = game;
                console.log(gameSearch);

                // send off the query
                $.ajax({
                	method: 'GET',
                	dataType: 'jsonp',
                	// crossDomain: true,
                	jsonp: 'json_callback',
                    url: GamesSearchUrl + '&query=' + gameSearch + '&resources=game&limit=1'
                })
                .done(function(data) {
                	console.log(data);
                	console.log(data.results[0].name);
                	console.log(data.results[0].deck);
                	console.log(data.results[0].site_detail_url);
                	// console.log(data.results[0].description);
                	$('#gameInfo').html(data.results[0].deck);

                });
            });
});