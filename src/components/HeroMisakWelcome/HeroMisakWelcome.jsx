import { useState } from 'react'
import './HeroMisakWelcome.css'
import MisakGuambShop from '../../assets/products/WELCOME_26_c4f0b7d4-d30e-43a5-bb78-76d4cb1fff67_1512x.webp'
import { useNavigate } from 'react-router-dom' // Cambiado a useNavigate
import { Transition } from '@headlessui/react'
import clsx from 'clsx'

const HeroMisakWelcome = () => {
  const navigate = useNavigate() // Cambiado a useNavigate
  const [showFirstTab, setShowFirstTab] = useState(true)
  const [showSecondTab, setShowSecondTab] = useState(false)
  const [showThirdTab, setShowThirdTab] = useState(false)

  const animationClass = [
    'absolute border-2 border-[#3a092c] p-8 rounded-lg transition ease-in-out',
    'data-[closed]:opacity-0',
    'data-[enter]:duration-300 data-[enter]:scale-[1.02] data-[enter]:data-[closed]:-translate-x-full',
    'data-[leave]:duration-500 data-[leave]:scale-[1] data-[leave]:data-[closed]:translate-x-full',
  ]

  const handleClick = (tab) => {
    if (tab === 3) {
      setShowFirstTab(false)
      setShowSecondTab(false)
      setShowThirdTab(true)
    } else if (tab === 2) {
      setShowFirstTab(false)
      setShowSecondTab(true)
      setShowThirdTab(false)
    } else {
      setShowFirstTab(true)
      setShowSecondTab(false)
      setShowThirdTab(false)
    }
  }

  const handleVerMas = () => {
    navigate('/history')
  }

  return (
    <div className="hero-misak">
      <div className="hero-misak-content">
        <h1>Bienvenidos a tienda Misak</h1>
        <h2>El corazón de la artesanía Misak</h2>

        <div className="relative h-80 lg:h-60 xl:h-48">
          <Transition show={showFirstTab}>
            <div className={clsx(animationClass)}>
              La autenticidad de nuestra artesanía radica en el uso de técnicas
              y materiales tradicionales, transmitidos de generación en
              generación. Cada pieza es única, reflejando la identidad cultural
              de nuestra comunidad. La conexión entre el artesano y su obra es
              palpable, lo que garantiza un producto genuino y lleno de
              historia.
            </div>
          </Transition>
          <Transition show={showSecondTab}>
            <div className={clsx(animationClass)}>
              La tradición de la cultura Misak se remonta a siglos atrás.
              Nuestros antepasados forjaron un legado que hoy se manifiesta en
              cada producto que ofrecemos. La celebración de nuestras
              festividades y rituales se entrelaza con la creación de
              artesanías, donde cada hilo, cada color, cuenta una historia sobre
              nuestra cultura y cosmovisión.
            </div>
          </Transition>
          <Transition show={showThirdTab}>
            <div className={clsx(animationClass)}>
              El arte ancestral Misak no es solo expresión, sino también una
              forma de preservar la historia y tradiciones. Con técnicas como
              tejido y cerámica, los artesanos cuentan historias compartidas a
              lo largo de los años. Cada pieza es arte que refleja
              espiritualidad y belleza de nuestra comunidad.
            </div>
          </Transition>
        </div>
        <div className="hero-misak-features">
          <span onClick={() => handleClick(1)}>Autenticidad</span>
          <span onClick={() => handleClick(2)}>Tradición</span>
          <span onClick={() => handleClick(3)}>Arte Ancestral</span>
        </div>
        <button onClick={handleVerMas}>Ver más</button>
      </div>
      <div className="hero-misak-image">
        <img src={MisakGuambShop} alt="Artesanía Misak" />
      </div>
    </div>
  )
}

export default HeroMisakWelcome
