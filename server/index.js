require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);

// Configuración CORS básica
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));

// Configuración simple de Socket.IO
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

// Función para detectar el idioma basado en el mensaje
function detectLanguage(message) {
  // Palabras comunes en español
  const spanishWords = ['hola', 'gracias', 'por favor', 'ayuda', 'servicio', 'precio', 'cuánto', 'dónde', 'cuándo', 'cómo', 'qué', 'quién'];
  
  // Palabras comunes en inglés
  const englishWords = ['hello', 'hi', 'thanks', 'please', 'help', 'service', 'price', 'how much', 'where', 'when', 'how', 'what', 'who'];
  
  const lowerMessage = message.toLowerCase();
  let spanishCount = 0;
  let englishCount = 0;
  
  // Contar palabras en español
  spanishWords.forEach(word => {
    if (lowerMessage.includes(word)) spanishCount++;
  });
  
  // Contar palabras en inglés
  englishWords.forEach(word => {
    if (lowerMessage.includes(word)) englishCount++;
  });
  
  // Determinar el idioma
  if (spanishCount > 0 || englishCount === 0) {
    return 'es';
  } else {
    return 'en';
  }
}

// Función para generar respuestas detalladas del bot
function generateBotResponse(message) {
  const lowerMessage = message.toLowerCase();
  const language = detectLanguage(message);
  
  // Saludos
  if (/hola|buenos días|buenas tardes|buenas noches|hey|hi|hello/i.test(lowerMessage)) {
    if (language === 'es') {
      const greetings = [
        '¡Hola! Soy tu asistente virtual de Mi Portal. ¿En qué puedo ayudarte hoy? 😊\n\nPuedes preguntarme sobre:\n• [Nuestros servicios](/servicios)\n• [Precios y planes](/precios)\n• [Cómo trabajamos](/proceso)\n\nHaz clic en los enlaces para más información o pregúntame directamente.'
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    } else {
      const greetings = [
        'Hello! I\'m your Mi Portal virtual assistant. How can I help you today? 😊\n\nYou can ask me about:\n• [Our services](/en/services)\n• [Pricing and plans](/en/pricing)\n• [How we work](/en/process)\n\nClick on the links for more information or ask me directly.'
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
  }
  
  // Servicios de desarrollo web
  if (/servicios|qué ofrecen|qué hacen|productos|soluciones|página web|sitio web|web|página|services|what do you offer|products|solutions|website/i.test(lowerMessage)) {
    if (language === 'es') {
      return `🌐 NUESTROS SERVICIOS DE DESARROLLO WEB 🌐

Aquí tienes un resumen de nuestros servicios principales. Para más detalles, visita nuestra página de [servicios completos](/servicios).

• [Páginas Web Corporativas](/servicios/paginas-web)
  - Diseño moderno y profesional
  - Totalmente adaptables a móviles
  - Optimizadas para buscadores (SEO)

• [Tiendas en Línea (E-commerce)](/servicios/tiendas-online)
  - Catálogo de productos ilimitado
  - Pasarelas de pago integradas
  - Gestión de inventario

• [Aplicaciones Web Progresivas (PWA)](/servicios/pwa)
  - Funcionamiento offline
  - Instalación en dispositivos
  - Notificaciones push

💡 ¿Te gustaría una cotización personalizada para tu proyecto web? [Solicitar cotización](/contacto#cotizacion)`;
    } else {
      return `🌐 OUR WEB DEVELOPMENT SERVICES 🌐

Here's a summary of our main services. For more details, visit our [full services page](/en/services).

• [Corporate Websites](/en/services/websites)
  - Modern and professional design
  - Fully mobile-responsive
  - Search engine optimized (SEO)

• [Online Stores (E-commerce)](/en/services/ecommerce)
  - Unlimited product catalog
  - Integrated payment gateways
  - Inventory management

• [Progressive Web Apps (PWA)](/en/services/pwa)
  - Offline functionality
  - Device installation
  - Push notifications

💡 Would you like a personalized quote for your web project? [Request a quote](/en/contact#quote)`;
    }
  }
  
  // Precios de desarrollo web
  if (/precios|cuánto cuesta|costos|tarifas|planes|presupuesto|prices?|how much|cost|budget|quote/i.test(lowerMessage)) {
    if (language === 'es') {
      return `💰 PRECIOS DE DESARROLLO WEB 💰

Aquí tienes un resumen de nuestros precios. Para ver todos los detalles, visita nuestra página de [precios completos](/precios).

• [Sitio Web Básico](/precios#basico) - Desde $499 USD
  - Hasta 5 páginas
  - Diseño responsivo
  - Formulario de contacto

• [Sitio Web Profesional](/precios#profesional) - Desde $1,299 USD
  - Hasta 15 páginas
  - Blog integrado
  - SEO avanzado

• [Tienda en Línea](/precios#tienda) - Desde $2,499 USD
  - Hasta 50 productos
  - Carrito de compras
  - Pasarela de pagos

💡 ¿Neitas un presupuesto personalizado? [Solicítalo aquí](/contacto#presupuesto)`;
    } else {
      return `💰 WEB DEVELOPMENT PRICING 💰

Here's a summary of our pricing. For full details, visit our [complete pricing page](/en/pricing).

• [Basic Website](/en/pricing#basic) - From $499 USD
  - Up to 5 pages
  - Mobile-responsive design
  - Contact form

• [Professional Website](/en/pricing#professional) - From $1,299 USD
  - Up to 15 pages
  - Integrated blog
  - Advanced SEO

• [Online Store](/en/pricing#ecommerce) - From $2,499 USD
  - Up to 50 products
  - Shopping cart
  - Payment gateway

💡 Need a custom quote? [Get one here](/en/contact#quote)`;
    }
  }
  
  // Información sobre la empresa
  if (/empresa|quiénes son|nuestra historia|sobre nosotros|equipo|misión|visión|valores|quiénes somos|acerca de|company|about us|our story|team|mission|vision|values|who we are/i.test(lowerMessage)) {
    if (language === 'es') {
      return `🏢 NUESTRA EMPRESA

En [Mi Portal Digital](/nosotros) somos más que una agencia de desarrollo web, somos tus socios en el mundo digital. Con más de 5 años de experiencia, hemos ayudado a más de 200 empresas a crecer su presencia en línea.

🔹 **Nuestra Misión**
Crear soluciones web innovadoras que impulsen el éxito de nuestros clientes, ofreciendo calidad, creatividad y soporte excepcional.

🔹 **Nuestro Equipo**
Contamos con un equipo multidisciplinario de:
• Desarrolladores web expertos
• Diseñadores creativos
• Especialistas en marketing digital
• Asesores en experiencia de usuario

🔹 **Lo que nos hace diferentes**
• Enfoque personalizado en cada proyecto
• Tecnologías de vanguardia
• Soporte post-venta dedicado
• Resultados medibles

💡 ¿Te gustaría [conocer más sobre nosotros](/nosotros) o [ver algunos de nuestros trabajos](/portafolio)?

📞 También puedes [agendar una llamada](/contacto) para conocernos mejor.`;
    } else {
      return `🏢 OUR COMPANY

At [Mi Portal Digital](/en/about), we're more than just a web development agency - we're your digital partners. With over 5 years of experience, we've helped more than 200 businesses grow their online presence.

🔹 **Our Mission**
To create innovative web solutions that drive our clients' success, delivering quality, creativity, and exceptional support.

🔹 **Our Team**
We have a multidisciplinary team of:
• Expert web developers
• Creative designers
• Digital marketing specialists
• User experience consultants

🔹 **What Makes Us Different**
• Personalized approach to each project
• Cutting-edge technologies
• Dedicated after-sales support
• Measurable results

💡 Would you like to [learn more about us](/en/about) or [see some of our work](/en/portfolio)?

📞 You can also [schedule a call](/en/contact) to get to know us better.`;
    }
  }
  
  // Contacto
  if (/contacto|contactar|email|teléfono|dirección|dónde están|ubicación|visitanos|contact|email|phone|address|where are you|location|visit us/i.test(lowerMessage)) {
    if (language === 'es') {
      return `📞 CONTÁCTANOS 📞

📧 Correo electrónico:
contacto@miportaldigital.com

📱 Teléfonos:
• +1 800 123 4567 (Oficina principal)
• +1 800 765 4321 (Soporte técnico)

🏢 Dirección:
Av. Principal #1234, Piso 5
Santiago, Región Metropolitana
Chile

🕒 Horario de atención:
Lunes a Viernes: 9:00 - 18:00 hrs
Sábados: 10:00 - 14:00 hrs

💬 También puedes escribirnos por WhatsApp: +56 9 8765 4321`;
    } else {
      return `📞 CONTACT US 📞

📧 Email:
hello@miportaldigital.com

📱 Phone:
• +1 800 123 4567 (Main office)
• +1 800 765 4321 (Technical support)

🏢 Address:
Main Ave #1234, 5th Floor
Santiago, Metropolitan Region
Chile

🕒 Business hours:
Monday to Friday: 9:00 AM - 6:00 PM
Saturdays: 10:00 AM - 2:00 PM

💬 You can also message us on WhatsApp: +56 9 8765 4321`;
    }
  }
  
  // Inicio de proyecto web
  if (/cómo empezar|contratar|comenzar|iniciar proyecto|contratar servicios|how to start|hire|begin|start project|get started/i.test(lowerMessage)) {
    if (language === 'es') {
      return `🚀 INICIA TU PROYECTO WEB HOY MISMO 🚀

Nuestro proceso es sencillo y transparente. [Ver proceso completo](/proceso)

1. [Agenda una consulta gratuita](/agendar-llamada)
2. Analizamos tus necesidades
3. Recibe una propuesta personalizada
4. Aprobación del diseño
5. Desarrollo y pruebas
6. ¡Lanzamiento de tu sitio web!

💡 Conoce más sobre [cómo trabajamos](/proceso) y los [beneficios](/beneficios) de elegirnos.

¿Listo para comenzar? [Contáctanos ahora](/contacto) o [solicita una cotización](/contacto#cotizacion)`;
    } else {
      return `🚀 START YOUR WEB PROJECT TODAY 🚀

Our process is simple and transparent. [See full process](/en/process)

1. [Schedule a free consultation](/en/schedule-call)
2. We analyze your needs
3. You receive a personalized proposal
4. Design approval
5. Development and testing
6. Your website goes live!

💡 Learn more about [how we work](/en/process) and the [benefits](/en/benefits) of choosing us.

Ready to get started? [Contact us now](/en/contact) or [request a quote](/en/contact#quote)`;
    }
  }
  
  // Preguntas frecuentes
  if (/preguntas frecuentes|faq|dudas|ayuda|frequently asked questions|help|support/i.test(lowerMessage)) {
    if (language === 'es') {
      return `❓ PREGUNTAS FRECUENTES ❓

• ¿Cómo restablezco mi contraseña?
  Ve a "¿Olvidaste tu contraseña?" en la página de inicio de sesión.

• ¿Qué métodos de pago aceptan?
  Aceptamos todas las tarjetas de crédito, transferencias bancarias y PayPal.

• ¿Ofrecen soporte técnico?
  ¡Sí! Nuestro equipo está disponible 24/7 para ayudarte.

• ¿Puedo cambiar de plan más adelante?
  Claro, puedes actualizar o reducir tu plan en cualquier momento.

¿Tienes alguna otra pregunta?`;
    } else {
      return `❓ FREQUENTLY ASKED QUESTIONS ❓

• How do I reset my password?
  Go to "Forgot your password?" on the login page.

• What payment methods do you accept?
  We accept all major credit cards, bank transfers, and PayPal.

• Do you offer technical support?
  Yes! Our team is available 24/7 to assist you.

• Can I change my plan later?
  Of course, you can upgrade or downgrade your plan at any time.

Do you have any other questions?`;
    }
  }
  
  // Agradecimientos
  if (/gracias|muchas gracias|te lo agradezco|excelente|genial|perfecto|thank|thanks|great|perfect/i.test(lowerMessage)) {
    if (language === 'es') {
      const thanks = [
        '¡De nada! 😊 ¿Hay algo más en lo que pueda ayudarte hoy?',
        '¡Fue un placer ayudarte! Si tienes más preguntas, aquí estoy.',
        '¡Genial! No dudes en preguntar si necesitas algo más. ¡Estoy aquí para ayudarte! 😊'
      ];
      return thanks[Math.floor(Math.random() * thanks.length)];
    } else {
      const thanks = [
        'You\'re welcome! 😊 Is there anything else I can help you with today?',
        'It was my pleasure to help! If you have more questions, I\'m here.',
        'Great! Feel free to ask if you need anything else. I\'m here to help! 😊'
      ];
      return thanks[Math.floor(Math.random() * thanks.length)];
    }
  }
  
  // Despedidas
  if (/adiós|hasta luego|nos vemos|chao|hasta pronto|chau|goodbye|bye|see you|later/i.test(lowerMessage)) {
    if (language === 'es') {
      const goodbyes = [
        '¡Hasta luego! Que tengas un excelente día. 😊',
        '¡Fue un placer ayudarte! Vuelve pronto si necesitas más información.',
        '¡Adiós! Recuerda que estoy aquí para ayudarte cuando lo necesites. ¡Que tengas un maravilloso día! 🌟'
      ];
      return goodbyes[Math.floor(Math.random() * goodbyes.length)];
    } else {
      const goodbyes = [
        'Goodbye! Have a great day. 😊',
        'It was a pleasure helping you! Come back soon if you need more information.',
        'Farewell! Remember I\'m here to help whenever you need me. Have a wonderful day! 🌟'
      ];
      return goodbyes[Math.floor(Math.random() * goodbyes.length)];
    }
  }
  
  // Respuesta por defecto
  if (language === 'es') {
    const defaultResponses = [
      'No estoy seguro de entender completamente tu pregunta. ¿Podrías ser un poco más específico?',
      'Voy a necesitar más detalles para ayudarte mejor. ¿Podrías reformular tu pregunta?',
      'Lo siento, no tengo información sobre eso. ¿Te gustaría saber sobre nuestros servicios, precios o cómo contactarnos?',
      'No tengo una respuesta exacta para eso, pero puedo ayudarte con información sobre nuestros servicios o resolver otras dudas que tengas.'
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  } else {
    const defaultResponses = [
      'I\'m not sure I fully understand your question. Could you be a bit more specific?',
      'I need more details to help you better. Could you rephrase your question?',
      'I don\'t have information about that. Would you like to know about our services, pricing, or how to contact us?',
      'I don\'t have an exact answer for that, but I can help you with information about our services or answer other questions you might have.'
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
  
}

// Manejar conexiones
io.on('connection', (socket) => {
  console.log('✅ Cliente conectado:', socket.id);
  // No enviamos mensaje de bienvenida aquí, el cliente lo maneja
  
  // Manejar mensajes del cliente
  socket.on('message', (data, callback) => {
    console.log('📩 Mensaje recibido del cliente:', data);
    
    // Generar respuesta del bot
    const botResponse = generateBotResponse(data.text);
    
    // Enviar respuesta al cliente
    socket.emit('message', {
      id: uuidv4(),
      text: botResponse,
      isUser: false,
      timestamp: new Date().toISOString()
    });
    
    if (callback) callback();
  });
  
  // Manejar desconexión
  socket.on('disconnect', () => {
    console.log('❌ Cliente desconectado:', socket.id);
  });
});

// Ruta de estado
app.get('/status', (req, res) => {
  res.json({
    status: 'ok',
    clients: io.engine.clientsCount || 0,
    timestamp: new Date().toISOString()
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
const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor WebSocket escuchando en http://0.0.0.0:${PORT}`);
  console.log(`🌐 WebSocket disponible en: ws://localhost:${PORT}`);
  console.log(`📊 Página de estado: http://localhost:${PORT}/status`);
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
