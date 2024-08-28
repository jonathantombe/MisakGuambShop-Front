import React from 'react';
import Header from '../../components/Header/Header';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import Footer from '../../components/Footer/Footer';
import './Home.css';

// Datos de ejemplo
const sliderImages = [
  'url_to_image1.jpg',
  'url_to_image2.jpg',
  'url_to_image3.jpg',
];

const topOffers = [
  { id: 1, name: 'Producto 1', image: 'url_to_product1.jpg', rating: 4, price: 19.99 },
  { id: 2, name: 'Producto 2', image: 'url_to_product2.jpg', rating: 5, price: 29.99 },
  // ... más productos
];

const featuredProducts = [
  { id: 3, name: 'Producto 3', image: 'url_to_product3.jpg', rating: 3, price: 15.99 },
  { id: 4, name: 'Producto 4', image: 'url_to_product4.jpg', rating: 4, price: 22.99 },
  // ... más productos
];

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <main className="main-content">
        <ImageSlider images={sliderImages} />
        <ProductGrid products={topOffers} title="Ofertas Top" />
        <div className="banner">
          {/* Aquí iría el banner "Destacados del día" */}
        </div>
        <ProductGrid products={featuredProducts} title="Productos destacados" />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;