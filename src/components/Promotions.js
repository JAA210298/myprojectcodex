import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Promotions.css';
import image1 from '../1.png';
import image2 from '../2.png';
import image3 from '../3.png';
import image4 from '../4.png';

const Promotions = () => {
  const [currentPromotion, setCurrentPromotion] = useState(0);

  const promotions = [
    {
      id: 2,
      title: "DISENA TU SITIO WEB BASICO",
      description: "SOLO US$ 590 - Diseño web profesional básico",
      discount: "9.23% DESCUENTO",
      condition: "SI CONTRATAS ANTES DEL 31 DICIEMBRE",
      image: image2,
      cta: "¡CONTRATA AHORA!",
      badge: "💫 OFERTA LIMITADA",
      validUntil: "2025-12-31"
    },
    {
      id: 3,
      title: "PAQUETE COMBO WEB + MANTENIMIENTO",
      description: "SITIO WEB + MANTENIMIENTO 3 MESES PROFESIONAL",
      price: "$810/$810",
      discount: "8.99% DESCUENTO",
      condition: "Paquete completo con mantenimiento incluido",
      image: image4,
      cta: "OBTENER COMBO",
      badge: "🚀 MÁS VENDIDO",
      validUntil: "2025-12-15"
    },
    {
      id: 4,
      title: "PLAN DE REFERIDOS: GANA CON NOSOTROS",
      description: "GANA 10% DE DESCUENTO EN TU SIGUIENTE MANTENIMIENTO",
      condition: "POR CADA CLIENTE QUE REFIERAS Y CONTRATE",
      image: image1,
      cta: "¡APLICA Y GANA AHORA!",
      badge: "💰 GANA DINERO",
      validUntil: "2025-12-31"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromotion((prev) => (prev + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [promotions.length]);

  const nextPromotion = () => {
    setCurrentPromotion((prev) => (prev + 1) % promotions.length);
  };

  const prevPromotion = () => {
    setCurrentPromotion((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  return (
    <section className="promotions" id="promociones">
      <div className="container">
        <div className="section-title">
          <h2><span className="emoji-no-bg">🚀</span> Ofertas Especiales - ¡No te las Pierdas!</h2>
          <p>Aprovecha nuestras ofertas exclusivas y lleva tu negocio al siguiente nivel</p>
        </div>

        {/* Grid de Promociones con Imágenes */}
        <div className="promotions-grid">
          {promotions.map((promotion, index) => (
            <div
              key={promotion.id}
              className="promotion-card featured"
            >
              {/* Imagen de la promoción */}
              <div className="promotion-image-container">
                <img
                  src={promotion.image}
                  alt={promotion.title}
                  className="promotion-image"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDUwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjI1MCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2QzcyODAiPkltYWdlbiBubyBlbmNvbnRyYWRhPC90ZXh0Pgo8L3N2Zz4K";
                  }}
                />
                <div className="promotion-badge">{promotion.badge}</div>
              </div>

              <div className="promotion-content">
                <h3>{promotion.title}</h3>
                <p>{promotion.description}</p>

                <div className="promotion-details">
                  {promotion.discount && (
                    <span className="discount">{promotion.discount}</span>
                  )}
                  {promotion.savings && (
                    <span className="savings">{promotion.savings}</span>
                  )}
                  {promotion.price && (
                    <span className="price">{promotion.price}</span>
                  )}
                </div>

                <p className="condition">{promotion.condition}</p>

                <div className="promotion-footer">
                  <span className="valid-until">⏰ Válido hasta: {promotion.validUntil}</span>
                  <Link to="/auth" className="btn promotion-cta">
                    {promotion.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Urgente */}
        <div className="urgent-banner">
          <div className="urgent-content">
            <div className="urgent-icon">⚡</div>
            <div className="urgent-text">
              <h3>¡Estas ofertas son por tiempo limitado!</h3>
              <p>No esperes más, contrata hoy y asegura tu descuento especial</p>
            </div>
            <div className="urgent-actions">
              <Link to="/auth" className="btn urgent-cta">
                ¡QUIERO MI OFERTA AHORA!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotions;