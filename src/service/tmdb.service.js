// const API_KEY = "";
// const BASE_URL = "https://api.themoviedb.org/3";

/* const endpointFetch = async (endpoint) => {
  const req = await fetch(`${BASE_URL}/${endpoint}`);
  const json = await req.json();
  return json;
}; */
import originals from "./data/originals";
import trending from "./data/trending";
import topMovies from "./data/top_movies";
import action from "./data/action";
import comedy from "./data/comedy";
import documentary from "./data/documentary";
import horror from "./data/horror";
import romance from "./data/romance";
import featured from "./data/featured_info";

export default {
  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Netflix Originals",
        items: originals
        /*  items: await endpointFetch(
          `discover/tv?with_network=213&api_key=${API_KEY}`
        ) */
      },
      {
        slug: "trending",
        title: "Recommended Movies",
        items: trending
        /* items: await endpointFetch(`trending/all/week?api_key=${API_KEY}`) */
      },
      {
        slug: "top",
        title: "Top Movies",
        items: topMovies
        /* items: await endpointFetch(`movie/top_rated?api_key=${API_KEY}`) */
      },
      {
        slug: "action",
        title: "Action",
        items: action
        /* items: await endpointFetch(
          `discover/movie?with_genres=28&api_key=${API_KEY}`
        ) */
      },
      {
        slug: "comedy",
        title: "Comedy",
        items: comedy
        /* items: await endpointFetch(
          `discover/movie?with_genres=35&api_key=${API_KEY}`
        ) */
      },
      {
        slug: "horror",
        title: "Horror",
        items: horror
        /* items: await endpointFetch(
          `discover/movie?with_genres=27&api_key=${API_KEY}`
        ) */
      },
      {
        slug: "romance",
        title: "Romance",
        items: romance
        /* items: await endpointFetch(
          `discover/movie?with_genres=10749&api_key=${API_KEY}`
        ) */
      },
      {
        slug: "documentary",
        title: "Documentary",
        items: documentary
        /* items: await endpointFetch(
          `discover/movie?with_genres=99&api_key=${API_KEY}`
        ) */
      }
    ];
  },
  getMovieInfo: async (movieId, type) => {
    let info = {};

    if (movieId) {
      // info = await endpointFetch(`${type}/${movieId}?api_key=${API_KEY}`);
      info = featured;
    }

    return info;
  }
};
