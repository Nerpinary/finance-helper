import {ColorModeScript} from "@chakra-ui/react";
import Document, {Html, Head, Main, NextScript} from "next/document.js";
import theme from "../lib/theme";

class MyDocument extends Document {

    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument