import { create } from "zustand";
import { movieApi } from "../midleware/movie.api";

interface MovieState {
  movies: any[];
  setMovies: () => void;
}
const store = create<MovieState>((set) => ({
  movies: [],
  setMovies: async () => {
    try {
      const response = await movieApi.getMovie();
      set({ movies: response.data.results });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));

export default store;