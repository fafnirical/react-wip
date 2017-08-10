import * as React from 'react';
import * as usTopography from 'us-atlas/us/10m.json';
import { feature as topoFeature, mesh as topoMesh } from 'topojson';
import { geoPath } from 'd3-geo';

import './index.scss';

export interface TopoJsonTestProps {}
export interface TopoJsonTestState {
  usTopography: any,
}

const path = geoPath();

export default class TopoJsonTest extends React.Component<TopoJsonTestProps, TopoJsonTestState> {
  constructor(props: TopoJsonTestProps) {
    super(props);

    this.state = {
      usTopography: {},
    };
  }

  componentDidMount() {
    this.setState({
      usTopography,
    });
  }

  renderStates() {
    if (!this.state.usTopography || !this.state.usTopography.objects || !this.state.usTopography.objects.states) {
      return null;
    }

    const features = topoFeature(this.state.usTopography, this.state.usTopography.objects.states).features;

    return (
      <g className="states">
        {features.map(feature => {
          const featurePath = path(feature);

          return (
            featurePath
              ? <path d={featurePath} />
              : null
          );
        })}
      </g>
    );
  }

  renderStateBorders() {
    if (!this.state.usTopography || !this.state.usTopography.objects || !this.state.usTopography.objects.states) {
      return null;
    }

    const mesh = topoMesh(this.state.usTopography, this.state.usTopography.objects.states, (a: any, b: any) => a !== b);
    const borderPath = path(mesh);

    return (
      borderPath
        ? <path className="state-borders" d={borderPath} />
        : null
    );
  }

  render() {
    return (
      <svg width="960" height="600">
        {this.renderStates()}
        {this.renderStateBorders()}
      </svg>
    )
  }
}
