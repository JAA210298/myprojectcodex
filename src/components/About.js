import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Conoce a <span className="highlight">CodexB&J</span>
            </h1>
            <p className="hero-subtitle">
              Líderes en transformación digital y desarrollo de soluciones tecnológicas innovadoras
            </p>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <h2 className="section-title">Nuestra Historia</h2>
              <p className="story-text">
                Fundada con la visión de revolucionar el panorama tecnológico empresarial,
                CodexB&J ha evolucionado de una startup innovadora a un referente en el sector
                de soluciones digitales personalizadas. Nuestro viaje comenzó con un equipo
                apasionado de desarrolladores y diseñadores que compartían un sueño común:
                democratizar el acceso a tecnología de clase mundial para empresas de todos los tamaños.
              </p>
              <p className="story-text">
                Desde nuestros inicios, hemos mantenido un compromiso inquebrantable con la
                excelencia técnica y la satisfacción del cliente, convirtiendo ideas complejas
                en soluciones digitales impactantes. A lo largo de los años, hemos trabajado
                con empresas de diversos sectores, desde startups emergentes hasta corporaciones
                establecidas, ayudándolas a navegar la transformación digital con confianza.
              </p>
              <p className="story-text">
                Cada proyecto que emprendemos es una oportunidad para innovar, aprender y crecer
                junto a nuestros clientes. Nos enorgullece no solo entregar código de calidad,
                sino construir relaciones duraderas basadas en la confianza, la transparencia y
                resultados medibles. Nuestra filosofía es simple: tu éxito es nuestro éxito.
              </p>
              <p className="story-text">
                Hoy, CodexB&J se posiciona como un socio estratégico que combina experiencia técnica,
                pensamiento creativo y un profundo entendimiento de las necesidades del negocio para
                crear soluciones que no solo funcionan, sino que transforman la manera en que nuestros
                clientes operan y se conectan con sus audiencias.
              </p>
              <div className="story-stats">
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Proyectos Completados</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Años de Experiencia</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Clientes Satisfechos</div>
                </div>
              </div>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <div className="placeholder-icon">🚀</div>
                <div className="placeholder-text">Nuestro Equipo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title text-center">Nuestros Valores</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Excelencia</h3>
              <p>Cada proyecto es una oportunidad para superar expectativas y establecer nuevos estándares de calidad.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Colaboración</h3>
              <p>Trabajamos hombro a hombro con nuestros clientes, convirtiéndonos en extensiones de sus equipos.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovación</h3>
              <p>Constantemente exploramos nuevas tecnologías y metodologías para ofrecer soluciones de vanguardia.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎨</div>
              <h3>Creatividad</h3>
              <p>Transformamos desafíos complejos en soluciones elegantes y efectivas.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">⏱️</div>
              <h3>Puntualidad</h3>
              <p>Cumplimos con nuestros compromisos de tiempo, entendiendo la importancia de los plazos.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Crecimiento</h3>
              <p>Nos comprometemos con el desarrollo continuo de nuestros clientes y nuestro propio equipo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro Equipo */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title text-center">Nuestro Equipo</h2>
          <p className="section-subtitle text-center">
            Profesionales apasionados por la tecnología y el desarrollo de soluciones innovadoras
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-placeholder">👨‍💻</div>
              </div>
              <h3>Desarrolladores Full-Stack</h3>
              <p>Expertos en tecnologías modernas y frameworks de vanguardia</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-placeholder">🎨</div>
              </div>
              <h3>Diseñadores UX/UI</h3>
              <p>Creadores de experiencias digitales intuitivas y atractivas</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-placeholder">📊</div>
              </div>
              <h3>Consultores Estratégicos</h3>
              <p>Especialistas en transformación digital y optimización de procesos</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <div className="avatar-placeholder">🚀</div>
              </div>
              <h3>Project Managers</h3>
              <p>Coordinadores expertos que garantizan el éxito de cada proyecto</p>
            </div>
          </div>
        </div>
      </section>

      {/* Llamado a la Acción */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>¿Listo para transformar tu negocio?</h2>
            <p>Descubre cómo CodexB&J puede ayudarte a alcanzar tus objetivos digitales</p>
            <div className="cta-buttons">
              <Link to="/servicios" className="btn btn-primary">
                Nuestros Servicios
              </Link>
              <Link to="/contacto" className="btn btn-primary">
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;