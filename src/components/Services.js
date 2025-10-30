import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const [activeTab, setActiveTab] = useState('services');

  const services = [
    {
      icon: "🎯",
      title: "Landing Page / One Page",
      description: "Una sola página diseñada para captar datos (leads) o promocionar un producto/servicio específico.",
      features: ["🎨 Diseño atractivo", "📱 100% Responsive", "📝 Formularios de captura", "⚡ Carga ultrarrápida"],
      priceUSD: "$150 - $400",
      priceCRC: "₡80.250 - ₡214.000",
      popular: false,
      delivery: "3-5 días",
      guarantee: "15 días garantía"
    },
    {
      icon: "🏢",
      title: "Sitio Web Informativo Básico",
      description: "Un sitio con 4 a 7 secciones (Inicio, Servicios, Nosotros, Contacto, etc.), diseño responsivo y formularios básicos.",
      features: ["🎨 Diseño profesional", "📱 100% Responsive", "📧 Formularios de contacto", "🔍 SEO básico"],
      priceUSD: "$500 - $1.500",
      priceCRC: "₡267.500 - ₡802.500",
      popular: true,
      delivery: "7-10 días",
      guarantee: "30 días garantía"
    },
    {
      icon: "💼",
      title: "Sitio Web Corporativo / Pymes",
      description: "Incluye más secciones, gestor de contenidos (CMS), blog, funcionalidades avanzadas y optimización SEO.",
      features: ["📝 Blog integrado", "🎨 CMS incluido", "🚀 SEO avanzado", "📊 Analytics"],
      priceUSD: "$1.000 - $2.500",
      priceCRC: "₡535.000 - ₡1.337.500",
      popular: false,
      delivery: "10-15 días",
      guarantee: "45 días garantía"
    },
    {
      icon: "🛍️",
      title: "E-commerce (Tienda en Línea)",
      description: "Permite la venta de productos, incluye carrito de compras, pasarela de pagos, gestión de inventario y envíos.",
      features: ["🛒 Carrito de compras", "💳 Pasarelas de pago", "📦 Gestión inventario", "🚚 Config. de envíos"],
      priceUSD: "$1.500 - $5.000+",
      priceCRC: "₡802.500 - ₡2.675.000+",
      popular: false,
      delivery: "15-20 días",
      guarantee: "60 días garantía"
    },
    {
      icon: "⚙️",
      title: "Desarrollo a la Medida",
      description: "Sistemas complejos con funcionalidades específicas (plataformas de reservas, directorios, portales de membresía, integraciones).",
      features: ["🔧 Funcionalidades custom", "🔗 Integraciones API", "👥 Portales de usuario", "🎯 Soluciones específicas"],
      priceUSD: "$5.000 - $15.000+",
      priceCRC: "₡2.675.000 - ₡8.025.000+",
      popular: false,
      delivery: "30-60 días",
      guarantee: "90 días garantía"
    }
  ];

  const testimonials = [
    {
      name: "María González",
      company: "Café Paradiso",
      text: "¡Increíble trabajo! Mi sitio web se ve profesional y genera leads constantemente.",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "Carlos Rodríguez",
      company: "TechSolutions CR",
      text: "CodexB&J transformó completamente mi presencia online. ¡Altamente recomendado!",
      rating: 5,
      avatar: "👨‍💻"
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section Concisa */}
      <section className="services-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>🌟 EXPERTOS EN PÁGINAS WEB</span>
            </div>
            <h1 className="hero-title">
              Creamos <span className="highlight">Experiencias Digitales</span><br />
              que Enamoran
            </h1>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Sitios Web Creados</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Clientes Satisfechos</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">7-15 días</div>
                <div className="stat-label">Entrega Rápida</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Soporte Técnico</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Interactivos */}
      <section className="services-interactive">
        <div className="container">
          <div className="tabs-container">
            <div className="tabs-header">
              <button
                className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
                onClick={() => setActiveTab('services')}
              >
                🚀 Servicios
              </button>
              <button
                className={`tab-btn ${activeTab === 'testimonials' ? 'active' : ''}`}
                onClick={() => setActiveTab('testimonials')}
              >
                💬 Testimonios
              </button>
              <button
                className={`tab-btn ${activeTab === 'process' ? 'active' : ''}`}
                onClick={() => setActiveTab('process')}
              >
                ⚡ Proceso
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'services' && (
                <div className="services-content">
                  <h2 className="section-title">Nuestros Servicios Web</h2>
                  <div className="services-grid">
                    {services.map((service, index) => (
                      <div className={`service-card ${service.popular ? 'popular' : ''}`} key={index}>
                        <div className="service-header">
                          <div className="service-icon">{service.icon}</div>
                          <div className="service-pricing">
                            <span className="service-price-usd">{service.priceUSD}</span>
                            <span className="service-price-crc">{service.priceCRC}</span>
                          </div>
                        </div>

                        <div className="service-content">
                          <h3 className="service-title">{service.title}</h3>
                          {service.popular && (
                            <div className="popular-badge">
                              ⭐ MÁS ELEGIDO
                            </div>
                          )}
                          <p className="service-description">{service.description}</p>

                          <div className="service-meta">
                            <div className="meta-item">
                              <span className="meta-icon">⏱️</span>
                              <span>{service.delivery}</span>
                            </div>
                            <div className="meta-item">
                              <span className="meta-icon">🛡️</span>
                              <span>{service.guarantee}</span>
                            </div>
                          </div>

                          <div className="service-features">
                            <ul>
                              {service.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="feature-item">
                                  <span className="feature-check">✨</span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="service-actions">
                            <Link to="/contacto" className="service-btn primary">
                              🚀 Solicitar
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'testimonials' && (
                <div className="testimonials-content">
                  <h2 className="section-title">Lo que dicen nuestros clientes</h2>
                  <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                      <div className="testimonial-card" key={index}>
                        <div className="testimonial-header">
                          <div className="testimonial-avatar">{testimonial.avatar}</div>
                          <div className="testimonial-info">
                            <h4 className="testimonial-name">{testimonial.name}</h4>
                            <p className="testimonial-company">{testimonial.company}</p>
                          </div>
                        </div>
                        <div className="testimonial-rating">
                          {'⭐'.repeat(testimonial.rating)}
                        </div>
                        <p className="testimonial-text">"{testimonial.text}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'process' && (
                <div className="process-content">
                  <h2 className="section-title">Nuestro Proceso en 4 Pasos</h2>
                  <div className="process-steps">
                    <div className="process-step">
                      <div className="step-icon">💬</div>
                      <h3>1. Consulta</h3>
                      <p>Analizamos tu negocio y objetivos</p>
                    </div>
                    <div className="process-step">
                      <div className="step-icon">🎨</div>
                      <h3>2. Diseño</h3>
                      <p>Creamos el diseño perfecto para ti</p>
                    </div>
                    <div className="process-step">
                      <div className="step-icon">⚡</div>
                      <h3>3. Desarrollo</h3>
                      <p>Desarrollamos con las mejores tecnologías</p>
                    </div>
                    <div className="process-step">
                      <div className="step-icon">🚀</div>
                      <h3>4. Lanzamiento</h3>
                      <p>Tu sitio va live con soporte completo</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Conciso */}
      <section className="final-cta-section">
        <div className="container">
          <div className="final-cta-content">
            <h2>¿Listo para destacar online?</h2>
            <p>Transforma tu negocio con un sitio web profesional</p>
            <div className="final-cta-actions">
              <Link to="/auth" className="cta-btn primary">
                🚀 Comenzar Ahora
              </Link>
              <Link to="/promociones" className="cta-btn secondary">
                🔥 Ver Ofertas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;