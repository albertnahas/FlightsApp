import React from 'react';
import { shallow } from 'enzyme';
import FlightDetails from './FlightDetails';
import { Flight } from '../../models/Flight';

describe('<FlightDetails />', () => {
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
    };
    component = shallow(<FlightDetails item={flight} />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
