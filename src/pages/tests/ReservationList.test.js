import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { MemoryRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import ReservationList from '../ReservationList';

const mockStore = configureStore([]);

describe('Test Reservation List', () => {
  const initialState = {
    rooms: {
      rooms: [
        {
          id: 1,
          name: 'Single',
          reservations: [
            {
              id: 0,
              name: 'Hanelore',
              firstName: 'Demo',
              startDate: '11-6-2020',
              endDate: '13-6-2020'
            },
            {
              id: 1,
              name: 'Hanelore',
              firstName: 'Demo',
              startDate: '11-6-2020',
              endDate: '13-6-2020'
            }
          ],
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
        <MemoryRouter initialEntries={['/rooms/1/reservations']}>
          <Route path="/rooms/:id/reservations">
            <ReservationList />
          </Route>
        </MemoryRouter>
      </Provider>
    );
  });

  it('Shows Component', async () => {
    expect(wrapper.find(ReservationList).length).toEqual(1);
  });

  it('Shows List', async () => {
    expect(wrapper.find('li').length).toEqual(2);
  });
});
