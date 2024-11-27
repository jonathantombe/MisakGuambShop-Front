import EpaycoCheckout from '../../components/Payment/EpaycoCheckout/EpaycoCheckout';

const Checkout = () => {
    const orderData = {
        orderId: `ORDER-${Date.now()}`, // Genera un ID único
        total: 50000, // El total de la compra en centavos
        shippingAddress: "Calle Principal #123",
        phone: "3001234567"
    };

    return (
        <div className="checkout-page">
            <h1>Finalizar Compra</h1>
            <EpaycoCheckout orderData={orderData} />
        </div>
    );
};

export default Checkout;