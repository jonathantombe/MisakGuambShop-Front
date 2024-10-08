import React from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import './CategoryConfirmation.css'

const CategoryConfirmation = () => {
    const { categoryId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const categoryName = location.state?.categoryName || 'Categoría Desconocida';

    const handleConfirm = () => {
        // Aquí puedes agregar lógica adicional si es necesario
        navigate('/complete-product-details');
    };


    return (
        <div className="category-confirmation">
            <h2>Confirma la categoría</h2>
            <div className="category-details">
                <h3>Collares y Pulseras</h3>
            </div>
            <p>La categoría debe estar relacionada con el título y la foto para que tus compradores encuentren tu producto. Si la categoría no es correcta, anularemos tu publicación en MisakGuambShop y te pediremos que vuelvas a publicar seleccionando otra categoría.</p>
            <Link to="/product-details" className="confirm-button">Confirmar</Link>
            <Link to="/product/search" className="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2.7 11.3L2 12l.7.7 4 4c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L5.8 13H15c.6 0 1-.4 1-1s-.4-1-1-1H5.8l2.3-2.3c.2-.2.3-.4.3-.7 0-.6-.4-1-1-1-.3 0-.5.1-.7.3l-4 4z"></path><path d="M22 19H10v-2h10V7H10V5h12z"></path></svg>
                <p className='back-link'>Volver</p>
            </Link>
        </div>
    );
};

export default CategoryConfirmation;