import React from 'react';
import './NotFound.css';

const NotFound = () => {
  const goToHome = () => {
    window.location.href = '/'; // Redirige a la página principal
  };

  return (
    <main>
      <div className='container-all'>
        <div className="not-found-404">404</div>
        <div className="not-found">
          <p>Página no encontrada</p>
          <button className="back-home-btn" onClick={goToHome}>
            Volver al inicio
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
