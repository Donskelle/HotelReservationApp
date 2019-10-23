import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import RoomsList from '../RoomList';

const mockStore = configureStore([]);

describe('Test Reservation List', () => {
  const initialState = {
    rooms: {
      rooms: [
        {
          id: 1,
          name: 'Single',
          reservations: [],
          priceEuro: 55
        },
        {
          id: 2,
          name: 'Double',
          reservations: [],
          priceEuro: 55
        }
      ]
    }
  };

  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <RoomsList />
        </BrowserRouter>
      </Provider>
    );
  });

  it('Shows right rooms length', () => {
    expect(wrapper.find('li').length).toEqual(2);
  });
  it('Shows rigth room text', () => {
    expect(
      wrapper
        .find('li')
        .first()
        .text()
    ).toMatch(/Single/);
    expect(
      wrapper
        .find('li')
        .last()
        .text()
    ).toMatch(/Double/);
  });
});
