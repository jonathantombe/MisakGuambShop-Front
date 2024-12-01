import React, { useState } from "react";
import "./ProductDescription.css";

// Componente para los productos similares
function SimilarProductCard({ image, name, price, rating }) {
  return (
    <div className="similar-product-card">
      <img src={image} alt={`Imagen de ${name}`} />
      <h3>{name}</h3>
      <p>{price}</p>
      <p>{rating}</p>
    </div>
  );
}

export default function ProductDescription() {
  // Datos de productos similares (pueden venir de una API)
  const similarProducts = [
    { image: "/imagenes/ancestral.png", name: "Producto 1", price: "COP 170,000", rating: "⭐⭐⭐⭐⭐" },
    { image: "/imagenes/ancestral.png", name: "Producto 2", price: "COP 160,000", rating: "⭐⭐⭐⭐" },
  ];

  // Estado para comentarios
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "Hermoso diseño y excelente calidad. ¡Me encantó!",
      user: "María López",
      profilePicture: "/imagenes/persona.png",
    },
    {
      id: 2,
      text: "Muy práctico y único. ¡Perfecto para regalar!",
      user: "Carlos Martínez",
      profilePicture: "/imagenes/persona.png",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  // Manejar el envío de comentarios
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          text: newComment,
          user: "Usuario Anónimo",
          profilePicture: "/imagenes/persona.png", // Foto por defecto
        },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="product-description-container">
      {/* Sección de imágenes */}
      <section className="top-side">
        <div className="images-section">
          <div className="thumbnails">
            <img src="/imagenes/ancestral.png" alt="Miniatura 1" />
            <img src="/imagenes/ancestral.png" alt="Miniatura 2" />
            <img src="/imagenes/ancestral.png" alt="Miniatura 3" />
          </div>
          <div className="main-image">
            <img src="/imagenes/ancestral.png" alt="Producto principal" />
          </div>
        </div>

        {/* Sección de detalles */}
        <div className="details-section">
          <h1 className="product-title">Maxi Bolso Guambiano Brillante Beige/Negro</h1>
          <p className="product-prices">COP 170,000</p>
          <p className="product-ratings">⭐⭐⭐⭐⭐ 5.0 (12 reseñas)</p>
          <p className="product-stocks">1000 disponibles</p>
          <button className="btn-buys" aria-label="Comprar ahora">Comprar Ahora</button>
          <button className="btn-carts" aria-label="Añadir al carrito">Añadir al carrito</button>
        </div>

        {/* Descripción */}
        <div className="product-description">
          <p>
            El Maxi Bolso Beige/Negro Brillante luce preciosos patrones diseñados por el pueblo indígena Guambiano. Cada bolso lleva un atractivo único, artesanal y exclusivo, ¡es perfecto para los días de verano!
          </p>
        </div>
      </section>

      {/* Sección de comentarios */}
      <div className="comments-section">
        <h2>Comentarios:</h2>
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <img
                src={comment.profilePicture}
                alt={`Foto de perfil de ${comment.user}`}
                className="comment-profile-pic"
              />
              <strong>{comment.user}:</strong> {comment.text}
            </li>
          ))}
        </ul>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe tu comentario aquí..."
            rows="3"
            className="comment-input"
          ></textarea>
          <button type="submit" className="btn-submit-comment">Enviar comentario</button>
        </form>
      </div>

      {/* Sección de productos similares */}
      <div className="similar-products">
        <h2>Artículos similares:</h2>
        <div className="similar-products-grid">
          {similarProducts.map((product, index) => (
            <SimilarProductCard
              key={index}
              image={product.image}
              name={product.name}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
