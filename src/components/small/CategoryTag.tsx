import { Tag } from '@chakra-ui/react';

interface Props {
  label: string;
  color?: string;
}

export default function CategoryTag(props: Props) {
  return (
    <Tag colorScheme={props.color} size={'md'} borderRadius='full' variant='solid' my={2}>
      {props.label}
    </Tag>
  );
}
