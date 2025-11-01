require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
// Configuración de CORS
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['my-custom-header']
  },
  transports: ['websocket', 'polling'],
  allowEIO3: true
});

// Configuración de CORS para las rutas HTTP
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Middleware
app.use(cors());
app.use(express.json());

// Almacén de mensajes (en producción usa una base de datos)
const messageStore = new Map();

// Manejar conexiones de Socket.io
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado:', socket.id);
  
  // Generar un ID de sesión único para el usuario
  const sessionId = uuidv4();
  
  // Enviar el ID de sesión al cliente
  socket.emit('session', { sessionId });
  
  // Manejar mensajes entrantes
  socket.on('message', async (data) => {
    try {
      const { message, sessionId } = data;
      
      if (!message || typeof message !== 'string') {
        return socket.emit('error', { message: 'Mensaje inválido' });
      }
      
      console.log(`Mensaje recibido de ${sessionId}:`, message);
      
      // Guardar mensaje del usuario
      if (!messageStore.has(sessionId)) {
        messageStore.set(sessionId, []);
      }
      
      const userMessage = {
        id: uuidv4(),
        text: message,
        sender: 'user',
        timestamp: new Date().toISOString()
      };
      
      messageStore.get(sessionId).push(userMessage);
      
      // Aquí podrías integrar con tu lógica de IA para generar una respuesta
      // Por ahora, usaremos respuestas predefinidas
      const botResponse = generateBotResponse(message);
      
      // Simular tiempo de respuesta
      setTimeout(() => {
        // Guardar respuesta del bot
        messageStore.get(sessionId).push({
          id: uuidv4(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date().toISOString()
        });
        
        // Enviar respuesta al cliente
        socket.emit('message', {
          id: uuidv4(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date().toISOString()
        });
      }, 1000);
      
    } catch (error) {
      console.error('Error al procesar mensaje:', error);
      socket.emit('error', { message: 'Error al procesar el mensaje' });
    }
  });
  
  // Manejar solicitud de historial
  socket.on('getHistory', ({ sessionId }) => {
    try {
      const history = messageStore.get(sessionId) || [];
      socket.emit('history', history);
    } catch (error) {
      console.error('Error al obtener historial:', error);
      socket.emit('error', { message: 'Error al cargar el historial' });
    }
  });
  
  // Manejar desconexión
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Función para generar respuestas del bot
function generateBotResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Intenciones básicas
  if (/hola|buenos días|buenas tardes|buenas noches|hey|hi|hello/i.test(lowerMessage)) {
    const greetings = [
      '¡Hola! ¿En qué puedo ayudarte hoy? 😊',
      '¡Hola! ¿Cómo estás? Estoy aquí para ayudarte.',
      '¡Hola! ¿En qué puedo asistirte hoy?'
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  if (/servicios|qué ofrecen|qué hacen|productos/i.test(lowerMessage)) {
    return 'Ofrecemos los siguientes servicios:\n- Desarrollo web a medida\n- Diseño gráfico profesional\n- Marketing digital\n- Consultoría tecnológica\n\n¿Te gustaría más información sobre alguno en particular?';
  }
  
  if (/contacto|contactar|email|teléfono|dirección|dónde están|ubicación/i.test(lowerMessage)) {
    return 'Puedes contactarnos a través de:\n📧 contacto@miempresa.com\n📞 +1 234 567 8900\n📍 Calle Principal #123, Ciudad, País';
  }
  
  if (/gracias|muchas gracias|te lo agradezco/i.test(lowerMessage)) {
    return '¡De nada! 😊 ¿Hay algo más en lo que pueda ayudarte?';
  }
  
  if (/adiós|hasta luego|nos vemos|chao|hasta pronto/i.test(lowerMessage)) {
    return '¡Hasta luego! Que tengas un excelente día. 😊';
  }
  
  // Respuesta por defecto
  const defaultResponses = [
    'Lo siento, no estoy seguro de entenderte. ¿Podrías reformular tu pregunta?',
    'No estoy seguro de entender. ¿Podrías decirlo de otra forma?',
    'Voy a necesitar más información para ayudarte con eso. ¿Podrías ser más específico?',
    'No tengo una respuesta para eso, pero puedo ayudarte con información sobre nuestros servicios o contacto.'
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Ruta de verificación de estado
app.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    clients: io.engine.clientsCount
  });
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Algo salió mal en el servidor',
    details: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor WebSocket corriendo en el puerto ${PORT}`);
  console.log(`🌐 Conecta tu cliente a: ws://localhost:${PORT}`);
});

// Manejo de cierre limpio
process.on('SIGTERM', () => {
  console.log('Recibida señal SIGTERM. Cerrando servidor...');
  server.close(() => {
    console.log('Servidor cerrado.');
    process.exit(0);
  });
});

module.exports = { app, server };
