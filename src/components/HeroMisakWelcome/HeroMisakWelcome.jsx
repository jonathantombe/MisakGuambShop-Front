import './HeroMisakWelcome.css'

import Slider from 'react-slick'
import { useNavigate } from 'react-router'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useRef, useState } from 'react'
import AutenticidadImage from '../../assets/backgrounds/autenticidad.png'
import TradicionImage from '../../assets/backgrounds/tradiciones.png'
import ArteAncestralImage from '../../assets/backgrounds/ancestral.png'

const HeroMisakWelcome = () => {
  const [nav1, setNav1] = useState(null)
  const [nav2, setNav2] = useState(null)
  let sliderRef1 = useRef(null)
  let sliderRef2 = useRef(null)
  const navigate = useNavigate()
  const handleVerMas = () => {
    navigate('/history')
  }

  useEffect(() => {
    setNav1(sliderRef1)
    setNav2(sliderRef2)
  }, [])

  return (
    <div className="hero-misak">
      <div className="hero-misak-content">
        <h1>Bienvenidos a tienda Misak</h1>
        <div className="slider-container">
          <Slider
            dots={true}
            asNavFor={nav2}
            arrows={false}
            autoplay={true}
            infinite={true}
            speed={500}
            autoplaySpeed={22000}
            pauseOnHover={true}
            ref={(slider) => (sliderRef1 = slider)}
          >
            <div>
              <h2>Autenticidad</h2>
              La autenticidad de nuestra artesanía radica en el uso de técnicas
              y materiales tradicionales, transmitidos de generación en
              generación. Cada pieza es única, reflejando la identidad cultural
              de nuestra comunidad. La conexión entre el artesano y su obra es
              palpable, lo que garantiza un producto genuino y lleno de
              historia.
            </div>

            <div>
              <h2>Tradición</h2>
              La tradición de la cultura Misak se remonta a siglos atrás.
              Nuestros antepasados forjaron un legado que hoy se manifiesta en
              cada producto que ofrecemos. La celebración de nuestras
              festividades y rituales se entrelaza con la creación de
              artesanías, donde cada hilo, cada color, cuenta una historia sobre
              nuestra cultura y cosmovisión.
            </div>
            <div>
              <h2>Arte Ancestral</h2>
              El arte ancestral Misak no es solo expresión, sino también una
              forma de preservar la historia y tradiciones. Con técnicas como
              tejido y cerámica, los artesanos cuentan historias compartidas a
              lo largo de los años. Cada pieza es arte que refleja
              espiritualidad y belleza de nuestra comunidad.
            </div>
          </Slider>
        </div>
        <div className="hero-misak-features"></div>
        <button className="see-more" onClick={handleVerMas}>
          Ver más
        </button>
      </div>
      <div className="hero-misak-image">
        <Slider
          asNavFor={nav1}
          arrows={false}
          autoplay={true}
          infinite={true}
          ref={(slider) => (sliderRef2 = slider)}
          slidesToShow={1}
          swipeToSlide={true}
          pauseOnHover={true}
          autoplaySpeed={7000}
          focusOnSelect={true}
        >
          <img src={AutenticidadImage} alt="AutenticidadImage" />

          <img src={TradicionImage} alt="TradicionImage" />

          <img src={ArteAncestralImage} alt="ArteAncestralImage" />
        </Slider>
      </div>
    </div>
  )
}

export default HeroMisakWelcome
