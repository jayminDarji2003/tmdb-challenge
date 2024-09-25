"use client";

import React, { useState, useEffect, useRef } from "react";

// Defining the Movie types
interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

const MovieSlider: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [maxScroll, setMaxScroll] = useState<number>(0); //used to Track max scroll
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const itemWidth = 240; 

  // Fetch movie data from TMDB API
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
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          options
        );
        const data = await response.json();
        setMovieData(data.results || []);
        // console.log(data.results); 
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    getFeaturedMovieData();
  }, []);

  // Update maxScroll whenever the movieData or carouselRef changes
  useEffect(() => {
    if (carouselRef.current) {
      const updateMaxScroll = () => {
        const max =
          carouselRef.current!.scrollWidth - carouselRef.current!.clientWidth;
        setMaxScroll(max);
      };
      updateMaxScroll();
      window.addEventListener("resize", updateMaxScroll); // Handle window resize
      return () => window.removeEventListener("resize", updateMaxScroll);
    }
  }, [movieData]);

  // Handle Carousel Scroll
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [scrollPosition]);

  const handlePrevClick = (): void => {
    setScrollPosition((prev) => Math.max(prev - itemWidth, 0));
  };

  const handleNextClick = (): void => {
    setScrollPosition((prev) => Math.min(prev + itemWidth, maxScroll));
  };

  if (movieData.length == 0) {
    return <h1>Data fetching...</h1>;
  }

  return (
    <div className="container p-10 overflow-hidden relative">

      <div className="flex justify-between mb-4">
        <p className="text-2xl pl-14 font-bold">Featured Movies</p>
        <div className="flex items-center gap-1 text-red-500 text-sm font-bold pr-10 hover:cursor-pointer">
          <p>See more</p>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Left arrow button */}
        <button onClick={handlePrevClick} className="text-3xl mr-5">
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex items-center gap-8 overflow-x-hidden p-4 relative flex-grow"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {movieData.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-[240px]">
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                  alt={item.title}
                  className="h-80 w-60 object-cover"
                />
                <div className="absolute top-2 right-2 p-1 px-2 bg-gray-300 rounded-full">
                  <i
                    className="fa-solid fa-heart"
                    style={{ color: "white" }}
                  ></i>
                </div>
              </div>

              <div className="p-2 flex flex-col gap-2">
                <p className="text-xs font-bold text-gray-500">
                  {item.release_date} - Current
                </p>
                <p className="text-lg font-bold">{item.title}</p>

                <div className="flex items-center text-xs font-semibold justify-between">
                  <div className="flex gap-1">
                    <img src={"/imdb.jpeg"} alt="imdb logo" className="h-4" />
                    <p>{item.vote_average}/100</p>
                  </div>
                  <div>
                    <p>🍎 {item.vote_count}</p>
                  </div>
                </div>

                <p className="text-xs font-bold text-gray-500">
                  Action, Adventure, and Horror
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow button */}
        <button onClick={handleNextClick} className="text-3xl ml-5">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default MovieSlider;
