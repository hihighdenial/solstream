import React, { useEffect, useState } from "react";

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

const Fitur1 = () => {
  const [data, setData] = useState<Movie>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzdkYzRlYTk3ZjNjZDBkOGJhZDNhOWI5MDIyY2Y1NiIsIm5iZiI6MTY4NTI3ODkyMC4xNTIsInN1YiI6IjY0NzM1MGM4NWNkMTZlMDEzM2UxZTAzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OXNL_cAsd3ol12sSycnVM_TuWUZPYelS19Qn_ClK7fI",
            },
          }
        );
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="flex items-center justify-center p-4 flex-wrap gap-4 w-full ">
      {data?.results.map((item: MuvieResult, index: number) => (
        <div className="card bg-base-100 w-96 shadow-sm " key={index}>
          <figure>
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.original_title}</h2>
            <p>
              {item.overview}
            </p>
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
