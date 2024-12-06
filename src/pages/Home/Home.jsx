import { useState, useEffect } from 'react'
import ProductList from '../../components/ProductList/ProductList'
import HeroMisakWelcome from '../../components/HeroMisakWelcome/HeroMisakWelcome'
import CategoryCarousel from '../../components/CategoryCarousel/CategoryCarousel'
import api from '../../services/api'
import './Home.css'

const Home = () => {
  const [topProducts, setTopProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const validateProduct = (product) => {
    return (
      product &&
      typeof product === 'object' &&
      product.id &&
      product.name &&
      product.imageUrls &&
      typeof product.price === 'number' &&
      product.price >= 0
    )
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await api.get('/api/products/approved')
      console.log('Productos recibidos (raw):', response)

      if (!response || !Array.isArray(response)) {
        throw new Error('Respuesta inválida de la API')
      }

      // Filtrar productos válidos y logging para debugging
      const validProducts = response.filter((product) => {
        const isValid = validateProduct(product)
        if (!isValid) {
          console.warn('Producto inválido encontrado:', product)
        }
        return isValid
      })

      console.log('Productos válidos filtrados:', validProducts)
      setTopProducts(validProducts)
    } catch (err) {
      console.error('Error al cargar productos:', err)
      setError('Error al cargar los productos. Por favor, intente nuevamente.')
      setTopProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleError = (error) => {
    console.error('Error en componente Home:', error)
    setError('Ha ocurrido un error. Por favor, intente nuevamente.')
  }

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
      </main>
    </div>
  )
}

export default Home
