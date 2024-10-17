import React, { useEffect, useState } from 'react';
import { Trash2, ShoppingCart } from 'lucide-react';
import ProductModal from '../../components/ProductModal/ProductModal';

import './CartPage.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [modalProduct, setModalProduct] = useState(null);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart.map(item => ({ ...item, selected: false })));
    }, []);

    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
        setCartItems(cartItems.map(item => ({ ...item, selected: !selectAll })));
    };

    const toggleSelectItem = (id) => {
        setCartItems(cartItems.map(item => 
            item.id === id ? { ...item, selected: !item.selected } : item
        ));
    };

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const updateQuantity = (id, newQuantity) => {
        const updatedCart = cartItems.map(item => 
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const openModal = (product) => {
        setModalProduct(product);
    };

    const closeModal = () => {
        setModalProduct(null);
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="cart-header">
                    <h1>Cesta de la compra ({itemCount})</h1>
                    <div className="select-all">
                        <input 
                            type="checkbox" 
                            checked={selectAll} 
                            onChange={toggleSelectAll}
                        />
                        <span>Seleccionar todos los productos</span>
                        <button className="delete-selected">Borrar Productos Seleccionados</button>
                    </div>
                </div>
                {cartItems.length > 0 ? (
                    cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <input 
                                type="checkbox" 
                                checked={item.selected} 
                                onChange={() => toggleSelectItem(item.id)}
                            />
                            <img src={item.image} alt={item.name} />
                            <div className="item-details">
                                <p className="item-name">{item.name}</p>
                                <p className="item-price">COP {item.price.toLocaleString()}</p>
                                <p className="item-stock">{item.stock} disponible(s)</p>
                            </div>
                            <div className="quantity-control">
                                <button onClick={() => openModal(item)}>
                                    Cantidad: {item.quantity}
                                </button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="remove-item">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="empty-cart">
                        <ShoppingCart size={48} />
                        <p>Tu carrito está vacío</p>
                    </div>
                )}
            </div>
            <div className="order-summary">
                <h2>Total del pedido:</h2>
                <p>Total del pedido: COP {totalPrice.toLocaleString()}</p>
                <button className="pay-button">Pagar</button>
            </div>
            {modalProduct && (
                <ProductModal 
                    product={modalProduct}
                    onClose={closeModal}
                    onUpdateQuantity={updateQuantity}
                />
            )}
        </div>
    );
};

export default CartPage;