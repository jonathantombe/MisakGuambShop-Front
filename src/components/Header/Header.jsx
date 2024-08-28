import React from 'react';
import './Header.css';
import accountIcon from '../../assets/icons/account.png';
import cartIcon from '../../assets/icons/carrito.png';
import logo from '../../assets/images/misaklogo.png'; 
import menuIcon from '../../assets/icons/menu.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <img className="menu-icon" src={menuIcon} alt="Menú" />
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo Misak" />
        </Link>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="mochilas en lana" />
        <button type="submit">🔍</button>
      </div>
      <div className="user-actions">
        <button className="account-button">
          <img src={accountIcon} alt="Mi cuenta" />
          Mi cuenta
        </button>
        <button className="cart-button">
          <img src={cartIcon} alt="Carrito" />
          0
        </button>
      </div>
      <nav className="nav-links">
        <Link to="/login" className="nav-link">Iniciar Sesión</Link>
        <Link to="/register" className="nav-link">Registrarse</Link>
      </nav>
    </header>
  );
};

export default Header;
