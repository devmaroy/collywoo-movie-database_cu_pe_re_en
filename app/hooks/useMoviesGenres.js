import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

const useMovieGenres = () => {
  const [genres, setGenres] = useLocalStorage('genres', []);
  const genresUrl = `${process.env.API_URL}/genre/movie/list?api_key=${process.env.API_KEY}`;

  useEffect(() => {
    const genresExist = genres && genres.length > 0;

    if (!genresExist) {
      const fetchData = async () => {
        try {
          const genresResponse = await fetch(genresUrl);
          const { genres: genresData } = await genresResponse.json();

          setGenres(genresData);
        } catch (error) {
          setGenres([]);
        }
      };

      fetchData();
    }
  }, [genres, genresUrl, setGenres]);

  return [genres, setGenres];
};

export default useMovieGenres;
