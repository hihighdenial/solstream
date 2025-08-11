// movie.store.ts
import { create } from "zustand";
import { movieApi } from "../midleware/movie.api";
import type { MuvieResult } from "../midleware/movie.api";

interface MovieStore {
  movies: MuvieResult[];
  loading: boolean;
  error: string | null;
  fetchMovies: () => Promise<void>;
}

const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  loading: false,
  error: null,

  fetchMovies: async () => {
    set({ loading: true, error: null });
    try {
      const data = await movieApi.getPopularMovies();
      set({ movies: data.results, loading: false });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: "Gagal memuat data film", loading: false });
      }
    }
  },
}));

export default useMovieStore;
