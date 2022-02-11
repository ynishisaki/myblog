import { useEffect, useRef } from 'react';

export const Button = ({ buttonName }: { buttonName: string }) => {
  const text = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    console.log(text.current!.innerText);
    // debugger;
  });

  return (
    <>
      <button onClick={() => console.log('button')}>{buttonName}</button>
      <p ref={text}>before</p>
    </>
  );
};
