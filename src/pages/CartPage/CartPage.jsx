import React, { useEffect, useState, useMemo } from 'react';
import { ShoppingCart } from 'lucide-react';
import { epaycoService } from '../../services/epaycoService/epaycoService';
import Collaboration from '../../assets/icons/collaboration.png';
import './CartPage.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart.map(item => ({ ...item, selected: false })));

        const loadEpaycoScript = () => {
            const existingScript = document.getElementById('epayco-script');
            if (!existingScript) {
                const script = document.createElement('script');
                script.src = 'https://checkout.epayco.co/checkout.js';
                script.id = 'epayco-script';
                script.async = true;
                script.setAttribute('data-epayco-key', epaycoService.publicKey);
                document.body.appendChild(script);
            }
        };
        loadEpaycoScript();

        return () => {
            const script = document.getElementById('epayco-script');
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const toggleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        setCartItems(cartItems.map(item => ({ ...item, selected: newSelectAll })));
    };

    const toggleSelectItem = (id) => {
        const updatedItems = cartItems.map(item =>
            item.id === id ? { ...item, selected: !item.selected } : item
        );
        setCartItems(updatedItems);

        // Check if all items are selected
        const allSelected = updatedItems.every(item => item.selected);
        setSelectAll(allSelected);
    };

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeSelectedItems = () => {
        const updatedCart = cartItems.filter(item => !item.selected);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setSelectAll(false);
    };

    const updateQuantity = (id, change) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, Math.min(item.stock, (item.quantity || 1) + change));
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const totalPrice = useMemo(() =>
        cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0),
        [cartItems]
    );

    const handlePayment = () => {
        if (!window.ePayco) {
            alert('Error al cargar el sistema de pagos. Por favor, intente nuevamente.');
            return;
        }

        setIsProcessingPayment(true);

        try {
            const orderId = `ORDER-${Date.now()}`;
            const handler = window.ePayco.checkout.configure({
                key: epaycoService.publicKey,
                test: epaycoService.test,
                external: false,
                autoclick: false,
                response: `${window.location.origin}/payment/response`,
            });

            const data = {
                name: "Compra en MisakGuamboShop",
                description: `Orden #${orderId}`,
                invoice: orderId,
                currency: "cop",
                amount: totalPrice.toString(),
                tax_base: "0",
                tax: "0",
                country: "co",
                lang: "es",
                external: false,
                extra1: orderId,
                name_billing: "Cliente",
                type_doc_billing: "cc",
                response: `${window.location.origin}/payment/success`,
                confirmation: `${window.location.origin}/api/payments/confirmation`,
                methodsDisable: ["SP", "CASH", "DP"]
            };

            handler.open(data);
        } catch (error) {
            console.error('Error al procesar el pago:', error);
            alert('Error al iniciar el proceso de pago. Por favor intente nuevamente.');
        } finally {
            setIsProcessingPayment(false);
        }
    };

    return (
        <div className='cart-header-container'>
            <div className='cart-title-section'>
                <h1 className='wt-text-title-larger'>Carrito de compra</h1>
                <div className="confidence-message">
                    <img src={Collaboration} alt="" />
                    <span className="confidence-text">
                        <strong>Compra con confianza en MisakGuambShop</strong> con el programa de protección al comprador, aseguramos que recibirás un reembolso completo si tu pedido no llega, llega dañado o no coincide con la descripción.
                    </span>
                </div>
            </div>
            <div className="cart-page">
                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <ShoppingCart size={50} />
                        <p className='wt-text-heading '>Tu carrito está vacío</p>
                    </div>
                ) : (
                    <>
                        <div className="cart-container">
                            <div className="cart-header">
                                <div className="select-all">
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={toggleSelectAll}
                                    />
                                    <h2 className='select__products'>Seleccionar todos los productos</h2>
                                    {selectAll && cartItems.some(item => item.selected) && (
                                        <button
                                            className="delete-selected"
                                            onClick={removeSelectedItems}
                                        >
                                            Borrar Productos Seleccionados
                                        </button>
                                    )}
                                </div>
                            </div>

                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <div className='cart-item-container'>
                                        <input
                                            type="checkbox"
                                            checked={item.selected}
                                            onChange={() => toggleSelectItem(item.id)}
                                        />
                                        <div className='cart-item-image-container'>
                                            <img
                                                src={item.imageUrls?.[0] || '/placeholder-image.png'}
                                                alt={item.name}
                                                className="cart-item-image"
                                            />
                                        </div>
                                    </div>

                                    <div className='cart-item-container'>
                                        <div className="item-details">
                                            <p className="item-name">{item.name}</p>
                                            <p className="item-price">$ {item.price.toLocaleString()}</p>
                                            <p className="item-stock">Disponible {item.stock} </p>
                                        </div>
                                        <div className="quantity-controls">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="quantity-button"
                                                disabled={item.quantity <= 1}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="25"
                                                    height="25"
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M3.5 8a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5z" />
                                                </svg>
                                            </button>
                                            <span className="quantity-display">{item.quantity || 1}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="quantity-button"
                                                disabled={item.quantity >= item.stock}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="25"
                                                    height="25"
                                                    fill="currentColor"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="remove-item">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-summary">
                            <div className="summary-row">
                                <div className="summary-label">
                                    <span className='subtotal'>SUBTOTAL:</span>
                                </div>
                                <div className="summary-amount">
                                        <span className='total-price'><span className='cop'>$</span> {totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                            <button
                                className="pay-button"
                                disabled={isProcessingPayment}
                                onClick={handlePayment}
                            >
                                    {isProcessingPayment ? 'Procesando...' : 'Realizar pedido'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartPage;