import { Box, Text } from '@chakra-ui/react';
import { PostCoverImage } from '../small/PostCoverImage';

export const PostTitle = ({
  title,
  date,
  coverImagePath,
  coverImagePhotographer,
  coverImageSrcUrl,
  category,
}: {
  title: string;
  date: string;
  coverImagePath: string;
  coverImagePhotographer: string;
  coverImageSrcUrl: string;
  category: string;
}) => {
  return (
    <Box mb={50} alignItems={'center'}>
      <Text textStyle={'p'}>{category}</Text>
      <Text textStyle={'p'} fontSize={'4xl'} fontWeight={'bold'} lineHeight={1.3}>
        {title}
      </Text>
      <Text textStyle={'p'}>{date}</Text>
      <PostCoverImage
        coverImagePath={coverImagePath}
        coverImagePhotographer={coverImagePhotographer}
        coverImageSrcUrl={coverImageSrcUrl}
      />
    </Box>
  );
};
