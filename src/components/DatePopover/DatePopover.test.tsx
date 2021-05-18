import React from 'react';
import { shallow } from 'enzyme';
import DatePopover from './DatePopover';

describe('<DatePopover />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DatePopover />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
