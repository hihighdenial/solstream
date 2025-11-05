import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { listed } from "../constant/listed";

const Navbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // 🔍 Fetch data film berdasarkan query
  useEffect(() => {
    const fetchMovies = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      try {
        // Ganti URL API ini dengan API movie lo sendiri (misalnya TMDB)
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${query}`
        );
        const data = await res.json();
        setResults(data.results || []);
        setShowDropdown(true);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      }
    };

    const delayDebounce = setTimeout(fetchMovies, 400);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  // ⌨️ Submit form manual (Enter)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowDropdown(false);
    }
  };

  const handleSelect = (id: number) => {
    navigate(`/movie/${id}`);
    setShowDropdown(false);
  };

  return (
    <div className="navbar shadow-sm bg-[#13071e] relative z-50">
      {/* START */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <Link to={listed.home}>
              <li>
                <a>Homepage</a>
              </li>
            </Link>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>

      {/* CENTER */}
      <div className="navbar-center">
        <a className="flex items-center justify-center">
          <img
            src="/solstream-logo.png"
            alt="SolStream Logo"
            className="h-20 w-auto object-contain"
          />
        </a>
      </div>

      {/* END */}
      <div className="navbar-end gap-2 relative">
        {/* 🔍 SEARCH BAR */}
        <form
          onSubmit={handleSearch}
          className="form-control hidden sm:block w-36 md:w-64 relative"
        >
          <label className="input input-bordered flex items-center gap-2 bg-[#1e1b29] border-[#2c2440] focus-within:ring-2 focus-within:ring-violet-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              className="grow text-white bg-transparent outline-none"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
          </label>

          {/* 🧩 Dropdown hasil pencarian */}
          {showDropdown && results.length > 0 && (
            <div className="absolute mt-2 w-full bg-[#0f0b17] rounded-md shadow-lg border border-[#2b2240] max-h-80 overflow-y-auto z-50">
              {results.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleSelect(movie.id)}
                  className="flex items-center gap-3 p-2 hover:bg-[#1b132d] cursor-pointer transition"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                        : "https://via.placeholder.com/80x120?text=No+Image"
                    }
                    alt={movie.title}
                    className="w-12 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {movie.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-1">
                      {movie.release_date
                        ? movie.release_date.split("-")[0]
                        : "Unknown"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </form>

        {/* 🔔 NOTIFICATION ICON */}
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
