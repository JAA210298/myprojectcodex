import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Promotions from './components/Promotions';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chat from './components/Chat';
import ScrollToTop from './components/ScrollToTop';
import AuthPage from './components/Auth/AuthPage';
import Dashboard from './components/Admin/Dashboard';
import './App.css';
import './components/Chat.css';

// Crear un tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#6e8efb',
    },
    secondary: {
      main: '#a777e3',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

// Componente del botón de retroceso simplificado
const BackButton = () => {
  const navigate = useNavigate();
  
  // Mostrar el botón en todas las páginas excepto en la de inicio
  if (window.location.pathname === '/') return null;

  return (
    <button 
      onClick={() => navigate(-1)}
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '30px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'red', // Color rojo temporal para asegurar visibilidad
        color: 'white',
        fontSize: '30px',
        border: 'none',
        cursor: 'pointer',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
      }}
      aria-label="Volver atrás"
    >
      ←
    </button>
  );
};

function App() {
  const [showChat, setShowChat] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
              <Route path="/admin/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
          
          {/* Botón Flotante del Chat */}
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
            💬
            {unreadMessages > 0 && (
              <span className="notification-badge">
                {unreadMessages > 9 ? '9+' : unreadMessages}
              </span>
            )}
          </button>

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
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;