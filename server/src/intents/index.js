// Intenciones del chatbot
const intents = {
  greeting: {
    patterns: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'hey', 'holi', 'saludos'],
    responses: [
      '¡Hola! ¿En qué puedo ayudarte hoy? 😊',
      '¡Hola! ¿Cómo estás? Estoy aquí para ayudarte.',
      '¡Hola! ¿En qué puedo asistirte hoy?'
    ],
    context: {}
  },
  services: {
    patterns: ['servicios', 'qué ofrecen', 'qué hacen', 'servicio', 'productos'],
    responses: [
      'Ofrecemos los siguientes servicios:\n- Desarrollo web a medida\n- Diseño gráfico profesional\n- Marketing digital\n- Consultoría tecnológica\n\n¿Te gustaría más información sobre alguno en particular?',
      'Nuestros servicios incluyen desarrollo web, diseño gráfico y marketing digital. ¿Te interesa alguno en específico?',
      'Trabajamos en desarrollo de software, diseño y marketing digital. ¿Sobre cuál te gustaría saber más?'
    ],
    context: {}
  },
  contact: {
    patterns: ['contacto', 'contactar', 'email', 'teléfono', 'dirección', 'dónde están', 'ubicación'],
    responses: [
      'Puedes contactarnos a través de:\n📧 contacto@miempresa.com\n📞 +1 234 567 8900\n📍 Calle Principal #123, Ciudad, País',
      'Nuestros datos de contacto son:\n- Email: info@miempresa.com\n- Teléfono: +1 234 567 8900\n- Dirección: Calle Principal #123',
      '¡Claro! Estamos en Calle Principal #123. También puedes escribirnos a contacto@miempresa.com o llamarnos al +1 234 567 8900.'
    ],
    context: {}
  },
  thanks: {
    patterns: ['gracias', 'muchas gracias', 'te lo agradezco', 'genial, gracias', 'gracias por la ayuda'],
    responses: [
      '¡De nada! 😊 ¿Hay algo más en lo que pueda ayudarte?',
      '¡Con gusto! ¿Necesitas algo más?',
      '¡Para eso estoy! 😊 ¿En qué más puedo ayudarte hoy?'
    ],
    context: {}
  },
  goodbye: {
    patterns: ['adiós', 'hasta luego', 'nos vemos', 'chao', 'hasta pronto', 'me voy'],
    responses: [
      '¡Hasta luego! Que tengas un excelente día. 😊',
      '¡Nos vemos pronto! Si necesitas algo más, aquí estaré.',
      '¡Hasta la próxima! Fue un gusto ayudarte.'
    ],
    context: {}
  },
  help: {
    patterns: ['ayuda', 'qué puedes hacer', 'cómo funciona', 'qué sabes hacer'],
    responses: [
      'Puedo ayudarte con información sobre nuestros servicios, contacto, precios y más. ¿Sobre qué te gustaría saber?',
      'Estoy aquí para ayudarte con información sobre nuestra empresa. Puedes preguntarme por nuestros servicios, precios o cómo contactarnos.',
      'Puedo responder preguntas sobre nuestros productos, servicios y darte información de contacto. ¿En qué necesitas ayuda?'
    ],
    context: {}
  },
  default: {
    patterns: [],
    responses: [
      'Lo siento, no estoy seguro de entenderte. ¿Podrías reformular tu pregunta?',
      'No estoy seguro de entender. ¿Podrías decirlo de otra forma?',
      'Voy a necesitar más información para ayudarte con eso. ¿Podrías ser más específico?'
    ],
    context: {}
  }
};

module.exports = intents;
