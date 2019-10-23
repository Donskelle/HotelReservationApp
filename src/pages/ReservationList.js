import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getRoom } from '../redux/reducers/rooms';
import LoadRoomsComponent from '../components/LoadRoomsComponent';
import H1 from '../components/typo/H1';
import PageWrapper from '../components/PageWrapper';
import StyledLink from '../components/Link';

export default function ReserervationList() {
  const { id } = useParams();
  const { reservations, name } = useSelector(getRoom(parseInt(id, 10)));

  return (
    <LoadRoomsComponent>
      <PageWrapper>
        <H1>Reserervation List {name}</H1>
        <StyledLink to={`/rooms/${id}/reservations/create`}>
          Create new Reservation
        </StyledLink>
        <ul>
          {reservations &&
            reservations.map(reservation => (
              <li key={reservation.id}>
                <p>
                  {reservation.name}, {reservation.firstName}
                </p>
                <p>
                  {reservation.startDate} to {reservation.endDate}
                </p>
                <StyledLink
                  to={`/rooms/${id}/reservations/${reservation.id}/edit`}
                >
                  Edit
                </StyledLink>
              </li>
            ))}
        </ul>
      </PageWrapper>
    </LoadRoomsComponent>
  );
}
