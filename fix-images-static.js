const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nykaaDB';

// A list of stable picsum ids to use for images (800x600)
const PICSUM_IDS = [1015,1025,1035,1045,1055,1065,1075,1085,1095,1105,1115,1125,1135,1145,1155,1165,1175,1185,1195,1205,1215,1225,1235,1245,1255,1265,1275,1285,1295,1305,1315,1325,1335,1345,1355];

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const products = await Product.find().sort({ _id: 1 });
    console.log('Products fetched:', products.length);

    let idx = 0;
    for (const p of products) {
      const img = p.image ? String(p.image) : '';

      // Skip images that look intentionally external (user-provided Amazon/TBN etc)
      const skipHosts = ['encrypted-tbn', 'amazon.com', 'm.media-amazon.com', 'imgur.com', 'i.redd.it'];
      const isUserProvided = skipHosts.some(h => img.includes(h));

      if (isUserProvided) continue;

      // If image already looks static picsum with an id from our list, skip
      if (img.includes('picsum.photos') && /id\/(\d+)\//.test(img)) {
        continue;
      }

      // Assign a stable picsum id in round-robin fashion
      const id = PICSUM_IDS[idx % PICSUM_IDS.length];
      const newUrl = `https://picsum.photos/id/${id}/800/600`;
      p.image = newUrl;
      await p.save();
      idx++;
    }

    console.log('Static image assignment complete. Updated count:', idx);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

run();
