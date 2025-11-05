import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { movieApi } from "../midleware/movie.api";
import { MdMovieFilter } from "react-icons/md";

interface MovieResult {
  backdrop_path: string;
  id: number;
  original_title: string;
  poster_path: string;
  overview: string;
}

const Banner = () => {
  const [movies, setMovies] = useState<MovieResult[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );
  const navigate = useNavigate();

  const customBackgroundImage = "/images/hero2.jpg";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await movieApi.getPopularMovies();
        const popularMovies = res.results.slice(0, 5); // Ambil 5 film populer
        setMovies(popularMovies);
      } catch (error) {
        console.error("Gagal mengambil data film:", error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setSlideDirection("right");
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 7000); // Ganti slide tiap 7 detik
    return () => clearInterval(interval);
  }, [movies.length]);

  const currentMovie = movies[currentIndex];

  if (!currentMovie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <section
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-center bg-cover transition-all duration-700"
      style={{ backgroundImage: `url(${customBackgroundImage})` }}
    >
      {/* Overlay hitam transparan */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-0"></div>

      {/* Konten utama */}
      <div
        className={`relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-10 px-6 md:px-12 lg:px-24 transition-all duration-700 ease-in-out ${
          slideDirection === "right"
            ? "animate-fadeInRight"
            : "animate-fadeInLeft"
        }`}
      >
        {/* Poster Film */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
            alt={currentMovie.original_title}
            className="w-full max-w-sm rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.5)] border border-gray-700 hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info Film */}
        <div className="w-full lg:w-2/3 text-white space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-md leading-tight">
            {currentMovie.original_title}
          </h1>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl line-clamp-6">
            {currentMovie.overview}
          </p>

          <button
            onClick={() => navigate(`/movie/${currentMovie.id}`)}
            className="group mt-6 flex items-center gap-3 bg-gradient-to-r from-[#ffb703] to-[#ff8800] hover:from-[#ffc933] hover:to-[#ff9900] text-black font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,183,3,0.6)]"
          >
            <MdMovieFilter className="text-xl transition-transform duration-300 group-hover:rotate-12" />
            <span className="tracking-wide">See For The Detail</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
