import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './ProductDescription.css'

function SimilarProductCard({ image, name, price, rating }) {
  return (
    <div className="similar-product-card">
      <img src={image} alt={`Imagen de ${name}`} />
      <h3>{name}</h3>
      <p>{price}</p>
      <p>{rating}</p>
    </div>
  )
}

export default function ProductDescription() {
  const params = useParams()
  const navigate = useNavigate()
  const id = params.id

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [addingToCart, setAddingToCart] = useState(false)

  const [comments, setComments] = useState([
    {
      id: 1,
      text: 'Hermoso diseño y excelente calidad. ¡Me encantó!',
      user: 'María López',
      profilePicture: '/imagenes/persona.png',
    },
    {
      id: 2,
      text: 'Muy práctico y único. ¡Perfecto para regalar!',
      user: 'Carlos Martínez',
      profilePicture: '/imagenes/persona.png',
    },
  ])
  const [newComment, setNewComment] = useState('')

  const similarProducts = [
    {
      image: '/imagenes/ancestral.png',
      name: 'Producto 1',
      price: 'COP 170,000',
      rating: '⭐⭐⭐⭐⭐',
    },
    {
      image: '/imagenes/ancestral.png',
      name: 'Producto 2',
      price: 'COP 160,000',
      rating: '⭐⭐⭐⭐',
    },
  ]

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await api.get('/api/products/detail/' + id)
      setProduct(response)
      setError(null)
    } catch (err) {
      console.error('Error al cargar producto:', err)
      setError('Error al cargar el producto. Por favor, intente nuevamente.')
      setProduct(null)
    } finally {
      setLoading(false)
    }
  }


  const getCart = () => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || []
    } catch (error) {
      console.error('Error al obtener el carrito:', error)
      return []
    }
  }


  const saveCart = (cart) => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart))
    } catch (error) {
      console.error('Error al guardar el carrito:', error)
    }
  }

  const handleAddToCart = async () => {
    if (!product || addingToCart) return

    try {
      setAddingToCart(true)

      const currentCart = getCart()

      const existingItemIndex = currentCart.findIndex(
        (item) => item.id === product.id
      )

      if (existingItemIndex >= 0) {
        currentCart[existingItemIndex].quantity += 1
      } else {
        currentCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrls: product.imageUrls,
          quantity: 1,
        })
      }

      saveCart(currentCart)

      navigate('/shopping/cart')
    } catch (error) {
      console.error('Error al agregar al carrito:', error)
      alert('Error al agregar al carrito. Por favor, intente nuevamente.')
    } finally {
      setAddingToCart(false)
    }
  }

  const handleBuyNow = () => {
    if (!product) return

    try {
      const buyNowItem = [
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.imageUrls[0],
          quantity: 1,
        },
      ]

      saveCart(buyNowItem)

      navigate('/shopping/cart')
    } catch (error) {
      console.error('Error al procesar la compra:', error)
      alert('Error al procesar la compra. Por favor, intente nuevamente.')
    }
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          text: newComment,
          user: 'Usuario Anónimo',
          profilePicture: '/imagenes/persona.png',
        },
      ])
      setNewComment('')
    }
  }

  // Efecto para cargar el producto
  useEffect(() => {
    fetchProduct()
  }, [id])

  if (loading) {
    return <div className="loading">Cargando producto...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!product) {
    return <div className="error">Producto no encontrado</div>
  }

  return (
    <div className="product-description-container">
      <section className="top-side">
        <div className="images-section">
          <div className="main-image">
            <img
              src={product.imageUrls[0] || '/placeholder-image.png'}
              alt={product.name}
            />
          </div>
        </div>

        <div className="details-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-prices">{product.price}</p>
          <p className="product-ratings">⭐⭐⭐⭐⭐ 5.0 (12 reseñas)</p>
          <p className="product-stocks">{product.stock} disponibles</p>
          <button
            className="btn-buys"
            aria-label="Comprar ahora"
            onClick={handleBuyNow}
            disabled={addingToCart || !product.stock}
          >
            Comprar Ahora
          </button>
          <button
            className="btn-carts"
            aria-label="Añadir al carrito"
            onClick={handleAddToCart}
            disabled={addingToCart || !product.stock}
          >
            {addingToCart ? 'Agregando...' : 'Añadir al carrito'}
          </button>
        </div>

        <div className="product-description">
          <p>{product.description}</p>
        </div>
      </section>

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
          <button type="submit" className="btn-submit-comment">
            Enviar comentario
          </button>
        </form>
      </div>

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
  )
}
