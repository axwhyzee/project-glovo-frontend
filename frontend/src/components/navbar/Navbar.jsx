import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavButton from '../navbutton/NavButton';
import './navbar.scss';

function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <nav className='navbar'>     
    <NavButton navigateTo="/" buttonName="Glovo"/>
      <ul className='nbitems'>
        <li>
          <NavButton navigateTo='/about' buttonName="About Us" />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;