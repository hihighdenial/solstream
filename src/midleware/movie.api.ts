// movie.api.ts
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_URL,
});

instance.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_REACT_API_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interface hasil film individual
export interface MuvieResult {
  backdrop_path: string;
  id: number;
  original_title: string;
  poster_path: string;
  overview: string;
}

// Interface respons daftar film
export interface Movie {
  page: number;
  total_pages: number;
  total_results: number;
  results: MuvieResult[];
}

// Method API
const movieApi = {
  getMovieDetails: (movieId: number) =>
    instance({
      method: "GET",
      url: `3/movie/${movieId}?language=en-US`,
    }),

  getGlobalMovies: () =>
    instance({
      method: "GET",
      url: "3/movie/popular?language=en-US&page=1",
    }),

  getIndonesianMovies: () =>
    instance({
      method: "GET",
      url: "3/discover/movie?language=id-ID&region=ID&sort_by=popularity.desc&with_origin_country=ID&page=1",
    }),

  // 🔥 Tambahan baru untuk ambil video trailer
  getMovieVideos: (movieId: number) =>
    instance({
      method: "GET",
      url: `3/movie/${movieId}/videos?language=en-US`,
    }),

  searchMovies: (query: string) =>
    instance({
      method: "GET",
      url: `3/search/movie?query=${encodeURIComponent(
        query
      )}&language=en-US&page=1&include_adult=false`,
    }),

  getPopularMovies: async (): Promise<Movie> => {
    try {
      const [globalRes, indoRes] = await Promise.all([
        movieApi.getGlobalMovies(),
        movieApi.getIndonesianMovies(),
      ]);

      const combinedResults = [
        ...(globalRes.data?.results || []),
        ...(indoRes.data?.results || []),
      ];

      return {
        page: 1,
        total_pages: 1,
        total_results: combinedResults.length,
        results: combinedResults,
      };
    } catch (error) {
      console.error("Gagal mengambil gabungan film:", error);
      throw error;
    }
  },
};

export { movieApi };
