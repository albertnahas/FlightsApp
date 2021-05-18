import React from 'react';
import { shallow } from 'enzyme';
import LocationInput from './LocationInput';

describe('<LocationInput />', () => {
  let component: any;

  it('should render correctly with no props', () => {
    component = shallow(<LocationInput />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly with props', () => {
    const mockTrySetValue = jest.fn();
    component = shallow(<LocationInput type="From" setAirport={mockTrySetValue} />);
    expect(component).toMatchSnapshot();
  });
});
