import React, { useState } from 'react'
import './FAQ.css'

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const faqs = [
    {
      question: '¿Qué tipo de artesanías indígenas venden?',
      answer:
        'Vendemos todo tipo de artesanías: desde collares, manillas, piercings y anillos hasta artículos más grandes como ropa, bolsos, manualidades varias, calzado, y mucho más. ¡Echa un vistazo a nuestra tienda y descubre todos nuestros productos!',
    },
    {
      question: '¿De qué regiones provienen las artesanías que ofrecen?',
      answer:
        'Nuestros productos provienen de todas las regiones del país: desde los Huitoto de la Amazonía, pasando por los Arhuacos en la cordillera de los Andes, hasta los Wayuu en La Guajira. Estamos presentes en todo el país y buscamos expandirnos a nivel global.',
    },
    {
      question: '¿Cómo garantizan la autenticidad de las artesanías?',
      answer:
        'En Misak valoramos la transparencia y calidad de nuestros productos. Para garantizar la autenticidad, implementamos prácticas como: certificados de origen, etiquetas digitales de autenticidad, fotografías y videos del proceso de producción, perfiles de los artesanos, certificaciones y alianzas con organizaciones de comercio justo, sellos digitales de garantía de origen, y políticas de garantía y transparencia.',
    },
    {
      question:
        '¿Ofrecen artesanías de alguna tribu o grupo étnico específico?',
      answer:
        '¡Claro que sí! Puedes buscar la etnia, comunidad o región específica que desees conocer. Estamos aquí para ayudarte a explorar nuestras raíces culturales.',
    },
    {
      question: '¿Cuáles son los materiales utilizados en las artesanías?',
      answer:
        'Nuestros talentosos artesanos utilizan una gran variedad de materiales, la mayoría recolectados de la naturaleza, como lana de oveja, pieles de animales, bambú, guadua, fibras de árboles, piedras, y mucho más. Cada producto incluye detalles sobre los materiales utilizados. ¡Descubre la diversidad de nuestros productos!',
    },
    {
      question: '¿Cómo puedo contactar con ustedes si tengo más preguntas?',
      answer:
        'Puedes encontrarnos en todas las redes sociales o escribirnos a misakguambshop.oficial@gmail.com. Estamos disponibles para recibir tus quejas, sugerencias, reclamos, consultas de colaboración, y mucho más.',
    },
  ]

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="faq-container">
      <h1 className="faq-title">Preguntas Frecuentes</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${expandedIndex === index ? 'open' : ''}`}
          >
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
              aria-expanded={expandedIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              {faq.question}
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`faq-answer ${expandedIndex === index ? 'open' : ''}`}
              aria-hidden={expandedIndex !== index}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ
