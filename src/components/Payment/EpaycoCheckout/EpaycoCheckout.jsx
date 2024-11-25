import React, { useEffect, useState } from 'react';
import { epaycoService } from '../../../services/epaycoService/epaycoService';

const EpaycoCheckout = ({ orderData }) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    useEffect(() => {
        // Estilos para ocultar elementos de ePayco
        const style = document.createElement('style');
        style.id = 'epayco-custom-styles';
        style.textContent = `
            .epayco-test-mode,
            .epayco-test-warning,
            div[class*="test-mode"],
            div[class*="testmode"],
            .epayco-secure-payment,
            .epayco-powered,
            div[class*="secure-payment"],
            .epayco-title-powered,
            img[alt*="epayco"],
            .epayco-subtitle,
            .epayco-security-logos,
            .security-logos {
                display: none !important;
                visibility: hidden !important;
            }
        `;
        document.head.appendChild(style);

        const loadEpaycoScript = () => {
            try {
                const existingScript = document.getElementById('epayco-script');
                if (existingScript) {
                    setIsScriptLoaded(true);
                    return;
                }

                const script = document.createElement('script');
                script.src = 'https://checkout.epayco.co/checkout.js';
                script.id = 'epayco-script';
                script.async = true;
                script.setAttribute('data-epayco-key', epaycoService.publicKey);

                script.onload = () => {
                    setIsScriptLoaded(true);
                };

                script.onerror = () => {
                    setError('Error al cargar el script de ePayco');
                };

                document.body.appendChild(script);
            } catch (err) {
                setError('Error al inicializar ePayco: ' + err.message);
            }
        };

        loadEpaycoScript();

        return () => {
            const script = document.getElementById('epayco-script');
            const customStyles = document.getElementById('epayco-custom-styles');
            if (script) {
                document.body.removeChild(script);
            }
            if (customStyles) {
                document.head.removeChild(customStyles);
            }
        };
    }, []);

    const handlePayment = () => {
        if (!window.ePayco) {
            setError('ePayco no está inicializado correctamente');
            return;
        }

        try {
            // URLs de redirección
            const baseUrl = window.location.origin;
            const successUrl = `${baseUrl}/`; // Redirección a la página de inicio
            const responseUrl = `${baseUrl}/`; // Redirección a la página de inicio
            const confirmationUrl = `${baseUrl}/api/payments/confirmation`;

            const handler = window.ePayco.checkout.configure({
                key: epaycoService.publicKey,
                test: epaycoService.test,
                external: false,
                autoclick: false,
                response: responseUrl,
                confirmation: confirmationUrl,
                style: {
                    hideLogo: true,
                    hideTestMode: true,
                    hideSecurityLogos: true,
                    backgroundColor: '#ffffff',
                    headerBackgroundColor: '#000000',
                    headerColor: '#ffffff',
                }
            });

            const data = {
                name: "Compra en MisakGuamboShop",
                description: `Orden #${orderData.orderId}`,
                invoice: orderData.orderId,
                currency: "cop",
                amount: orderData.total.toString(),
                tax_base: "0",
                tax: "0",
                country: "co",
                lang: "es",
                external: false,
                extra1: orderData.orderId,
                extra2: orderData.shippingAddress || "",
                extra3: orderData.phone || "",
                name_billing: orderData.customerName || "",
                address_billing: orderData.shippingAddress || "",
                type_doc_billing: "cc",
                mobilephone_billing: orderData.phone || "",
                number_doc_billing: orderData.documentNumber || "",
                response: responseUrl,     // URL de respuesta a página de inicio
                confirmation: confirmationUrl,
                methodsDisable: ["SP", "CASH", "DP"]
            };

            handler.open(data);
            setIsCheckoutOpen(true);
        } catch (err) {
            setError('Error al abrir el checkout: ' + err.message);
        }
    };

    if (error) {
        return (
            <div className="epayco-error">
                <p>Error: {error}</p>
                <button
                    onClick={() => setError(null)}
                    className="retry-button"
                >
                    Intentar de nuevo
                </button>
            </div>
        );
    }

    return (
        <div className="epayco-checkout">
            <button
                onClick={handlePayment}
                className="epayco-button"
                disabled={!isScriptLoaded || isCheckoutOpen}
            >
                {!isScriptLoaded ? 'Cargando...' : 'Proceder al Pago'}
            </button>
        </div>
    );
};

export default EpaycoCheckout;