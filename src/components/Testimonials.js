import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-title">
          <h2>Lo que Dicen Nuestros Clientes</h2>
          <p>Testimonios de empresas que han confiado en nuestros servicios</p>
        </div>
        <div className="testimonial-slider">
          <div className="testimonial">
            <div className="testimonial-text">
              "CodetraxCR transformó completamente nuestros procesos operativos. Su sistema de automatización redujo nuestros tiempos de procesamiento en un 60%."
            </div>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div className="author-info">
                <h4>María González</h4>
                <p>Directora de Operaciones, Empresa XYZ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;