import * as React from 'react';

export interface MetricDescriptionProps {
  metric: Metric;
}

const MetricDescription: React.StatelessComponent<MetricDescriptionProps> = ({ metric }) => {
  return (
    <div>
      <h1>{metric.data.name}</h1>

      <div>
        <h2>Description</h2>
        <p>{metric.data.description}</p>
      </div>
      <div>
        <h2>Source</h2>
        <p>{metric.data.source}</p>
      </div>
      <div>
        <h2>Years of Collection</h2>
        <p>{metric.data.years}</p>
      </div>
      <div>
        <h2>How the Measure is Calculated</h2>
        <p>{metric.data['how-calculated']}</p>
      </div>

      <svg height="100" width="500">
        <defs>
          <linearGradient id="scale">
            <stop offset="0%" stopColor="#9bd8ff" />
            <stop offset="100%" stopColor="#590f8c" />
          </linearGradient>
        </defs>

        <rect fill="url(#scale)" x="10%" width="80%" height="100%" />

        <g>
          <text textAnchor="end" x="8%" y="50%">{metric.data.range[0]}</text>
          <text textAnchor="start" x="92%" y="50%">{metric.data.range[1]}</text>
        </g>
      </svg>
    </div>
  );
}

MetricDescription.defaultProps = {};

export default MetricDescription;
