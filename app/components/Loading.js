import React, { useState, useEffect } from 'react';
import { string, number } from 'prop-types';

const Loading = ({ text = 'Loading', speed = 300 }) => {
  const [content, setContent] = useState(text);

  useEffect(() => {
    const id = window.setInterval(() => {
      if (content === `${text}...`) {
        return setContent(text);
      }

      return setContent((currentContent) => `${currentContent}.`);
    }, speed);

    return () => window.clearInterval(id);
  }, [content, speed, text]);

  return <div className="text-white text-2xl">{content}</div>;
};

Loading.propTypes = {
  text: string,
  speed: number,
};

export default Loading;
