/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 8081;
app.listen(port);
