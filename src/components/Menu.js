import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import tw from 'tailwind.macro';

import LogoutButton from './LogoutButton';

const FlexContainer = styled.div`
  ${tw`flex items-center`}
`;
const FlexNavContainer = styled.ul`
  ${tw`flex`}
`;
const StyledLogoutButton = styled(LogoutButton)`
  ${tw`ml-auto`}
`;
const StyledNavLink = styled(NavLink)`
  ${tw`mr-3 no-underline text-blue-600 hover:underline`};

  &.active {
    ${tw`text-blue-800 underline`}
  }
`;

export default function Menu() {
  const authStatus = useSelector(state => state.user.name);

  if (!authStatus) {
    return 'Login needed';
  }

  return (
    <FlexContainer>
      <FlexNavContainer>
        <li>
          <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/rooms" exact>
            Room Reservation List
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/rooms/createreservation">
            Create Reservation
          </StyledNavLink>
        </li>
      </FlexNavContainer>
      <StyledLogoutButton />
    </FlexContainer>
  );
}
