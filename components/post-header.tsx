import { Box, Text, Image } from '@chakra-ui/react';

export const PostHeader = ({
  title,
  date,
  coverImage,
}: {
  title: string;
  date: string;
  coverImage: string;
}) => {
  return (
    <Box mb={50}>
      <Text>{title}</Text>
      <Text>{date}</Text>
      <Image
        fit={'cover'}
        boxSize={'100%'}
        objectFit={'cover'}
        // borderRadius={'1rem'}
        src={coverImage}
        alt='coverimage'
      />
    </Box>
  );
};
