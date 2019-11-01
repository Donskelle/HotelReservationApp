import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Menu from './Menu';
import Wrapper from './Wrapper';
import PrivateRoute from './PrivateRoute';
import '../styles/css-reset.css';

const LazyLogin = React.lazy(() => import('../pages/Login'));
const LazyDashboard = React.lazy(() => import('../pages/Dashboard'));
const LazyReservationCreate = React.lazy(() =>
  import('../pages/ReservationCreate')
);
const LazyReservationList = React.lazy(() =>
  import('../pages/ReservationList')
);
const LazyReservationEdit = React.lazy(() =>
  import('../pages/ReservationEdit')
);
const LazyRoomList = React.lazy(() => import('../pages/RoomList'));

function App() {
  return (
    <Router>
      <Wrapper>
        <Menu />
        <Suspense fallback={'<h2>Loading</h2>'}>
          <Switch>
            <PrivateRoute path="/dashboard">
              <LazyDashboard />
            </PrivateRoute>
            <PrivateRoute
              path={[
                '/rooms/:id/reservations/create',
                '/rooms/createreservation'
              ]}
            >
              <LazyReservationCreate />
            </PrivateRoute>
            <PrivateRoute path="/rooms/:id/reservations/:reservationId/edit">
              <LazyReservationEdit />
            </PrivateRoute>
            <PrivateRoute path="/rooms/:id/reservations">
              <LazyReservationList />
            </PrivateRoute>
            <PrivateRoute path="/rooms">
              <LazyRoomList />
            </PrivateRoute>
            <Route path="/">
              <LazyLogin />
            </Route>
          </Switch>
        </Suspense>
      </Wrapper>
    </Router>
  );
}

export default App;
