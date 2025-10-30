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

  return (
    <header className={`professional-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo con gradiente amarillo-naranja */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <div className="logo-text">
            <span className="logo-name">CodexB&J</span>
            <span className="logo-tag">SOLUTIONS</span>
          </div>
        </Link>
        
        {/* Navegación minimalista */}
        <nav className="navigation">
          <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <li>
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link 
                to="/servicios" 
                className={`nav-link ${isActive('/servicios') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Servicios
              </Link>
            </li>
            <li>
              <Link 
                to="/portafolio" 
                className={`nav-link ${isActive('/portafolio') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Proyectos
              </Link>
            </li>
            <li>
              <Link 
                to="/nosotros" 
                className={`nav-link ${isActive('/nosotros') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Empresa
              </Link>
            </li>
            <li>
              <Link
                to="/contacto"
                className={`nav-link ${isActive('/contacto') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>

        {/* Botón de Autenticación - Solo se muestra en desktop */}
        <div className="header-actions">
          <Link to="/auth" className="auth-button" onClick={closeMenu}>
            <span className="auth-icon">🚀</span>
            <span className="auth-text">Acceder</span>
          </Link>
          
          <button 
            className={`menu-toggle ${menuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            aria-label="Menú"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;