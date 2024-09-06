import React from "react";
import Profile from '../../assets/icons/Profile.jpg';
import "./UserProfile.css";

const UserProfile = () => {
  return (
    <div className="profile-container">
      <header className="profile-header">
        <img
          src={Profile}
          alt="Perfil"
          className="profile-icon"
        />
        <div className="profile-nav">
          <ul>
            <li>Mi cuenta</li>
            <li>Mis compras</li>
            <li>Notificaciones</li>
          </ul>
        </div>
      </header>

      <section className="profile-content">
        <div className="tab-bar">
          <button>Todos</button>
          <button>Por enviar</button>
          <button>En camino</button>
          <button>Finalizado</button>
          <button>Cancelado</button>
          <button>Devolución</button>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="buscar" />
          <button className="search-button">
            <img src="/assets/images/search-icon.png" alt="Buscar" />
          </button>
        </div>

        <div className="no-orders">
          <img src="/assets/images/no-orders-icon.png" alt="No orders" />
          <p>De momento no hay pedido</p>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
