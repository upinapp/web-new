import React from 'react';
import Chart from 'chart.js';

import './BarChart.style.css';

class BarChart extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="BarChart">
        <canvas id="BarChart__content"/>
      </div>
    );
  }

  componentDidMount() {
    const chartContainer = document.getElementById('BarChart__content');
    const ctx = chartContainer.getContext('2d');
    chartContainer.height = 290;

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.props.labels,
        datasets: this.props.data
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: null,
        elements: {
          line: {
            tension: 0.000001
          }
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            ticks: {
              max: 100,
              min: 0,
              stepSize: 10
            }
          }]
        }
      }
    });
  }
}

export default BarChart;
