import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = '2984624c55c838814d54bfd010bf09a1';

// Get popular movies
export const getPopularMovies = async () => {
  const {data} = await axios.get(
    `${apiUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
  );
  return data.results;
};

// Get upComing movies
export const getUpcomingMovies = async () => {
  const {data} = await axios.get(
    `${apiUrl}/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`,
  );
  return data.results;
};

// Get family's movies
export const getFamilyMovies = async () => {
  const {data} = await axios.get(
    `${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=10751`,
  );
  return data.results;
};

// Get popular Tv shows
export const getPopularTv = async () => {
  const {data} = await axios.get(
    `${apiUrl}/tv/popular?api_key=${apiKey}&language=en-US&page=1`,
  );
  return data.results;
};

// Get movie by ID
export const getMovieById = async id => {
  const {data} = await axios.get(
    `${apiUrl}/movie/${id}?api_key=${apiKey}&language=en-US`,
  );
  return data;
};

// Search a TV show or a movie
export const searchMovieOrTv = async (query, type) => {
  const {data} = await axios.get(
    `${apiUrl}/search/${type}?api_key=${apiKey}&language=en-US&page=1&query=${query}`,
  );
  return data.results;
};
