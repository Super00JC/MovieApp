import React, { useState, useEffect } from "react";
import "./MovieList.css"; // Ensure you have the styles below
import { fetchMovies } from "./api"; // Adjust path as needed

const Movielist = ({ favorites, toggleFavorite }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMovies();
      setMovies(data);
      setFilteredMovies(data);
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term === "") {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(
        movies.filter((movie) =>
          movie.title.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🎥 Movie List</h1>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </header>
      <main className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={movie.image}
                alt={movie.title}
                className="movie-image"
              />
              <div className="movie-details">
                <h2>{movie.title}</h2>
                <p>
                  <strong>Director:</strong> {movie.director}
                </p>
                <p>
                  <strong>Release Year:</strong> {movie.releaseDate}
                </p>
                <p>
                  <strong>Rating:</strong> ⭐ {movie.rating} / 10
                </p>
                <p className="movie-summary">
                  <strong>Summary:</strong> {movie.summary}
                </p>
              </div>
              <button
                className={`favorite-button ${
                  favorites.includes(movie.id) ? "favorited" : ""
                }`}
                onClick={() => toggleFavorite(movie)}
              >
                {favorites.includes(movie.id)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>
            </div>
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </main>
    </div>
  );
};

export default Movielist;
