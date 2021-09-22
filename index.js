const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html');

    if (req.url === '/') {
      fs.readFile(
        path.join(__dirname, 'views', 'index.html'),
        (err, content) => {
          if (err) {
            throw err;
          } else {
            res.end(content);
          }
        }
      );
    } else if (req.url === '/about.html') {
      fs.readFile(
        path.join(__dirname, 'views', 'about.html'),
        (err, content) => {
          if (err) {
            throw err;
          } else {
            res.end(content);
          }
        }
      );
    } else if (req.url === '/api/users') {
      res.setHeader('Content-Type', 'text/json');

      const users = [
        {name: 'Andriy', age: 17},
        {name: 'Vlad', age: 25},
      ];

      res.end(JSON.stringify(users));
    }
  } else if (req.method === "POST") {
    const body = [];

    res.setHeader('Content-Type', 'text/html');

    req.on('data', data => {
      body.push(Buffer.from(data));
    });

    req.on('end', () => {
      const message = body.toString().split('=')[1];

      res.end(`
        <h1>Form</h1>
        <form method="post" action="/">
          <input name="title" type="text">
          <button type="submit">
            Send
          </button>
        </form>
        <h2>Your message: ${message}</h2>
      `);
    });
  }
});

server.listen(3000, () => {
  console.log('server is running...');
});