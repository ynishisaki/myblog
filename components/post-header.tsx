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
      <Text textStyle={'p'} fontSize={'2.4em'} fontWeight={'bold'}>
        {title}
      </Text>
      <Text textStyle={'p'}>{date}</Text>
      <Image
        my={5}
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
