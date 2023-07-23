import { Button } from '@chakra-ui/react';

interface Props {
  icon?: React.ReactElement;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  areaLabel: string;
}

export const HoverButton = (props: Props) => {
  return (
    <Button
      leftIcon={props.icon}
      onClick={(e) => props.onClick(e)}
      bg={'#FAF7F2'} // high color
      borderRadius={'3xl'}
      aria-label={props.areaLabel}
      textStyle={'h3'}
      position={'relative'}
      zIndex={1}
      _hover={{ boxShadow: 'lg' }}
    >
      {props.children}
    </Button>
  );
};
