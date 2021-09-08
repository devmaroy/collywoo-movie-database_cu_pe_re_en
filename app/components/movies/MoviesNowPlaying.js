import React, { useState, useEffect, useLayoutEffect } from 'react';
import slugify from 'slugify';
import Layout from '../layout/Layout';
import LoadingSpinner from '../common/LoadingSpinner';
import Card from '../common/Card';
import useLocalStorage from '../../hooks/useLocalStorage';

const MoviesNowPlaying = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useLocalStorage('genres', []);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [position, setPosition] = useState(window.pageYOffset);
  const nowPlayingUrl = `${process.env.API_URL}/movie/now_playing?page=${page}&api_key=${process.env.API_KEY}`;
  const genresUrl = `${process.env.API_URL}/genre/movie/list?api_key=${process.env.API_KEY}`;
  const hasMovies = movies && movies.length !== 0;

  useEffect(() => {
    try {
      const fetchData = async () => {
        setIsLoading(true);
        const genresExist = genres && genres.length > 0;

        // Check if we have genres
        if (!genresExist) {
          const genresResponse = await fetch(genresUrl);
          const { genres: genresData } = await genresResponse.json();

          setGenres(genresData);
        }

        // We have genres so we need to get the movies only.
        const moviesResponse = await fetch(nowPlayingUrl);
        const { results: moviesData } = await moviesResponse.json();

        console.log(moviesData[0]);

        // Update state
        setIsLoading(false);
        setIsError(false);
        setMovies((currentMoviesData) => [...currentMoviesData, ...moviesData]);
      };

      fetchData();
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  }, [genres, genresUrl, nowPlayingUrl, setGenres]);

  useLayoutEffect(() => {
    window.scroll({ top: position });
  }, [movies, position]);

  const loadMore = () => {
    setPosition(window.pageYOffset);
    setPage((currentPage) => currentPage + 1);
  };

  return (
    <Layout>
      <>
        {isError && <p>Something went wrong...</p>}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          !isError &&
          hasMovies && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {movies.map((movie) => (
                  <Card
                    key={movie.id}
                    image={`${process.env.API_IMAGE_URL}${movie.poster_path}`}
                    imageLowRes={`${process.env.API_IMAGE_LOWRES_URL}${movie.poster_path}`}
                    id={movie.id}
                    to={`/movies/${movie.id}/${slugify(movie.title, {
                      lower: true,
                      strict: true,
                    })}`}
                    title={movie.title}
                    overview={movie.overview}
                    isAdult={movie.adult}
                    voteAverage={movie.vote_average}
                    date={movie.release_date}
                    genres={genres
                      .filter((genre) => movie.genre_ids.includes(genre.id))
                      .splice(0, 3)}
                  />
                ))}
              </div>

              <div className="mt-16 text-center">
                <button
                  type="button"
                  className="mt-2 mr-2 bg-blue-900 hover:bg-blue-800 
                  transition pl-6 pr-6 pb-4 pt-4 inline-block font-bold 
                  text-white text-xs rounded-md uppercase"
                  onClick={loadMore}
                >
                  Load More
                </button>
              </div>
            </>
          )
        )}
      </>
    </Layout>
  );
};

export default MoviesNowPlaying;
