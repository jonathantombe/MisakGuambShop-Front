import React from 'react';
import './HeroMisakWelcome.css';
import MisakGuambShop from '../../assets/products/WELCOME_26_c4f0b7d4-d30e-43a5-bb78-76d4cb1fff67_1512x.webp'

const HeroMisakWelcome = () => {
    return (
        <div className="hero-misak">
            <div className="hero-misak-content">
                <h1>Bienvenidos a MisakGuambShop</h1>
                <h2>El corazón de la artesanía Misak</h2>
                <p>Sumérgete en un mundo de colores y tradiciones milenarias. Cada pieza cuenta una historia, tejida con las manos expertas de nuestros artesanos del Resguardo de Guambia, Cauca.</p>
                <div className="hero-misak-features">
                    <span>Autenticidad</span>
                    <span>Tradición</span>
                    <span>Arte Ancestral</span>
                </div>
            </div>
            <div className="hero-misak-image">
                <img src={MisakGuambShop} alt="Artesanía Misak" />
            </div>
        </div>
    );
};

export default HeroMisakWelcome;