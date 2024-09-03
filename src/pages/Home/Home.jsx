import React from 'react';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import ProductList from '../../components/ProductList/ProductList';
import Footer from '../../components/Footer/Footer';

import product1 from '../../assets/products/mochila-tejido-misak-1.jpg';

import './Home.css';



const topOffers = [
  { id: 1, name: 'Producto 1', image: product1, rating: 1, price: 19.99 },
  { id: 2, name: 'Producto 2', image: product1, rating: 2, price: 29.99 },
  { id: 3, name: 'Producto 2', image: product1, rating: 3, price: 29.99 },
  { id: 4, name: 'Producto 2', image: product1, rating: 4, price: 29.99 },
  { id: 5, name: 'Producto 2', image: product1, rating: 5, price: 29.99 },
];

const featuredProducts = [
  { id: 6, name: 'Producto 3', image: product1, rating: 6, price: 15.99 },
  { id: 7, name: 'Producto 4', image: product1, rating: 7, price: 22.99 },
  { id: 8, name: 'Producto 4', image: product1, rating: 8, price: 22.99 },
  { id: 9, name: 'Producto 4', image: product1, rating: 9, price: 22.99 },
  { id: 10, name: 'Producto 4', image: product1, rating: 10, price: 22.99 },
  
];

const Home = () => {
  return (
    <div className="home-page">
      <main className="main-content">
        <ImageSlider images={ImageSlider} />
        <ProductList products={topOffers} title="Ofertas Top" />
        <div className="banner">
        </div>
        <ProductList products={featuredProducts} title="Productos destacados" />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
