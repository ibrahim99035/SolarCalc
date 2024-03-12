const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Check if the request is for static files
  if (req.url.startsWith('/static/')) {
    // Get the file path for static files
    const filePath = path.join(__dirname, req.url);

    // Read the file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
      } else {
        // Determine the content type based on the file extension
        const ext = path.extname(filePath);
        let contentType = 'text/html';
        if (ext === '.png') {
          contentType = 'image/png';
        } else if (ext === '.jpg' || ext === '.jpeg') {
          contentType = 'image/jpeg';
        }

        // Set the appropriate content type and send the file
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  } else {
    // If the request is not for static files, serve the HTML file
    const htmlFilePath = path.join(__dirname, 'Solar.html');
    fs.readFile(htmlFilePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading HTML file');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}/`);
});