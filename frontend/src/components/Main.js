import React, { useContext, useEffect, useState } from "react";
import SliderMovies from "./SliderMovies";
import Header from "./Header";
import { NetflixContext } from "../../context/NetflixContext";
import axios from "axios";
import Movie from "./Movie";
import SuggestedMovies from "./SuggestedMovies";

function Main({ id }) {
  const { fetch, api, photoMovies, setPhotoMovies } =
    useContext(NetflixContext);

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
    "Western"
  ];
  

  return (
    <div>
      <Header id={id} />
      
      <SuggestedMovies/>
      {genreList.map((genre, index) => (
        <SliderMovies title={genre} genre={GENRE_ID[index]} key={index} />
      ))}
    </div>
  );
}

export default Main;
