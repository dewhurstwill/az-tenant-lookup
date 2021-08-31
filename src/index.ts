// Import the configured express app
import app from './app';

// Setting the default port for express
let port: number = 80;

// If a port is configured as an environment variable
// use that over the hard-coded port
if (process.env.PORT) {
  port = parseInt(process.env.PORT)
}

// Start express listening on the above port
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
