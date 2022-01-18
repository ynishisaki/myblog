import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    textStyles: {
        p: {
            color: '#4d5156',
            fontSize: '16px',
            fontfamily: 'メイリオ, "Hiragino Sans", "ＭＳ Ｐゴシック", "Helvetica W01", sans-serif;',
        },
        h1: {
            color: '#4d5156',
            fontSize: '30px',
            fontWeight: 'bolder',
        },
    },
})