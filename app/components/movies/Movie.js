import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import LoadingSpinner from '../common/LoadingSpinner';
import MoviePreview from './MoviePreview';

const Movie = () => {
  const { id } = useParams();
  const movieUrl = `${process.env.API_URL}/movie/${id}?api_key=${process.env.API_KEY}`;
  const [movie, setMovie] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const hasMovie = movie && Object.keys(movie).length !== 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const movieResponse = await fetch(movieUrl);
        const movieData = await movieResponse.json();

        // Check if something bad happend.
        if (movieData.status_code > 1) {
          throw new Error();
        }

        // Update state
        setIsLoading(false);
        setIsError(false);
        setMovie(movieData);
      } catch (error) {
        // Update state
        setMovie(undefined);
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, [movieUrl]);

  return (
    <Layout>
      {isError && <p>Something went wrong...</p>}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        !isError && hasMovie && <MoviePreview movie={movie} />
      )}
    </Layout>
  );
};

export default Movie;
