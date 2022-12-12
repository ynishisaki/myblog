import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  components: {
    Button: {
      // ボタン押したときの青枠を消す
      baseStyle: {
        _focus: {
          boxShadow: 'None',
        },
      },
      variants: {
        // （スマホサイズのみ）ボタンホバー時の影を消す
        solid: () => ({
          '@media screen and (max-width: 767px)': {
            _hover: {
              boxShadow: 'None',
            },
          },
        }),
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
    header: {
      px: '10px',
      alignItems: 'center',
      display: 'flex',
      position: 'fixed',
      top: '0px',
      height: { base: '50px', md: '70px' },
      width: '100vw',
      bgColor: '#EFECE7', // medium color
      zIndex: 'banner', //1200
    },
    blogTitle: {
      width: '100%',
      position: 'absolute',
      color: '#4d5156',
      fontFamily: '"Kosugi Maru", sans-serif',
      fontSize: { base: 'lg', md: '2xl' },
      fontWeight: 'bold',
    },
    base: {},
    home_base: {
      mt: { base: '50px', md: '70px' },
      p: { base: '3% 5%', md: '3% 20%' },
      width: { md: '100%' },
    },
    home_display: {
      p: { base: '3%', md: '2%' },
      my: '5',
    },
    post_base: {
      pt: { base: '50px', md: '70px' },
      width: { base: '100%' },
    },
    post_display: {
      p: { base: '3%' },
      m: { base: '0% 5%', md: '0% 20%' },
      bg: '#FAF7F2', // high color
    },
    footer: {
      position: 'relative',
      bg: '#E5E3DE', // low color
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
      borderTop: '1px solid',
      borderColor: 'gray.300',
    },
  },
});
