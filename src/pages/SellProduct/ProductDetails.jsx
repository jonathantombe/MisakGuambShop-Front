import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../utils/categories';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './ProductDetails.css';

const ProductDetails = () => {
    const { user } = useAuth();
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        description: '',
        stock: '',
        category: '',
        images: []
    });
    const [errors, setErrors] = useState({});
    const [submissionMessage, setSubmissionMessage] = useState('');
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const validateForm = () => {
        let newErrors = {};
        if (!productData.name.trim()) {
            newErrors.name = "El nombre es obligatorio";
        } else if (productData.name.length > 100) {
            newErrors.name = "El nombre debe tener menos de 100 caracteres";
        }

        if (!productData.description.trim()) {
            newErrors.description = "La descripción es obligatoria";
        } else if (productData.description.length > 500) {
            newErrors.description = "La descripción debe tener menos de 500 caracteres";
        }

        if (!productData.price || isNaN(productData.price) || parseFloat(productData.price) <= 0) {
            newErrors.price = "El precio debe ser un número mayor que cero";
        }

        if (!productData.stock || isNaN(productData.stock) || parseInt(productData.stock) < 0) {
            newErrors.stock = "El stock debe ser un número no negativo";
        }

        if (!productData.category) {
            newErrors.category = "La categoría es obligatoria";
        }

        if (productData.images.length === 0) {
            newErrors.images = "Debe subir al menos una imagen";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const totalImages = productData.images.length + files.length;

        if (totalImages > 3) {
            setErrors({ ...errors, images: "Solo puedes subir un máximo de 3 imágenes." });
            return;
        }

        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setProductData({
            ...productData,
            images: [...productData.images, ...newImages]
        });
        setErrors({ ...errors, images: null });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const files = Array.from(e.dataTransfer.files);
        handleImageUpload({ target: { files } });
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleRemoveImage = (index) => {
        const newImages = [...productData.images];
        URL.revokeObjectURL(newImages[index].preview);
        newImages.splice(index, 1);
        setProductData({
            ...productData,
            images: newImages
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const formData = new FormData();
                formData.append('name', productData.name);
                formData.append('description', productData.description);
                formData.append('price', parseFloat(productData.price) || 0);
                formData.append('stock', parseInt(productData.stock) || 0);
                formData.append('categoryId', parseInt(productData.category) || 0);
                formData.append('sellerId', user.id);

                productData.images.forEach((image) => {
                    formData.append('image', image.file);
                });

                const response = await api.post('/api/products', formData);
                console.log('Server response:', response);

                if (response && response.data && response.data.id) {
                    setSubmissionMessage(response.data.message);
                    // Clear the form or navigate after a delay
                    setTimeout(() => {
                        navigate('/seller/dashboard');
                    }, 5000);
                } else {
                    console.error('Unexpected response:', response);
                    throw new Error('Su producto está en revisión. Le notificaremos cuando sea aprobado.');
                }
            } catch (error) {
                console.error('Error al crear el producto:', error);
                let errorMessage = "Error al crear el producto. Por favor, inténtalo de nuevo.";
                if (error.response) {
                    console.error('Error response:', error.response);
                    errorMessage = error.response.data?.message || error.response.statusText;
                } else if (error.request) {
                    console.error('Error request:', error.request);
                    errorMessage = "No se recibió respuesta del servidor";
                } else {
                    console.error('Error message:', error.message);
                    errorMessage = error.message;
                }
                setErrors({ ...errors, submit: errorMessage });
            }
        }
    };


    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="product-details__container">
            <div className='product-details__container-div'>
                <button onClick={handleBackClick} className="product-details__back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M2.7 11.3L2 12l.7.7 4 4c.4.4 1 .4 1.4 0 .4-.4.4-1 0-1.4L5.8 13H15c.6 0 1-.4 1-1s-.4-1-1-1H5.8l2.3-2.3c.2-.2.3-.4.3-.7 0-.6-.4-1-1-1-.3 0-.5.1-.7.3l-4 4z"></path><path d="M22 19H10v-2h10V7H10V5h12z"></path></svg>
                    <p>Volver</p>
                </button>
                <h1 className="product-details__title">Añadir Nuevo Producto</h1>
                <p className="product-details__introduction">
                    Completa los detalles del producto para añadirlo a <strong>nuestra tienda MisakGuambShop</strong>. Proporciona información precisa para ayudar a los clientes a tomar decisiones informadas y valorar el trabajo artesanal único de la comunidad Misak.
                </p>
                <form onSubmit={handleSubmit} className="product-details__form">
                    <div className="product-details__form-group">
                        <label htmlFor="name" className="product-details__label">Nombre del Producto</label>
                        <div className="product-details__input-wrapper">
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={productData.name}
                                onChange={handleInputChange}
                                placeholder="Ingresa el nombre del producto"
                                required
                                className="product-details__input"
                            />
                        </div>
                        {errors.name && <p className="product-details__error">{errors.name}</p>}
                    </div>
                    <div className="product-details__form-group">
                        <label htmlFor="price" className="product-details__label">Precio</label>
                        <div className="product-details__input-wrapper">
                            <input
                                id="price"
                                type="number"
                                name="price"
                                value={productData.price}
                                onChange={handleInputChange}
                                placeholder="Ingresa el precio"
                                required
                                className="product-details__input"
                            />
                        </div>
                        {errors.price && <p className="product-details__error">{errors.price}</p>}
                    </div>
                    <div className="product-details__form-group">
                        <label htmlFor="stock" className="product-details__label">Cantidad en Inventario</label>
                        <div className="product-details__input-wrapper">
                            <input
                                id="stock"
                                type="number"
                                name="stock"
                                value={productData.stock}
                                onChange={handleInputChange}
                                placeholder="Ingresa la cantidad disponible"
                                required
                                className="product-details__input"
                            />
                        </div>
                        {errors.stock && <p className="product-details__error">{errors.stock}</p>}
                    </div>
                    <div className="product-details__form-group">
                        <label htmlFor="category" className="product-details__label">Categoría</label>
                        <select
                            id="category"
                            name="category"
                            value={productData.category}
                            onChange={handleInputChange}
                            required
                            className="product-details__select"
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        {errors.category && <p className="product-details__error">{errors.category}</p>}
                    </div>
                    <div className="product-details__form-group">
                        <label htmlFor="description" className="product-details__label">Descripción</label>
                        <textarea
                            id="description"
                            name="description"
                            value={productData.description}
                            onChange={handleInputChange}
                            placeholder="Describe tu producto detalladamente..."
                            required
                            className="product-details__textarea"
                        />
                        {errors.description && <p className="product-details__error">{errors.description}</p>}
                    </div>
                    <div className="product-details__form-group">
                        <label htmlFor="images" className="product-details__label">Imágenes del Producto</label>
                        <div
                            className="product-details__image-upload-area"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            {productData.images.length > 0 ? (
                                <div className="product-details__image-preview-container">
                                    {productData.images.map((image, index) => (
                                        <div key={index} className="product-details__image-preview">
                                            <img src={image.preview} alt={`Preview ${index}`} />
                                            <div className="product-details__image-actions">
                                                <button type="button" onClick={() => handleRemoveImage(index)}>Eliminar</button>
                                            </div>
                                        </div>
                                    ))}
                                    {productData.images.length < 3 && (
                                        <div
                                            className="product-details__image-upload"
                                            onClick={handleUploadClick}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                <polyline points="17 8 12 3 7 8" />
                                                <line x1="12" y1="3" x2="12" y2="15" />
                                            </svg>
                                            <p>Seleccionar</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div
                                    className="product-details__image-upload-b"
                                    onClick={handleUploadClick}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                    <p>Seleccionar o arrastrar los archivos aquí</p>
                                    <span>Sube tu imagen en JPG, JPEG, PNG o WEBP con una resolución mínima de 500 píxeles en ambos lados y hasta 20MB de peso.</span>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                id="images"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                                className="product-details__file-input"
                                style={{ display: 'none' }}
                            />
                        </div>
                        {errors.images && <p className="product-details__error">{errors.images}</p>}
                    </div>
                    {submissionMessage && (
                        <div className="product-details__submission-message">
                            {submissionMessage}
                        </div>
                    )}
                    {errors.submit && <p className="product-details__error">{errors.submit}</p>}
                    <button type="submit" className="product-details__submit-button">Publicar producto</button>
                </form>
            </div>
        </div>
    );
};

export default ProductDetails;