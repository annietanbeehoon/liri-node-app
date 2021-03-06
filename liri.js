require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

var command = process.argv[2];
var option = process.argv[3];

function whatToDo() {

    switch (command) {

        case "my-tweets":
            getTweets();
            break;

        case "spotify-this-song":
            getSpotify();
            break;

        case "movie-this":
            getMovie();
            break;

        case "do-what-it-says":
            getUsersChoice();
            break;

        default:
            console.log("Command options are: 'my-tweets', 'spotify-this-song', 'movie-this', 'or do-what-it-says' ");
    }
}

//requirement #1 : `node liri.js my-tweets`

function getTweets() {

    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });

    var params = {
        count: 20 // limit to 20
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            var dataLog = '-----------\n' + 'My tweets:\n' + '------------\n';
            for (var i = 0; i < tweets.length; i++) {
                //node liri.js my-tweets
                // This will show your last 20 tweets and when they were created at in your terminal/bash window.
                dataLog += "Tweet number "
                    + (i + 1) + ": "
                    + tweets[i].text + " " + '\n'
                    + "Tweet created "
                    + tweets[i].created_at + '\n'
                    + '--------------------------------------------\n';

            }
            fs.appendFile('./logged.txt', dataLog, function (err) {
                if (err) throw err;
                console.log(dataLog);
            });
        }
    });
}


// requirement #2 : `node liri.js spotify-this-song '<song name here>'`

function getSpotify() {

    console.log("Good for the Moods!"); // test

    var spotifySearch;
    if (option === undefined) {
        spotifySearch = "the sign ace of base";
        //return console.log("Artist: Ace of Base \nSong's name: 'The Sign' \nPreview Link: 'https://open.spotify.com/track/3DYVWvPh3kGwPasp7yjahc' \nAlbum: 'The Sign' ");
    } else {
        spotifySearch = option;
    }

    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });

    spotify.search({ type: 'track', query: spotifySearch, limit: 1 }, function (err, data) {
        if (err) {
            var dataLog = '-----------\n' + 'Song info:\n' + '------------\n';
            return console.log('Error occurred: ' + err);
        }
        // Artist(s), song's name, a preview link of the song from Spotify, the album that the song is from
        dataLog = '\n------------\n' + 'Song info:\n' + '------------\n' + '\n'
            + "Artist : " + data.tracks.items[0].artists[0].name + '\n'
            + "Song's name : " + data.tracks.items[0].name + '\n'
            + "Preview link : " + data.tracks.items[0].preview_url + '\n'
            + "Album : " + data.tracks.items[0].album.name;

        fs.appendFile('./logged.txt', dataLog, function (err) {
            if (err) throw err;
            console.log(dataLog);
        });
    });
}

// requirement #3 : `node liri.js movie-this '<movie name here>'`
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

function getMovie() {
    //console.log("Show me the Show!"); // test

    var movieSearch;
    if (option === undefined) {
        movieSearch = "Mr. Nobody";
        //return console.log("Title: " + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes Rating: " + JSON.parse(body).Value + "\nCountry Where Produced: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors);
    } else {
        movieSearch = option;
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy";
    //console.log(queryUrl);

    request(queryUrl, function (err, response, body) {
        // If the request is successful
        if (!err && response.statusCode === 200) {
            var dataLog = '-----------\n' + 'Movie info:\n' + '------------\n';
            // Parse the body of the site and recover to output as so
            // title, year released, imdb rating, rotten tomatoes rating, country of production, movie language, movie plot, movie actors
            dataLog =
                '\n-----------\n' + 'Movie info:\n' + '------------\n'
                + '\nTitle: ' + JSON.parse(body).Title
                + '\nRelease Year: ' + JSON.parse(body).Year
                + "\nIMDB Rating: " + JSON.parse(body).imdbRating
                + "\nRotten Tomatoes Rating: " + JSON.parse(body).Value
                + "\nCountry Where Produced: " + JSON.parse(body).Country
                + "\nLanguage: " + JSON.parse(body).Language
                + "\nPlot: " + JSON.parse(body).Plot
                + "\nActors: " + JSON.parse(body).Actors;

            fs.appendFile('./logged.txt', dataLog, function (err) {
                if (err) throw err;
                console.log(dataLog);
            });
        }
    });
}


// requirement #4 : `node liri.js do-what-it-says`

function getUsersChoice() {

    fs.readFile("random.txt", "UTF-8", function (err, data) {
        if (err) {
            console.log(error);
        } else {
            //console.log("node liri.js " + data);
            var dataArr = data.split(",");
            command = dataArr[0];
            console.log("Log the dataArr index 0: ", dataArr[0]);
            option = dataArr[1];
            console.log("Log the dataArr index 1 : ", dataArr[1]);

            whatToDo();// Execute the do-what-it-says
        }
    });
}
whatToDo();
