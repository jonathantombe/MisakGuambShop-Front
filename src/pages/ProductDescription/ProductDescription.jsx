import React from "react";
import "./ProductDescription.css";

export default function ProductDescription() {
  return (
    <div>
      <div className="images-product">
        <img src="/imagenes/ancestral.png" alt="product" />
        <img src="/imagenes/ancestral.png" alt="product" />
        <img src="/imagenes/ancestral.png" alt="product" />
      </div>
      <div className="big-img">
        <img src="https://via.placeholder.com/150" alt="product" />
        <p>Descripcion del producto</p>
      </div>
      <div className="product-price">
        <p>COP 170,000</p>
      </div>

      <div className="title-product-container">
        <h1 className="title-product">Bolso Guambiano</h1>
        <hr></hr>
        <p>1000 disponibles</p>
        <button className="btn-buy">Comprar Ahora</button>
        <button className="btn-cart">Añadir al carrito</button>
      </div>
    </div>
  );
}
