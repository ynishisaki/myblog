import { Box } from '@chakra-ui/react';

export const PostBody = ({ content }: { content: string }) => {
  return <Box className='znc' dangerouslySetInnerHTML={{ __html: content }} />;
};
