import React, { useState } from "react";
import { useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css"
import searchIcon from "./search.svg"

const API_URL = "http://www.omdbapi.com?apikey=db5da76c"


    

const App = () => {
    const [movies, setMovies] = useState([]);
    const [serachTerm, setSearchTerm] = useState("");

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search);
        console.log(data.Search);

    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          console.log('La tecla Enter fue presionada');

          searchMovies(serachTerm);
        }
      };
    
    useEffect(() => {
        searchMovies("Shrek");

    }, []);
    return (
        <div className="app">
            <h1>Dennif's Movie Finder</h1>

            <div className="search">
                <input placeholder="Search for movies"
                value={serachTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                />
                <img
                src ={searchIcon}
                alt="search"
                onClick={() => searchMovies(serachTerm)}
                />
                
            </div>

            {movies?.length > 0 ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>

                        ))}
    
                    </div>   
                ) : (
                    //If there is no movies 
                    <div className= "empty">
                        <h2>No movies found</h2>

                    </div>
                )}


        </div>

    );
}


export default App;