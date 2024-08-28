import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <button className="menu-button">☰</button>
        <div className="logo">
          <Link to="/">MisakGuambShop</Link>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="mochilas en lana" />
          <button type="submit">🔍</button>
        </div>
        <nav className="nav-links">
          <Link className="account-button">👤</Link>
          <Link to="/login" className="nav-link">Iniciar Sesión</Link>
          <Link to="/register" className="nav-link">Registrarse</Link>
          <Link className="cart-button">🛒 0</Link>
        </nav>
      </div>
    </header>
  );
};   

export default Header;