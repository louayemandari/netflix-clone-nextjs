import React, { useState, useEffect } from 'react';

function SuggestedUnit({api}) {
  const [posterPath, setPosterPath] = useState('');
  const [movieName,setMovieName] = useState('')
  const [movieOverview,SetMovieOverview] = useState('')
  useEffect(() => {
    async function fetchRandomMovie() {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api}&sort_by=popularity.desc`);
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomMovie = data.results[randomIndex];
      setPosterPath(randomMovie.backdrop_path);
      setMovieName(randomMovie.title)
      
      SetMovieOverview(randomMovie.overview)
      
    }
    fetchRandomMovie();
  }, []);

  const image_url = posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : '';

  return (
    <div className="relative top-0 ">
    {posterPath ? (
      <div >
        <img src={image_url} className="relative z-0 " />
        <div className="absolute top-0 left-0 right-0 text-white">
          <h3>{movieName}</h3>
          <p>{movieOverview}</p>
        </div>
      </div>
    ) : null}
  </div>
  
  );
}

export default SuggestedUnit;
