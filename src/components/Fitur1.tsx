import { useEffect} from "react";
import store from "../store/movie.store";

interface MuvieResult {
  backdrop_path: string;
  id: number;
  original_title: string;
  poster_path: string;
  overview: string;
}

const Fitur1 = () => {
  const { setMovies, movies } = store();

  useEffect(() => {
    setMovies();
  }, []);

  return (
    <div className="flex items-center justify-center p-4 flex-wrap gap-4 w-full ">
      {movies?.map((item: MuvieResult, index: number) => (
        <div className="card bg-base-100 w-96 shadow-sm " key={index}>
          <figure>
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.original_title}</h2>
            <p>{item.overview}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Watch</button>
            </div>
          </div>
        </div>
      ))}

      {/* Example of a static card */}
    </div>
  );
};

export default Fitur1;
