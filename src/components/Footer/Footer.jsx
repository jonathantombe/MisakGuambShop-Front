import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para navegación
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Servicio al cliente</h3>
                    <ul>
                        <li><Link to="/contact">Contacto</Link></li> {/* Usa Link en lugar de a href */}
                        <li><a href="#">Preguntas frecuentes</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Explora por categorías</h3>
                    <ul>
                        <li><a href="#">Categoría 1</a></li>
                        <li><a href="#">Categoría 2</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Consulta nuestras redes</h3>
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Instagram</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Únete a MisakuuamboShop</h3>
                    <p>Información sobre cómo unirse</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
