import * as React from 'react';

export interface MetricPickerProps {
  metrics: Metric[];
  selectMetric(metricName: string): void;
}

const MetricPicker: React.StatelessComponent<MetricPickerProps> = (props: MetricPickerProps) => {
  const onChange: React.EventHandler<React.FormEvent<HTMLSelectElement>> = (event) => {
    props.selectMetric(event.currentTarget.value);
  }

  return (
    <select onChange={onChange}>
      {props.metrics.map(metric => (
        <option key={metric.route} value={metric.route}>{metric.data.name}</option>
      ))}
    </select>
  );
};

MetricPicker.defaultProps = {
};

export default MetricPicker;
