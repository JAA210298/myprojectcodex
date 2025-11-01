// Normaliza el texto para comparación
const normalizeText = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
    .replace(/[^a-z0-9\s]/g, '') // Elimina caracteres especiales
    .trim();
};

// Calcula la similitud entre dos cadenas (0 a 1)
const stringSimilarity = (str1, str2) => {
  const set1 = new Set(str1.split(/\s+/));
  const set2 = new Set(str2.split(/\s+/));
  
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  return union.size === 0 ? 0 : intersection.size / union.size;
};

// Extrae entidades del mensaje
const extractEntities = (message) => {
  const entities = {};
  const lowerMessage = message.toLowerCase();
  
  // Extraer correos electrónicos
  const emailMatch = lowerMessage.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
  if (emailMatch) {
    entities.email = emailMatch[0];
  }
  
  // Extraer números de teléfono
  const phoneMatch = lowerMessage.match(/(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{2,4}/);
  if (phoneMatch) {
    entities.phone = phoneMatch[0];
  }
  
  // Palabras clave
  const keywords = ['precio', 'costo', 'cuánto cuesta', 'tarifa'];
  keywords.forEach(keyword => {
    if (lowerMessage.includes(keyword)) {
      entities.lookingForPrice = true;
    }
  });
  
  return entities;
};

// Selecciona una respuesta aleatoria de un array
const getRandomResponse = (responses) => {
  return responses[Math.floor(Math.random() * responses.length)];
};

module.exports = {
  normalizeText,
  stringSimilarity,
  extractEntities,
  getRandomResponse
};
