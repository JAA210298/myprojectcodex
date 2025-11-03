import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Desplazamiento suave al inicio de la página
    const scrollToTop = () => {
      // Para navegadores modernos
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      } else {
        // Para navegadores antiguos
        const scrollStep = -window.scrollY / (500 / 15);
        const scrollInterval = setInterval(() => {
          if (window.scrollY > 0) {
            window.scrollBy(0, scrollStep);
          } else {
            clearInterval(scrollInterval);
          }
        }, 15);
      }
    };

    // Pequeño retraso para asegurar que el DOM esté listo
    const timer = setTimeout(() => {
      scrollToTop();
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  // También forzar scroll al inicio en el renderizado inicial
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default ScrollToTop;
