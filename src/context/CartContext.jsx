import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Inicializar el carrito desde localStorage
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  // Guardar el carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => {
    // Verificar si el item ya existe en el carrito
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    )

    if (existingItemIndex > -1) {
      // Si existe, actualizar la cantidad
      const updatedCart = cart.map((cartItem, index) =>
        index === existingItemIndex
          ? {
              ...cartItem,
              quantity: (cartItem.quantity || 1) + (item.quantity || 1),
            }
          : cartItem
      )
      setCart(updatedCart)
    } else {
      // Si no existe, agregar nuevo item
      setCart([...cart, { ...item, quantity: item.quantity || 1 }])
    }
  }

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId)
    setCart(updatedCart)
  }

  const clearCart = () => {
    setCart([])
  }

  const updateItemQuantity = (itemId, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    )
    setCart(updatedCart)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
