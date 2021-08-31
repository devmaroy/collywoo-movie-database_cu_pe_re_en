import React, { useState, useEffect } from 'react';

const Loading = ({ text = 'Loading', speed = 300 }) => {
  const [content, setContent] = useState(text);

  useEffect(() => {
    const id = window.setInterval(() => {
      return content === `${text}...`
        ? setContent(text)
        : setContent((currentContent) => currentContent + '.');
    }, speed);

    return () => window.clearInterval(id);
  }, [content]);

  return <div className="text-white text-2xl">{content}</div>;
};

export default Loading;
