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
      bg={'#FAF7F2'}
      borderColor={'#f6f1eb'}
      borderRadius={'3xl'}
      aria-label={props.areaLabel}
      textStyle={'h1'}
      position={'relative'}
      zIndex={1}
      _hover={{ bg: '#fffcf7' }}
    >
      {props.children}
    </Button>
  );
};
