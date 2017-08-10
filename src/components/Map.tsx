import * as React from 'react';

interface MapProps {}

interface MapState {}

class Map extends React.Component<MapProps, MapState> {
  static defaultProps: Partial<MapProps>;

  render() {

    return (
      <iframe src="https://fafnirical.carto.com/builder/f59787fe-a364-42bf-8d2f-7677c9e79ddc/embed" height="500px" width="500px" />
    );
  }
}

Map.defaultProps = {};

export default Map;
