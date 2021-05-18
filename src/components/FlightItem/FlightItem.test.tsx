import React from 'react';
import { shallow } from 'enzyme';
import FlightItem from './FlightItem';
import { Flight } from '../../models/Flight';

describe('<FlightItem />', () => {
  let component;

  beforeEach(() => {
    const testTime = new Date().getTime();
    const flight: Flight = {
      id: 'test',
      dTime: testTime,
      aTime: testTime,
      dTimeUTC: testTime,
      aTimeUTC: testTime,
      airline: 'Test',
      cityFrom: 'Test',
      cityCodeFrom: 'Test',
      cityTo: 'Test',
      cityCodeTo: 'Test',
      route: [],
      price: 0,
    };
    component = shallow(<FlightItem item={flight} />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
