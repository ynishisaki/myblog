import React, { useEffect } from 'react';
import 'zenn-content-css';
import markdownHtml from 'zenn-markdown-html';
import { getStaticProps } from '../../pages';

export const PostContent = ({ content }: { content: string }) => {
  useEffect(() => {
    import('zenn-embed-elements');
  }, []);

  return (
    <div
      className='znc'
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};
