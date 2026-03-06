import { BsCalendar3 } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import { IoTimer } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface MovieDetails {
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  runtime: number;
}

interface MovieContentProps {
  movie: MovieDetails;
  trailerKey?: string | null;
}

const MovieContent: React.FC<MovieContentProps> = ({ movie, trailerKey }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen text-white overflow-hidden">
      {/* === Background Trailer atau Backdrop === */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {trailerKey ? (
          <iframe
            className="absolute inset-0 w-full h-full object-cover opacity-70 pointer-events-none transition-opacity duration-700"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}&controls=0&showinfo=0&modestbranding=1`}
            title="Movie Trailer Background"
            allow="autoplay; fullscreen"
          ></iframe>
        ) : (
          <div
            className="absolute inset-0 opacity-30 blur-sm transition-all duration-700"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        )}
        {/* Gradient overlay agar teks tetap terbaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      </div>

      {/* === Konten Film === */}
      <div className="relative z-10 p-6 lg:p-12 min-h-screen flex flex-col justify-center">
        {/* Tombol kembali */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 bg-[#13071e] hover:bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-md transition-all z-20"
        >
          ← Kembali
        </button>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 mt-20">
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
      </div>
    </div>
  );
};

export default MovieContent;
