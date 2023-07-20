import React,{useContext} from 'react';
import { NetflixContext } from '@/context/NetflixContext';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SuggestedUnit from './SuggestedUnit';

function SuggestedMovies() {
    const { api} =
    useContext(NetflixContext);
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      
      <SuggestedUnit api={api} />
      <SuggestedUnit api={api}/>
      <SuggestedUnit api={api}/>
      <SuggestedUnit api={api}/>
      <SuggestedUnit api={api}/>
      <SuggestedUnit api={api}/>

       
      
    </Slider>
  );
}

export default SuggestedMovies;
