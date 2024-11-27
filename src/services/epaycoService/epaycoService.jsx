export const epaycoService = {
    publicKey: import.meta.env.VITE_EPAYCO_PUBLIC_KEY || '5dcace84946329a69143ef93587fb6be',
    privateKey: import.meta.env.VITE_EPAYCO_PRIVATE_KEY || '12c19daada92fb459d1c04a54aea67db',
    clientId: import.meta.env.VITE_EPAYCO_CLIENT_ID || '1519972',
    test: true
};
