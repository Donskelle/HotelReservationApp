import React from 'react';
import { shallow } from 'enzyme';

import RoomsList from '../RoomList';

describe('Test Reservation List', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RoomsList />);
  });

  it('Does not throw error', () => {
    expect(wrapper.find('H1').length).toEqual(1);
    expect(wrapper.find('H1').text()).toEqual('Room List');
  });
});
