const http = require('http');
const app = require('./app');
const swaggerSetup = require('./swagger'); 

//use port in env file or 5000
const port = process.env.PORT || 5000;

const server = http.createServer(app);
swaggerSetup(app);
console.log(typeof swaggerSetup);
server.listen(port);