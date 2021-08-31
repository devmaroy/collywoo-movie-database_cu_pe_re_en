import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Loading from './Loading';
import Card from './Card';
import useLocalStorage from '../hooks/useLocalStorage';

const MoviesNowPlaying = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useLocalStorage('genres', []);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const nowPlayingUrl = `${process.env.API_URL}/movie/now_playing?api_key=${process.env.API_KEY}`;
  const genresUrl = `${process.env.API_URL}/genre/movie/list?api_key=${process.env.API_KEY}`;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const genresExist = genres && genres.length > 0;
        setIsLoading(true);

        // Check if we have genres
        if (!genresExist) {
          const genresResponse = await fetch(genresUrl);
          const { genres } = await genresResponse.json();
          setGenres(genres);
        }

        // We have genres so we need to get the movies only.
        const moviesResponse = await fetch(nowPlayingUrl);
        const { results: movies } = await moviesResponse.json();

        // Update state
        setIsLoading(false);
        setIsError(false);
        setMovies(movies);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };
    fetchData();
  }, []);

  if (isError) {
    return <p>Something went wrong...</p>;
  }

  return (
    <Layout>
      <>
        <h1 className="font-sans font-bold text-primaryOff-900 text-center text-5xl mb-6 border-white">
          Collywoo Movie Database
        </h1>

        <div className="border-primary-600 border-b mb-16 rounded-full" />

        {isLoading ? (
          <Loading />
        ) : movies && movies.length !== 0 ? (
          <div className="grid grid-cols-3 gap-10">
            {movies.map((movie) => (
              <Card
                key={movie.id}
                image={`${process.env.API_IMAGE_URL}${movie.poster_path}`}
                id={movie.id}
                title={movie.title}
                overview={movie.overview}
                isAdult={movie.adult}
                date={movie.release_date}
                genres={genres
                  .filter((genre) => movie.genre_ids.includes(genre.id))
                  .splice(0, 3)}
              />
            ))}
          </div>
        ) : (
          <p>Sorry, no movies found.</p>
        )}
      </>
    </Layout>
  );
};

export default MoviesNowPlaying;
