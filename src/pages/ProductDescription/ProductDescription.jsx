import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './ProductDescription.css'
import { useAuth } from '../../context/AuthContext'

export default function ProductDescription() {
  const { user } = useAuth()

  const params = useParams()
  const navigate = useNavigate()
  const id = params.id

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [addingToCart, setAddingToCart] = useState(false)

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
    if (!user) {
      navigate('/login')
      return
    }
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
    if (!user) {
      navigate('/login')
      return
    }

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
          <p className="product-prices">{`COP ${Number(
            product.price
          ).toLocaleString('es-CO')}`}</p>

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
      </section>
      <div className="product-description">
        <p>{product.description}</p>
      </div>
    </div>
  )
}
