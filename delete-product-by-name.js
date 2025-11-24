const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nykaaDB';

// Accept product name as command-line argument or environment variable
const PRODUCT_NAME = process.argv[2] || process.env.PRODUCT_NAME || 'Matte Liquid Lipstick - Plum';

async function deleteByName(name) {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const result = await Product.deleteMany({ name: name });
    console.log(`Deleted ${result.deletedCount} document(s) with name "${name}".`);
  } catch (err) {
    console.error('Error deleting product:', err);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

deleteByName(PRODUCT_NAME);
