import React from 'react';
import {Line} from 'react-chartjs-2';

type ChartComponentProps = {
  records: { t: Date, y: number }[];
}

export const ChartComponent: React.FunctionComponent<ChartComponentProps> = (props) => {
  const { records } = props;
  const chartData = {
    datasets: [
      {
        label: 'balance',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: records
      }
    ]
  };

  const chartOptions = {
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          min: records.length > 0 && records[0].t,
          unit: 'day'
      }
      }]
    }
  }  

  return (
    <>
      <Line data={chartData} options={chartOptions}/>
    </>
  );
}