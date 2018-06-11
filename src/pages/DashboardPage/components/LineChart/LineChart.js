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
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['24 марта', '25 марта', '26 марта', '27 марта', '28 марта', '29 марта'],
        datasets: [{
          label: 'Пользователи',
          data: [1000, 800, 380, 100, 100, 0],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
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
