import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <button className="menu-button">☰</button>
        <h1 className="logo">Misakuuamboshop</h1>
        <div className="search-bar">
          <input type="text" placeholder="mochilas en lana" />
          <button type="submit">🔍</button>
        </div>
        <div className="user-actions">
          <button className="account-button">👤 Mi cuenta</button>
          <button className="cart-button">🛒 0</button>
        </div>
      </div>
    </header>
  );
};   