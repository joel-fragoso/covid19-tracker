import http from 'axios';

class ApiService {

  url = 'https://covid19.mathdro.id/api';

  async list(country) {
    try {
      let baseUrl = this.url;

      if (country) {
        baseUrl = `${this.url}/countries/${country}`;
      }

      const { data: { confirmed, recovered, deaths, lastUpdate } } = await http.get(baseUrl);

      return { confirmed, recovered, deaths, lastUpdate };
    } catch (err) {
      console.error(err);
    }
  }

  async getDaily() {
    try {
      const { data } = await http.get(`${this.url}/daily`);

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async getCountries() {
    try {
      const { data: { countries } } = await http.get(`${this.url}/countries`);
      
      return countries;
    } catch (err) {
      console.error(err);
    }
  }

}

export default ApiService;
