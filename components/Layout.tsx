import { Box, IconButton, Image, ListItem, UnorderedList } from '@chakra-ui/react';
import { RiHome2Line } from 'react-icons/ri';
import styles from '../styles/Home.module.css';
import React from 'react';

export const Layout = ({ children }:{ children: React.ReactElement }) => {
  return (
    <>
      <Box
        className={styles.header}
        alignItems={'center'}
        display={'flex'}
        position={'fixed'}
        top={'0px'}
        height={'70px'}
        width={'100vw'}
        bg={'#f6f1eb'}
      >
        
        <IconButton
          color={'#4d5156'}
          marginLeft={'70px'}
          aria-label='Home button'
          icon={<RiHome2Line />}
          fontSize='25px'
          variant={'ghost'}
        />
        <Image
          left={'calc(50vw - 80px)'}
          top={'5px'}
          position={'absolute'}
          width={'160px'}
          borderRadius={'10px'}
          src={'/logo.png'}
        ></Image>
      </Box>

      {children}
      
      <footer className={styles.footer}>
        <div className={styles.footersub}>
          <h1 className={styles.profiletitle}>I'm もにょ</h1>
          <p className={styles.profiletext}>
            今年の目標は、
            <UnorderedList listStyleType={'square'}>
              <ListItem>ハーブを植える</ListItem>
              <ListItem>ブログを開設する</ListItem>
              <ListItem>脱毛を契約する</ListItem>
              <ListItem>泳げるようになる</ListItem>
              <ListItem>証券口座を開設する</ListItem>
            </UnorderedList>
          </p>
        </div>
      </footer>
    </>
  );
};
