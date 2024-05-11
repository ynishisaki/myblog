import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  components: {
    Button: {
      // ボタン押したときの青枠を消す
      baseStyle: {
        _focus: {
          boxShadow: "None",
        },
      },
      variants: {
        // （スマホサイズのみ）ボタンホバー時の影を消す
        solid: () => ({
          "@media screen and (max-width: 767px)": {
            _hover: {
              boxShadow: "None",
            },
          },
        }),
      },
    },
  },

  textStyles: {
    p: {
      color: "#4d5156",
      my: { base: "1" },
      py: { base: "0" },
      fontSize: "16px",
      fontWeight: "light", // 300
      fontFamily:
        'メイリオ, "Hiragino Sans", "ＭＳ Ｐゴシック", "Helvetica W01", sans-serif',
    },
    h1: {
      color: "#4d5156",
      fontSize: "3xl",
      fontWeight: "bold",
      fontFamily:
        'メイリオ, "Hiragino Sans", "ＭＳ Ｐゴシック", "Helvetica W01", sans-serif;',
      lineHeight: "1",
    },
    h2: {
      color: "#4d5156",
      // margin: '16px 0',
      // fontSize: '24px',
      fontSize: "2xl",
      fontWeight: "bold",
      fontFamily:
        'メイリオ, "Hiragino Sans", "ＭＳ Ｐゴシック", "Helvetica W01", sans-serif;',
      lineHeight: "1",
    },
    h3: {
      color: "#4d5156",
      fontSize: "16px",
      fontWeight: "bold", //700
      fontFamily:
        'メイリオ, "Hiragino Sans", "ＭＳ Ｐゴシック", "Helvetica W01", sans-serif;',
    },
  },

  layerStyles: {
    header: {
      position: "fixed",
      top: "0px",
      zIndex: "banner", //1200
      height: { base: "50px", md: "70px" },
      width: "100vw",
      display: "flex",
      alignItems: "center",
      bgColor: "#FAF7F2", // high color
    },
    header_inner: {
      margin: "0 auto",
      width: { base: "90%", sm: "600px", md: "800px" },
      display: "flex",
      alignItems: "center",
    },
    blogTitle: {
      position: "absolute",
      left: "calc(50% - 3em)",
      color: "#4d5156",
      fontFamily: '"Kosugi Maru", sans-serif',
      fontSize: { base: "lg", md: "2xl" },
      fontWeight: "bold",
    },
    base: {
      mt: { base: "50px", md: "70px" },
      pt: "16px",
      mb: "16px",
      width: "100%",
    },
    home_display: {
      mx: "auto",
      maxWidth: { base: "90%", sm: "600px", md: "800px" },
    },
    home_post_display: {
      mb: "5", // post間の余白
      p: "4",
      bg: "#FAF7F2", // high color
    },
    post_display: {
      mx: "auto",
      p: { base: "4", md: "8" },
      maxWidth: { base: "90%", sm: "600px", md: "800px" },
      bg: "#FAF7F2", // high color
    },
  },
});
