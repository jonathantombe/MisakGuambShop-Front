import React from 'react';
import { useState, useEffect } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import HeroMisakWelcome from '../../components/HeroMisakWelcome/HeroMisakWelcome';
import TrendingProducts from '../../components/TrendingProducts/TrendingProducts';
import CategoryCarousel from '../../components/CategoryCarousel/CategoryCarousel';
import BuyNowButton from '../../components/BuyNowButton/BuyNowButton'
import api from '../../services/api';
import './Home.css';

const topOffers = [
  { id: 1, name: 'Mochila | Patrimonio Culinario', image: product1, rating: 1, price: 120000, totalSales: 89 },
  { id: 2, name: 'Mochila | Patrimonio Culinario', image: product1, rating: 2, price: 150000, totalSales: 82 },
  { id: 3, name: 'Mochila | Patrimonio Culinario', image: product1, rating: 3, price: 180000, totalSales: 50 },
  { id: 4, name: 'Mochila | Patrimonio Culinario', image: product1, rating: 4, price: 250000, totalSales: 896 },
  { id: 5, name: 'Mochila | Patrimonio Culinario', image: product1, rating: 5, price: 300000, totalSales: 8665 },
  { id: 6, name: 'Mochila | Patrimonio Culinario', image: product1, rating: 2, price: 110000, totalSales: 892 },
  { id: 7, name: 'Mochila | Patrimonio Culinario', image: product1, rating: 3, price: 200000, totalSales: 891 },
  { id: 8, name: 'Mochila | Patrimonio Culinario', image: product1, rating: 4, price: 170000, totalSales: 839 },
  { id: 9, name: 'Mochila | Patrimonio Culinario', image: product1, rating: 3, price: 145000, totalSales: 739 },
  { id: 10, name: 'Mochila | Patrimonio Culinario', image: product1, rating: 5, price: 270000, totalSales: 1000 },
  { id: 11, name: 'Mochila | Patrimonio Culinario', image: product1, rating: 4, price: 210000, totalSales: 300 },
  { id: 12, name: 'Mochila | Patrimonio Culinario', image: product1, rating: 2, price: 190000, totalSales: 500 }
];

const Home = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const validateProduct = (product) => {
    return (
      product &&
      typeof product === 'object' &&
      product.id &&
      product.name &&
      product.imageUrls &&
      typeof product.price === 'number' &&
      product.price >= 0
    );
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/api/products/approved');
      console.log('Productos recibidos (raw):', response);
      
      if (!response || !Array.isArray(response)) {
        throw new Error('Respuesta inválida de la API');
      }

      // Filtrar productos válidos y logging para debugging
      const validProducts = response.filter(product => {
        const isValid = validateProduct(product);
        if (!isValid) {
          console.warn('Producto inválido encontrado:', product);
        }
        return isValid;
      });

      console.log('Productos válidos filtrados:', validProducts);
      setTopProducts(validProducts);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError('Error al cargar los productos. Por favor, intente nuevamente.');
      setTopProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleError = (error) => {
    console.error('Error en componente Home:', error);
    setError('Ha ocurrido un error. Por favor, intente nuevamente.');
  };

  return (
    <div className="home-page">
      <main className="main-content">
        <HeroMisakWelcome />
        {loading ? (
          <div className="loading">Cargando productos...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <ProductList 
            products={topProducts} 
            title="Productos Disponibles" 
            onError={handleError}
          />
        )}
        <div className="banner">
          <CategoryCarousel />
        </div>
        <TrendingProducts /> 
        <BuyNowButton /> 
        <TrendingProducts />
      </main>
    </div>
  );
};

export default Home;