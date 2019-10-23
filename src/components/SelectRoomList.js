import React from 'react';
import { useSelector } from 'react-redux';

export default function SelectRoomList(props) {
  const rooms = useSelector(state => state.rooms.rooms) || [];

  return (
    <select {...props}>
      <option value="">Select Room</option>
      {rooms.map(room => (
        <option key={room.id} value={room.id}>
          {room.name}
        </option>
      ))}
    </select>
  );
}
