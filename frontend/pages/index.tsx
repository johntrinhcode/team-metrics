import Head from 'next/head'

import FileUpload from '../components/FileUpload/FileUpload';

export default function Home({ setMetricData }) {

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Trendly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <FileUpload setMetricData={ setMetricData }/>
      </main>

      <footer>
        
      </footer>
    </div>
  );
}
