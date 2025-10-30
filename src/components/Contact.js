import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    alert('¡Mensaje enviado correctamente! Te contactaremos en menos de 24 horas.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section className="contact" id="contacto" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div className="container">
        <div className="section-title">
          <h2 className="contact-title">
            <span className="contact-word">Contáctanos</span>
            <span className="contact-accent">Ahora</span>
          </h2>
          <p className="contact-subtitle">Estamos listos para crear tu página web profesional y llevar tu negocio al siguiente nivel</p>
        </div>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Información de Contacto</h3>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <p><strong>Dirección:</strong></p>
                  <p>San José, Costa Rica</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <p><strong>Teléfono:</strong></p>
                  <p>+506 8888-8888</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div>
                  <p><strong>Email:</strong></p>
                  <p>info@codetraxcr.com</p>
                </div>
              </div>
            </div>
            <h3>Síguenos en Redes Sociales</h3>
            <div className="social-links">
              <a href="#" className="social-link facebook" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="social-link instagram" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C8.396 0 7.996.014 6.79.067 5.579.12 4.748.309 4.045.62c-.76.313-1.404.743-2.043 1.382C1.363 2.64 1.05 3.28.737 4.04c-.311.703-.5 1.534-.553 2.745C.134 7.996.12 8.396.12 12.017c0 3.621.014 4.021.067 5.227.053 1.211.242 2.042.553 2.745.313.76.743 1.404 1.382 2.043.639.639 1.279.972 2.043 1.285.703.311 1.534.5 2.745.553 1.206.053 1.606.067 5.227.067 3.621 0 4.021-.014 5.227-.067 1.211-.053 2.042-.242 2.745-.553.76-.313 1.404-.743 2.043-1.382.639-.639.972-1.279 1.285-2.043.311-.703.5-1.534.553-2.745.053-1.206.067-1.606.067-5.227 0-3.621-.014-4.021-.067-5.227-.053-1.211-.242-2.042-.553-2.745-.313-.76-.743-1.404-1.382-2.043C21.36 1.363 20.72 1.05 19.96.737c-.703-.311-1.534-.5-2.745-.553C16.021.014 15.621 0 12 0zm0 2.163c3.574 0 4.021.014 5.442.08 1.312.062 2.026.278 2.5.465.6.235 1.027.517 1.477.967.45.45.732.877.967 1.477.187.474.403 1.188.465 2.5.066 1.421.08 1.868.08 5.442 0 3.574-.014 4.021-.08 5.442-.062 1.312-.278 2.026-.465 2.5-.235.6-.517 1.027-.967 1.477-.45.45-.877.732-1.477.967-.474.187-1.188.403-2.5.465-1.421.066-1.868.08-5.442.08-3.574 0-4.021-.014-5.442-.08-1.312-.062-2.026-.278-2.5-.465-.6-.235-1.027-.517-1.477-.967-.45-.45-.732-.877-.967-1.477-.187-.474-.403-1.188-.465-2.5-.066-1.421-.08-1.868-.08-5.442 0-3.574.014-4.021.08-5.442.062-1.312.278-2.026.465-2.5.235-.6.517-1.027.967-1.477.45-.45.877-.732 1.477-.967.474-.187 1.188-.403 2.5-.465 1.421-.066 1.868-.08 5.442-.08zm0 3.925a6.075 6.075 0 100 12.15 6.075 6.075 0 000-12.15zm0 10.006a3.931 3.931 0 110-7.862 3.931 3.931 0 010 7.862zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                </svg>
              </a>
              <a href="#" className="social-link linkedin" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="social-link twitter" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name"
                placeholder="Nombre completo" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
              <input 
                type="email" 
                name="email"
                placeholder="Correo electrónico" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
              <input 
                type="text" 
                name="subject"
                placeholder="Asunto" 
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <textarea 
                name="message"
                placeholder="Cuéntanos sobre tu proyecto web..." 
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
              ></textarea>
              <button type="submit" className="btn">Enviar Mensaje</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;