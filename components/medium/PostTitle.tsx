import { Box, Text } from '@chakra-ui/react';
import { CoverImage } from '../small/CoverImage';

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
      <Text textStyle={'p'} fontSize={'2.4em'} fontWeight={'bold'}>
        {title}
      </Text>
      <Text textStyle={'p'}>{date}</Text>
      <CoverImage
        coverImagePath={coverImagePath}
        coverImagePhotographer={coverImagePhotographer}
        coverImageSrcUrl={coverImageSrcUrl}
      />
    </Box>
  );
};
