import React, { Component } from 'react';
import { FormControl, NativeSelect } from '@material-ui/core';

import ApiService from '../../Core/Http/ApiService';

// import style from './Country.css';

class Country extends Component {

  constructor(props) {
    super(props);

    this.state = {
      countries: []
    }
  }

  async componentDidMount() {
    this.setState({
      countries: await (new ApiService()).getCountries()
    });
  }

  render() {
    const countries = this.state.countries;

    if (!countries.length) return null;

    return (
      <FormControl>
        <NativeSelect defaultValue="" onChange={evt => this.props.handleCountryChange(evt.target.value)}>
          <option value="">Global</option>
          {countries.map((country, i) => <option key={i} value={country.name}>{country.name}</option>)}
        </NativeSelect>
      </FormControl>
    );
  };
}

export default Country;
