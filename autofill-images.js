const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nykaaDB';

function shouldSkipImage(url) {
  if (!url) return false;
  const skipHosts = ['encrypted-tbn', 'amazon.com', 'm.media-amazon', 'imgur.com', 'i.redd.it', 'pinimg.com'];
  return skipHosts.some(h => url.includes(h));
}

function keywordsForProduct(product) {
  const name = (product && product.name) ? String(product.name).toLowerCase() : '';
  const category = (product && product.category) ? String(product.category).toLowerCase() : '';

  // map rough category keywords to cosmetic-specific terms
  const categoryMap = {
    lipstick: 'lipstick',
    lip: 'lipstick',
    gloss: 'lip gloss',
    foundation: 'foundation',
    powder: 'compact powder',
    blush: 'blush',
    bronzer: 'bronzer',
    mascara: 'mascara',
    eyeliner: 'eyeliner',
    'eye': 'eye makeup',
    'eyeshadow': 'eye shadow',
    nail: 'nail polish',
    'face': 'face makeup',
    skincare: 'skincare',
    serum: 'skincare',
    lotion: 'skincare',
    parfum: 'perfume',
    perfume: 'perfume',
    combo: 'makeup set'
  };

  let tokens = [];
  // pick up words from name (limit to 3 meaningful words)
  if (name) {
    const words = name.replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
    tokens = tokens.concat(words.slice(0, 3));
  }

  // add a category-derived keyword if available
  for (const key of Object.keys(categoryMap)) {
    if (category.includes(key)) {
      tokens.push(categoryMap[key]);
      break;
    }
  }

  // fallback: if no tokens, use safe cosmetic defaults
  if (tokens.length === 0) tokens = ['makeup', 'cosmetics'];

  // Always bias search toward product closeups and cosmetics to avoid unrelated images
  tokens.push('product', 'makeup', 'cosmetics', 'closeup');

  // join with commas, unique and limited length
  const uniq = Array.from(new Set(tokens)).slice(0, 6);
  return uniq.join(',');
}

async function autofill() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const products = await Product.find();
    let updated = [];

    for (const p of products) {
      const img = p.image ? String(p.image).trim() : '';
      // If image is missing or is a generic placeholder (picsum / unsplash dynamic) we'll replace it
      const isPlaceholder = !img || img.includes('picsum.photos') || img.includes('source.unsplash.com') || img.includes('images.unsplash.com');

      if (isPlaceholder && !shouldSkipImage(img)) {
        const kws = keywordsForProduct(p);
        const newUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(kws)}`;
        p.image = newUrl;
        await p.save();
        updated.push({ id: p._id, name: p.name, image: newUrl });
      }
    }

    console.log(`Updated ${updated.length} product(s).`);
    if (updated.length > 0) {
      console.log('Sample updates:');
      updated.slice(0, 10).forEach((u, i) => console.log(`${i+1}. ${u.name} -> ${u.image}`));
    }
  } catch (err) {
    console.error('Error autofilling images:', err);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

autofill();
