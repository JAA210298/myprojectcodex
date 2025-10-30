import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const projects = [
    {
      title: "Sitio Web Corporativo - Empresa de Consultoría",
      description: "Diseño y desarrollo de sitio web profesional con secciones de servicios, equipo, blog y formulario de contacto. Diseño responsivo y optimizado para SEO.",
      category: "Sitio Web Corporativo",
      technologies: ["React", "CSS3", "Responsive Design"],
      icon: "🏢",
      status: "completed"
    },
    {
      title: "Landing Page para Startup Tecnológica",
      description: "Página de aterrizaje moderna y atractiva con animaciones, llamados a la acción estratégicos y formulario de registro. Optimizada para conversión.",
      category: "Landing Page",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      icon: "🚀",
      status: "completed"
    },
    {
      title: "Portafolio para Fotógrafo Profesional",
      description: "Sitio web elegante con galería de imágenes, categorización de proyectos, página de contacto y blog. Diseño minimalista enfocado en las fotografías.",
      category: "Portafolio Creativo",
      technologies: ["React", "Lightbox", "Grid Layout"],
      icon: "📸",
      status: "in-progress"
    },
    {
      title: "Sitio Web para Restaurante",
      description: "Página web con menú digital interactivo, sistema de reservas online, galería de platillos y ubicación con mapa integrado. Diseño apetitoso y funcional.",
      category: "Sitio Web Comercial",
      technologies: ["React", "Google Maps API", "Responsive"],
      icon: "🍽️",
      status: "completed"
    },
    {
      title: "Blog Personal de Viajes",
      description: "Plataforma de blog con sistema de artículos, categorías, búsqueda avanzada, comentarios y newsletter. Diseño limpio y fácil navegación.",
      category: "Blog / Revista Digital",
      technologies: ["React", "CMS", "SEO Optimized"],
      icon: "✈️",
      status: "completed"
    },
    {
      title: "Sitio Web para Estudio de Arquitectura",
      description: "Sitio web elegante con portafolio de proyectos, información de servicios, equipo profesional y formulario de cotización. Diseño sofisticado y profesional.",
      category: "Sitio Web Corporativo",
      technologies: ["React", "3D Gallery", "Animations"],
      icon: "🏗️",
      status: "in-progress"
    },
    {
      title: "Página Web para Gimnasio",
      description: "Sitio web dinámico con horarios de clases, perfiles de entrenadores, planes de membresía, blog de fitness y sistema de registro online.",
      category: "Sitio Web Comercial",
      technologies: ["React", "Booking System", "Responsive"],
      icon: "💪",
      status: "completed"
    },
    {
      title: "Sitio Web para Agencia Inmobiliaria",
      description: "Plataforma web con catálogo de propiedades, filtros de búsqueda avanzados, tours virtuales, calculadora de hipoteca y formularios de contacto.",
      category: "Portal Inmobiliario",
      technologies: ["React", "Maps Integration", "Filters"],
      icon: "🏠",
      status: "completed"
    },
    {
      title: "Landing Page para Curso Online",
      description: "Página de venta optimizada con video promocional, testimonios de estudiantes, temario del curso, precios y botón de compra. Diseño persuasivo.",
      category: "Landing Page",
      technologies: ["HTML5", "Video Integration", "CTA Optimization"],
      icon: "📚",
      status: "completed"
    }
  ];

  return (
    <section className="portfolio" id="portafolio">
      <div className="container">
        <div className="section-title">
          <h2>💼 Nuestro Portafolio de Sitios Web</h2>
          <p>Proyectos web exitosos que hemos desarrollado para nuestros clientes</p>
        </div>
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <div className={`portfolio-item ${project.status}`} key={index}>
              <div className="portfolio-image">
                <div className="project-icon">{project.icon}</div>
                <div className="project-overlay">
                  <span className="project-category">{project.category}</span>
                </div>
                <div className={`status-badge ${project.status}`}>
                  {project.status === 'completed' ? '✓ Completado' : '⏳ En Proceso'}
                </div>
              </div>
              <div className="portfolio-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;