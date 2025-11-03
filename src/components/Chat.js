import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './Chat.css';

const Chat = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const hasShownWelcome = useRef(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const socket = useRef(null);

  // Mostrar mensaje de bienvenida solo una vez al montar el componente
  useEffect(() => {
    // Verificar si ya hay mensajes (por si el componente se vuelve a montar)
    if (messages.length === 0) {
      setMessages([{
        id: 'welcome-' + Date.now(),
        text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?',
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, []);

  // Conectar al servidor WebSocket
  useEffect(() => {
    const serverUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:3001';
    console.log('🔄 Intentando conectar a:', serverUrl);
    
    if (!serverUrl.startsWith('ws://') && !serverUrl.startsWith('wss://')) {
      console.error('❌ URL de WebSocket inválida. Debe comenzar con ws:// o wss://');
      return;
    }
    
    // Configuración del socket
    const socketOptions = {
      // Configuración de reconexión
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 10000,
      
      // Configuración de transporte
      transports: ['websocket'],
      upgrade: false,
      forceNew: true,
      
      // Configuración de CORS
      withCredentials: true,
      
      // Otras opciones
      autoConnect: true,
      multiplex: false
    };
    
    console.log('🔌 Opciones del socket:', socketOptions);
    
    try {
      // Crear instancia del socket
      socket.current = io(serverUrl, socketOptions);
      
      // Evento de conexión exitosa
      socket.current.on('connect', () => {
        console.log('✅ Conectado al servidor WebSocket');
        // No mostramos mensaje de conexión
      });
      
      // Evento de desconexión
      socket.current.on('disconnect', (reason) => {
        console.log('❌ Desconectado del servidor:', reason);
        if (reason === 'io server disconnect') {
          // Reconexión forzada si el servidor nos desconectó
          socket.current.connect();
        }
      });
      
      // Evento de error de conexión
      socket.current.on('connect_error', (error) => {
        console.error('❌ Error de conexión:', error.message);
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: 'Error de conexión. Intentando reconectar...',
          sender: 'system',
          timestamp: new Date()
        }]);
      });
      
      // Manejar mensajes entrantes del servidor
      socket.current.on('message', (message) => {
        if (!message) return;
        
        const messageId = message.id || `msg-${Date.now()}`;
        const messageText = message.text || '';
        const messageSender = message.sender || 'bot';
        
        console.log(`📩 [${messageId}] Mensaje de ${messageSender}:`, 
          messageText.substring(0, 50) + (messageText.length > 50 ? '...' : ''));
        
        setMessages(prev => {
          // Verificar si ya existe un mensaje con el mismo ID
          const existingMessageIndex = prev.findIndex(m => m.id === messageId);
          
          // Si el mensaje ya existe, no hacer nada
          if (existingMessageIndex !== -1) {
            console.log(`⏩ Mensaje duplicado [${messageId}], ignorando...`);
            return prev;
          }
          
          // Crear el nuevo mensaje
          const newMessage = {
            id: messageId,
            text: messageText,
            sender: messageSender,
            timestamp: new Date()
          };
          
          console.log(`➕ Añadiendo nuevo mensaje [${messageId}] de ${messageSender}`);
          
          // Agregar el nuevo mensaje y eliminar indicadores de "escribiendo..."
          return [
            ...prev.filter(m => !m.isTyping),
            newMessage
          ];
        });
        
        // Solo desactivar el indicador de escritura si el mensaje es del bot
        if (messageSender === 'bot') {
          console.log('⏹️ Desactivando indicador de escritura');
          setIsTyping(false);
        }
      });
      
      // Manejar estado de escritura
      socket.current.on('typing', () => {
        setIsTyping(true);
      });
      
      // Manejar errores del socket
      socket.current.on('error', (error) => {
        console.error('❌ Error en el socket:', error);
      });
      
      // Reconexión exitosa
      socket.current.on('reconnect', (attemptNumber) => {
        console.log(`✅ Reconectado al servidor (intento ${attemptNumber})`);
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: 'Conexión restablecida. ¿En qué puedo ayudarte?',
          sender: 'system',
          timestamp: new Date()
        }]);
      });

      return () => {
        if (socket.current) {
          console.log('👋 Desconectando del servidor WebSocket');
          socket.current.off(); // Eliminar todos los manejadores de eventos
          socket.current.disconnect();
        }
      };
    } catch (error) {
      console.error('❌ Error al inicializar el socket:', error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: 'Error al conectar con el servidor. Por favor, recarga la página.',
        sender: 'system',
        timestamp: new Date()
      }]);
    }
  }, []);

  // Desplazarse al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageText = input.trim();
    if (!messageText || !socket.current) return;

    // Crear mensaje del usuario
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    // Limpiar el input
    setInput('');
    
    // Mostrar el mensaje del usuario inmediatamente
    setMessages(prev => [...prev, userMessage]);
    
    // Mostrar indicador de escritura
    setIsTyping(true);

    // Enviar mensaje al servidor
    // Solo enviamos el texto, no necesitamos que el servidor reenvíe el mensaje del usuario
    try {
      if (!socket.current || !socket.current.connected) {
        throw new Error('No hay conexión con el servidor');
      }

      console.log('📤 Enviando mensaje al servidor:', messageText);
      
      // Usar una promesa para manejar la respuesta con timeout
      const sendMessage = () => {
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('El servidor no respondió a tiempo'));
          }, 10000); // 10 segundos de timeout

          socket.current.emit('message', { 
            text: messageText,
            timestamp: new Date().toISOString()
          }, (response) => {
            clearTimeout(timeout);
            if (response && response.error) {
              reject(new Error(response.error));
            } else {
              resolve(response);
            }
          });
        });
      };

      await sendMessage();
      
    } catch (error) {
      console.error('❌ Error al enviar mensaje:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: error.message || 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.',
        sender: 'system',
        timestamp: new Date()
      }]);
      
      // Intentar reconectar si es un error de conexión
      if (error.message.includes('No hay conexión') || 
          error.message.includes('no está conectado')) {
        console.log('🔄 Intentando reconectar...');
        if (socket.current) {
          socket.current.connect();
        }
      }
      
      setIsTyping(false);
      
      // Intentar reconectar
      if (socket.current) {
        console.log('🔄 Intentando reconectar...');
        socket.current.connect();
      }
    }
  };

  // Formatear la hora de un mensaje
  const formatTime = (timestamp) => {
    try {
      if (!timestamp) return '';
      // Asegurarnos de que sea un objeto Date válido
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      // Verificar si la fecha es válida
      if (isNaN(date.getTime())) return '';
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      console.error('Error al formatear la hora:', error);
      return '';
    }
  };

  // Función para obtener descripción de enlaces
  const getLinkDescription = (url) => {
    const descriptions = {
      '/servicios': 'Descubre todos nuestros servicios de desarrollo web, incluyendo páginas corporativas, tiendas en línea y aplicaciones web progresivas.',
      '/servicios/paginas-web': 'Conoce cómo podemos crear la página web perfecta para tu negocio, con diseño responsivo y optimización SEO.',
      '/servicios/tiendas-online': 'Lleva tu negocio al siguiente nivel con una tienda en línea profesional, segura y fácil de administrar.',
      '/servicios/pwa': 'Aplicaciones Web Progresivas que funcionan offline y se pueden instalar en cualquier dispositivo.',
      '/precios': 'Consulta nuestros planes y paquetes para encontrar la mejor solución que se ajuste a tu presupuesto.',
      '/precios#basico': 'Plan básico ideal para pequeñas empresas que necesitan una presencia en línea profesional.',
      '/precios#profesional': 'Plan profesional con características avanzadas para negocios en crecimiento.',
      '/precios#tienda': 'Solución completa de comercio electrónico para vender tus productos en línea.',
      '/contacto': 'Contáctanos para una consulta personalizada o para resolver cualquier duda que tengas.',
      '/contacto#cotizacion': 'Solicita una cotización personalizada para tu proyecto web.',
      '/proceso': 'Conoce nuestro proceso de trabajo paso a paso para crear tu sitio web perfecto.',
      '/beneficios': 'Descubre por qué somos la mejor opción para el desarrollo de tu sitio web.',
      '/agendar-llamada': 'Agenda una llamada con nuestro equipo para discutir tu proyecto.'
    };
    
    // Buscar la descripción más específica primero
    if (descriptions[url]) {
      return descriptions[url];
    }
    
    // Si no hay una descripción exacta, buscar por coincidencia parcial
    for (const [key, value] of Object.entries(descriptions)) {
      if (url.startsWith(key)) {
        return value;
      }
    }
    
    return 'Haz clic para más información';
  };

  // Estado para controlar el modal
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para manejar el clic en un enlace
  const handleLinkClick = (e, url, description) => {
    e.preventDefault();
    setModalContent({
      title: e.target.textContent,
      description: description,
      url: url
    });
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  // Función para convertir enlaces en texto a elementos <a> con tooltips
  const formatMessageWithLinks = (text) => {
    if (!text) return '';
    
    // Expresión regular para encontrar enlaces en formato [texto](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    // Encontrar todos los enlaces en el texto
    while ((match = linkRegex.exec(text)) !== null) {
      // Agregar el texto antes del enlace
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      // Agregar el enlace como elemento <a> con tooltip
      const [fullMatch, linkText, linkUrl] = match;
      const description = getLinkDescription(linkUrl);
      
      parts.push(
        <span key={match.index} className="tooltip-container">
          <a 
            href={linkUrl} 
            onClick={(e) => handleLinkClick(e, linkUrl, description)}
            className="chat-link"
            title={description}
          >
            {linkText}
          </a>
          <span className="tooltip">{description}</span>
        </span>
      );
      
      lastIndex = match.index + fullMatch.length;
    }
    
    // Agregar el texto restante después del último enlace
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    // Si no había enlaces, devolver el texto original
    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-avatar">🤖</div>
        <div className="chat-info">
          <h4>Asistente Virtual</h4>
          <span>En línea</span>
        </div>
        <button 
          className="close-btn" 
          onClick={onClose}
          title="Cerrar chat"
          aria-label="Cerrar chat"
        >
          ×
        </button>
      </div>
      
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.sender === 'bot' && <div className="message-avatar">🤖</div>}
            <div className="message-content">
              {formatMessageWithLinks(message.text)}
              <span className="message-time">
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message bot typing">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <span className="typing-dots">
                <span>.</span><span>.</span><span>.</span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          onFocus={() => socket.current.emit('typing')}
        />
        <button type="submit" className="send-btn" disabled={!input.trim()}>
          <span role="img" aria-label="enviar">📤</span>
        </button>
      </form>

      {/* Modal para mostrar el contenido de los enlaces */}
      {isModalOpen && modalContent && (
        <div className="chat-modal-overlay" onClick={closeModal}>
          <div className="chat-modal" onClick={e => e.stopPropagation()}>
            <div className="chat-modal-header">
              <h3>{modalContent.title}</h3>
              <button className="close-modal-btn" onClick={closeModal}>&times;</button>
            </div>
            <div className="chat-modal-content">
              <p>{modalContent.description}</p>
              <p>¿Te gustaría visitar la página completa?</p>
            </div>
            <div className="chat-modal-footer">
              <button 
                className="btn btn-secondary" 
                onClick={closeModal}
              >
                Seguir en el chat
              </button>
              <a 
                href={modalContent.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Ir a la página
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
