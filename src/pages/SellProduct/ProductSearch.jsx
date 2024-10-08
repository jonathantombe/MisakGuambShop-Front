import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductSearch.css';

const ProductSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const mockResults = [
            { id: 1, name: 'Collares de Chaquiras Misak', image: '/path/to/collar-misak-image.jpg' },
            { id: 2, name: 'Mochilas Tejidas a Mano', image: '/path/to/mochila-misak-image.jpg' },
        ];
        setSearchResults(mockResults);
    };

    const handleCategorySelect = (categoryId, categoryName) => {
        navigate(`/confirm-category/${categoryId}`, { state: { categoryName } });
    };

    return (
        <div className="product-search-container">
            <div className='product-search-container-c'>
            <div className='product-search-container-back-link'>
            <Link to="/anterior" className="back-link-a">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2.7 11.3L2 12l.7.7 4 4c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L5.8 13H15c.6 0 1-.4 1-1s-.4-1-1-1H5.8l2.3-2.3c.2-.2.3-.4.3-.7 0-.6-.4-1-1-1-.3 0-.5.1-.7.3l-4 4z"></path><path d="M22 19H10v-2h10V7H10V5h12z"></path></svg>
                <p className='back-link-p'>Volver</p>
                </Link>
            </div>

                <h2 className='catalog-title'>Encuentra tu producto artesanal en nuestro catálogo</h2>

            <div className="search-box">
                <p>Selecciona cómo prefieres buscar tu artesanía:</p>
                <ul>
                    <li>Escribe el nombre, características, o detalles de tu artesanía para facilitar la búsqueda</li>
                    <li>O introduce el código único de tu producto <Link to="/como-encontrar">(¿Cómo lo encuentro?)</Link></li>
                </ul>

                    <form onSubmit={handleSearch} className='extended-search-form'>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Ej: Mochila de fique Misak, hecha a mano, natural"
                    />
                    <button type="submit" className='product-search-buttonn'>Buscar</button>
                </form>
            </div>

            {searchResults.length > 0 && (
                <div className="search-results">
                    <h3>Resultados encontrados. ¿Alguna de estas categorías coincide con tu producto?</h3>
                    <ul>
                        {searchResults.map((category) => (
                            <li key={category.id} onClick={() => handleCategorySelect(category.id, category.name)}>
                                <img src={category.image} alt={category.name} />
                                <span>{category.name}</span>
                            </li>
                        ))}
                    </ul>
                    <Link to="/otra-categoria" className="other-category-link">No corresponde a ninguna categoría</Link>
                </div>
            )}

            <div className="image-placeholder">
                <img src="/assets/images/artesania-placeholder.jpg" alt="Artesanías Misak" />
            </div>
            </div>
        </div>
    );
};

export default ProductSearch;