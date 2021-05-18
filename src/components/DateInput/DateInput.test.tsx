import React from 'react';
import { shallow } from 'enzyme';
import DateInput from './DateInput';

describe('<DateInput />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DateInput />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
