import React from 'react';
import { bool, number, string, arrayOf, shape } from 'prop-types';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import formatCurrency from '../../utils/formatCurrency';

const MoviePreview = ({ movie }) => {
  const hasGenres = movie.genres && movie.genres.length !== 0;
  const hasSpokenLanguages =
    movie.spoken_languages && movie.spoken_languages.length !== 0;

  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center mb-6 text-primaryOff-900 font-bold transition hover:text-blue-900"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>{' '}
        Back to home
      </Link>

      <div className="grid md:grid-cols-2 md:gap-14 lg:gap-24">
        <a href={movie.homepage}>
          <div
            style={{
              backgroundImage: `url(${process.env.API_IMAGE_URL}${movie.poster_path})`,
            }}
            className="w-full h-96 bg-cover rounded-md mb-10 md:mb-0"
          >
            <div className="bg-primary-900 bg-opacity-30 h-full" />
          </div>
        </a>

        <div>
          <h2 className="flex items-center text-4xl lg:text-5xl font-bold text-white mb-1">
            {movie.title}{' '}
            {movie.adult && (
              <span className="bg-danger ml-4 p-2 inline-block font-bold text-white text-xs rounded-md uppercase">
                adult
              </span>
            )}
          </h2>

          {movie.tagline && (
            <span className="italic text-primaryOff-900 text-md">{`"${movie.tagline}"`}</span>
          )}

          {movie.overview && (
            <p className="mt-6 text-primary-100 leading-8 text-lg">
              {movie.overview}
            </p>
          )}

          {hasGenres && (
            <ul className="mt-8">
              {movie.genres.map(({ id: genId, name: genName }) => (
                <li
                  key={genId}
                  className="mt-2 mr-2 bg-blue-900 p-2 inline-block font-bold text-white text-xs rounded-md uppercase"
                >
                  {genName}
                </li>
              ))}
            </ul>
          )}

          {movie.imdb_i && (
            <a
              href={`https://imdb.com/title/${movie.imdb_id}`}
              className="inline-flex items-center mt-12 transition hover:text-yellow-400 text-yellow-600"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              View on IMDb
            </a>
          )}
        </div>
      </div>
      <div className="mt-20">
        <ul className="flex flex-wrap items-center">
          {movie.status && (
            <li className="mb-6 md:mb-0 mr-6 md:text-center md:flex-1">
              <h3 className="text-2xl lg:text-3xl updpercase font-bold text-primary-100 mb-4">
                Status
              </h3>
              <span className="text-primaryOff-900 font-bold">
                {movie.status}
              </span>
            </li>
          )}
          {movie.release_date && (
            <li className="mb-6 md:mb-0 mr-6 md:text-center md:flex-1">
              <h3 className="text-2xl lg:text-3xl updpercase font-bold text-primary-100 mb-4">
                Released
              </h3>
              <span className="text-primaryOff-900 font-bold">
                {dateFormat(movie.release_date, 'mmmm dS yyyy')}
              </span>
            </li>
          )}
          {/* It can be zero so it will go through this condition and render number.
          We don't want it, so we need to either return null or use Boolean */}
          {Boolean(movie.budget) && (
            <li className="mb-6 md:mb-0 mr-6 md:text-center md:flex-1">
              <h3 className="text-2xl lg:text-3xl updpercase font-bold text-primary-100 mb-4">
                Budget
              </h3>
              <span className="text-primaryOff-900 font-bold">
                {formatCurrency(movie.budget)}
              </span>
            </li>
          )}
          {movie.vote_average && (
            <li className="mb-6 md:mb-0 mr-6 md:text-center md:flex-1">
              <h3 className="text-2xl lg:text-3xl updpercase font-bold text-primary-100 mb-4">
                Votes
              </h3>

              <span
                className="bg-yellow-400 p-2 font-bold text-primary-900 rounded-md uppercase"
                title="Average votes"
              >
                {movie.vote_average.toFixed(1)}
              </span>
            </li>
          )}
          {hasSpokenLanguages && (
            <li className="mb-6 md:mb-0 mr-6 md:text-center md:flex-1">
              <h3 className="text-2xl lg:text-3xl updpercase font-bold text-primary-100 mb-4">
                Languages
              </h3>
              <span className="text-primaryOff-900 font-bold">
                <ul>
                  {movie.spoken_languages.map(
                    ({ iso_639_1: langId, english_name: langName }) => (
                      <li
                        key={langId}
                        className="inline-block separator-pseudo"
                      >
                        {langName}
                      </li>
                    ),
                  )}
                </ul>
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

MoviePreview.propTypes = {
  movie: shape({
    adult: bool,
    budget: number,
    genres: arrayOf(shape({ id: number, name: string })),
    homepage: string,
    imdb_id: string,
    overview: string,
    poster_path: string.isRequired,
    release_date: string,
    spoken_languages: arrayOf(
      shape({
        english_name: string,
        iso_639_1: string,
        name: string,
      }),
    ),
    status: string,
    tagline: string,
    title: string.isRequired,
    vote_average: number,
  }).isRequired,
};

export default MoviePreview;
