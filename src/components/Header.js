import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // Deshabilitar scroll cuando el menú está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`professional-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="logo" onClick={closeMenu}>
            <div className="logo-text">
              <span className="logo-name">CodexB&J</span>
              <span className="logo-tag">SOLUTIONS</span>
            </div>
          </Link>
          
          {/* Menú de navegación */}
          <nav className="navigation">
            <div className={`nav-menu-container ${menuOpen ? 'active' : ''}`}>
              <ul className="nav-menu">
                {[
                  { to: '/', text: 'Inicio' },
                  { to: '/servicios', text: 'Servicios' },
                  { to: '/portafolio', text: 'Proyectos' },
                  { to: '/nosotros', text: 'Empresa' },
                  { to: '/contacto', text: 'Contacto' }
                ].map((item) => (
                  <li key={item.to}>
                    <Link 
                      to={item.to} 
                      className={`nav-link ${isActive(item.to) ? 'active' : ''}`}
                      onClick={closeMenu}
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link 
                    to="/auth" 
                    className="auth-button" 
                    onClick={closeMenu}
                  >
                    <span className="auth-icon">🚀</span>
                    <span className="auth-text">Iniciar Sesión</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Botones de acción */}
          <div className="header-actions">
            <Link to="/auth" className="auth-button" onClick={closeMenu}>
              <span className="auth-icon">🚀</span>
              <span className="auth-text">Acceder</span>
            </Link>
            
            <button 
              className={`menu-toggle ${menuOpen ? 'active' : ''}`} 
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Overlay para cerrar el menú */}
      {menuOpen && (
        <div 
          className="menu-overlay" 
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;