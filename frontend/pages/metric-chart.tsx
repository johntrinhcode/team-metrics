import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipFormatter, TooltipPayload, LabelFormatter, Label } from 'recharts';
import { MetricWeek } from '../models/Metric';
import dayjs from 'dayjs';

const MetricChart = ({ metricData }) => {
  const sanitizeMetricData = (data: MetricWeek[]) => {
    data.map((metricWeek) => metricWeek.week = new Date(metricWeek.week));
    return data;
  }

  const formatDate = (date: Date): String => {
    return dayjs(date).format('MM/DD/YYYY');
  }

  const formatTooltip: TooltipFormatter = (value, name, props: TooltipPayload) => {
    let formattedName = name;

    if (name === 'averageOverallLeadTime') {
      formattedName = 'Average Overall Lead Time';
    }
    
    return [value, formattedName, props]
  }

  const formatTooltipLabel: LabelFormatter = (label) => {
    return dayjs(label).format('MM/DD/YYYY');
  }

  const AxisLabel = ({ axisType, x, y, width, height, stroke, children }) => {
    const isVert = axisType === 'yAxis';
    const cx = isVert ? x : x + (width / 2);
    const cy = isVert ? (height / 2) + y : y + height + 10;
    const rot = isVert ? `270 ${cx} ${cy}` : 0;
    return (
      <text x={cx} y={cy} transform={`rotate(${rot})`} textAnchor="middle" stroke={stroke}>
        {children}
      </text>
    );
  };
  
  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={sanitizeMetricData(metricData)}
          margin={{
            top: 50,
            right: 100,
            left: 100,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" tickFormatter={ formatDate } dy={10}>
            <Label value="Week" dy={40} />
          </XAxis>
          <YAxis dx={-10} >
            <Label value="Average Overall Lead Time" angle={-90} dx={-20} />
          </YAxis>
          <Tooltip labelFormatter={ formatTooltipLabel } formatter={ formatTooltip } />
          <Line type="monotone" dataKey="averageOverallLeadTime" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>

  )
}

export default MetricChart;