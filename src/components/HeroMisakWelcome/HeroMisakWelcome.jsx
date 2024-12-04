import './HeroMisakWelcome.css'
import MisakGuambShop from '../../assets/products/WELCOME_26_c4f0b7d4-d30e-43a5-bb78-76d4cb1fff67_1512x.webp'
import Slider from 'react-slick'
import { useNavigate } from 'react-router'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const HeroMisakWelcome = () => {
  const navigate = useNavigate()
  const handleVerMas = () => {
    navigate('/history')
  }
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  }

  return (
    <div className="hero-misak">
      <div className="hero-misak-content">
        <h1>Bienvenidos a tienda Misak</h1>
        <div className="slider-container">
          <Slider {...settings}>
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
        <button className="see-more" onClick={handleVerMas}>Ver más</button>
      </div>
      <div className="hero-misak-image">
        <img src={MisakGuambShop} alt="Artesanía Misak" />
      </div>
    </div>
  )
}

export default HeroMisakWelcome
