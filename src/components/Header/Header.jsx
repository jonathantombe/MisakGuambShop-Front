import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../../assets/icons/no-user-avatar.svg'
import { useAuth } from '../../context/AuthContext';
import './Header.css';

export const Header = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    console.log('Current user in Header:', user);
  }, [user]);

  
  return (
    <header className="header">
      <div className="header-content">
        <div className="menu-categories">
          <button className="menu-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
              <rect x="2" y="8" width="14" height="2"></rect>
              <rect x="2" y="13" width="14" height="2"></rect>
              <rect x="2" y="3" width="14" height="2"></rect>
            </svg>
          </button>
          <span className="categories-text">Categorías</span>
        </div>

        <div className="logo">
          <Link to="/">
            <span className="logo-text">
              <span className="logo-m">M</span>isak
              <span className="logo-g">G</span>uamb
              <span className="logo-s">S</span>hop
            </span>
          </Link>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Buscar artesanías tradicionales..." />
          <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
            </svg>
          </button>
        </div>

        <nav className="nav-links">
          {user ? (
            <div className="user-profile">
              <img src={Profile} alt="Profile" className="profile-icon" />
              <span className="user-name">{user.username || 'Tu Perfil'}</span>
              <button onClick={logout} className="logout-button">Cerrar Sesión</button>
            </div>
          ) : (
            <>
              <Link to="/register" className="nav-link">Registrar</Link>
              <Link to="/login" className="nav-link">Iniciar Sesión</Link>
            </>
          )}
          <button className="icon-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20.877 12.52c.054-.076.103-.157.147-.239A6 6 0 0 0 12 4.528a6 6 0 0 0-9.024 7.753c.044.082.093.162.147.24l.673.961a6 6 0 0 0 .789.915L12 21.422l7.415-7.025c.293-.278.557-.584.789-.915l.673-.961Zm-14.916.425L12 18.667l6.04-5.722c.195-.185.371-.39.525-.61l.673-.961a.335.335 0 0 0 .044-.087 4 4 0 1 0-7.268-2.619v.003L12 8.667l-.013.004v-.002a3.975 3.975 0 0 0-1.237-2.574 4 4 0 0 0-6.031 5.193c.009.03.023.058.043.086l.673.961a4 4 0 0 0 .526.61Z"></path>
            </svg>
          </button>
          <button className="icon-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.535 7A4 4 0 0 1 12 2.354 4 4 0 0 1 18.465 7H22v9h-1v6H3v-6H2V7h3.535Zm9.466 0H13V5a2 2 0 1 1 2.001 2ZM11 5a2 2 0 1 0-2.001 2H11V5Zm-.764 4c-.55.614-1.348 1-2.236 1v2a4.978 4.978 0 0 0 3-1v3H4V9h6.236ZM13 11c.836.628 1.874 1 3 1v-2a2.992 2.992 0 0 1-2.236-1H20v5h-7v-3Zm-8 5v4h6v-4H5Zm8 4v-4h6v4h-6Z"></path></svg>
          </button>
          <button className="icon-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path fill-rule="evenodd" clip-rule="evenodd" d="m5.766 5-.618-3H1v2h2.518l2.17 10.535L6.18 17h14.306l2.4-12H5.767ZM7.82 15l-1.6-8h14.227l-1.6 8H7.82Z"></path>
              <path d="M10.666 20.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm8.334 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path>
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;