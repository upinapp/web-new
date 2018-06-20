import React from 'react';
import Chart from 'chart.js';

import './LineChart.style.css';

class LineChart extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="LineChart">
        <canvas id="LineChart__content"/>
      </div>
    );
  }

  componentDidMount() {
    const chartContainer = document.getElementById('LineChart__content');
    const ctx = chartContainer.getContext('2d');
    chartContainer.height = 290;

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.props.labels,
        datasets: this.props.data
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        elements: {
          line: {
            tension: 0.000001
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}

export default LineChart;
