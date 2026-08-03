/* 
 * Project: PetroFlex
 * File: server/src/server.js
 * Setup: Express entry point. Mounts routes, DB, WebSocket, and security middleware.
 */
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const initWebSocket = require('./websocket');

// Routes
const pricesRouter = require('./routes/prices');
const stationsRouter = require('./routes/stations');
const cardsRouter = require('./routes/cards');
const inventoryRouter = require('./routes/inventory');
const ordersRouter = require('./routes/orders');

const app = express();
const httpServer = http.createServer(app);

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// DB Connection
connectDB();

// Attach routes
app.use('/api/prices', pricesRouter);
app.use('/api/stations', stationsRouter);
app.use('/api/cards', cardsRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/orders', ordersRouter);

// Health check
app.get('/health', (req, res) => res.status(200).json({ status: 'OK' }));

// Initialize WebSocket & attach to global for routes
global.io = initWebSocket(httpServer);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
