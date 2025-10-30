import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
const Home = () => {
  const carouselItems = [
    {
      id: 1,
      title: "🚀 Implementación Cloud Gratis",
      description: "Migra tu infraestructura y te regalamos la implementación completa",
      discount: "100% OFF",
      condition: "En contratos anuales"
    },
    {
      id: 2,
      title: "🛡️ Security Package Especial",
      description: "Auditoría de seguridad + 3 meses de protección avanzada incluidos",
      discount: "40% OFF",
      condition: "Para nuevos clientes"
    },
    {
      id: 3,
      title: "📱 App Móvil + Web",
      description: "Desarrollo de aplicación móvil y web responsive en un solo paquete",
      discount: "25% OFF",
      condition: "Pago anticipado"
    }
  ];

  const stats = [
    { number: "150+", label: "Proyectos Entregados" },
    { number: "98%", label: "Clientes Satisfechos" },
    { number: "10+", label: "Años de Experiencia" },
    { number: "24/7", label: "Soporte Técnico" }
  ];

  return (
    <div className="home-component">
      {/* Sección Principal con fondo profesional */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <div className="company-profile">
              <div className="profile-badge">
                <span>🏆 Empresa Líder en Tecnología</span>
              </div>
              
              <h1>
                Transformamos Ideas en 
                <span className="highlight"> Soluciones Digitales</span>
              </h1>
              
              <div className="company-description">
                <p>
                  En <strong>CodetraxCR</strong>, somos más que una empresa de tecnología; 
                  somos tu partner estratégico en la transformación digital. 
                  Con más de 10 años de experiencia, hemos ayudado a más de 150 empresas 
                  a alcanzar sus objetivos mediante soluciones tecnológicas innovadoras.
                </p>
                
                <div className="key-features">
                  <div className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>Desarrollo de Software a Medida</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>Infraestructura Cloud Avanzada</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>Soluciones de Ciberseguridad</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>Soporte Técnico 24/7</span>
                  </div>
                </div>
              </div>

              <div className="hero-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="hero-actions">
                <Link to="/servicios" className="btn btn-primary">
                  <span>🔍</span>
                  Nuestros Servicios
                </Link>
                <Link to="/contacto" className="btn btn-secondary">
                  <span>📞</span>
                  Contáctanos
                </Link>
              </div>
            </div>

            <div className="promotion-carousel">
              <div className="carousel-header">
                <h3>🔥 Ofertas Especiales</h3>
                <p>Promociones limitadas para tu empresa</p>
              </div>
              
              <div className="carousel-container">
                {carouselItems.map((item) => (
                  <div key={item.id} className="promotion-card">
                    <div className="promotion-badge">
                      {item.discount}
                    </div>
                    <div className="promotion-content">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                      <div className="promotion-condition">
                        <span>{item.condition}</span>
                      </div>
                      <Link to="/promociones" className="btn-promo">
                        Aprovechar Oferta
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="carousel-indicators">
                {carouselItems.map((_, index) => (
                  <button key={index} className="indicator"></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Confianza */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-content">
            <h2>Empresas que Confían en Nosotros</h2>
            <div className="trust-badges">
              <div className="trust-badge">
                <span>🏢</span>
                <span>Empresas Nacionales</span>
              </div>
              <div className="trust-badge">
                <span>🌎</span>
                <span>Clientes Internacionales</span>
              </div>
              <div className="trust-badge">
                <span>⭐</span>
                <span>5 Estrellas en Reviews</span>
              </div>
              <div className="trust-badge">
                <span>🚀</span>
                <span>Startups Aceleradas</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;