import * as React from 'react';
import cityList from '../data/cities.yaml';
import metricList from '../data/metrics.yaml';

import CityPicker from './CityPicker';
import MetricPicker from './MetricPicker';
import MetricPage from './MetricPage';
import Map from './Map';

const cities = Object.entries(cityList).map(city => ({
  key: city[0],
  label: city[1],
}));

const metrics = Object.entries(metricList).map(metric => ({
  route: metric[0],
  data: metric[1],
}));

export interface AppProps {}

export interface AppState {
  city: City;
  metric: Metric;
  cities: City[];
  metrics: Metric[];
}

class App extends React.Component<AppProps, AppState> {
  static defaultProps: Partial<AppProps>;

  constructor(props: AppProps) {
    super(props);

    this.state = {
      city: cities[0],
      metric: metrics[0],

      cities: cities,
      metrics: metrics,
    };
  }

  selectCity = (cityKey: string) => {
    this.setState(({ cities }: AppState) => ({
      city: cities.find(city => city.key === cityKey),
    }));
  }

  selectMetric = (metricRoute: string) => {
    this.setState(({ metrics }: AppState) => ({
      metric: metrics.find(metric => metric.route === metricRoute),
    }));
  }

  render() {
    return (
      <div>
        <CityPicker cities={this.state.cities} selectCity={this.selectCity} />
        <MetricPicker metrics={this.state.metrics} selectMetric={this.selectMetric} />
        <MetricPage city={this.state.city} metric={this.state.metric} />
        <Map />
      </div>
    );
  }
}

App.defaultProps = {};

export default App;
