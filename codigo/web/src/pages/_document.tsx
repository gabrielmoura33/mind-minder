/* eslint-disable @next/next/no-title-in-document-head */
import Document, { Head, Html, Main, NextScript } from 'next/document';
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"  />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"/>
        </Head>
        <body>
          <Main></Main>
          <NextScript></NextScript>
        </body>
      </Html>
    );
  }
}
