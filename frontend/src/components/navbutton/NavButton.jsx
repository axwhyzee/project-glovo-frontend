import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbutton.scss';

function NavButton({ navigateTo, buttonName }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo);
  };

  return (
    <a className='button' onClick={handleClick}>{buttonName}</a>
  );
}

export default NavButton;
