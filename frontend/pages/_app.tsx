import 'tailwindcss/tailwind.css';
import { useState } from 'react';
import { MetricWeek } from '../models/Metric';

function MyApp({ Component, pageProps }) {
  const [metricData, setMetricData] = useState<MetricWeek[] | undefined>(null);
  return <Component {...pageProps} metricData={ metricData } setMetricData={ setMetricData }/>
}

export default MyApp
