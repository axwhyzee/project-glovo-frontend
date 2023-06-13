import React from 'react';
import NavButton from '../navbutton/NavButton';
import './navbar.scss';

function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <nav className='navbar'>    
      <ul className='nbitems'> 
        <li>
          <NavButton navigateTo="/" buttonName="Glovo"/>
        </li>
        <li>
          <NavButton navigateTo='/about' buttonName="About Us" />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;