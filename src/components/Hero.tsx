import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
//import { listed } from "../constant/listed";
import { movieApi } from "../midleware/movie.api"; // Sesuaikan path

interface MuvieResult {
  backdrop_path: string;
  id: number;
  original_title: string;
  poster_path: string;
  overview: string;
}

const Hero = () => {
  // const navigate = useNavigate();
  const [movies, setMovies] = useState<MuvieResult[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("right");

  // const handleClick = () => {
  //   navigate(listed.login);
  // };

  const customBackgroundImage = "/images/hero2.jpg";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await movieApi.getPopularMovies();
        const popularMovies = res.results.slice(0, 5); // Ambil 5 film
        setMovies(popularMovies);
      } catch (error) {
        console.error("Gagal mengambil data film:", error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection("right");
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000); // Setiap 5 detik

    return () => clearInterval(interval);
  }, [movies.length]);

  const currentMovie = movies[currentIndex];

  if (!currentMovie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200 text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="relative hero min-h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${customBackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Konten utama dengan animasi swipe */}
      <div className="relative z-10 hero-content flex-col lg:flex-row items-start gap-10 px-6 transition-transform duration-700 ease-in-out transform"
        style={{
          transform: slideDirection === "right" ? "translateX(0%)" : "translateX(100%)",
        }}
      >
        {/* Poster Film */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
            className="w-full max-w-sm rounded-lg shadow-2xl"
            alt={currentMovie.original_title}
          />
        </div>

        {/* Konten Info */}
        <div className="w-full lg:w-2/3 text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{currentMovie.original_title}</h1>
          <p className="py-4 lg:py-6 line-clamp-6 leading-relaxed">{currentMovie.overview}</p>
          <button className="btn btn-primary btn-sm w-full h-[48px] z-20 rounded-4xl text-[20px]">Watch</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
