import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Services from './components/Services';
import Promotions from './components/Promotions';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import AuthPage from './components/Auth/AuthPage';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: ''
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
    alert('¡Gracias! Te contactaremos en menos de 2 horas.');
    setFormData({ name: '', email: '', project: '' });
    setShowForm(false);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/promociones" element={<Promotions />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/portafolio" element={<Portfolio />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </main>
        <Footer />

        {/* Botón Flotante para Contacto */}
        <button className="floating-contact-btn" onClick={() => setShowForm(true)}>
          💬 ¿Hablamos?
        </button>

        {/* Chat Flotante */}
        {showForm && (
          <div className="chat-container">
            <div className="chat-window">
              <div className="chat-header">
                <div className="chat-avatar">🤖</div>
                <div className="chat-info">
                  <h4>Asistente Virtual</h4>
                  <span>En línea</span>
                </div>
                <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
              </div>
              <div className="chat-messages">
                <div className="message bot">
                  <div className="message-avatar">🤖</div>
                  <div className="message-content">
                    ¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte con tu proyecto web?
                  </div>
                </div>
              </div>
              <form className="chat-input" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="message"
                  placeholder="Escribe tu mensaje..."
                  value={formData.message || ''}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
                <button type="submit" className="send-btn">📤</button>
              </form>
            </div>
          </div>
        )}
      </div>

      
    </Router>

    
  );
}

export default App;