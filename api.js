const API_KEY = "0c36f9d8813a090c46788966ade3e953";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();

    const moviesWithDetails = await Promise.all(
      data.results.map(async (movie) => {
        const creditsResponse = await fetch(
          `${BASE_URL}/movie/${movie.id}/credits?api_key=${API_KEY}`
        );
        const creditsData = await creditsResponse.json();

        const director =
          creditsData.crew.find((person) => person.job === "Director")?.name ||
          "Unknown";

        return {
          id: movie.id,
          title: movie.title,
          summary: movie.overview,
          rating: movie.vote_average,
          director: director,
          releaseDate: movie.release_date.split("-")[0],
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        };
      })
    );

    return moviesWithDetails;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
