const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  const browserSync = require('browser-sync');
  const bs = browserSync
    .create()
    .init({
      logSnippet: false,
      files: [path.join(__dirname, '/public/**/*.{html,css,js,json}')]
    });
  app.use(require('connect-browser-sync')(bs));

  console.log('added browsersync')
}

app.use(express.static(publicDir));

app.get('/', (req, res) => res.sendFile(path.join(publicDir, 'index.html')));

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
