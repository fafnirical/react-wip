declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.yaml' {
  const value: any;
  export default value;
}

declare module '*.csv' {
  const value: string;
  export default value;
}


interface City {
  key: string;
  label: string;
}

interface Metric {
  route: string;
  data: {
    name: string;
    description: string;
    source: string;
    years: string;
    'how-calculated': string;
    range: [string, string];
    average: string | false;
  };
}

declare const cartodb: any;
