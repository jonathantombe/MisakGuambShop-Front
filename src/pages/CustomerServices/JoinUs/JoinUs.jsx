import React from 'react';
import './JoinUs.css';
import isotipoblack from '../../../assets/images/isotipoblack.png'
import NuestraHistoria from '../../../assets/images/NuestraHistoria.jpg';
import NuestraMision from '../../../assets/images/NuestraMision.jpg'; 
import NuestroCompromiso from '../../../assets/images/NuestroCompromiso.jpg'


const JoinUs = () => {
  return (
    <div className="join-us">
      <h1>¡Conocámonos para Crecer juntos!</h1>
      <p>
        MisakGuambShop es una página diseñada para que todas las comunidades indígenas puedan vender sus productos de forma rápida y segura tanto para el vendedor como 
        para el comprador, juntando todas las comunidades indígenas en un solo lugar. ¡Todo lo que deseas está aquí en MisakGuambShop!
      </p> 

      <img src={isotipoblack} alt="Historia de MisakGuambShop" />

      <h1>
        Conoce Nuestra Historia...
      </h1>

      <p>
        Somos un grupo de programadores que, por experiencia de un integrante, nos dimos cuenta que muchas personas de las comunidades indígenas venden sus productos mucho
        más barato de lo que realmente cuesta, ya sea por la falta de espacios para su comercialización y por necesidad. Otras veces, lo venden muy barato y luego otras personas
        a un precio mucho mayor. La mayoría de estos casos suceden por desconocimiento, así que decidimos que las propias personas puedan publicar y vender sus propios productos
        a precios justos para ambas partes.
      </p>
      <img src={NuestraHistoria} alt="Historia de MisakGuambShop" />

      <h1>Nuestra Misión</h1>
      <p>
        En MisakGuambShop, nos dedicamos a celebrar y preservar la rica herencia cultural de las comunidades indígenas. Nuestra misión es ofrecer productos
        auténticos que no solo reflejan la artesanía y el talento de los pueblos indígenas, sino que también apoyan su sustento y bienestar.
      </p>
      <img src={NuestraMision} alt="Misión de MisakGuambShop" />

      <h1>Nuestro Compromiso</h1>
      <p>
        Cada compra que realizas en MisakGuambShop no solo te conecta con productos únicos, sino que también contribuye al desarrollo y sostenibilidad de las comunidades
        indígenas. Estamos comprometidos a crear un impacto positivo y a ser una voz para aquellos cuyas historias merecen ser escuchadas.
      </p>
      <img src={NuestroCompromiso} alt="Compromiso de MisakGuambShop" />

      <h2>Únete a Nosotros</h2>
      <p>
        Te invitamos a explorar nuestra colección y descubrir el arte y la cultura indígena a través de nuestros productos. Al elegir MisakGuambShop,
        eliges apoyar a las comunidades, preservar tradiciones y celebrar la diversidad cultural.
      </p>
    </div>
  );
};

export default JoinUs;
