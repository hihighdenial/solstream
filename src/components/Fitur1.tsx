import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Tambahkan import navigate
import { movieApi } from "../midleware/movie.api"; // pastikan path-nya benar
import type { AxiosResponse } from "axios";

interface MuvieResult {
  backdrop_path: string;
  id: number;
  original_title: string;
  poster_path: string;
  overview: string;
  original_language: string;
}

const Fitur1 = () => {
  const navigate = useNavigate();
  const [filmIndonesia, setFilmIndonesia] = useState<MuvieResult[]>([]);
  const [filmGlobal, setFilmGlobal] = useState<MuvieResult[]>([]);

  // Ambil data film Indonesia & Global
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [indonesiaRes, globalRes]: [AxiosResponse, AxiosResponse] =
          await Promise.all([
            movieApi.getIndonesianMovies(),
            movieApi.getGlobalMovies(),
          ]);

        setFilmIndonesia(indonesiaRes.data.results);
        setFilmGlobal(
          globalRes.data.results.filter(
            (item: MuvieResult) =>
              item.original_language !== "id" &&
              !/Indonesia|Jakarta|Surabaya|KKN|Dilan|Yogyakarta|Cinta/i.test(
                item.original_title
              )
          )
        );
      } catch (error) {
        console.error("Gagal mengambil data film:", error);
      }
    };

    fetchData();
  }, []);

  const renderCard = (item: MuvieResult, index: number) => (
    <div
      key={index}
      className={`relative w-72 h-96 rounded-xl overflow-hidden shadow-lg group transition-transform duration-500 ease-in-out
                hover:-translate-y-4 hover:scale-105 hover:z-20`}
      style={{ transform: `translateX(-${index * 40}px)` }} // Efek tumpukan horizontal
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={item.original_title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10">
        <div>
          <h2 className="text-white text-lg font-semibold mb-2">
            {item.original_title}
          </h2>
          <p className="text-white text-sm line-clamp-5">{item.overview}</p>
        </div>
        <button
          className="btn btn-primary btn-sm w-full z-20"
          onClick={() => navigate(`/movie/${item.id}`)} // Pindah ke halaman detail
        >
          Watch
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-base-300 min-h-screen p-6 space-y-10">
      {/* Section: Film Indonesia */}
      <div>
        <div className="overflow-x-auto relative">
          <h1 className="font-bold text-white mb-4 z-30 relative bg-base-300 w-fit px-2 py-1 rounded text-[28px]">
            Film Indonesia
          </h1>
          <div className="relative flex flex-row w-max pb-4 pt-8">
            {filmIndonesia.length > 0 ? (
              filmIndonesia.map(renderCard)
            ) : (
              <p className="text-white">
                Tidak ada film Indonesia yang ditemukan.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Section: Film Global */}
      <div>
        <div className="overflow-x-auto relative">
          <h1 className="font-bold text-white mb-4 z-30 relative bg-base-300 w-fit px-2 py-1 rounded text-[28px]">
            Film Global
          </h1>
          <div className="flex flex-row gap-4 w-max pb-4 pt-8">
            {filmGlobal && filmGlobal.length > 0 ? (
              filmGlobal.map(renderCard)
            ) : (
              <p className="text-white">Tidak ada film global yang ditemukan.</p>
            )}
          </div>
        </div>
      </div>
    </div>

    
  );
};

export default Fitur1;

