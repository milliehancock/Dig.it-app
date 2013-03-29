//////////////////////////////////////////////////////GLOBAL VARIABLES//////////////////////////////////////////////////////

//these are for calculating GPS distance. they need to be global so you can refer to the individual position to play songs as well. the variables are updated in the 'gps_distance' function.
var R; // km
var dLat;
var dLon;
var lat1;
var lat2;
var a; 
var c; 
var d;

var track_id = '';      // Name/ID of the exercise
var watch_id = null;    // ID of the geolocation
var tracking_data = []; // Array containing GPS position objects

//these are objects for each track         
var songs = {
	            
	            //STEVE'S MIX
	            "track1" : {
	            	name: 'track1',
		            url: 'https://s3.amazonaws.com/Digit_Test/13+The+Sun.mp3',
		            lat: 40.725117,
		            lon: -73.941875
	            },

	            "track2" : {
	            	name: 'track2',
		            url: 'https://s3.amazonaws.com/Digit_Test/09+You+and+Me.mp3',
		            lat: 40.726592,
		            lon: -73.941808
	            },
	            
	            "track3" : {
	            	name: 'track3',
		            url: 'https://s3.amazonaws.com/Digit_Test/Got+You+On+My+Mind.mp3',
		            lat: 40.727535,
		            lon: -73.943889
	            },
	            
	            "track4" : {
	            	name: 'track4',
		            url: 'https://s3.amazonaws.com/Digit_Test/01+Somebody+Help+Me.mp3',
		            lat: 40.727064,
		            lon: -73.9467
	            },
	            
	            "track5" : {
	            	name: 'track5',
		            url: 'https://s3.amazonaws.com/Digit_Test/Drop+By+My+Place.mp3',
		            lat: 40.72573,
		            lon: -73.950884
	            },	    
	            
	            "track6" : {
	            	name: 'track6',
		            url: 'https://s3.amazonaws.com/Digit_Test/18+Falling+(Twin+Peaks+Theme).mp3',
		            lat: 40.727657,
		            lon: -73.953019
	            },	
	            
	            "track7" : {
	            	name: 'track7',
		            url: 'https://s3.amazonaws.com/Digit_Test/%E2%96%BA_First_Aid_Kit_Emmylou_The_Hype_Machine_Wxc3VfP7wKYu.128.mp3',
		            lat: 40.728454,
		            lon: -73.957365
	            },	
	            
	            "track8" : {
	            	name: 'track8',
		            url: 'https://s3.amazonaws.com/Digit_Test/You%27re+Still+Blowing+My+Mind.mp3',
		            lat: 40.72869,
		            lon: -73.959081
	            },
	            
	            //SARAH H'S MIX
	            
	            "track1b" : {
	            	name: 'track1b',
		            url: 'https://s3.amazonaws.com/Digit_Test/Lil+Mama+-+Lip+Gloss.mp3',
		            lat: 40.726202,
		            lon: -73.940585
	            },	
	
	            "track2b" : {
	            	name: 'track2b',
		            url: 'https://s3.amazonaws.com/Digit_Test/02+Slow+It+Down+Ft.+Fabolous.mp3',
		            lat: 40.723031,
		            lon: -73.939061
	            },		
	            
	            "track3b" : {
	            	name: 'track3b',
		            url: 'https://s3.amazonaws.com/Digit_Test/French+Montana+-+Freaks+(Explicit)+ft.+Nicki+Minaj.MP3',
		            lat: 40.720356,
		            lon: -73.937849
	            },	
	            
	            "track4b" : {
	            	name: 'track4b',
		            url: 'https://s3.amazonaws.com/Digit_Test/Mesmerize.mp3',
		            lat: 40.718176,
		            lon: -73.936905
	            },	
	            
	            "track5b" : {
	            	name: 'track5b',
		            url: 'https://s3.amazonaws.com/Digit_Test/%E2%96%B6_01_Suit_Tie_feat_JAY_Z_01_Suit__26_Tie__28feat._JAY_Z_29.mp3',
		            lat: 40.714671,
		            lon: -73.935295
	            },		         
	            
	            "track6b" : {
	            	name: 'track6b',
		            url: 'https://s3.amazonaws.com/Digit_Test/%E2%96%B6_Good_Kush_Alcohol_Bitches_Love_Me_Feat_Drake_x_Future_Prod_By_Mike_Will_Made_It_CDQ_Lil_Wayne_Feat._Future__26_Drake___Goo.mp3',
		            lat: 40.714663,
		            lon: -73.930618
	            },		               	            
	            
	            "track7b" : {
	            	name: 'track7b',
		            url: 'https://s3.amazonaws.com/Digit_Test/%E2%96%BA_Lady_Money_The_Hype_Machine_gNDtwbFPy9X7.128.mp3',
		            lat: 40.71424,
		            lon: -73.927088
	            },	
	            
	            "track8b" : {
	            	name: 'track8b',
		            url: 'https://s3.amazonaws.com/Digit_Test/BlowMyHigh.mp3',
		            lat: 40.713403,
		            lon: -73.924212
	            },	
	            
	            "track9b" : {
	            	name: 'track9b',
		            url: 'https://s3.amazonaws.com/Digit_Test/01+Phantom+%5BProd.+Sammsonite+and+Stricknine%5D.mp3',
		            lat: 40.711069,
		            lon: -73.923161
	            },		            	            	            	                           		            	            	            
	            
	            "track10b" : {
	            	name: 'track10b',
		            url: 'https://s3.amazonaws.com/Digit_Test/Project+pat+-+Chickenhead.mp3',
		            lat: 40.709239,
		            lon: -73.922313
	            },
	            
	            "track11b" : {
	            	name: 'track11b',
		            url: 'https://s3.amazonaws.com/Digit_Test/03+Mirando+a+las+Muchachas.m4a',
		            lat: 40.706702,
		            lon: -73.921766
	            },	
	            		                    
            }

//////////////////////////////////////////////////////FUNCTIONS///////////////////////////////////////////////////////

//AUDIO FUNCTIONALITY           
// Play audio
function playAudio(songs) {
	// Play the audio file at url	
	console.log('just here')
	songs.media = new Media(songs.url,
					
	// success callback
		function() {
			console.log("playAudio():Audio Success");
		},
					
	// error callback
		function(err) {
			console.log("playAudio():Audio Error: "+err);
		});
	
	console.log('after here')
	
	// Play audio
	songs.media.play();
				
	//trackObject.media.play();
}  
			
// Stop audio
function stopAudio(songs) {
	if (songs.media) {
    	songs.media.stop();
    }
}


//GPS FUNCTIONALITY 
function gps_distance(lat1, lon1, lat2, lon2)
{
	// http://www.movable-type.co.uk/scripts/latlong.html
    R = 6371; // km
    dLat = (lat2-lat1) * (Math.PI / 180);
    dLon = (lon2-lon1) * (Math.PI / 180);
    lat1 = lat1 * (Math.PI / 180);
    lat2 = lat2 * (Math.PI / 180);
    alert("LAT 1="+ lat1);

    a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    d = R * c;
    
    return d;
}

document.addEventListener("deviceready", function(){
	
	if(navigator.network.connection.type == Connection.NONE){
		$("#home_network_button").text('No Internet Access')
								 .attr("data-icon", "delete")
								 .button('refresh');
	}

});

//If you click the 'play audio' button, play the audio.

$("#startTracking_playAudio").live('click', function(){
	
	console.log("playing audio")
	playAudio(songs.track1);

}); 



//function to start tracking. is live. triggered on click.
$("#startTracking_start").live('click', function(){

	// Start tracking the User
    watch_id = navigator.geolocation.watchPosition(
    
    	// Success
        function(position){
            tracking_data.push(position);
        },
        
        // Error
        function(error){
            console.log(error);
        },
        
        // Settings
        { frequency: 3000, enableHighAccuracy: true });
    
    // Tidy up the UI
    track_id = $("#track_id").val();
    
    $("#track_id").hide();
    
    $("#startTracking_status").html("Tracking workout: <strong>" + track_id + "</strong>");
});


$("#startTracking_stop").live('click', function(){
	
	// Stop tracking the user
	navigator.geolocation.clearWatch(watch_id);
	
	// Save the tracking data
	window.localStorage.setItem(track_id, JSON.stringify(tracking_data));

	// Reset watch_id and tracking_data 
	var watch_id = null;
	var tracking_data = null;

	// Tidy up the UI
	$("#track_id").val("").show();
	
	$("#startTracking_status").html("Stopped tracking workout: <strong>" + track_id + "</strong>");

});


$("#home_clearstorage_button").live('click', function(){
	window.localStorage.clear();
});

$("#home_seedgps_button").live('click', function(){
	window.localStorage.setItem('Sample block', '[{"timestamp":1335700802000,"coords":{"heading":null,"altitude":null,"longitude":170.33488333333335,"accuracy":0,"latitude":-45.87475166666666,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700803000,"coords":{"heading":null,"altitude":null,"longitude":170.33481666666665,"accuracy":0,"latitude":-45.87465,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700804000,"coords":{"heading":null,"altitude":null,"longitude":170.33426999999998,"accuracy":0,"latitude":-45.873708333333326,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700805000,"coords":{"heading":null,"altitude":null,"longitude":170.33318333333335,"accuracy":0,"latitude":-45.87178333333333,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700806000,"coords":{"heading":null,"altitude":null,"longitude":170.33416166666666,"accuracy":0,"latitude":-45.871478333333336,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700807000,"coords":{"heading":null,"altitude":null,"longitude":170.33526833333332,"accuracy":0,"latitude":-45.873394999999995,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700808000,"coords":{"heading":null,"altitude":null,"longitude":170.33427333333336,"accuracy":0,"latitude":-45.873711666666665,"speed":null,"altitudeAccuracy":null}},{"timestamp":1335700809000,"coords":{"heading":null,"altitude":null,"longitude":170.33488333333335,"accuracy":0,"latitude":-45.87475166666666,"speed":null,"altitudeAccuracy":null}}]');

});

// When the user views the history page
$('#history').live('pageshow', function () {
	
	// Count the number of entries in localStorage and display this information to the user
	tracks_recorded = window.localStorage.length;
	$("#tracks_recorded").html("<strong>" + tracks_recorded + "</strong> workout(s) recorded");
	
	// Empty the list of recorded tracks
	$("#history_tracklist").empty();
	
	// Iterate over all of the recorded tracks, populating the list
	for(i=0; i<tracks_recorded; i++){
		$("#history_tracklist").append("<li><a href='#track_info' data-ajax='false'>" + window.localStorage.key(i) + "</a></li>");
	}
	
	// Tell jQueryMobile to refresh the list
	$("#history_tracklist").listview('refresh');

});

// When the user clicks a link to view track info, set/change the track_id attribute on the track_info page.
$("#history_tracklist li a").live('click', function(){

	$("#track_info").attr("track_id", $(this).text());
	
});


// When the user views the Track Info page
$('#track_info').live('pageshow', function(){

	// Find the track_id of the workout they are viewing
	var key = $(this).attr("track_id");
	
	// Update the Track Info page header to the track_id
	$("#track_info div[data-role=header] h1").text(key);
	
	// Get all the GPS data for the specific workout
	var data = window.localStorage.getItem(key);
	
	// Turn the stringified GPS data back into a JS object
	data = JSON.parse(data);

	// Calculate the total distance travelled
	total_km = 0;

	for(i = 0; i < data.length; i++){
	    
	    if(i == (data.length - 1)){
	        break;
	    }
	    
	    total_km += gps_distance(data[i].coords.latitude, data[i].coords.longitude, data[i+1].coords.latitude, data[i+1].coords.longitude);
	}
	
	total_km_rounded = total_km.toFixed(2);
	
	// Calculate the total time taken for the track
	start_time = new Date(data[0].timestamp).getTime();
	end_time = new Date(data[data.length-1].timestamp).getTime();

	total_time_ms = end_time - start_time;
	total_time_s = total_time_ms / 1000;
	
	final_time_m = Math.floor(total_time_s / 60);
	final_time_s = total_time_s - (final_time_m * 60);

	// Display total distance and time
	$("#track_info_info").html('Travelled <strong>' + total_km_rounded + '</strong> km in <strong>' + final_time_m + 'm</strong> and <strong>' + final_time_s + 's</strong>');
	
	// Set the initial Lat and Long of the Google Map
	var myLatLng = new google.maps.LatLng(data[0].coords.latitude, data[0].coords.longitude);

	// Google Map options
	var myOptions = {
      zoom: 15,
      center: myLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // Create the Google Map, set options
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    var trackCoords = [];
    
    // Add each GPS entry to an array
    for(i=0; i<data.length; i++){
    	trackCoords.push(new google.maps.LatLng(data[i].coords.latitude, data[i].coords.longitude));
    }
    
    // Plot the GPS entries as a line on the Google Map
    var trackPath = new google.maps.Polyline({
      path: trackCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    // Apply the line to the map
    trackPath.setMap(map);
   
		
});
