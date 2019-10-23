import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

import Menu from './Menu';
import Wrapper from './Wrapper';
import PrivateRoute from './PrivateRoute';
import '../styles/css-reset.css';

const LazyLogin = loadable(() => import('../pages/Login'));
const LazyDashboard = loadable(() => import('../pages/Dashboard'));
const LazyReservationCreate = loadable(() =>
  import('../pages/ReservationCreate')
);
const LazyReservationList = loadable(() => import('../pages/ReservationList'));
const LazyReservationEdit = loadable(() => import('../pages/ReservationEdit'));
const LazyRoomList = loadable(() => import('../pages/RoomList'));

function App() {
  return (
    <Router>
      <Wrapper>
        <Menu />
        <Switch>
          <PrivateRoute path="/dashboard">
            <LazyDashboard fallback={<h1>Loading</h1>} />
          </PrivateRoute>
          <PrivateRoute
            path={[
              '/rooms/:id/reservations/create',
              '/rooms/createreservation'
            ]}
          >
            <LazyReservationCreate fallback={<h1>Loading</h1>} />
          </PrivateRoute>
          <PrivateRoute path="/rooms/:id/reservations/:reservationId/edit">
            <LazyReservationEdit fallback={<h1>Loading</h1>} />
          </PrivateRoute>
          <PrivateRoute path="/rooms/:id/reservations">
            <LazyReservationList fallback={<h1>Loading</h1>} />
          </PrivateRoute>
          <PrivateRoute path="/rooms">
            <LazyRoomList fallback={<h1>Loading</h1>} />
          </PrivateRoute>
          <Route path="/">
            <LazyLogin fallback={<h1>Loading</h1>} />
          </Route>
        </Switch>
      </Wrapper>
    </Router>
  );
}

export default App;
