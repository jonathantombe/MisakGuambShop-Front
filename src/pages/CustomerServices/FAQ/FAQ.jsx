import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import './FAQ.css';
const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: '¿Qué tipo de artesanías indígenas venden?',
      route: '/artesanias'
    },
    {
      question: '¿De qué regiones provienen las artesanías que ofrecen?',
      route: '/regiones'
    },
    {
      question: '¿Cómo garantizan la autenticidad de las artesanías?',
      route: '/autenticidad'
    },
    {
      question: '¿Ofrecen artesanías de alguna tribu o grupo étnico específico?',
      route: '/etnias'
    },
    {
      question: '¿Cuáles son los materiales utilizados en las artesanías?',
      route: '/materiales'
    },
    {
      question: '¿Cómo puedo contactar con ustedes si tengo más preguntas?',
      route: '/contacto'
    }
  ];

  const handleFAQClick = (route) => {
    navigate(route); // Redirige a la ruta específica cuando se hace clic en la pregunta
  };

  return (
    <div className="faq-container">
      <h1>Preguntas Frecuentes</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="faq-item" 
            onClick={() => handleFAQClick(faq.route)} // Redirige al hacer clic
          >
            <div className="faq-question">
              {faq.question}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default FAQ;
