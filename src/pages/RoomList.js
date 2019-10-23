import React from 'react';

import RoomList from '../components/RoomList';
import LoadRoomsComponent from '../components/LoadRoomsComponent';
import H1 from '../components/typo/H1';
import PageWrapper from '../components/PageWrapper';

export default function RoomsList() {
  return (
    <LoadRoomsComponent>
      <PageWrapper>
        <H1>Room List</H1>
        <RoomList />
      </PageWrapper>
    </LoadRoomsComponent>
  );
}
