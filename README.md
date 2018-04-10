# An Liri App

### Requirement

In this homework assignment, I am making a LIRI node app that reads the user command from Terminal and output the results into Terminal.

### Node packages

The node packages used for this assignment are Twitter, Node-Spotify-API, Request to get data from OMDB_API , and DotEnv.
     
### Commands

The commands takes in the following parameters:

    * `my-tweets`

    * `spotify-this-song`

    * `movie-this`

    * `do-what-it-says`



1. At my-tweets command, it returns the last 20 tweets and output in the terminal/bash window.

2. At spotify-this-song `<song title`>, it returns the following:
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided then the program will default to "The Sign" by Ace of Base.
   
   
3. At movie-this `<movie name`>, it returns the following information: 
     
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     

   If there is no specified movie, the program will output data for the movie 'Mr. Nobody.'
     
 4. The do-what-it-says command will take the text inside of random.txt and then use it to call one of the above-mentioned commands. The text in random.txt is `spotify-this-song` for "I Want it That Way,". It can be changed as you like it.
     

### Log the output into a txt file
1. I logged all the data from the terminal/bash window into a .txt file.
