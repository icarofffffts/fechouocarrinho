const https = require("https");
const fs = require("fs");
const path = require("path");

const PRODUCTS_DIR = path.join(__dirname, "..", "materiais", "04-marca", "mockups", "products");
if (!fs.existsSync(PRODUCTS_DIR)) {
  fs.mkdirSync(PRODUCTS_DIR, { recursive: true });
}

const items = [
  {
    name: "arroz-tio-joao.jpg",
    url: "https://images.openfoodfacts.org/images/products/789/350/002/0110/front_pt.13.400.jpg"
  },
  {
    name: "feijao-camil.jpg",
    url: "https://images.openfoodfacts.org/images/products/789/600/674/4115/front_en.3.400.jpg"
  },
  {
    name: "leite-itambe.jpg",
    url: "https://images.openfoodfacts.org/images/products/789/808/064/0611/front_en.19.400.jpg"
  },
  {
    name: "cafe-pilao.jpg",
    url: "https://images.openfoodfacts.org/images/products/789/608/901/1357/front_pt.11.400.jpg"
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error("Status " + res.statusCode));
      res.pipe(file);
      file.on("finish", () => file.close(() => resolve(dest)));
    }).on("error", reject);
  });
}

async function run() {
  for (const item of items) {
    const dest = path.join(PRODUCTS_DIR, item.name);
    try {
      await download(item.url, dest);
      const stat = fs.statSync(dest);
      console.log(`OK: ${item.name} (${stat.size} bytes)`);
    } catch (e) {
      console.error(`FAIL: ${item.name} - ${e.message}`);
    }
  }
}

run();
