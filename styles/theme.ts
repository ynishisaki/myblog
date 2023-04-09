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
      my: { base: '1' },
      py: { base: '0' },
      fontSize: '16px',
      // fontWeight: 'thin', // 200
      fontWeight: 'light', // 300
      // fontSize: { base: 'sm', md: 'md' },
      // fontWeight: 'normal', //400
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
      lineHeight: '1',
    },
  },

  layerStyles: {
    header: {
      position: 'fixed',
      top: '0px',
      zIndex: 'banner', //1200
      height: { base: '50px', md: '70px' },
      width: '100vw',
      px: { base: '0', md: '20%' },
      display: 'flex',
      alignItems: 'center',
      bgColor: '#FAF7F2', // high color
    },
    blogTitle: {
      position: 'absolute',
      left: 'calc(50% - 3em)',
      color: '#4d5156',
      fontFamily: '"Kosugi Maru", sans-serif',
      fontSize: { base: 'lg', md: '2xl' },
      fontWeight: 'bold',
    },
    base: {},
    home_base: {
      mt: '40px',
      p: { base: '3% 5%', md: '3% 20%' },
      width: { md: '100%' },
    },
    home_display: {
      p: { base: '3%', md: '2%' },
      my: '5',
    },
    post_base: {
      pt: { base: '20px', md: '50px' },
      width: { base: '100%' },
    },
    post_display: {
      p: { base: '3%' },
      m: { base: '0% 5%', md: '0% 20%' },
      bg: '#FAF7F2', // high color
    },
    footer: {
      position: 'relative',
      bg: '#EFECE7', // medium color
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
      py: '4',
      px: '30px',
    },
    borderLine: {
      w: '80%',
      borderTop: '1px solid',
      borderColor: 'gray.300',
      mb: '5',
    },
  },
});
