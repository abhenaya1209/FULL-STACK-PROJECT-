const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nykaaDB';

async function removeNoImage() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Delete products where image is missing, null or empty string
    const result = await Product.deleteMany({
      $or: [
        { image: { $exists: false } },
        { image: null },
        { image: '' }
      ]
    });

    console.log(`Removed ${result.deletedCount} product(s) with missing/empty images.`);
  } catch (err) {
    console.error('Error removing products without images:', err);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

removeNoImage();
