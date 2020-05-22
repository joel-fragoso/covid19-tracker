import React, { Component } from 'react';
import CountUp from 'react-countup';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';

import logo from './assets/img/logo.svg';
import ApiService from './Core/Http/ApiService';
import Country from './Components/Country/Country';
import Chart from './Shared/Chart/Chart';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      country: ''
    };
  }

  async componentDidMount() {
    const data = await (new ApiService()).list();

    this.setState({ data });
  }

  async handleCountryChange(country) {
    const data = await (new ApiService()).list(country);

    this.setState({ data, country });
  }

  render() {
    const { data: { confirmed, recovered, deaths, lastUpdate } } = this.state;

    if (!confirmed) {
      return null;
    }

    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={3}>
            <Grid item>
              <img src={logo} className="brand" alt="Covid-19" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={12} md={3}>
              <Card className="infected">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Infected
                  </Typography>
                  <Typography variant="h5">
                    <CountUp start={0} end={confirmed.value} duration={3} separator="." />
                  </Typography>
                  <Typography color="textSecondary">
                    {new Date(lastUpdate).toDateString()}
                  </Typography>
                  <Typography variant="body2">
                    Number of active cases of COVID-19
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card className="recovered">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Recovered
                  </Typography>
                  <Typography variant="h5">
                    <CountUp start={0} end={recovered.value} duration={3} separator="." />
                  </Typography>
                  <Typography color="textSecondary">
                    {new Date(lastUpdate).toDateString()}
                  </Typography>
                  <Typography variant="body2">
                    Number of recoveries from COVID-19
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card className="deaths">
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Deaths
                  </Typography>
                  <Typography variant="h5">
                    <CountUp start={0} end={deaths.value} duration={3} separator="." />
                  </Typography>
                  <Typography color="textSecondary">
                    {new Date(lastUpdate).toDateString()}
                  </Typography>
                  <Typography variant="body2">
                    Number of deaths caused by COVID-19
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={3}>
            <Grid item>
              <Country handleCountryChange={this.handleCountryChange.bind(this)} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={12} md={12}>
              <Chart data={this.state.data} country={this.state.country} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default App;
