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
      margin: '8px 0',
      fontSize: '16px',
      fontWeight: 'normal', //400
      fontFamily: 'メイリオ, "Hiragino Sans", "ＭＳ Ｐゴシック", "Helvetica W01", sans-serif',
      // lineHeight: '1.4',
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
      fontSize: '24px',
      fontWeight: 'bold',
      fontFamily: 'メイリオ, "Hiragino Sans", "ＭＳ Ｐゴシック", "Helvetica W01", sans-serif;',
    },
  },

  layerStyles: {
    base: {
      bg: 'yellow.100',
      // border: '2px solid',
      // borderColor: 'gray.500',
    },
    posts: {
      // mt: { base: '5%', md: '2%' },
      // mb: { base: '5%', md: '2%' },
      p: { base: '3%', md: '2%' },
    },
    display: {
      bg: '#f6f1eb',
      mt: '70px',
      p: { base: '3% 5%', md: '3% 20%' },
      width: { md: '100%' },
      color: '#4d5156',
    },
    header: {
      px: '10px',
      alignItems: 'center',
      display: 'flex',
      position: 'fixed',
      top: '0px',
      height: '70px',
      width: '100vw',
      bgColor: '#f6f1eb',
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
      left: 'calc(50vw - 80px)',
      position: 'absolute',
    },
    footer: {
      borderTop: '1px solid #eaeaea',
      flexDirection: 'column',
      display: 'flex',
      flex: '1',
      p: '1rem 0',
      bgColor: 'white',
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
