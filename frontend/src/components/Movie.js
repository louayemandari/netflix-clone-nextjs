

import React, { useState, useEffect,useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import YouTube from 'react-youtube';
import { NetflixContext } from '@/context/NetflixContext';

function Movie({ posterPath }) {
  const [selectedGenre, setSelectedGenre] = useState({});
  const [movies, setMovies] = useState([]);
  const [youtubeKey, setYoutubeKey] = useState('');
  const [open, setOpen] = useState(false);
  const {api} = useContext(NetflixContext)
; // Make sure you have the correct API key here

  const genres = [
    { id: 28, name: 'Action' },
    // Add other genres here...
  ];

  useEffect(() => {
    fetchMoviesAndTrailer();
  }, [selectedGenre]); // Re-fetch movies and trailer when the selectedGenre changes

  const fetchMoviesAndTrailer = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${api}&with_genres=${selectedGenre.id}`
      );
      const data = await response.json();
      const movieIds = data.results.map((movie) => movie.id);
      setMovies(movieIds);

      if (movieIds.length > 0) {
        const trailerResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieIds[0]}/videos?api_key=${api}`
        );
        const trailerData = await trailerResponse.json();
        if (trailerData.results.length > 0) {
          setYoutubeKey(trailerData.results[0].key);
        } else {
          setYoutubeKey(''); // No trailer available, set an empty string
        }
      } else {
        console.log('No movies found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const image_url = posterPath ? `https://image.tmdb.org/t/p/w780${posterPath}` : '';
  // Replace with the YouTube key you want to use

  return (
    <div className="cursor-pointer hover:scale-110 transition-all duration-150">
      <Modal open={open} onClose={handleClose} BackdropProps={{ onClick: handleClose }}>
        <Box>
          <div className="flex flex-col justify-center mt-10 items-center p-6 shadow-lg bg-white rounded-lg">
            {youtubeKey ? <YouTube videoId={youtubeKey} /> : <Typography>No trailer available.</Typography>}
          </div>
        </Box>
      </Modal>
      <img src={image_url} alt="Movie Poster" className="" onClick={handleOpen} />
      {!posterPath && <div className="no-image">No image available</div>}
    </div>
  );
}

export default Movie;
