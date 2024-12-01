import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductList from '../../components/ProductList/ProductList';
import { categories } from '../../services/categories/categories';
import './Category.css';

const Category = () => {
    const { categoryId } = useParams();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Usa el estado de navegación o busca la categoría por defecto
    const category = categories.find(cat => cat.id === parseInt(categoryId)) ||
    {
        name: location.state?.categoryName || 'Categoría',
        description: location.state?.categoryDescription || 'Explora nuestra selección de productos'
    };

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/categories/${categoryId}/products`);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                if (data && data.length > 0) {
                    setProducts(data); // Supongamos que data contiene una lista de productos.
                } else {
                    setProducts([]); // Si no hay productos, establecemos un array vacío.
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductsByCategory();
    }, [categoryId]);



    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
                <p>Verifica la conexión o inténtalo de nuevo más tarde.</p>
            </div>
        );
    }

    return (
        <div className="category-page">
            <div className="category-header">
                <h1 className="category-title">
                    {category?.name || 'Categoría'}
                </h1>
                <p className="category-description">
                    {category?.description || 'Explora nuestra selección de productos'}
                </p>
            </div>

            {products.length === 0 ? (
                <div className="no-products-container">
                    <p className="no-products-message">
                        No hay productos disponibles en esta categoría.
                    </p>
                </div>
            ) : (
                <ProductList
                    title={`Productos en ${category?.name || 'la categoría'}`}
                    products={products}
                    onError={(err) => {
                        console.error('Error en ProductList:', err);
                        setError('Error al mostrar los productos');
                    }}
                />
            )}
        </div>
    );
};

export default Category;