import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
        <meta name="google-site-verification" content="a5YPejo2DFTDxVVzLPk03sqUK4z1jYTB612fjaDLQ8Q" />
        </Head>
        <body className="bg-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
