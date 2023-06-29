import Document, { Html, Head, Main, NextScript } from "next/document";
import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'
import googleTagManager from '@analytics/google-tag-manager'

export default class MyDocument extends Document {
  render() {
    const analytics = Analytics({
      app: 'awesome-app',
      plugins: [
        googleAnalytics({
          measurementIds: ['G-ZF9XWPZYQ4']
        }),
        googleTagManager({
          containerId: 'G-ZF9XWPZYQ4'
        })
      ]
    })
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
