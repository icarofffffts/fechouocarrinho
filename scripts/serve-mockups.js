const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3333;
const ROOT = path.join(__dirname, "..", "materiais", "04-marca", "mockups");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".svg": "image/svg+xml",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/" || urlPath === "") urlPath = "/index.html";
  const filePath = path.join(ROOT, urlPath);

  // Prevent path traversal
  if (!filePath.startsWith(ROOT)) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.statusCode = 404;
        res.end("Not Found");
      } else {
        res.statusCode = 500;
        res.end("Server Error");
      }
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.setHeader("Content-Type", MIME[ext] || "application/octet-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Mockups viewer running at http://localhost:${PORT}`);
  console.log(`Serving: ${ROOT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err.message);
  process.exit(1);
});
