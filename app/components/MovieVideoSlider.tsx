"use client";

import { useEffect, useState } from "react";

// Defining the Movie type
interface Movie {
  id: number;
  backdrop_path: string;
  title: string;
  overview: string;
  [key: string]: any;
}

export default function MovieVideoSlider() {
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const getFeaturedMovieData = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MGVmNmVkZWU1OGE4ZDQ1ZjcyOTI2MmI4NjJkMDgyNiIsIm5iZiI6MTcyNzE4MjUxMC4xNTg4NDIsInN1YiI6IjY2ZjJiNGIxYzIzNzI1OGU0YzI2ZjE3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tAdwtXU_CQNI-Kp3o6wdgJasuxyYO3jVWNKiVu9fApE",
          },
        };

        const response = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
          options
        );

        const data = await response.json();
        setMovieData(data.results.slice(0, 5) || []); // set movie data to movieData array
        // console.log(data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    getFeaturedMovieData();
  }, []);

  // Handle pagination click
  const handlePageClick = (index: number) => {
    setCurrent(index);
  };

  if (movieData.length == 0) {
    return <h1>Data fetching...</h1>;
  }

  return (
    <div className="relative">
      {/* Main movie display */}
      <div>
        <img
          key={movieData[current]?.id}
          src={`https://image.tmdb.org/t/p/w500/${movieData[current]?.backdrop_path}`}
          alt={movieData[current]?.title}
          className="w-full h-[500px]"
        />
      </div>

      {/* Movie details and pagination */}
      <div className="absolute inset-0 flex justify-between items-center mx-10 p-6">
        {/* Movie details */}
        <div className="flex flex-col gap-3 text-white ">
          <h1 className="text-4xl font-bold">{movieData[current]?.title}</h1>

          <div className="flex items-center text-xs font-semibold gap-10 ">
            <div className="flex gap-1">
              <img src={"/imdb.jpeg"} alt="imdb logo" className="h-4" />
              <p>{movieData[current]?.vote_average}/10</p>
            </div>
            <div>
              <p>🍎 {movieData[current]?.vote_count}</p>
            </div>
          </div>

          <div className="w-80 text-sm font-bold">
            <p>{movieData[current]?.overview.slice(0, 120)}...</p>
          </div>

          <button className="flex gap-3 items-center bg-[#BF123C] font-bold p-2 rounded-lg w-52 justify-center">
            <i className="fa-solid fa-circle-play"></i>
            <p>WATCH TRAILER</p>
          </button>
        </div>

        {/* Pagination */}
        <div className="font-bold flex gap-4 flex-col bg-gray-400 p-2 rounded-lg">
          {movieData.map((_, index) => (
            <div className="flex justify-center" key={index}>
              <p
                key={index}
                onClick={() => handlePageClick(index)}
                className={`cursor-pointer ${
                  current === index
                    ? "font-bold"
                    : "text-white font-semibold text-xs"
                }`}
              >
                {current === index ? `- ${index + 1}` : `${index + 1}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
