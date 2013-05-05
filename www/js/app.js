//this is so it doesn't double play audio
var masterAudio = {
    isPlaying: false,
    currentTrack: null
}

var lat, lon;

//these are objects for each track         
var songs = {
    
    //WAYFINDING MIX
    "track1" : {
    	name: 'track1',
        url: 'https://s3.amazonaws.com/Digit_Test/13+The+Sun.mp3',
        lat: 40.729714,
        lon: -73.993274
    },

    "track2" : {
    	name: 'track2',
        url: 'https://s3.amazonaws.com/Digit_Test/09+You+and+Me.mp3',
        lat: 40.731283,
        lon: -73.996332
    },
    
    "track3" : {
    	name: 'track3',
        url: 'https://s3.amazonaws.com/Digit_Test/Got+You+On+My+Mind.mp3',
        lat: 40.731413,
        lon: -73.998359
    },
    
    "track4" : {
    	name: 'track4',
        //url: 'https://s3.amazonaws.com/Digit_Test/01+Somebody+Help+Me.mp3',
        url: 'music/Somebody_Help_Me.mp3';
        lat: 40.730064,
        lon: -73.999561
    },
    
    "track5" : {
    	name: 'track5',
        url: 'https://s3.amazonaws.com/Digit_Test/Drop+By+My+Place.mp3',
        lat: 40.729771,
        lon: -73.996536
    },	    
    
    "track6" : {
    	name: 'track6',
        url: 'https://s3.amazonaws.com/Digit_Test/18+Falling+(Twin+Peaks+Theme).mp3',
        lat: 40.728608,
        lon: -73.994315
    },
}	
    
/*
function calcAngle(x1, x2, y1, y2)
		{
		calcAngle = Math.atan2(x1-x2,y1-y2)*(180/Math.PI);
		if(calcAngle < 0)	
			calcAngle = Math.abs(calcAngle);
		else
			calcAngle = 360 - calcAngle;		
		return calcAngle;
		}
		
*/

// create our namespace
var RocknCoder = RocknCoder || {};

// event handlers for the compass stuff,
RocknCoder.Compass = (function () {
	var lastHeading = -1,
		// cache the jQuery selectors
		$headText = $("header > h1"),
		$compass = $("#compass"),
		// displays the degree in the heading text
		updateHeadingText = function (event, heading) {
			event.preventDefault();
			$headText.html(heading + "&deg;"); 
			return false;
		},
		// adjusts the rotation of the compass
		updateCompass = function (event, heading) {
			event.preventDefault();
			// to make the compass dial point north
			var rotation = 360 - heading;
			
			/*
			if (lat !== 'undefined' && lon !== 'undefined') {
				// difference from where you are to "next track"
				diffx = lat - songs.track2.lat;
				diffy = lon - songs.track2.lon;
				calcAngle(0,1,diffx, diffy);
			}
			*/

			var rotateDeg = 'rotate(' + rotation + 'deg)';
			// TODO: fix - this code only works on webkit browsers, not wp7
			$compass.css('-webkit-transform', rotateDeg);
			return false;
		};
	// bind both of the event handlers to the "newHeading" event
	$("body").bind("newHeading", updateCompass).bind("newHeading", updateHeadingText);
}());

// hook the compass watch
document.addEventListener('deviceready', function () {
	
	//watch the geolocation when the device is ready (constantly update every 30 seconds or so)
	navigator.geolocation.watchPosition(onGeoSuccess, onGeoError, { maximumAge: 3000, enableHighAccuracy: true });
	
	RocknCoder.Compass.watchId = navigator.compass.watchHeading(function (heading) {
		// only magnetic heading works universally on iOS and Android
		// round off the heading then trigger newHeading event for any listeners
		var newHeading = Math.round(heading.magneticHeading);
		$("body").trigger("newHeading", [newHeading]);
	}, function (error) {
		// if we get an error, show its code
		alert("Compass error: " + error.code);
	}, {frequency : 100});
});

function onGeoSuccess(position) {
	
	//for simulating positions in the mix for testing
	lat = songs.track4.lat;
    lon = songs.track4.lon;
	
	//lat = position.coords.latitude;
    //lon = position.coords.longitude;
    $("#liveLocationStream_lat").html(lat); 
	$("#liveLocationStream_lon").html(lon);
	
	//MIX TRACKS + LOCATIONS
    //make the .0001 a variable so i can adjust for testing
    
    //TRACK 1
    if ((Math.abs(songs.track1.lat - lat) <= .0001) && (Math.abs(songs.track1.lon - lon) <= .0001)){
    	console.log("inside track 1!")
        playAudio(songs.track1);
        alert('You found Track 1!');
        /*
        $('#route1').show();
        $('#route2').hide();
		$('#route3').hide();
        $('#route4').hide();
        $('#route5').hide();
        $('#route6').hide();
        */
    	
    } else {
        //alert('hi!')
    }

    //TRACK 2
    if ((Math.abs(songs.track2.lat - lat) <= .0001) && (Math.abs(songs.track2.lon - lon) <= .0001)){
        console.log("inside track 2!")
    	playAudio(songs.track2);
    	//alert('You found Track 2!');
        $('#route1').hide();
        $('#route2').show();   
		$('#route3').hide();
        $('#route4').hide();
        $('#route5').hide();
        $('#route6').hide();
        
    }
    
    //TRACK 3
    if ((Math.abs(songs.track3.lat - lat) <= .0001) && (Math.abs(songs.track3.lon - lon) <= .0001)){
        console.log("inside track 3!")
    	playAudio(songs.track3);
    	//alert('You found Track 3!');
        $('#route1').hide();
		$('#route2').hide();        
        $('#route3').show();
        $('#route4').hide();
        $('#route5').hide();
        $('#route6').hide();
        
    }
    
    //TRACK 4
    if ((Math.abs(songs.track4.lat - lat) <= .0001) && (Math.abs(songs.track4.lon - lon) <= .0001)){
        console.log("inside track 4!")
    	playAudio(songs.track4);
    	//alert('You found Track 4!');
        $('#route1').hide();
		$('#route2').hide();
        $('#route3').hide();        
        $('#route4').show();
        $('#route5').hide();
        $('#route6').hide();

    }   
    
    //TRACK 5
    if ((Math.abs(songs.track5.lat - lat) <= .0001) && (Math.abs(songs.track5.lon - lon) <= .0001)){
        console.log("inside track 5!")
    	playAudio(songs.track5);
    	alert('You found Track 5!');
    	/*
    	$('#route5').show();
        $('#route1').hide();
		$('#route2').hide();
        $('#route3').hide();
        $('#route4').hide();
        $('#route6').hide();
        */
    }    
    
    //TRACK 6
    if ((Math.abs(songs.track6.lat - lat) <= .0001) && (Math.abs(songs.track6.lon - lon) <= .0001)){
        console.log("inside track 6!")
    	playAudio(songs.track6);
    	alert('You found Track 6!');
    	/*
    	$('#route6').show();
        $('#route1').hide();
		$('#route2').hide();
        $('#route3').hide();
        $('#route4').hide();
        $('#route5').hide();
        */
    }  
    
}

function onGeoError(error) {
	alert("error geo");
	if( error == 1) {
    	alert('Turn on Geolocation services.');
    }
}
//////////////////////////////////////////////////////AUDIO FUNCTIONALITY///////////////////////////////////////////////////////
            
// Play audio
function playAudio(song) {
	// stop currently playing song as long as it is not this song
	if (masterAudio.currentTrack && masterAudio.currentTrack !== song.name) {       
        console.log("Stopping  " + masterAudio.currentTrack);
		stopAudio(songs[masterAudio.currentTrack]);
	}
	
	if (masterAudio.isPlaying == false) {								
		// Play the audio file at url	
		console.log('just here')
		song.media = new Media(song.url,
			// success callback
			function() {
				console.log("playAudio():Audio Success");
			},
			
			// error callback
			function(err) {
				console.log("playAudio():Audio Error: "+err);
			}
		);
        song.media.play();
        masterAudio.isPlaying = true;
        // If songs => songs.track1, then songs.name is 'track1'
        masterAudio.currentTrack = song.name;
        console.log("Setting masterAudio.currentTrack to " + song.name);
    }
	
	console.log('after here');
	
}  

// Stop audio
function stopAudio(songs) {
	if (songs.media) {
	    songs.media.stop();
	    masterAudio.isPlaying = false; 
	}
}



//Toggle Compass/Play Buttons
$(document).ready(function() {
   $('#compass').click(function(){
     //alert("compass clicked!");
     $('#play').show();
     $('#compass').hide();
   });

   $('#play').click(function(){
     //alert("play clicked!");
     $('#play').hide();
     $('#compass').show();
   });

 });





