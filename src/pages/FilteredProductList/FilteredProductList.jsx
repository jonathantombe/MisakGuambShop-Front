import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import ProductList from '../../components/ProductList/ProductList'
import './FilteredProductList.css'
import api from '../../services/api'

const FilteredProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { categoryId } = useParams()
  const location = useLocation()
  const categoryName = location.state?.categoryName || 'Productos'

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true)
        const response = await api.get(`/api/categories/${categoryId}/products`)

        console.log('API Response:', response)

        const data = response.data || response.products || response

        if (!data || !Array.isArray(data)) {
          throw new Error('Invalid product data received')
        }

        const transformedProducts = data.map((product) => ({
          ...product,
          imageUrls: product.images?.map((img) => img.imageUrl) || [],
        }))

        setProducts(transformedProducts)
        setError(null)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err.message || 'Error al cargar los productos')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    if (categoryId) {
      fetchProductsByCategory()
    }
  }, [categoryId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-lg">Cargando productos...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="filteredproductlist-container">
      <ProductList
        title={`${categoryName}`}
        products={products}
        onError={(error) => setError(error.message)}
      />
    </div>
  )
}

export default FilteredProductList
