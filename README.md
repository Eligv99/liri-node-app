# Liri-node-app

# What is it 

This Node.js command line application called Liri uses various node packages to make API requests. Users are able search for songs, movies and upcoming band performances and will receive back information about their given search term. Specifically, it requests information from the Bands in Town, Spotify and OMDB API's.

# Demo

![alt text](Images/one.png "Introduction")

![alt text](Images/two.png "Introduction")

![alt text](Images/three.png "Concert-this")

![alt text](Images/four.png "Concert-this")

![alt text](Images/five.png "Spotify")

![alt text](Images/six.png "Spotify")

![alt text](Images/seven.png "Movie-this")

![alt text](Images/eight.png "Movie-this")

![alt text](Images/nine.png "Do-what-it-says")

![alt text](Images/ten.png "Do-what-it-says")


## How it works
There are four different ways this app can be used.

Return the next upcoming concert for the searched for artist or band:
````
$ node liri.js concert-this <search artist/band name here>
````
Return information about the searched for movie:
````
$ node liri.js movie-this <search movie name here> 
````
Return information about the searched for song:
````
$ node liri.js spotify-this-song <search song name here> 
````
This will read the included random.txt file and pass through a value to the spotify function, which will run and return song information about the song in the txt file:
````
$ node liri.js do-what-it-says 
````

## Authors
See contribution history [here](https://github.com/Eligv99/liri-node-app/graphs/contributors)
