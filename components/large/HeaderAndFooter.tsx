import React from 'react';
import { Header } from '../medium/Header';
import { Footer } from '../medium/Footer';

export const HeaderAndFooter = ({ children }: { children: React.ReactElement }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
