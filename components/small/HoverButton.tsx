import { Button } from '@chakra-ui/react';

type ChildCompProps = {
  children: React.ReactElement;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  areaLabel: string;
};

export const HoverButton = (props: ChildCompProps) => {
  return (
    <Button
      onClick={(e) => props.onClick(e)}
      bg={'#EFECE7'}
      borderRadius={'3xl'}
      aria-label={props.areaLabel}
      textStyle={'h1'}
      position={'relative'}
      zIndex={1}
      _hover={{ boxShadow: 'lg' }}
    >
      {props.children}
    </Button>
  );
};
