const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 8080

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
}

const server = http.createServer((req, res) => {
  let url = req.url === '/' ? '/index.html' : req.url

  // Try exact file, then try appending /index.html
  let filePath = path.join(__dirname, url)
  let ext = path.extname(filePath)

  if (!ext && !url.endsWith('/')) {
    // No extension, try as directory with index.html
    const dirPath = path.join(__dirname, url)
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      filePath = path.join(dirPath, 'index.html')
      ext = '.html'
    }
  } else if (!ext || ext === '') {
    const indexPath = path.join(filePath, 'index.html')
    if (fs.existsSync(indexPath)) {
      filePath = indexPath
      ext = '.html'
    }
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404)
      res.end('Not Found')
      return
    }
    res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' })
    res.end(data)
  })
})

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
