import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      if (e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        
        const targetId = e.target.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          const navLinks = document.querySelector('.nav-links');
          if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
          }
        }
      }
    };

    // Agregar event listeners a todos los enlaces de anclaje
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      // Cleanup: remover event listeners
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);
};