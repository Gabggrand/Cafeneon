import { useState, useRef, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import './App.css'

function App() {
  const [mostrarMapa, setMostrarMapa] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const mapaReff = useRef(null)

  const handleMostrarMapa = () => setMostrarMapa(true)

  useEffect(() => {
    const handleClickFora = (e) => {
      if (mapaReff.current && !mapaReff.current.contains(e.target)) {
        setMostrarMapa(false)
      }
    }

    if (mostrarMapa) {
      document.addEventListener('mousedown', handleClickFora)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickFora)
    }
  }, [mostrarMapa])

  return (
    <>
      <div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/video/cafeteria.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-screen bg-black/50" />
      </div>

      <header className="relative flex items-center justify-between bg-black border border-[#C7A17A] px-4 py-2 h-16 text-white">
        <div className="w-24 flex-shrink-0">
          <img src="/img/logo.png" alt="Logo" className="w-full" />
        </div>

        <nav className="hidden sm:flex flex-1 justify-center gap-6 items-center text-lg font-poppins">
          <a href="#" className="hover:text-yellow-300 transition whitespace-nowrap">
            Menu
          </a>
          <a href="#" className="hover:text-yellow-300 transition whitespace-nowrap">
            Contato
          </a>
          <button
            onClick={handleMostrarMapa}
            className="hover:text-yellow-300 transition whitespace-nowrap cursor-pointer"
          >
            Localização
          </button>
        </nav>

        <div className="hidden sm:flex gap-4 items-center">
          <button className="bg-[#4B2E2B] hover:bg-[#2e1c1a] px-4 py-1 rounded text-sm font-acme">
            Login
          </button>
          <button className="bg-[#D2691E] hover:bg-[#AD5617] px-4 py-1 rounded text-sm font-acme">
            Cadastro
          </button>
        </div>

        <button
          className="sm:hidden text-2xl ml-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {menuOpen && (
          <nav className="sm:hidden absolute top-16 left-0 w-full bg-black border-t border-[#C7A17A] flex flex-col gap-4 p-4 z-20">
            <a href="#" className="hover:text-yellow-300 transition">
              Menu
            </a>
            <a href="#" className="hover:text-yellow-300 transition">
              Contato
            </a>
            <button
              className="hover:text-yellow-300 transition text-left"
              onClick={handleMostrarMapa}
            >
              Localização
            </button>
            <button className="bg-[#4B2E2B] hover:bg-[#2e1c1a] rounded py-2 font-acme">
              Login
            </button>
            <button className="bg-[#D2691E] hover:bg-[#AD5617] rounded py-2 font-acme">
              Cadastro
            </button>
          </nav>
        )}
      </header>

      <main className="relative z-10 flex flex-col md:flex-row w-full min-h-[calc(100vh-80px)] text-white">
        <div className="flex flex-col items-start justify-center w-full md:w-1/2 gap-6 px-4 xs:px-6 md:pl-40 md:pr-8 py-6">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-playfair leading-tight">Cafeneon</h1>
          <p className="text-xs xs:text-sm sm:text-base font-inter w-full max-w-md">
            Um espaço feito para quem ama café, boas conversas e um ambiente cheio de estilo. Aqui,
            cada detalhe convida você a relaxar e aproveitar. Da iluminação aconchegante ao aroma
            marcante do café recém-passado, tudo foi pensado para criar uma experiência única. Seja
            para um encontro casual, uma pausa na rotina ou até mesmo para trabalhar em um ambiente
            inspirador, a Cafeneon é o lugar ideal para se conectar, saborear e curtir o momento.
          </p>
          <div className="flex flex-row gap-4">
            <button className="bg-[#C7A17A] hover:bg-[#9A7C5E] rounded-md w-28 h-10 text-sm">Nosso Café</button>
            <button className="bg-[#8D9773] hover:bg-[#687054] rounded-md w-32 h-10 text-sm">Descubra Mais</button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center px-4 xs:px-6 md:px-0">
          <img src="/img/coffee.png" alt="Café" className="w-4/5 h-4/5 object-contain" />
        </div>
      </main>

      <div
        className={`fixed top-0 left-0 w-full h-full z-50 bg-black/50 flex items-center justify-center transition-opacity duration-500 ${mostrarMapa ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div
          ref={mapaReff}
          className={`bg-white w-[90%] max-w-2xl h-[70%] rounded-md shadow-lg overflow-hidden transform transition-transform duration-500 ${mostrarMapa ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <h2 className="text-2xl font-playfair text-black p-4">Onde Estamos</h2>
          <iframe
            title="Localização Cafeneon"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.838659458671!2d-46.654395685022875!3d-23.577577384668853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c80ff0b8d3%3A0x6c54d524e8a03e6d!2sAv.%20Paulista%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1719771756576!5m2!1spt-BR!2sbr"
            className="w-full h-full border-none"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </>
  )
}

export default App
