import React, { useState, useEffect } from 'react';
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
import Chat from './components/Chat';
import './App.css';
import './components/Chat.css';

function App() {
  const [showChat, setShowChat] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
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

  // Efecto para detectar cambios en la conexión
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el envío del formulario
    console.log('Formulario enviado:', formData);
    // Aquí podrías agregar la lógica para enviar el formulario a tu backend
    setFormData({ name: '', email: '', project: '', message: '' });
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

        {/* Botón Flotante del Chat */}
        <div className="floating-chat-container">
          <button 
            className="floating-chat-btn" 
            onClick={() => {
              setShowChat(!showChat);
              if (unreadMessages > 0) {
                setUnreadMessages(0);
              }
            }}
            aria-label="Abrir chat"
          >
            <span className="chat-icon">💬</span>
            <span className="chat-text">¿Hablemos?</span>
            {unreadMessages > 0 && (
              <span className="notification-badge">
                {unreadMessages > 9 ? '9+' : unreadMessages}
              </span>
            )}
          </button>
        </div>

        {/* Componente de Chat */}
        {showChat && (
          <Chat 
            onClose={() => setShowChat(false)}
            onNewMessage={(isVisible) => {
              if (!isVisible) {
                setUnreadMessages(prev => prev + 1);
              }
            }}
            isOnline={isOnline}
          />
        )}

        {/* Indicador de conexión */}
        <div className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
          {isOnline ? 'En línea' : 'Sin conexión'}
        </div>
      </div>

      
    </Router>

    
  );
}

export default App;