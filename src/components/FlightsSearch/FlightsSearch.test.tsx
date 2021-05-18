import React from 'react';
import { shallow, mount } from 'enzyme';
import FlightsSearch from './FlightsSearch';

describe('<FlightsSearch />', () => {
  let component: any;

  beforeEach(() => {
    component = shallow(<FlightsSearch />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });

  test('It should have search panel', () => {
    const { length } = component.find('.search-panel');
    expect(length).toBe(1);
  });

  test('It should have search button', () => {
    const { length } = component.find('#searchBtn');
    expect(length).toBe(1);
  });

  test('It should load when search clicked', () => {
    const setLoading = jest.fn();
    const wrapper = mount(<FlightsSearch />);
    const handleClick = jest.spyOn(React, 'useState');
    handleClick.mockImplementation((loading) => [loading, setLoading]);
    wrapper.find('#searchBtn').at(0).simulate('click');
    expect(setLoading).toBeTruthy();
    wrapper.unmount();
  });
});
