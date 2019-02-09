// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
// A file that stores things that you wouldn't want a user to have
require("dotenv").config();

// const variables are block-scoped which means that it can not be predefined o simply changed
// NODE MODULES
var fs = require('fs')
var axios = require('axios')
var Spotify = require('node-spotify-api')
var request = require('request')
var keys = require("./keys.js")
var colorConsole = require('colors')
var moment = require('moment')
moment().format();

var action = process.argv[2];
var userInput = process.argv.slice(3).join("+");

// introduction to your Liri
console.log("\nTry 'node liri intro' for a Liri intro!\n".red.bold)

switchFunctions(action);

function switchFunctions(action){

    // This switch statement will act opun its diffrent cases
    switch(action){
        
        case "intro":
        liriIntro(userInput);
        break;

        case "concert-this":
        concertThis(userInput);
        break;

        case "spotify-this-song":
        spotifyThis(userInput);
        break;

        case "movie-this":
        movieThis(userInput);
        break;

        case "do-what-it-says":
        whatever(userInput);
        break;

        default:
        console.log("Please use a valid command. Try again using node liri.")
        
    };

    
};

function concertThis(){


    this.artist = userInput;

    axios.get("https://rest.bandsintown.com/artists/" + this.artist + "/events?app_id=codingbootcamp")

    .then(function(response) {

        // If the axios was successful...
        // console.log(response.data);

        var info = response.data;

        for(var i = 0; i < response.data.length; i++) {

            var artist = info[i].lineup;
            var venue = info[i].venue.name;
            var location = info[i].venue.city;
            var date = info[i].datetime;
            var formatDate = moment(date).format('MM/DD/YYYY');

            console.log("All previous or next events from your searched artist:\n")
            console.log(`-----------\n\nArtist: ${artist}\nVenue: ${venue}\nLocation: ${location}\nDate: ${formatDate}\n\n-----------\n`.rainbow);

            
        }
       

    }).catch(function(error) {

      return console.log(error)
      
    });

    logThisText();
}

function spotifyThis(){

    var spotify = new Spotify(keys.spotify)

    this.song = userInput;

    if(!this.song){
        this.song = "One Dance"
        console.log(this.song)
    };

    spotify.search({ type: "track", query: this.song, limit: 1 }, function (err, data) {

        if (err) {
            console.log('Error occurred: ' + err);
        } else {

            for (var i = 0; i < 1; i++) {
                var info = data.tracks.items[i];
                var artist = info.artists[0].name;
                var song = info.name
                var preview = info.preview_url;
                var album = info.album.name;

                console.log(`-----------\n\nArtist: ${artist}\nSong: ${song}\nAlbum: ${album}\nSpotify preview: ${preview}\n\n--------------`.rainbow);

                logThisText();
            }
        };
    });
  
};


function movieThis(){

    this.movie = userInput;

    // If anything is typed then give them a example any ways.
    if (!this.movie) {
        this.movie = "Mr.Nobody";
        console.log("Since you didn't search anything I gave a example. \n")
    }

    // API call for our movie-this command
    axios.get('http://www.omdbapi.com/?t=' + this.movie + '&plot=short&apikey=trilogy' )

    .then(function(response) {

        // If the axios was successful...
        // Then log the body from the site!
        // console.log(response.data);

        var title = response.data.Title;
        var year = response.data.Released;
        var imbd = response.data.imdbRating;
        var rttName = response.data.Ratings[0].Value;
        var country = response.data.Country;
        var language = response.data.Language;
        var plot = response.data.Plot;
        var actors =  response.data.Actors;
       
        console.log(`-----------\n\nTitle: ${title}\n\nYear Released: ${year}\n\nIMDB Rating: ${imbd}\n\nRotten Tomatoes Rating: ${rttName}\n\nCountry: ${country}\n\nLanguage: ${language}\n\nPlot: ${plot}\n\nActors: ${actors}\n\n-----------`.rainbow);
        
        console.log("\nSearch another movie or to see \n".red.bold)

        logThisText();
      
    }).catch(function(error) {

      return console.log("It's a invalid input. Try another movie.\n".green.bold);
      
    });
};

function whatever(){

    fs.readFile('random.txt', 'utf-8', function(err, data) {


        if(err){
            console.log(err)
        }else{
            var output = data.split(",");
            action = output[0];
            userInput = output[1];

            if(action === "spotify-this-song") {
                spotifyThis(action, userInput);
            };
        
        }

        logThisText();
        
    });
};

function logThisText(){

    fs.appendFile('log.txt', 'node liri ' + action + ' ' + userInput +'\n', function (err,) {

        if (err) throw err;
        console.log("This has been logged to log.txt\n")

    });
};

function liriIntro(){

    console.log("\nWelcome! I am Liri!\n".red.bold + "\n I am a language Interpretation and Recognition Interface.\n \n I can run the following commands below:\n".rainbow)
    console.log("\nconcert-this, \nspotify-this-song, \nmovie-this, \ndo-what-it-says \n".green)
    console.log("\nTo execute a command use 'node liri  and (command of choice)\n \nFor example 'node liri spotify-this-song'\n \nTry it out!\n".rainbow)

    logThisText();

};

