import React from 'react';
import './History.css';
import AutenticidadImage from '../../assets/backgrounds/autenticidad.png'; 
import TradicionImage from '../../assets/backgrounds/tradiciones.png'; 
import ArteAncestralImage from '../../assets/backgrounds/ancestral.png'; 
import cultura from '../../assets/backgrounds/cultura.png'; 
import territorio from '../../assets/backgrounds/territorio.jpg'; 
import social from '../../assets/backgrounds/organizacion social.webp'; 
import lenguaje from '../../assets/backgrounds/idoma.png'; 
import espiritualidad from '../../assets/backgrounds/Creencias.webp'; 
import economia from '../../assets/backgrounds/economia.jpg'; 
import vestienta from '../../assets/backgrounds/vestimenta.jpg'; 
import educacion from '../../assets/backgrounds/Educacion.jpg'; 
import derechos from '../../assets/backgrounds/Lucha por susu derrechoa.jpg'; 
import desafios from '../../assets/backgrounds/desafios-comteporaneos.jpg'; 
import aportesalasociedad from '../../assets/backgrounds/Aportes en la sociedad colombiana.jpg'; 
const History = () => {
    return (
        <div className="historias">
            <h1> Cultura Guambiana</h1>

            <section className="historia">
                <h2>Una Visión Integral</h2>
                <img src={cultura} alt="Autenticidad Artesanal" className="historia-image" />
                <p>
                La cultura Guambiana, o Misak, es una de las comunidades indígenas más representativas de Colombia. Habitan principalmente en el departamento del Cauca, en municipios como Silvia, Totoró, Piendamó, entre otros. Este grupo étnico ha logrado preservar su idioma, costumbres, tradiciones y cosmovisión a pesar de los desafíos históricos y contemporáneos que han enfrentado. A continuación, se explora de manera detallada los diversos aspectos que componen esta rica y compleja cultura.
                </p>

            </section>

            <section className="historia">
                <h2>Origen y Territorio</h2>
                <img src={territorio} alt="cultura" className="historia-image" />
                <p>
                    El pueblo Guambiano tiene raíces ancestrales que se remontan a tiempos precolombinos. Su historia está ligada a los pueblos originarios que habitaron la región andina antes de la llegada de los colonizadores españoles. Los Misak consideran su territorio no solo como un espacio físico, sino como un lugar sagrado que sostiene la vida y la identidad cultural. Los ríos, montañas y lagunas dentro de sus resguardos son vistos como entidades vivas con las que interactúan espiritualmente.
                </p>
               
            </section>

            <section className="historia">
                <h2>Organización Social</h2>
                <img src={social} alt="Arte Ancestral Misak" className="historia-image" />
                <p>
                La organización social de los Guambianos gira en torno a la figura del Cabildo Indígena, una institución tradicional que representa la autoridad máxima dentro de los resguardos. El cabildo no solo administra el territorio, sino que también ejerce justicia, promueve la educación intercultural y preserva la cosmovisión y los valores comunitarios. La solidaridad es un principio esencial en su vida diaria, y esto se refleja en la práctica de la minga, un trabajo comunitario que une a la comunidad en proyectos comunes como la construcción de caminos, el cultivo de alimentos o la protección del medio ambiente.
                </p>
                </section>
               
            <section className="historia">
                <h2>Idioma: El Namuy Wam</h2>
                <img src={lenguaje} alt="Arte Ancestral Misak" className="historia-image" />
                <p>
                El idioma de los Guambianos, conocido como Namuy Wam, es una lengua de la familia Chibcha que juega un papel crucial en la transmisión de conocimientos y tradiciones. Aunque ha enfrentado el riesgo de desaparición debido a procesos de aculturación y desplazamiento, el pueblo Misak ha implementado esfuerzos para revitalizarlo. El Namuy Wam es parte esencial de su sistema educativo, y su enseñanza es obligatoria en las escuelas comunitarias, lo que fortalece la identidad cultural de las nuevas generaciones.
                </p>

                </section>
                <section className="historia"> 
                <h2>Cosmovisión y Espiritualidad</h2>
                <img src={espiritualidad} alt="Arte Ancestral Misak" className="historia-image" />
                <p>
                La cosmovisión Misak está profundamente conectada con la naturaleza. Creen en el principio del equilibrio entre los seres humanos y su entorno, donde todos los elementos de la naturaleza —como el sol, el agua, las montañas y los animales— tienen vida y deben ser respetados. La espiritualidad Misak incluye ceremonias y rituales que buscan mantener la armonía entre el mundo físico y el espiritual. Los sabedores o mamos son guías espirituales que desempeñan un papel clave en la interpretación de los mensajes de la naturaleza y la realización de rituales para la fertilidad de la tierra o la sanación de enfermedades.
                </p>
                </section>  
                <section className="historia">
                <h2>Economía y Sustento</h2>
                <img src={economia} alt="Arte Ancestral Misak" className="historia-image" />
                <p>
                La economía guambiana se basa en una relación sostenible con la tierra. La agricultura es su principal actividad, y cultivan productos como papa, maíz, frijoles, cebolla y frutas, utilizando técnicas tradicionales que preservan la fertilidad del suelo. Además, son conocidos por su artesanía, especialmente los tejidos de lana que elaboran con diseños simbólicos que representan aspectos de su cosmovisión. Estos tejidos no solo tienen un valor económico, sino que también son una forma de expresar su identidad cultural.
                </p>    
                </section>             
            
                <section className="historia">
                <h2>Vestimenta Tradicional</h2>
                <img src={vestienta} alt="Arte Ancestral Misak" className="historia-image" />
                <p>
                La vestimenta Misak es un distintivo de su cultura. Las mujeres suelen usar faldas largas de color negro o azul, combinadas con blusas bordadas y mantas de colores vivos, mientras que los hombres portan ponchos de lana y faldas negras o azules. Los colores y diseños de sus prendas tienen significados específicos relacionados con su visión del mundo, como el ciclo de la vida, la fertilidad y la conexión con la naturaleza.
                </p>
                </section> 

                <section className="historia"> 
                <h2>Educación Intercultural</h2>
                <img src={educacion} alt="Arte Ancestral Misak" className="historia-image" />
                <p>
                La educación es un elemento fundamental para el pueblo Guambiano. Han desarrollado un sistema educativo propio, conocido como Educación Intercultural Bilingüe, que combina los saberes ancestrales con los conocimientos occidentales. Este sistema busca formar a los jóvenes Misak en áreas como la gestión territorial, la preservación del idioma y las prácticas agrícolas tradicionales, mientras les proporciona herramientas para interactuar con el mundo moderno.
                </p> 
                </section> 

                <section className="historia"> 
                <h2>Lucha por sus Derechos</h2>
                <img src={derechos} alt="Arte Ancestral Misak" className="historia-image" />
                <p>
                El pueblo Guambiano ha sido un ejemplo de resistencia y defensa de los derechos indígenas en Colombia. Han luchado por la recuperación de sus territorios ancestrales, la autonomía cultural y el reconocimiento de sus derechos políticos. En 2021, protagonizaron un acto simbólico al derribar la estatua del conquistador Sebastián de Belalcázar en Popayán, como una forma de reivindicar su historia y denunciar las injusticias sufridas durante la colonización y siglos posteriores.
                </p> 
                </section> 

                <section className="historia"> 
                <h2> Desafíos Contemporáneos</h2>
                <img src={desafios} alt="Arte Ancestral Misak" className="historia-image" />
                <p>
                A pesar de sus esfuerzos por preservar su cultura, los Guambianos enfrentan múltiples desafíos, como el impacto del conflicto armado, la expansión de actividades mineras en su territorio y los efectos del cambio climático. Sin embargo, su capacidad de organización y su profunda conexión con la naturaleza les ha permitido resistir y adaptarse, buscando siempre soluciones que armonicen con su cosmovisión.
                </p> 
                </section> 

                <section className="historia"> 
                <h2> Aportes a la Sociedad Colombiana</h2>
                <img src={aportesalasociedad} alt="Arte Ancestral Misak" className="historia-image" />
                <p>
                La cultura Guambiana no solo es un tesoro para su comunidad, sino también un aporte significativo a la diversidad cultural de Colombia. Su modelo de vida basado en la solidaridad, el respeto por la naturaleza y la búsqueda de la equidad inspira a otras comunidades y promueve valores esenciales en un mundo cada vez más desconectado de sus raíces.
                </p> 
                </section> 

                <section className="historia"> 
                <h2> La Hermosa Cultura Guambiana </h2>
                <img src={ArteAncestralImage} alt="Arte Ancestral Misak" className="historia-image" />
                <p>
                En resumen, el pueblo Guambiano es un ejemplo emblemático de resiliencia, sabiduría ancestral y sostenibilidad. A lo largo de su historia, han enfrentado innumerables desafíos, desde la colonización y la marginación hasta los efectos del conflicto armado y la presión del mundo moderno. Sin embargo, su capacidad de organización, su profundo respeto por la naturaleza y su enfoque en la colectividad les han permitido mantener vivos sus valores y tradiciones.

Su sabiduría ancestral se manifiesta en cada aspecto de su vida, desde las prácticas agrícolas sostenibles que garantizan la fertilidad de la tierra, hasta sus rituales espirituales que honran a la madre naturaleza y fortalecen el equilibrio entre los seres humanos y su entorno. Este conocimiento, transmitido de generación en generación a través de la oralidad y la práctica, constituye una fuente invaluable para entender formas de vida alternativas que priorizan la armonía en lugar de la explotación.

En términos de sostenibilidad, el modelo de vida de los Guambianos es un ejemplo para el mundo. Sus técnicas de manejo comunitario de los recursos naturales, su respeto por los ciclos de la naturaleza y su visión holística del bienestar demuestran que es posible construir sociedades que prosperen sin comprometer el futuro de las próximas generaciones. Este enfoque es especialmente relevante en la actualidad, cuando las crisis ambientales globales exigen cambios urgentes en la relación de las sociedades humanas con el medio ambiente.

Además, la cultura Guambiana enriquece profundamente el panorama multicultural de Colombia al ofrecer una visión alternativa de lo que significa progreso, bienestar y comunidad. Su enfoque colectivo contrasta con el individualismo predominante en muchas culturas modernas, recordándonos la importancia de la solidaridad y la cooperación como pilares de la vida en sociedad.

Más allá de preservar su propia identidad, los Guambianos contribuyen a la reflexión sobre cómo podemos convivir de manera respetuosa con las diferencias y aprender de las diversas formas de entender el mundo. Su resistencia frente a los procesos de aculturación y su compromiso con la revitalización de su idioma y sus tradiciones son lecciones valiosas para todas las comunidades que enfrentan el riesgo de perder sus raíces en un mundo globalizado.

En definitiva, los Guambianos no solo protegen su propia cultura, sino que también ofrecen al mundo un legado de enseñanza sobre la importancia del equilibrio, la identidad y el respeto mutuo. Su ejemplo inspira a repensar nuestra relación con el entorno y a valorar la riqueza que yace en la diversidad cultural como un patrimonio colectivo para la humanidad.
                </p> 
                </section> 

        </div>
    );
};

export default History;
