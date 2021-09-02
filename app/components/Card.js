import React from 'react';
import slugify from 'slugify';
import dateFormat from 'dateformat';
import { number, string, bool, arrayOf, shape } from 'prop-types';

const Card = ({
  image,
  title,
  overview,
  date,
  isAdult,
  voteAverage,
  genres,
}) => (
  <div className="relative bg-primary-800 rounded-md transition-all duration-300 ease-in-out transform hover:-translate-y-2">
    <a
      href={`/movie/${slugify(title, { lower: true })}`}
      className="flex flex-col h-full"
    >
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="w-full h-96 bg-cover rounded-md rounded-b-none"
      >
        <div className="bg-primary-900 bg-opacity-30 h-full">
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
          <div className="mt-6">
            {genres.map(({ id, name }) => (
              <span
                key={id}
                className="mt-2 mr-2 bg-blue-900 p-2 inline-block font-bold text-white text-xs rounded-md uppercase"
              >
                {name}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  </div>
);

Card.propTypes = {
  image: string.isRequired,
  title: string.isRequired,
  overview: string,
  date: string.isRequired,
  voteAverage: number.isRequired,
  isAdult: bool,
  genres: arrayOf(shape({ id: number.isRequired, name: string.isRequired })),
};

export default Card;
