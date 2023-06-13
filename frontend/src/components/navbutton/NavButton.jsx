import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbutton.scss';

function NavButton({ navigateTo, buttonName }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo);

    // Force reload if navigating back to home page.
    // The graph will be all messed up if re-rendered without a full svg reset
    if (navigateTo === '/') window.location.reload();
  };

  return (
    <a className='button' onClick={handleClick}>{buttonName}</a>
  );
}

export default NavButton;
