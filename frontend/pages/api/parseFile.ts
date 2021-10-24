import { NextApiRequest, NextApiResponse } from 'next';
import Metric, { MetricWeek } from '../../models/Metric';
import dayjs from 'dayjs';
export default function parseFileHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(400).send({ message: 'Only POST requests allowed' });
  }
  processMetricRows(<Metric[]> req.body);
  

  res.status(200).send(req.body);
}

function processMetricRows(rows: Metric[]) {
  // First group into weeks.
  const metricsByWeek: Map<String, Metric[]> = new Map();
  rows.forEach(metric => {
    const firstDayOfWeek: String = dayjs(metric.dateCompleted).day(1).toDate().toDateString();
    if (metricsByWeek.has(firstDayOfWeek)) {
      metricsByWeek.get(firstDayOfWeek).push(metric);
    } else {
      metricsByWeek.set(firstDayOfWeek, [metric]);
    }
  });

  // Then make MetricWeeks.
  const metricWeeks: MetricWeek[] = [];
  metricsByWeek.forEach((val, key) => {
    const metricWeek = new MetricWeek(new Date(key.toString()), val);
    metricWeeks.push(metricWeek);
  });

  console.log(metricWeeks);
}