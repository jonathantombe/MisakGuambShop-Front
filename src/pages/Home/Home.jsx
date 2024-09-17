import React from 'react';
import ProductList from '../../components/ProductList/ProductList';
import HeroMisakWelcome from '../../components/HeroMisakWelcome/HeroMisakWelcome';
import UserProfile from '../../components/UserProfile/Userprofile';
import Footer from '../../components/Footer/Footer';
import TrendingProducts from '../../components/TrendingProducts/TrendingProducts';
import product1 from '../../assets/products/mochila-tejido-misak-1.jpg';
import './Home.css';

import CategoryCarousel from '../../components/CategoryCarousel/CategoryCarousel';




const topOffers = [
  { id: 1, name: 'Bolso Misak', image: product1, rating: 1, price: 19.99, totalSales: 89.63 },
  { id: 2, name: 'Bolso Misak', image: product1, rating: 2, price: 29.99, totalSales: 89.63 },
  { id: 3, name: 'Bolso Misak', image: product1, rating: 3, price: 29.99, totalSales: 89.63 },
  { id: 4, name: 'Bolso Misak', image: product1, rating: 4, price: 29.99, totalSales: 89.69 },
  { id: 5, name: 'Bolso Misak', image: product1, rating: 5, price: 29.99, totalSales: 86.65 },
  { id: 1, name: 'Bolso Misak', image: product1, rating: 1, price: 19.99, totalSales: 89.63 },
  { id: 2, name: 'Bolso Misak', image: product1, rating: 2, price: 29.99, totalSales: 89.63 },
  { id: 3, name: 'Bolso Misak', image: product1, rating: 3, price: 29.99, totalSales: 89.63 },
  { id: 1, name: 'Bolso Misak', image: product1, rating: 1, price: 19.99, totalSales: 89.63 },
  { id: 2, name: 'Bolso Misak', image: product1, rating: 2, price: 29.99, totalSales: 89.63 },



];

const featuredProducts = [
  { id: 6, name: 'Bolso Misak', image: product1, rating: 6, price: 15.99, totalSales: 12.59 },
  { id: 7, name: 'Bolso Misak', image: product1, rating: 7, price: 22.99, totalSales: 13.56 },
  { id: 8, name: 'Bolso Misak', image: product1, rating: 8, price: 22.99, totalSales: 25.89 },
  { id: 9, name: 'Bolso Misak', image: product1, rating: 9, price: 22.99, totalSales: 57.89 },
  { id: 10, name: 'Bolso Misak', image: product1, rating: 10, price: 22.99, totalSales: 89.65 },
  { id: 6, name: 'Bolso Misak', image: product1, rating: 6, price: 15.99, totalSales: 12.59 },
  { id: 7, name: 'Bolso Misak', image: product1, rating: 7, price: 22.99, totalSales: 13.56 },
  { id: 8, name: 'Bolso Misak', image: product1, rating: 8, price: 22.99, totalSales: 25.89 },
  { id: 9, name: 'Bolso Misak', image: product1, rating: 9, price: 22.99, totalSales: 57.89 },
  { id: 10, name: 'Bolso Misak', image: product1, rating: 10, price: 22.99, totalSales: 89.65 },

];

const Home = () => {
  return (
    <div className="home-page">
      <main className="main-content">
        <HeroMisakWelcome />
        <ProductList products={topOffers} title="Ofertas Top" />
        <div className="banner">
       
        <CategoryCarousel />
        </div>
        <TrendingProducts products={featuredProducts} title="Productos destacados" />
      </main>
      <UserProfile />
      <Footer />
    </div>
  );
};

export default Home;