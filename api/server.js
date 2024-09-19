// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!


require('dotenv').config(); 
const express = require('express');
const cors = require('cors');

const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

const server = express();
//const port = process.env.PORT || 9000;

server.use(express.json());
server.use(cors()); 


server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

module.exports = server;