import React from 'react';
import ProductList from '../../components/ProductList/ProductList';
import HeroMisakWelcome from '../../components/HeroMisakWelcome/HeroMisakWelcome';
// import UserProfile from '../../components/UserProfile/Userprofile';
import Footer from '../../components/Footer/Footer';
import TrendingProducts from '../../components/TrendingProducts/TrendingProducts';
import product1 from '../../assets/products/mochilas/04_900x.webp';
import './Home.css';

import CategoryCarousel from '../../components/CategoryCarousel/CategoryCarousel';




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

const featuredProducts = [
    { id: 1, name: 'Bolso Misak', image: product1, rating: 4, price: 130000, totalSales: 12 },
  { id: 2, name: 'Bolso Misak', image: product1, rating: 5, price: 210000, totalSales: 15 },
  { id: 3, name: 'Bolso Misak', image: product1, rating: 3, price: 250000, totalSales: 25 },
  { id: 4, name: 'Bolso Misak', image: product1, rating: 5, price: 280000, totalSales: 30 },
  { id: 5, name: 'Bolso Misak', image: product1, rating: 4, price: 220000, totalSales: 89 },
  { id: 6, name: 'Bolso Misak', image: product1, rating: 2, price: 115000, totalSales: 10 },
  { id: 7, name: 'Bolso Misak', image: product1, rating: 3, price: 195000, totalSales: 5 }
  

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
      <Footer />
    </div>
  );
};

export default Home;