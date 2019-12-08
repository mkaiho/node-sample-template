import http from 'http';

import app from './app';

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


function normalizePort(val: string): number {
  const PORT_STRING_PATTERN = /^[1-9][\d]*$/;
  if (!PORT_STRING_PATTERN.test(val || '')) {
    return NaN;
  }

  return parseInt(val, 10);
}

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe + ${port}`
    : `Pipe + ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  let bind = '';
  if (typeof addr === 'string') {
    bind = `pipe ${addr}`;
  } else if (addr) {
    bind = `port ${addr.port}`;
  } else {
    throw new Error('port is invalid.');
  }
  console.info(`Listening on ${bind}`);
}
