import React, { createContext, useState } from 'react';

export const NetflixContext = createContext({});

function NetflixProvider({ children }) {
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(false);
  const [id, setId] = useState(null)
  const [fetch, setFetch] = useState([0]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const api = ``
  const [selectedGenre, setSelectedGenre] = useState({});
  const [movies, setMovies] = useState([]);
  const [youtubeKey, setYoutubeKey] = useState('');
  
  
  const contextValue = { fetch,setFetch,api,currentSlide,setCurrentSlide,user, setUser, login, setLogin ,id,setId};
  
  return (
    <NetflixContext.Provider value={contextValue}>
      {children}
    </NetflixContext.Provider>
  );
}

export default NetflixProvider;
