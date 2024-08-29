import React from 'react';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import ProductList from '../../components/ProductList/ProductList';
import Footer from '../../components/Footer/Footer';
import './Home.css';

// Imágenes del slider
const sliderImages = [
  'https://via.placeholder.com/800x400?text=Slide+1',
  'https://via.placeholder.com/800x400?text=Slide+2',
  'https://via.placeholder.com/800x400?text=Slide+3',
];

// Ofertas top
const topOffers = [
  { id: 1, name: 'Producto 1', image: 'https://via.placeholder.com/200x200?text=Product+1', rating: 4, price: 19.99 },
  { id: 2, name: 'Producto 2', image: 'https://via.placeholder.com/200x200?text=Product+2', rating: 5, price: 29.99 },
];

// Productos destacados
const featuredProducts = [
  { id: 3, name: 'Producto 3', image: 'https://via.placeholder.com/200x200?text=Product+3', rating: 3, price: 15.99 },
  { id: 4, name: 'Producto 4', image: 'https://via.placeholder.com/200x200?text=Product+4', rating: 4, price: 22.99 },
];

const HomePage = () => {
  return (
    <div className="home-page">
      <main className="main-content">
        <ImageSlider images={sliderImages} />
        <ProductList products={topOffers} title="Ofertas Top" />
        <div className="banner">
          {/* Aquí iría el banner "Destacados del día" */}
        </div>
        <ProductList products={featuredProducts} title="Productos destacados" />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
