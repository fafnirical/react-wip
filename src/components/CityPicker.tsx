import * as React from 'react';

export interface CityPickerProps {
  cities: City[];
  selectCity(cityName: string): void;
}

const CityPicker: React.StatelessComponent<CityPickerProps> = (props: CityPickerProps) => {
  const onChange: React.EventHandler<React.FormEvent<HTMLSelectElement>> = (event) => {
    props.selectCity(event.currentTarget.value);
  }

  return (
    <select onChange={onChange}>
      {props.cities.map(city => (
        <option key={city.key} value={city.key}>{city.label}</option>
      ))}
    </select>
  );
};

CityPicker.defaultProps = {
};

export default CityPicker;
