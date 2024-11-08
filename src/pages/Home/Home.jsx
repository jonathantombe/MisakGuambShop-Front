import React from 'react';
import { useState, useEffect } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import HeroMisakWelcome from '../../components/HeroMisakWelcome/HeroMisakWelcome';
import TrendingProducts from '../../components/TrendingProducts/TrendingProducts';
import product1 from '../../assets/products/mochilas/04_900x.webp';
import './Home.css';
import CategoryCarousel from '../../components/CategoryCarousel/CategoryCarousel';
import api from '../../services/api';



const Home = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No hay token de autenticación');
        }

        const response = await api.get('/api/products/my-approved', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response || !Array.isArray(response)) {
            throw new Error('Respuesta inválida de la API');
        }

        setTopProducts(response);
    } catch (err) {
        console.error('Error detallado:', err);
        let errorMessage = 'Error al cargar sus productos. ';
        errorMessage += err.message;
        setError(errorMessage);
        setTopProducts([]);
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        fetchProducts();
    }, []);
  return (
    <div className="home-page">
      <main className="main-content">
        <HeroMisakWelcome />
        <ProductList products={topProducts} title="Ofertas Top" />
        <div className="banner">
          <CategoryCarousel />
        </div>
        <TrendingProducts /> 
      </main>
     
    </div>
  );
};

export default Home;
