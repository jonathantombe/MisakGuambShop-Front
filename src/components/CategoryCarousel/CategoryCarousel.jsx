import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './CategoryCarousel.css'

// Import images
import mochilas from '../../assets/products/mochilas/03_900x.webp'
import manillas from '../../assets/products/manillas/manilla.png'
import aretes from '../../assets/products/aretes/aretemisak.png'
import collar from '../../assets/products/collar/collar.png'
import instrumentos from '../../assets/products/instrumentos/capador.png'
import camisas from '../../assets/products/camisas/camisa.png'
import pantalones from '../../assets/products/pantalones/pantalones.png'
import zapatos from '../../assets/products/zapatos/zapatos.png'
import joyas from '../../assets/products/joyas/joya.png'
import decoracion from '../../assets/products/decoracion/manteles.png'
import lamparas from '../../assets/products/lamparas/lamparas.png'
import juegos from '../../assets/products/juegos/trompo.png'
import vajilla from '../../assets/products/vajilla/vajilla.png'

const predefinedCategories = [
  { id: 1, name: 'Mochilas', image: mochilas },
  { id: 2, name: 'Manillas', image: manillas },
  { id: 3, name: 'Aretes', image: aretes },
  { id: 4, name: 'Collar', image: collar },
  { id: 5, name: 'Instrumentos', image: instrumentos },
  { id: 6, name: 'Camisas', image: camisas },
  { id: 7, name: 'Pantalones', image: pantalones },
  { id: 8, name: 'Zapatos', image: zapatos },
  { id: 9, name: 'Joyas', image: joyas },
  { id: 10, name: 'Decoración', image: decoracion },
  { id: 11, name: 'Lámparas', image: lamparas },
  { id: 12, name: 'Juegos', image: juegos },
  { id: 13, name: 'Vajilla', image: vajilla },
]

const CategoryCarousel = () => {
  const navigate = useNavigate()
  const carouselRef = useRef(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const response = await api.get('/api/categories/list')
        const categoriesData = response?.data || []

        // Combinar las categorías de la base de datos con las predefinidas
        const mergedCategories = predefinedCategories.map((predefCat) => {
          const dbCategory = categoriesData.find(
            (dbCat) => dbCat.name.toLowerCase() === predefCat.name.toLowerCase()
          )
          return dbCategory
            ? { ...dbCategory, image: predefCat.image }
            : predefCat
        })

        setCategories(mergedCategories)
        setError(null)
      } catch (err) {
        console.error('Error fetching categories:', err)
        setCategories(predefinedCategories)
        setError('Error al cargar categorías: ' + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.id}/products`, {
      state: {
        categoryName: category.name,
        categoryDescription: category.description,
      },
    })
  }

  if (loading) {
    return <div className="loading">Cargando categorías...</div>
  }

  return (
    <div className="carousel-categories">
      {error && <div className="error-message">{error}</div>}
      <h2 className="carousel-title">Descubre Artesanías por Categoría</h2>
      <div className="carousel-wrapper">
        <div ref={carouselRef} className="carousel-items-container">
          {categories.map((category) => (
            <div
              key={category.id}
              className="carousel-item"
              onClick={() => handleCategoryClick(category)}
              role="button"
              tabIndex={0}
            >
              <div className="carousel-image-wrapper">
                <img
                  src={category.image}
                  alt={category.name}
                  className="carousel-image"
                />
              </div>
              <p className="carousel-item-text">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryCarousel
