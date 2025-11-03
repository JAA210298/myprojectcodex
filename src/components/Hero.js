import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import image1 from '../1.png';
import image2 from '../2.png';
import image3 from '../3.png';
import image4 from '../4.png';

const Hero = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: ''
  });

  // Datos para el carrusel con imágenes desde mi-portal
  const promotionalImages = [
    {
      id: 1,
      title: "CREA TU SITIO WEB PROFESIONAL HOY MISMO!",
      description: "Sitio Web Profesional - $590 (Antes $650)",
      discount: "9.23% DESCUENTO",
      condition: "SI CONTRATAS ANTES DEL 1 DICIEMBRE",
      image: image1,
      cta: "¡CONTRATA AHORA!",
      badge: "🔥 OFERTA ESPECIAL",
      savings: "- $60"
    },
    {
      id: 2,
      title: "DISENA TU SITIO WEB BASICO",
      description: "SOLO US$ 590 - Diseño web profesional básico",
      discount: "9.23% DESCUENTO",
      condition: "SI CONTRATAS ANTES DEL 31 DICIEMBRE",
      image: image2,
      cta: "¡CONTRATA AHORA!",
      badge: "💫 OFERTA LIMITADA"
    },
    {
      id: 3,
      title: "PAQUETE COMBO WEB + MANTENIMIENTO",
      description: "SITIO WEB + MANTENIMIENTO 3 MESES PROFESIONAL",
      price: "$810/$810",
      discount: "8.99% DESCUENTO",
      condition: "Paquete completo con mantenimiento incluido",
      image: image3,
      cta: "OBTENER COMBO",
      badge: "🚀 MÁS VENDIDO"
    },
    {
      id: 4,
      title: "PLAN DE REFERIDOS: GANA CON NOSOTROS",
      description: "GANA 10% DE DESCUENTO EN TU SIGUIENTE MANTENIMIENTO",
      condition: "POR CADA CLIENTE QUE REFIERAS Y CONTRATE",
      image: image4,
      cta: "¡APLICA Y GANA AHORA!",
      badge: " GANA DINERO"
    }
  ];

  // Duplicar las imágenes para el efecto infinito
  const extendedSlides = [...promotionalImages, ...promotionalImages, ...promotionalImages];
  const slideCount = promotionalImages.length;
  const totalSlides = extendedSlides.length;
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [transitionSpeed, setTransitionSpeed] = useState(0.5);

  // Auto-avance del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => {
        // Si estamos en el último slide real, movemos sin animación al inicio del array duplicado
        if (prev >= slideCount * 2 - 1) {
          setTransitionEnabled(false);
          return slideCount;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [slideCount]);

  // Habilitar la transición después de saltar al inicio
  useEffect(() => {
    if (!transitionEnabled) {
      const timer = setTimeout(() => {
        setTransitionEnabled(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [transitionEnabled]);

  const nextSlide = () => {
    setCurrentSlide(prev => {
      if (prev >= slideCount * 2 - 1) {
        setTransitionEnabled(false);
        return slideCount;
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlide(prev => {
      if (prev <= 0) {
        setTransitionEnabled(false);
        return slideCount - 1;
      }
      return prev - 1;
    });
  };

  // Manejar el final del reset de la transición
  const handleTransitionEnd = () => {
    if (currentSlide >= slideCount * 2) {
      setTransitionEnabled(false);
      setCurrentSlide(slideCount);
    } else if (currentSlide < 0) {
      setTransitionEnabled(false);
      setCurrentSlide(slideCount - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    alert('¡Gracias! Te contactaremos en menos de 2 horas para concretar tu sitio web.');
    setFormData({ name: '', email: '', project: '' });
    setShowForm(false);
  };

  return (
    <div className="home-page">
      {/* Sección Hero Principal */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <div className="hero-content">

          {/* Columna Izquierda - Texto */}
          <div className="hero-text">
            <div className="main-headlines">
              <h2 className="main-title">
                Transforma tu<br />
                <span className="highlight">Visión</span><br />
                en Realidad<br />
               Digital
              </h2>
              <p className="subtitle">
                Soluciones web a la medida para emprendedores y negocios
              </p>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">7-15 Días</div>
                <div className="stat-label">Entrega Rápida</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Responsive</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">SEO</div>
                <div className="stat-label">Optimizado</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">+50</div>
                <div className="stat-label">Clientes</div>
              </div>
            </div>

            {/* Botón único para desktop */}
            <div className="hero-actions desktop-only">
              <Link to="/nosotros" className="btn btn-primary">
                Ver más de CodexB&J
              </Link>
            </div>
          </div>

          {/* Columna Derecha - Carrusel de Promociones */}
          <div className="hero-carousel">
            <div className="carousel-container">
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(-${currentSlide * (100 / slideCount)}%`,
                  transition: transitionEnabled ? `transform ${transitionSpeed}s ease-in-out` : 'none',
                  width: `${totalSlides * 100 / 3}%`
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedSlides.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="carousel-slide"
                    style={{
                      width: `${100 / totalSlides * 3}%`
                    }}
                  >
                    <div className="slide-image-container">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="slide-image"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDUwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjI1MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2QzcyODAiPkltYWdlbiBubyBlbmNvbnRyYWRhPC90ZXh0Pgo8L3N2Zz4K";
                        }}
                      />
                      <div className="slide-badge">
                        {item.badge}
                      </div>
                    </div>
                    <div className="slide-content">
                      <h3 className="slide-title">{item.title}</h3>
                      <p className="slide-description">{item.description}</p>
                      {item.discount && (
                        <div className="slide-discount">
                          {item.discount}
                        </div>
                      )}
                      {item.savings && (
                        <div className="slide-savings">
                          {item.savings}
                        </div>
                      )}
                      <p className="slide-condition">{item.condition}</p>
                      <button
                        className="btn btn-primary slide-cta"
                        onClick={() => setShowForm(true)}
                      >
                        {item.cta}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controles del Carrusel */}
              <button className="carousel-btn prev" onClick={prevSlide}>
                ‹
              </button>
              <button className="carousel-btn next" onClick={nextSlide}>
                ›
              </button>

              {/* Indicadores */}
              <div className="carousel-indicators">
                {promotionalImages.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Botón único para móvil - aparece después del carrusel */}
          <div className="hero-actions mobile-only">
            <Link to="/nosotros" className="btn btn-primary">
              Ver más de CodexB&J
            </Link>
          </div>

        </div>
        </div>
      </section>

      {/* Formulario de Contacto Flotante */}
      {showForm && (
        <div className="floating-form-overlay">
          <div className="floating-form">
            <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
            <h3>¡Comienza Tu Sitio Web Hoy!</h3>
            <p className="form-subtitle">Solicita tu presupuesto gratis y sin compromiso</p>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name"
                placeholder="Tu nombre completo"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input 
                type="email" 
                name="email"
                placeholder="Tu email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <select 
                name="project"
                value={formData.project}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un paquete</option>
                <option value="web-basico">Sitio Web Básico - $590</option>
                <option value="web-profesional">Sitio Web Profesional - $590</option>
                <option value="paquete-combo">Paquete Combo - $810</option>
                <option value="personalizado">Personalizado</option>
              </select>
              <textarea 
                name="message"
                placeholder="Describe tu proyecto..."
                value={formData.message}
                onChange={handleChange}
                rows="3"
              ></textarea>
              <button type="submit" className="btn btn-primary">
                🚀 Obtener Presupuesto Gratis
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;