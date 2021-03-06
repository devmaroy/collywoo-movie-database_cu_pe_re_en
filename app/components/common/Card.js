import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import dateFormat from 'dateformat';
import { number, string, bool, arrayOf, shape } from 'prop-types';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Card = ({
  to = '/',
  image,
  imageLowRes,
  title,
  overview,
  date,
  isAdult,
  voteAverage,
  genres,
}) => (
  <div className="relative bg-primary-800 rounded-md transition-all duration-300 ease-in-out transform hover:-translate-y-2">
    <Link to={to} className="flex flex-col h-full">
      <div className="relative">
        <LazyLoadImage
          alt={title}
          src={image}
          width="100%"
          height="24rem"
          placeholderSrc={imageLowRes}
          wrapperClassName="bg-center-cover rounded-md rounded-b-none"
          className="w-full h-96 object-cover rounded-md rounded-b-none"
        />

        <div className="absolute top-0 bottom-0 left-0 right-0 bg-primary-900 bg-opacity-30 h-full">
          {isAdult && (
            <span className="bg-danger p-2 inline-block font-bold text-white text-xs absolute top-4 right-4 rounded-md uppercase">
              adult
            </span>
          )}
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between text-primary-400 text-sm mb-6">
          <span className="flex">
            <svg
              className="w-5 h-5 mr-2 text-primaryOff-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>

            <span title="Release date">{dateFormat(date, 'mmmm dS yyyy')}</span>
          </span>

          <span
            className="bg-yellow-400 p-2 font-bold text-primary-900 rounded-md uppercase"
            title="Average votes"
          >
            {voteAverage.toFixed(1)}
          </span>
        </div>
        <h3 className="font-bold text-xl text-white mb-2">{title}</h3>
        <p className="m-0 text-primary-400 flex-grow">
          {overview
            ? `${overview.substring(0, 72)} ...`
            : 'We are working on a description for the movie.'}
        </p>

        {genres && genres.length !== 0 && (
          <ul className="mt-6">
            {genres.map(({ id: genId, name: genName }) => (
              <li
                key={genId}
                className="mt-2 mr-2 bg-blue-900 p-2 inline-block font-bold text-white text-xs rounded-md uppercase"
              >
                {genName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  </div>
);

Card.propTypes = {
  to: string,
  image: string.isRequired,
  imageLowRes: string.isRequired,
  title: string.isRequired,
  overview: string,
  date: string.isRequired,
  voteAverage: number.isRequired,
  isAdult: bool,
  genres: arrayOf(shape({ id: number.isRequired, name: string.isRequired })),
};

export default Card;
