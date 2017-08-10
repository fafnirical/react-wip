import * as React from 'react';
import { csvParse, DSVParsedArray, DSVRowString } from 'd3-dsv';
import { geoPath, geoAlbers } from 'd3-geo';
import { interpolateRgb } from 'd3-interpolate';
import { FeatureCollection, Polygon } from 'geojson';

export interface AppProps {};

export interface AppState {
  city: string;
  geo?: FeatureCollection<Polygon>;
  data?: DSVParsedArray<DSVRowString>,
}

export default class App extends React.Component<AppProps, AppState> {
  static getGeoData(location: string): Promise<FeatureCollection<Polygon>> {
    return import(`../../data/${location}/geo.json`)
      .catch(error => console.error(error));
  }

  static getTractData(location: string): Promise<string> {
    return import(`../../data/${location}/tract.csv`)
      .catch(error => console.error(error));
  }

  constructor(props: AppProps) {
    super(props);

    this.state = {
      city: 'flint',
      geo: undefined,
      data: undefined,
    };
  }

  async componentDidMount() {
    const [geoData, tractData] = await Promise.all([
      App.getGeoData(this.state.city),
      App.getTractData(this.state.city).then(tractData => csvParse(tractData)),
    ]);

    this.setState({
      geo: geoData,
      data: tractData,
    });
  }

  render() {
    if (!this.state.geo || !this.state.data) {
      return null;
    }

    const width = 960;
    const height = 960;

    const projection = geoAlbers();
    const path = geoPath(projection.fitSize([width, height], this.state.geo));

    const colorInterpolator = interpolateRgb('blue', 'red');

    return (
      <svg width={width} height={height}>
        <g className="tracts">
          {this.state.geo.features.map(feature => {
            const tract = (feature.properties as any).tract;
            const data = this.state.data!.find(data => data.Tract === String(tract));

            return (
              <path key={tract} fill={colorInterpolator(Number(data!['Walkability']) / 100)} d={path(feature) as string} />
            );
          })}
        </g>
      </svg>
    );
  }
}
