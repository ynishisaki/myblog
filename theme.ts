import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: 'None',
        },
      },
    },
  },

  textStyles: {
    p: {
      color: '#4d5156',
      // m: '8px 0',
      // fontSize: '16px',
      my: { base: '5' },
      fontSize: { base: 'sm', md: 'md' },
      fontWeight: 'normal', //400
      fontFamily: 'メイリオ, "Hiragino Sans", "ＭＳ Ｐゴシック", "Helvetica W01", sans-serif',
    },
    h1: {
      color: '#4d5156',
      // margin: '16px 0',
      fontSize: '16px',
      fontWeight: 'bold', //700
      fontFamily: 'メイリオ, "Hiragino Sans", "ＭＳ Ｐゴシック", "Helvetica W01", sans-serif;',
    },
    h2: {
      color: '#4d5156',
      // margin: '16px 0',
      // fontSize: '24px',
      fontSize: '2xl',
      fontWeight: 'bold',
      fontFamily: 'メイリオ, "Hiragino Sans", "ＭＳ Ｐゴシック", "Helvetica W01", sans-serif;',
      lineHeights: '1',
    },
  },

  layerStyles: {
    base: {},
    home_base: {
      bg: '#EFECE7',
      mt: { base: '50px', md: '70px' },
      p: { base: '3% 5%', md: '3% 20%' },
      width: { md: '100%' },
    },
    home_display: {
      p: { base: '3%', md: '2%' },
      my: '5',
    },
    post_base: {
      bg: '#EFECE7',
      mt: { base: '50px', md: '70px' },
      width: { base: '100%' },
    },
    post_display: {
      p: { base: '3%' },
      m: { base: '0% 5%', md: '0% 20%' },
      bg: '#FAF7F2',
    },
    header: {
      px: '10px',
      alignItems: 'center',
      display: 'flex',
      position: 'fixed',
      top: '0px',
      height: { base: '50px', md: '70px' },
      width: '100vw',
      bgColor: '#EFECE7',
      zIndex: 'banner', //1200
    },
    blogLogo: {
      left: 'calc(50vw - 80px)',
      top: '5px',
      position: 'absolute',
      width: '160px',
      borderRadius: '10px',
    },
    blogTitle: {
      width: '100%',
      position: 'absolute',
      color: '#4d5156',
      fontFamily: '"Kosugi Maru", sans-serif',
      fontSize: { base: 'lg', md: '2xl' },
      fontWeight: 'bold',
    },
    footer: {
      position: 'relative',
      bg: '#E5E3DE',
      // bg: 'white',
      borderTop: '1px solid #eaeaea',
      flexDirection: 'column',
      display: 'flex',
      flex: '1',
      p: '1rem 0',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 'stickey', //1100
    },
    profile: {
      m: '30px',
    },
    borderLine: {
      w: '80%',
      mb: '30px',
      borderTop: '1px solid',
      borderColor: 'gray.300',
    },
  },
});
