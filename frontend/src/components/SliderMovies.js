import React, { useState, useRef, useContext, useEffect } from "react";
import Slider from "react-slick";
import Movie from "./Movie";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import NetflixProvider from "@/context/NetflixContext";
import axios from "axios";
import { IconButton } from "@mui/material";
import { NetflixContext } from "@/context/NetflixContext";
function SliderMovies({ title, genre }) {
  const { api, setCurrentSlide, currentSlide } =
    useContext(NetflixContext);
    const [photoMovies, setPhotoMovies] = useState([]);
    const [data, setData] = useState([]);
    const sliderRef = useRef(null);

  const handleNextClick = () => {
    if (sliderRef.current) {
      setCurrentSlide(currentSlide + 6);
      sliderRef.current.slickNext();
    }
  };

  const handlePrevClick = () => {
    if (sliderRef.current) {
      setCurrentSlide(currentSlide - 6);
      sliderRef.current.slickPrev();
    }
  };
  const api_key = api;

  useEffect(() => {
    async function getMovies() {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genre}`
        );
        const response = await res.data;
        setData(response.results);
      } catch (error) {
        console.log(error);
      }
    }
    getMovies();
  }, [genre]);

  

  const settings = {
    dots: true,
    arrows: false,
    initialSlide: currentSlide,
    afterChange: (newIndex) => setCurrentSlide(newIndex),
    infinite: true,
    speed: 1200,
    slidesToShow: 4,
    slidesToScroll: 6,
  };

  //must creat an array of paths strings which will be passed down here
  //these strings then are passed down
  //now i have acess to a
  // initialize photoMovies as an empty array

  // map the poster paths to photoMovies array in the first useEffect
  useEffect(() => {
    setPhotoMovies(data.map((item) => item.poster_path));
  }, [data]);

 

  useEffect(() => {
    const posterPaths = data
      .filter((item) => item.poster_path !== undefined)
      .map((item) => item.poster_path);
    setPhotoMovies(posterPaths);
  }, []);

  return (
    <div>
      <h3 className="title-banner">{title}</h3>

      <Slider {...settings} ref={sliderRef}>

        {photoMovies.map((posterPath, index) => (
          <Movie posterPath={posterPath} key={index} />
        ))}

      </Slider>

      <div className="buttons">
        <IconButton onClick={handlePrevClick} className="buttonleft">
          <ArrowLeftIcon className="arrowleft" />
        </IconButton>

        <IconButton onClick={handleNextClick} className="buttonright">
          <ArrowRightIcon className="arrowright" />
        </IconButton>
      </div>
    </div>
  );
}

export default SliderMovies;
