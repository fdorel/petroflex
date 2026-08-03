/* 
 * Project: PetroFlex
 * File: client/lib/socket.js
 * Setup: Socket.io client for live price/inventory/order streams.
 */
import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000', {
  transports: ['websocket'],
});

export default socket;
