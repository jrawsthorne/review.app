const express = require('express');

const app = express();
const path = require('path');

app.use(express.static('public'));

// viewed at http://localhost:3000

app.get('/callback', (req, res) => {
  console.log(process.env);
  const { access_token: accessToken, expires_in: expiresIn, state } = req.query;
  const next = state && state[0] === '/' ? state : '/';
  if (accessToken && expiresIn) {
    res.cookie('access_token', accessToken, { maxAge: expiresIn * 1000 });
    res.redirect(next);
  } else {
    res.status(401).send({ error: 'access_token or expires_in Missing' });
  }
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/public/index.html`));
});

app.listen(3000);
