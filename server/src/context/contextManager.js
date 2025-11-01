// Almacena el contexto de las conversaciones
const conversations = new Map();

// Tiempo de vida de una conversación en milisegundos (30 minutos)
const CONVERSATION_TTL = 30 * 60 * 1000;

// Limpiar conversaciones antiguas
setInterval(() => {
  const now = Date.now();
  for (const [sessionId, data] of conversations.entries()) {
    if (now - data.lastInteraction > CONVERSATION_TTL) {
      conversations.delete(sessionId);
    }
  }
}, 60 * 1000); // Revisar cada minuto

const contextManager = {
  // Obtener el contexto actual de una conversación
  getContext(sessionId) {
    if (!conversations.has(sessionId)) {
      return {
        lastIntent: null,
        entities: {},
        history: [],
        lastInteraction: Date.now()
      };
    }
    return conversations.get(sessionId);
  },

  // Actualizar el contexto de una conversación
  updateContext(sessionId, updates) {
    const currentContext = this.getContext(sessionId);
    const updatedContext = {
      ...currentContext,
      ...updates,
      lastInteraction: Date.now(),
      history: [
        ...(currentContext.history || []),
        { timestamp: new Date().toISOString(), ...updates }
      ].slice(-10) // Mantener solo las últimas 10 interacciones
    };
    
    conversations.set(sessionId, updatedContext);
    return updatedContext;
  },

  // Limpiar el contexto de una conversación
  clearContext(sessionId) {
    conversations.delete(sessionId);
  },

  // Obtener historial de la conversación
  getHistory(sessionId) {
    return this.getContext(sessionId).history || [];
  },

  // Actualizar entidades en el contexto
  updateEntities(sessionId, newEntities) {
    const context = this.getContext(sessionId);
    const updatedEntities = { ...context.entities, ...newEntities };
    return this.updateContext(sessionId, { entities: updatedEntities });
  }
};

module.exports = contextManager;
