import React, { useEffect } from 'react';
import 'zenn-content-css';
import markdownHtml from 'zenn-markdown-html';

export const PostContent = ({ content }: { content: string }) => {
  useEffect(() => {
    import('zenn-embed-elements');
  }, []);

  const html = markdownHtml(content);

  return (
    <div
      className='znc'
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};
