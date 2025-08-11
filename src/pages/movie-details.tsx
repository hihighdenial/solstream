import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieApi } from "../midleware/movie.api";

interface MovieDetails {
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  runtime: number;
}

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (id) {
          const res = await movieApi.getMovieDetails(Number(id));
          setMovie(res.data);
        }
      } catch (error) {
        console.error("Gagal mengambil detail film:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <p className="text-white text-center mt-10">Loading...</p>;
  }

  if (!movie) {
    return <p className="text-white text-center mt-10">Film tidak ditemukan.</p>;
  }

  return (
    <div className="w-full min-h-screen bg-base-200 text-white p-6">
      <button className="btn btn-secondary mb-6" onClick={() => navigate(-1)}>
        Kembali
      </button>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.original_title}
          className="rounded-xl shadow-lg max-w-sm"
        />

        {/* Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{movie.original_title}</h1>
          <p className="mb-2">📅 Rilis: {movie.release_date}</p>
          <p className="mb-2">⭐ Rating: {movie.vote_average.toFixed(1)}</p>
          <p className="mb-2">⏳ Durasi: {movie.runtime} menit</p>
          <p className="mt-4">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
