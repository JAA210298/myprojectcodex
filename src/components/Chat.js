import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './Chat.css';

const Chat = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const socket = useRef(null);

  // Conectar al servidor WebSocket
  useEffect(() => {
    const serverUrl = process.env.REACT_APP_WS_URL || 'http://localhost:3001';
    console.log('Conectando a:', serverUrl);
    
    socket.current = io(serverUrl, {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd'
      }
    });
    
    // Manejar errores de conexión
    socket.current.on('connect_error', (error) => {
      console.error('Error de conexión:', error);
    });
    
    // Confirmar conexión exitosa
    socket.current.on('connect', () => {
      console.log('✅ Conectado al servidor WebSocket');
    });

    // Manejar mensajes entrantes
    socket.current.on('message', (message) => {
      console.log('Mensaje recibido del servidor:', message);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: message.text || message,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    });

    // Manejar estado de escritura
    socket.current.on('typing', () => {
      setIsTyping(true);
    });

    // Manejar errores
    socket.current.on('error', (error) => {
      console.error('Error en el socket:', error);
    });

    return () => {
      if (socket.current) {
        console.log('Desconectando del servidor WebSocket');
        socket.current.disconnect();
      }
    };
  }, []);

  // Desplazarse al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageText = input.trim();
    if (!messageText) return;

    // Crear y mostrar mensaje del usuario
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Mostrar indicador de escritura
    setIsTyping(true);

    // Enviar mensaje al servidor
    if (socket.current && socket.current.connected) {
      console.log('Enviando mensaje al servidor:', messageText);
      socket.current.emit('message', { 
        text: messageText,
        timestamp: new Date().toISOString()
      });
    } else {
      console.error('No hay conexión con el servidor');
      // Mostrar mensaje de error al usuario
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: 'No se pudo enviar el mensaje. Intenta recargar la página.',
        sender: 'system',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-avatar">🤖</div>
        <div className="chat-info">
          <h4>Asistente Virtual</h4>
          <span>En línea</span>
        </div>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.sender === 'bot' && <div className="message-avatar">🤖</div>}
            <div className="message-content">
              {message.text}
              <span className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
    </div>
  );
};

export default Chat;
