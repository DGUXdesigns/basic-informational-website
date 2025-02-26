import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

config();
const app = express();
const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  Listen for requests
app.get('/', (req, res) => {
  res.sendFile('./pages/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  res.sendFile('./pages/about.html', { root: __dirname });
});

app.get('/contact-me', (req, res) => {
  res.sendFile('./pages/contact-me.html', { root: __dirname });
});

// redirects
app.get('/contact', (req, res) => {
  res.redirect('/contact-me');
});

app.get('/home', (req, res) => {
  res.redirect('/');
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile('./pages/404.html', { root: __dirname });
});

app.listen(PORT, () => {
  console.log('Server running on port:', PORT);
});
