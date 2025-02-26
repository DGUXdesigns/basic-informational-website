// Using Vanilla Node.js

import http from 'http';
import url from 'url';
import path from 'path';
import { readFile } from 'node:fs/promises';

const PORT = 8080;
const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET') {
      let filePath;

      if (req.url === '/') {
        filePath = path.join(dirname, 'index.html');
      } else if (req.url === '/about') {
        filePath = path.join(dirname, 'about.html');
      } else if (req.url === '/contact-me') {
        filePath = path.join(dirname, 'contact-me.html');
      } else {
        filePath = path.join(dirname, '404.html');
      }

      const data = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    }
  } catch (error) {
    res.writeHead(500, 'Content-Type', 'text/plain');
    res.end('Server Error');
  }
});

server.listen(PORT, () => {
  console.log('Server running on port:', PORT);
});
