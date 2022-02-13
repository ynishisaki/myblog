// import markdownStyles from './markdown-styles.module.css';
import { Box } from '@chakra-ui/react';
// import 'zenn-content-css';

export const PostBody = ({ content }: { content: string }) => {
  return <Box className='znc' dangerouslySetInnerHTML={{ __html: content }} />;
};
