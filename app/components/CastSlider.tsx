"use client";

import React, { useState, useEffect, useRef } from "react";

// Define the Cast type
interface Cast {
  id: number;
  name: string;
  profile_path: string;
}

const CastSlider: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [castsData, setCastsData] = useState<Cast[]>([]);
  const itemWidth = 240; 

  // Fetch Cast Data from TMDB API
  useEffect(() => {
    const getFeaturedCastsData = async () => {
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
          "https://api.themoviedb.org/3/person/popular?language=en-US&page=1",
          options
        );
        const data = await response.json();
        setCastsData(data.results || []);
        // console.log(data.results) 
      } catch (error) {
        console.error("Failed to fetch cast data:", error);
      }
    };

    getFeaturedCastsData();
  }, []);

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
    if (carouselRef.current) {
      const maxScroll =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      setScrollPosition((prev) => Math.min(prev + itemWidth, maxScroll));
    }
  };

  if (castsData.length == 0) {
    return <h1>Data fetching...</h1>;
  }

  return (
    <div className="container p-10 overflow-hidden relative">
      <div className="flex justify-between mb-4">
        <p className="text-2xl pl-10 font-bold">Featured Casts</p>
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
          {castsData.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-[240px]">
              <img
                src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                alt={item.name}
                className="object-cover w-full h-80 "
              />
              <p className="text-sm font-bold mt-1">{item.name}</p>
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

export default CastSlider;
