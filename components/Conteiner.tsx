import { Box } from '@chakra-ui/react';

export const Conteiner = ({ children }: { children: React.ReactElement }) => {
  return <Box layerStyle={'conteiner'}>{children}</Box>;
};
