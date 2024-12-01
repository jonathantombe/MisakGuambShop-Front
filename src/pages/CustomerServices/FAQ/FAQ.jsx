import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: '¿Qué tipo de artesanías indígenas venden?',
      answer: 'Vendemos toodo tipo de artesanias desde collares, manillas pircings y anillos hasta cosas mas grandes como tipo de ropa, bolsos, manualidades varias, calzado y muchas cosas mas hecha un vistazo por nuestra tienda, conoce y conoce todos nuestros productos.',
    },
    {
      question: '¿De qué regiones provienen las artesanías que ofrecen?',
      answer: 'nuestros productos provienen de todas as regiones del pais desde los huitoto de la amazonia, pasando por los arhuacos en la cordillera de los andes, hasta los wayuu en la guajira. estamos en todo el pais y buscamos expandirnos a nivel global.',
    },
    {
      question: '¿Cómo garantizan la autenticidad de las artesanías?',
      answer: 'En misakGuambShop buscamos la trasparencia y calidad de nuestros productos, por lo cual tenemos varias practicas para garantizar el mejor producto, algunas de nuestras practicas son:Certificados de origen, Certificados y etiquetas digitales de autenticidad,  fotografias y videos del proceso de producion, perfil del artesano, certificacion y aianzas con organizacones de comercio justo , sellos digitales de garantia de origen, politica de garantia y trasparencia.',
    },
    {
      question: '¿Ofrecen artesanías de alguna tribu o grupo étnico específico?',
      answer: '¡Claro que si¡, puedes buscar la etnia, comunidad o regio en especifico que decees conocer.',
    },
    {
      question: '¿Cuáles son los materiales utilizados en las artesanías?',
      answer: 'nuestros talentos artesanos usan una gran variedad de materiales la mayoria recoletados de la naturaleza como: lana de oveja, peles de animales, bambu, guadua, fibra de arboles, piedras, entre muchas cosas mas. Todos los productos tienen los materiales que se utilizaron y los detalles del producto, entra y descubre la gran variedad de productos que tenemos.',
    },
    {
      question: '¿Cómo puedo contactar con ustedes si tengo más preguntas?',
      answer: 'Nos puedes encontrar en todas las redes sociales como misakGuambShop@gmai.com deonde recibimos quejas, sujerencias, reclamos, colaboradores y muchas cosas mas.',
    }
  ];

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>Preguntas Frecuentes</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="faq-item"
          >
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)} // Cambia el estado al hacer clic
            >
              {faq.question}
            </div>
            {expandedIndex === index && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;