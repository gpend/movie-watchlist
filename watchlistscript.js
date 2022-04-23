
require("dotenv").config();
/**
 * It takes a movie object, and returns the movie object with the additional data
 * from the OMDB API.
 * @param movie - The movie object that is returned from the first fetch call.
 * @returns The data is being returned as a promise.
 */
async function GetMovie(movie){
    const result = await fetch(`http://www.omdbapi.com/?{your key here}&t=${movie.Title}`)
    const data = await result.json()
    return data
}

/**
 * It returns all the values in the localStorage.
 * @returns An array of all the values in localStorage.
 */
function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}

const movies = (allStorage())

/**
 * It takes a movie title and a method as arguments, and then uses the method to
 * get the movie data from the API. 
 * 
 * The method is either getMovieData or getMovieDataFromWatchlist. 
 * 
 * The function then creates a movie HTML element and appends it to the movie
 * list.
 * @param movie - the movie title
 * @param method - the function that will be called to get the movie data
 */
function getMovieHTML (movie, method){
    method(movie).then(moviedata => {
        const movieHTML = `
        <div class= "movie">
            <img class= "movie-img" src=${moviedata.Poster} alt="${moviedata.Title} poster">
            <div class = "movie-data">
                <div class= "movie-title">
                    <h4> ${moviedata.Title} </h4>
                    <p> ${moviedata.imdbRating} </p>
                </div>
                <div class= "movie-details">
                    <p>${moviedata.Runtime} </p>
                    <p> ${moviedata.Genre} </p>
                    <p> <span class= "${moviedata.Title}"><img src="/minus-icon.png" alt="minus sign">  remove from watchlist</span></p>
                </div>
                <p>${moviedata.Plot}</p>
            </div>
        </div>
        `
        document.querySelector(".movie-list").innerHTML += movieHTML
    })
    
}

/* Taking the movies array and mapping over it. It is then taking the movie and
parsing it into JSON. It is then taking the movie data and the GetMovie
function and passing it into the getMovieHTML function. */
movies.map((movie)=>{
    const movieData = JSON.parse(movie)
    getMovieHTML(movieData, GetMovie)
})

// TODO finish remove from watchlist

