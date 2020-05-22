import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';

import ApiService from '../../Core/Http/ApiService';

// import './Chart.css';

class Chart extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      daily: []
    }
  }

  async componentDidMount() {
    this.setState({
      daily: await (new ApiService()).getDaily()
    });
  }

  render() {
    const daily = this.state.daily;
    const { data: { confirmed , recovered, deaths }, country } = this.props;

    if (!daily[0]) return null;

    return (
      <div>
        {country
          ? <Bar
            data={{
              labels: ['Infected', 'Recovered', 'Deaths'],
              datasets: [{
                label: 'People',
                backgroundColor: [
                  'rgba(0, 0, 255, 0.5)',
                  'rgba(0, 255, 0, 0.5)',
                  'rgba(255, 0, 0, 0.5)',
                ],
                data: [confirmed.value, recovered.value, deaths.value]
              }],
            }}
            options={{
              legend: { display: false },
              title: { display: true, text: `Current state in ${country}` }
            }}
          />
          : <Line
            data={{
              labels: daily.map(({ reportDate }) => new Date(reportDate).toDateString()),
              datasets: [{
                label: 'Infected',
                fill: true,
                borderColor: 'blue',
                data: daily.map(({ confirmed }) => confirmed.total)
              }, {
                label: 'Deaths',
                fill: true,
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                data: daily.map(({ deaths }) => deaths.total)
              }],
            }}
          />}
      </div>
    )
  };
}

export default Chart;
