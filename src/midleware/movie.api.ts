import axios from "axios";
import type { AxiosPromise } from "axios";

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

interface Movie {
  page: number;
  total_pages: number;
  total_results: number;
  results: MuvieResult[];
}

interface MuvieResult {
  backdrop_path: string;
  id: number;
  original_title: string;
  poster_path: string;
  overview: string;
}

const movieApi = {
  getMovie: () =>
    instance({
      method: "GET",
      url: "3/movie/popular?api_key=5f8c7d0e1c2a4b6f9d8e1c2a4b6f9d8e&language=en-US&page=1",
    }),
};

export { movieApi };
