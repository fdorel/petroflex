/* 
 * Project: PetroFlex
 * File: server/src/websocket/index.js
 * Setup: Socket.io configuration for live price/inventory/order broadcasts.
 */
const { Server } = require('socket.io');

function initWebSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: process.env.CLIENT_URL || 'http://localhost:3000', methods: ['GET', 'POST'] }
  });

  io.on('connection', (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);
    
    // Simulate live data push every 15s for demo
    const interval = setInterval(() => {
      if (global.io) global.io.emit('heartbeat', { timestamp: new Date().toISOString() });
    }, 15000);

    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
      clearInterval(interval);
    });
  });

  return io;
}

module.exports = initWebSocket;
