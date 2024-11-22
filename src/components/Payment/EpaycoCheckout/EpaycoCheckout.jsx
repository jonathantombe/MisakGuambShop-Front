import React, { useEffect } from 'react';
import { epaycoService } from '../../../services/epaycoService/epaycoService';
import './EpaycoCheckout.css';

const EpaycoCheckout = ({ orderData }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.epayco.co/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = () => {
        const handler = window.ePayco.checkout.configure({
            key: epaycoService.publicKey,
            test: true
        });

        // Datos de prueba del cliente
        const testCustomer = {
            name: "Usuario de Prueba",
            email: "usuario@test.com",
            document: "1234567890",
            phone: "3123456789",
        };

        const data = {
            //Parametros compra (obligatorio)
            name: "Compra en MisakGuamboShop",
            description: `Orden #${orderData.orderId}`,
            currency: "cop",
            amount: orderData.total.toString(),
            tax_base: "0",
            tax: "0",
            country: "co",
            lang: "es",

            //Onpage="false" - Standard="true"
            external: "false",

            //Atributos opcionales
            extra1: orderData.orderId,
            extra2: "extra2",
            extra3: "extra3",

            // Atributos cliente
            name_billing: testCustomer.name,
            address_billing: orderData.shippingAddress || "Dirección de prueba",
            type_doc_billing: "cc",
            number_doc_billing: testCustomer.document,
            mobilephone_billing: testCustomer.phone,
            email_billing: testCustomer.email,

            //atributos opcionales del cliente
            phoneCode_billing: "57",

            //atributos obligatorios del cliente
            invoice: orderData.orderId,

            //Urls response (Opcional)
            response: `${window.location.origin}/payment/success`,
            confirmation: `${window.location.origin}/api/payment/confirmation`,
            methodsDisable: ["SP", "CASH", "DP"]
        };

        console.log('ePayco configuration:', {
            key: epaycoService.publicKey,
            test: true,
            data: data
        });

        handler.open(data);
    };

    return (
        <div className="epayco-checkout">
            <button
                className="epayco-button"
                onClick={handlePayment}
            >
                Pagar con ePayco
            </button>
        </div>
    );
};

export default EpaycoCheckout;