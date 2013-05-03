// next two lines for JS-Lint
"use strict";
var $, navigator, alert, document;

//this is for the database and geolocation
var db, dbresults, itemindex, lat, lon;
//this is for the data that populates the notetemplate
var notedata = {notelat:"", notelon:""};
//this is mustache.js, which is a template, which is populated with the notedata
var notetemplate = '<div id="map">Map Placeholder</div>';

//////////////////////////////////////////////////////SONG OBJECTS///////////////////////////////////////////////////////
            
            //this is so it doesn't double play audio
            var masterAudio = {
	            isPlaying: false,
	            currentTrack: null
	        }
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

//////////////////////////////////////////////////////LOADING PAGE FUNCTIONS///////////////////////////////////////////////////////

            
            //when the page loads, do this stuff...
            $(document).on("pageinit", function(){
            	
            	//create the template, populate html with the mustache template, etc.
            	$('#MixMain').live('pagecreate', function(event){ 
		            var html = Mustache.to_html(notetemplate, notedata);
		            $("#notedetailcontent").html(html);
		            
		        }); 
		        
		                       
                //listen for the new note, find geolocation, and update position of the map navigator to current location -- also executes two functions to see if geolocation is available
                $("#MixMain").live("pageshow", function(){
                	//navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
                	navigator.geolocation.watchPosition(onGeoSuccess, onGeoError, { maximumAge: 3000, enableHighAccuracy: true });
                	if(itemindex >= 0){
	                	//$("#noteimage").css("display", "block");
                	}
                });

            });
                                
           
            //look up init function so you know what this does...
            function init() {
            	document.addEventListener("deviceready", onDeviceReady, false);
            }
                                
            //function to see if the device is on. if not, css changes to reflect 'offline' state
            function onDeviceReady() {
            	var networkstate = navigator.connection.type;
                if(networkstate == "none"){
                	$(".offline").css("visibility","visible");
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

//////////////////////////////////////////////////////MAP FUNCTIONALITY///////////////////////////////////////////////////////
	                             
            //executed if there geolocation is available; sets variables from the googlemaps api
            function onGeoSuccess(position) {
            	//alert.sendLocation({lat:position.coords.latitude, lon:position.coords.longitude};
            	lat = position.coords.latitude;
                lon = position.coords.longitude;
                //alert(lat + "," + lon);
                /*
                //this is stuff i'm adding attempting to update the location
                var latLng = new Array();
                latLng[0] = lat;
                latLng[1] = lon;
                
                //console.log(lat + " " + position.coords.latitude);
                */
                var currentposition = new google.maps.LatLng(lat,lon);
               
                //map.currentposition.push(latLng);
                
                console.log("current position: " + currentposition);
                                    

                
                var mapoptions = {
                	zoom: 12,
                    center: currentposition,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                
                //Create the Google Map, set options                    
                var map = new google.maps.Map(document.getElementById("map"), mapoptions);   
                                   
                var marker = new google.maps.Marker({
                	position: currentposition,
                    map: map
                }); 
                               
            
                //MIX TRACKS + LOCATIONS
                //make the .0001 a variable so i can adjust for testing
                if ((Math.abs(songs.track1.lat - lat) <= .0001) && (Math.abs(songs.track1.lon - lon) <= .0001)){
	            	console.log("inside track 1!")
		            playAudio(songs.track1);
		            alert('You found Track 1!');
	            	
                } else {
	                //alert('hi!')
                }

                if ((Math.abs(songs.track2.lat - lat) <= .0001) && (Math.abs(songs.track2.lon - lon) <= .0001)){
	                console.log("inside track 2!")
	            	playAudio(songs.track2);
	            	alert('You found Track 2!');
                }
                
                if ((Math.abs(songs.track3.lat - lat) <= .0001) && (Math.abs(songs.track3.lon - lon) <= .0001)){
	                console.log("inside track 3!")
	            	playAudio(songs.track3);
	            	alert('You found Track 3!');
                }
                
                if ((Math.abs(songs.track4.lat - lat) <= .0001) && (Math.abs(songs.track4.lon - lon) <= .0001)){
	                console.log("inside track 4!")
	            	playAudio(songs.track4);
	            	alert('You found Track 4!');
                }   
                
                if ((Math.abs(songs.track5.lat - lat) <= .0001) && (Math.abs(songs.track5.lon - lon) <= .0001)){
	                console.log("inside track 5!")
	            	playAudio(songs.track5);
	            	alert('You found Track 5!');
                }    
                
                if ((Math.abs(songs.track6.lat - lat) <= .0001) && (Math.abs(songs.track6.lon - lon) <= .0001)){
	                console.log("inside track 6!")
	            	playAudio(songs.track6);
	            	alert('You found Track 6!');
                }  
                
                if ((Math.abs(songs.track7.lat - lat) <= .0001) && (Math.abs(songs.track7.lon - lon) <= .0001)){
	                console.log("inside track 7!")
	            	playAudio(songs.track7);
	            	alert('You found Track 7!');
                }    
                
                if ((Math.abs(songs.track8.lat - lat) <= .0001) && (Math.abs(songs.track8.lon - lon) <= .0001)){
	                console.log("inside track 8!")
	            	playAudio(songs.track8);
	            	alert('You found Track 8 (end of mix)!');
                }  
                
                if ((Math.abs(songs.track1b.lat - lat) <= .0001) && (Math.abs(songs.track1b.lon - lon) <= .0001)){
	                console.log("inside track 1b!")
	            	playAudio(songs.track1b);
	            	alert('You found Song 1!');
	            	
	            	} else {
	                //alert('hi!')
                }  
                
                if ((Math.abs(songs.track2b.lat - lat) <= .0001) && (Math.abs(songs.track2b.lon - lon) <= .0001)){
	                console.log("inside track 2b!")
	            	playAudio(songs.track2b);
	            	alert('You found Song 2!');
                }   
                
                if ((Math.abs(songs.track3b.lat - lat) <= .0001) && (Math.abs(songs.track3b.lon - lon) <= .0001)){
	                console.log("inside track 3b!")
	            	playAudio(songs.track3b);
	            	alert('You found Song 3!');
                } 
                
                if ((Math.abs(songs.track4b.lat - lat) <= .0001) && (Math.abs(songs.track4b.lon - lon) <= .0001)){
	                console.log("inside track 4b!")
	            	playAudio(songs.track4b);
	            	alert('You found Song 4!');
                }           
                
                if ((Math.abs(songs.track5b.lat - lat) <= .0001) && (Math.abs(songs.track5b.lon - lon) <= .0001)){
	                console.log("inside track 5b!")
	            	playAudio(songs.track5b);
	            	alert('You found Song 5!');
                }                         
                
                if ((Math.abs(songs.track6b.lat - lat) <= .0001) && (Math.abs(songs.track6b.lon - lon) <= .0001)){
	                console.log("inside track 6b!")
	            	playAudio(songs.track6b);
	            	alert('You found Song 6!');
                }                                                                                             
                        
                if ((Math.abs(songs.track7b.lat - lat) <= .0001) && (Math.abs(songs.track7b.lon - lon) <= .0001)){
	                console.log("inside track 7b!")
	            	playAudio(songs.track7b);
	            	alert('You found Song 7!');
                }   
                
                if ((Math.abs(songs.track8b.lat - lat) <= .0001) && (Math.abs(songs.track8b.lon - lon) <= .0001)){
	                console.log("inside track 8b!")
	            	playAudio(songs.track8b);
	            	alert('You found Song 8!');
                }            
                
                if ((Math.abs(songs.track9b.lat - lat) <= .0001) && (Math.abs(songs.track9b.lon - lon) <= .0001)){
	                console.log("inside track 9b!")
	            	playAudio(songs.track9b);
	            	alert('You found Song 9!');
                }                    
                
                if ((Math.abs(songs.track10b.lat - lat) <= .0001) && (Math.abs(songs.track10b.lon - lon) <= .0001)){
	                console.log("inside track 10b!")
	            	playAudio(songs.track10b);
	            	alert('You found Song 10!');
                }            
                
                if ((Math.abs(songs.track11b.lat - lat) <= .0001) && (Math.abs(songs.track11b.lon - lon) <= .0001)){
	                console.log("inside track 11b!")
	            	playAudio(songs.track11b);
	            	alert('You found Song 11(end of mix)!');
                }  
                                                                                          
            }
            
            $("#liveLocationStream_lat").text(lat); //dollar sign for jquery
            $("#liveLocationStream_lon").text(lon);

//////////////////////////////////////////////////////ERROR FUNCTIONALITY///////////////////////////////////////////////////////
            
                            
            //executed if there geolocation is not available; sends popup to the user telling them to turn on GPS stuff
            function onGeoError(error) {
            	if( error == 1) {
                	alert('Turn on Geolocation services.');
                }
            }

