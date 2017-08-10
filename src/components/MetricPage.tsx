import * as React from 'react';
import MetricDescription from './MetricDescription';

export interface MetricPageProps {
  city: City;
  metric: Metric;
}

export interface MetricPageState {}

class MetricPage extends React.Component<MetricPageProps, MetricPageState> {
  static defaultProps: Partial<MetricPageProps>;

  render() {
    return (
      <MetricDescription metric={this.props.metric} />
    );
  }
}

MetricPage.defaultProps = {};

export default MetricPage;
