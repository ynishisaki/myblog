import { Box } from '@chakra-ui/react';


export const Conteiner = ({ children }:{ children: React.ReactElement }) => {
  return (
      <Box
        mt={'70px'}
        height={'500px'}
        bg={'gray.100'}
        mx={'auto'}
        w={'100%'}
        px={'10%'}
        // display={'flex'}
      >
        {children}
      </Box>
  )
}