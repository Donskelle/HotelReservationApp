import React from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '../redux/actions/user';
import Button from './Button';

export default function LogoutButton(props) {
  const dispatch = useDispatch();

  const logoutClick = () => {
    dispatch(logout());
  };

  return (
    <Button type="button" onClick={logoutClick} {...props}>
      Logout
    </Button>
  );
}
