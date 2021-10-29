import express, { static } from 'express';
import { join, resolve } from 'path';

const app = express();

app.use(static(join(__dirname, '/public')));

app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 8081;
app.listen(port);
