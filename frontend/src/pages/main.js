import React, { useContext, useEffect } from "react";
import SuggestedMovies from "@/components/SuggestedMovies";
import SliderMovies from "@/components/SliderMovies";
import { NetflixContext } from "@/context/NetflixContext";
import Navbar from "@/components/Navbar";

const genreList = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War",
  "Western",
];

const App = () => {
  const { fetch, api, photoMovies, setPhotoMovies } = useContext(NetflixContext);

  const GENRE_ID = [
    28,
    12,
    16,
    35,
    80,
    18,
    10751,
    14,
    36,
    27,
    10402,
    9648,
    10749,
    878,
    10770,
    53,
  ];
  

  return (
    <div className="bg-black">
      <Navbar className='' />
      <div className="object-cover">
        {/* MAIN MOVIE */}
        {/* MOVIE SLIDER */}
        <SuggestedMovies />
        {genreList.map((genre, index) => (
          
          
          <>
           <h2 className="text-slate-50 mt-3 text-xl font-bold italic">{genre}</h2>
           <SliderMovies title={genre} genre={GENRE_ID[index]} key={index} />
          
          </>
        ))}
      </div>
    </div>
  );
};

export default App;
