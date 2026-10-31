const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const PRODUCTS_DIR = path.join(__dirname, "..", "materiais", "04-marca", "mockups", "products");
if (!fs.existsSync(PRODUCTS_DIR)) {
  fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on("finish", () => {
        file.close(() => resolve(dest));
      });
    });
    req.on("error", (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

// Open Food Facts API (v0 or v2 with custom barcode search)
async function fetchOFFImage(query, filename) {
  return new Promise((resolve) => {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=5`;
    https.get(url, { headers: { "User-Agent": "ScanListApp - Web - Version 1.0" } }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", async () => {
        try {
          const json = JSON.parse(data);
          if (json.products && json.products.length > 0) {
            for (const p of json.products) {
              const img = p.image_front_url || p.image_url || p.image_small_url;
              if (img) {
                const dest = path.join(PRODUCTS_DIR, filename);
                await download(img, dest);
                console.log(`Downloaded ${filename} from ${img}`);
                return resolve(dest);
              }
            }
          }
          console.log(`No image found for ${query}`);
          resolve(null);
        } catch (e) {
          console.log(`Error parsing ${query}: ${e.message}`);
          resolve(null);
        }
      });
    }).on("error", (err) => {
      console.log(`Fetch error for ${query}: ${err.message}`);
      resolve(null);
    });
  });
}

async function main() {
  const items = [
    { query: "arroz tio joao", file: "arroz-tio-joao.jpg" },
    { query: "feijao camil", file: "feijao-camil.jpg" },
    { query: "leite itambe integral", file: "leite-itambe.jpg" },
    { query: "cafe pilao tradicional", file: "cafe-pilao.jpg" },
    { query: "detergente ype", file: "detergente-ype.jpg" },
  ];

  for (const item of items) {
    await fetchOFFImage(item.query, item.file);
  }
}

main();
