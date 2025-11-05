import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { movieApi } from "../midleware/movie.api";
import { BsCalendar3 } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import { IoTimer } from "react-icons/io5";
import Navbar from "../components/Navbar";
import TrailerMovie from "../components/TrailerMovie";

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
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (id) {
          const res = await movieApi.getMovieDetails(Number(id));
          setMovie(res.data);

          // Fetch trailer video
          const trailerRes = await movieApi.getMovieVideos(Number(id));
          const youtubeTrailer = trailerRes.data.results.find(
            (vid: any) =>
              vid.site === "YouTube" &&
              (vid.type === "Trailer" || vid.type === "Teaser")
          );
          if (youtubeTrailer) setTrailerKey(youtubeTrailer.key);
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
    return (
      <p className="text-white text-center mt-10">Film tidak ditemukan.</p>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      {trailerKey ? (
        <iframe
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}&controls=0&showinfo=0&modestbranding=1`}
          title="Movie Trailer"
          allow="autoplay; fullscreen"
        ></iframe>
      ) : (
        // Fallback jika tidak ada trailer
        <div
          className="absolute inset-0 opacity-20 blur-3xl"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      )}

      {/* Konten utama */}
      <div className="relative z-10 p-6 lg:p-12 bg-gradient-to-t from-black/90 via-black/60 to-transparent min-h-screen">
        {/* Tombol kembali */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-md transition-all z-20"
        >
          ← Kembali
        </button>

        <div className="flex lg:flex-row items-start lg:items-center gap-10 mt-20">
          {/* Poster */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
            className="w-full max-w-sm rounded-2xl shadow-2xl border border-gray-700"
          />

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight drop-shadow-md">
              {movie.original_title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-6">
              <div className="flex items-center gap-2">
                <BsCalendar3 className="text-[#ffb703]" />
                <span>{movie.release_date}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="text-[#ffd700]" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-2">
                <IoTimer className="text-[#06d6a0]" />
                <span>{movie.runtime} menit</span>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed max-w-2xl drop-shadow-sm">
              {movie.overview}
            </p>
          </div>
        </div>

        <TrailerMovie trailerKey={trailerKey!} />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
