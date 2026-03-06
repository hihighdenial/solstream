import React from "react";
import { MdMovieFilter } from "react-icons/md";

interface TrailerMovieProps {
  trailerKey: string; // YouTube video key
}

const TrailerMovie: React.FC<TrailerMovieProps> = ({ trailerKey }) => {
  if (!trailerKey) return null;

  return (
    <div className="flex w-full bg-[#13071e]">
      <section className="mt-16 w-full flex flex-col items-center text-center">
        {/* Judul Trailer */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <MdMovieFilter className="text-3xl text-[#ffb703] drop-shadow-md" />
          <h2 className="text-3xl font-extrabold tracking-wide text-white drop-shadow-sm">
            Official Trailer
          </h2>
        </div>

        {/* YouTube Embed */}
        <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-gray-700 shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,183,3,0.25)] transition-all duration-500">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${trailerKey}?rel=0&showinfo=0&modestbranding=1`}
            title="Movie Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default TrailerMovie;
