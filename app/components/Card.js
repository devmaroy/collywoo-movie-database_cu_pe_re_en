import React from 'react';
import slugify from 'slugify';
import { number, string, bool, arrayOf, shape } from 'prop-types';

const Card = ({ image, title, overview, date, isAdult, genres }) => (
  <a href={`/movie/${slugify(title, { lower: true })}`}>
    <div className="relative bg-primary-800 rounded-md transition-all duration-300 ease-in-out transform hover:-translate-y-2">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="w-full h-96 bg-cover rounded-md rounded-b-none"
      >
        <div className="bg-primary-900 bg-opacity-40 h-full">
          {isAdult && (
            <span className="bg-danger p-2 inline-block font-bold text-white text-xs absolute top-4 right-4 rounded-md uppercase">
              adult
            </span>
          )}

          {date}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-xl text-white mb-2">{title}</h3>
        <p className="m-0 text-primary-400">
          {overview
            ? `${overview.split(' ').splice(0, 12).join(' ')} ...`
            : 'We are working on a description for the movie.'}
        </p>

        {genres && genres.length !== 0 && (
          <div className="mt-6">
            {genres.map(({ id, name }) => (
              <span
                key={id}
                className="mt-2 mr-2 bg-blue-900 p-2 inline-block font-bold text-white text-xs absoldute todp-4 lefdt-4 rounded-md uppercase"
              >
                {name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  </a>
);

Card.propTypes = {
  image: string.isRequired,
  title: string.isRequired,
  overview: string,
  date: string.isRequired,
  isAdult: bool,
  genres: arrayOf(shape({ id: number.isRequired, name: string.isRequired })),
};

export default Card;
