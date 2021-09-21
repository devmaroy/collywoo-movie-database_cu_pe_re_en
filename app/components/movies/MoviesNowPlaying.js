import React, { useState, useEffect } from 'react';
import slugify from 'slugify';
import Layout from '../layout/Layout';
import LoadingSpinner from '../common/LoadingSpinner';
import Card from '../common/Card';
import Filter from '../common/filter/Filter';
import useMoviesGenres from '../../hooks/useMoviesGenres';
import useSetScrollPosition from '../../hooks/useSetScrollPosition';

const MoviesNowPlaying = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [genres] = useMoviesGenres([]);
  const [setScrollPosition] = useSetScrollPosition([movies]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const hasMovies = movies && movies.length !== 0;
  const nowPlayingUrl = `${process.env.API_URL}/movie/now_playing?api_key=${process.env.API_KEY}&page=${page}`;
  const slugifyOptions = {
    lower: true,
    strict: true,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Get movies
        const moviesResponse = await fetch(nowPlayingUrl);
        const { results: moviesData } = await moviesResponse.json();

        // Update state
        setIsLoading(false);
        setIsError(false);
        setMovies((currentMoviesData) => [...currentMoviesData, ...moviesData]);
      } catch (error) {
        // Update state
        setIsLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, [nowPlayingUrl]);

  const loadMore = () => {
    setScrollPosition(window.pageYOffset);
    setPage((currentPage) => currentPage + 1);
  };

  return (
    <Layout>
      <>
        {isError && <p>Sorry, something went wrong...</p>}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          !isError &&
          hasMovies && (
            <Filter data={movies} options={genres} defaultOption="All">
              {(filteredMovies, filtered) => (
                <>
                  {filteredMovies && filteredMovies.length !== 0 ? (
                    <>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredMovies.map((movie) => (
                          <Card
                            key={movie.id}
                            image={`${process.env.API_IMAGE_URL}${movie.poster_path}`}
                            imageLowRes={`${process.env.API_IMAGE_LOWRES_URL}${movie.poster_path}`}
                            id={movie.id}
                            to={`/movies/${movie.id}/${slugify(
                              movie.title,
                              slugifyOptions,
                            )}`}
                            title={movie.title}
                            overview={movie.overview}
                            isAdult={movie.adult}
                            voteAverage={movie.vote_average}
                            date={movie.release_date}
                            genres={genres
                              .filter((genre) =>
                                movie.genre_ids.includes(genre.id),
                              )
                              .splice(0, 3)}
                          />
                        ))}
                      </div>

                      {!filtered && (
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
                      )}
                    </>
                  ) : (
                    <p>No movies were found matching your selection.</p>
                  )}
                </>
              )}
            </Filter>
          )
        )}
      </>
    </Layout>
  );
};

export default MoviesNowPlaying;
