import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '../App';

describe('App Tests', () => {
  it('App does not crash', () => {
    shallow(<App />);
  });
  it('Renders Router', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Router).length).toEqual(1);
  });
});
