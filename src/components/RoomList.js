import React from 'react';
import { useSelector } from 'react-redux';

import StyledLink from './Link';

export default function RoomsList() {
  const { rooms } = useSelector(state => state.rooms);

  return (
    <ul>
      {rooms.map(room => (
        <li key={room.id}>
          {room.name}
          <StyledLink to={`/rooms/${room.id}/reservations`}>
            Room Detail
          </StyledLink>
        </li>
      ))}
    </ul>
  );
}
