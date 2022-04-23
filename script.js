let movies = undefined

/**
 * MovieSearch is an asynchronous function that takes in an input, fetches the
 * data from the API, and returns the data.
 * @param input - The search term
 * @returns The data is being returned as a promise.
 */
async function MovieSearch(input){
    const result = await fetch(`http://www.omdbapi.com/?{your key here}s=${input}`)
    const data = await result.json()
    return data
}

/**
 * GetMovie is an async function that takes a movie object as an argument, and
 * returns the data from the API call.
 * @param movie - The movie object that we're getting the data for.
 * @returns The data is being returned as a promise.
 */
async function GetMovie(movie){
    const result = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=33044a46&t=${movie.Title}`)
    const data = await result.json()
    return data
}

/**
 * The function takes in a movie object and an index number, and returns a string
 * of HTML that contains the movie's poster, title, rating, runtime, genre, and
 * plot.
 * @param movie - the movie object
 * @param index - the index of the movie in the array
 * @returns A string of HTML code.
 */
function getMovieHTML (movie, index){
    return `
    <div class= "movie">
        <img class= "movie-img" src=${movie.Poster} alt="${movie.Title} poster">
        <div class = "movie-data">
            <div class= "movie-title">
                <h4> ${movie.Title} </h4>
                <p> ${movie.imdbRating} </p>
            </div>
            <div class= "movie-details">
                <p>${movie.Runtime} </p>
                <p> ${movie.Genre} </p>
                <p> <span class= "add-to-list ${index}"><img src="/Icon.png" alt="plus sign">  add to watchlist</span></p>
            </div>
            <p>${movie.Plot}</p>
        </div>
    </div>
    `
}

/**
 * It takes the search text from the input field, clears the movie list, searches
 * for movies, then adds the movie HTML to the movie list.
 * @param event - The event object is a property of the Window object.
 */
function handleSearch(event){
    event.preventDefault()
    const searchText = document.getElementById("search").value
    document.querySelector(".movie-list").innerHTML = ""
    movies = MovieSearch(searchText)
    movies
    .then(foundMovies =>{
        return foundMovies.Search.map((movie, index) =>{
            return GetMovie(movie)
                .then(data2 => {
                    document.querySelector(".movie-list").innerHTML += getMovieHTML(data2, index)
                    document.querySelectorAll(".add-to-list").forEach(element => element.addEventListener("click", addToWatchlist))
                })
        })
        
    })
}

/**
 * It takes the index of the movie that was clicked on, and then uses that index
 * to get the movie from the API, and then stores that movie in local storage.
 * @param event - the event that triggered the function
 */
function addToWatchlist(event){
    let index = event.target.classList[1]
    movies.then(data => {
        localStorage.setItem(data.Search[index].Title,JSON.stringify(data.Search[index]))
    })
}


document.getElementById("movie-search").addEventListener("click", handleSearch)
console.log("rendered")
