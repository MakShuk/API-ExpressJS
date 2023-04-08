import express from 'express';

const host = '127.0.0.1';
const port = 8000;

const app = express();
app.get('/hollo', (req, res) => {
  res.send('Привет');
});

app.listen(port, () => {
  console.log(`Server running at https://localhost:${port}/`);
});



/* const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/hello') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Привет');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Страница не найдена');
  }
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
 */
