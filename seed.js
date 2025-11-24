const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

// Product Data (20 curated Makeup and Hair items) with subCategory for Makeup
const products = [
    { name: "Nude Satin Lipstick", price: 699, category: "Makeup", description: "Creamy nude shade for everyday wear.", image: "https://m.bobbibrown.in/media/export/cms/products/responsive/bb_sku_EWAR06_1x1_0.png?width=440&height=440", isNewArrival: true, onOffer: false },
    { name: "Lip Gloss Set (5 shades)", price: 549, category: "Makeup", description: "Shiny lip gloss set with 5 vibrant shades.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRdo1YdsbDCyMWCioaYXmp7E9iomS3V1P3wA&s", isNewArrival: true, onOffer: false },
    { name: "Liquid Foundation - Natural Beige", price: 549, category: "Makeup", description: "Medium coverage, lightweight formula.", image: "https://www.esteelauder.co.uk/media/export/cms/products/640x640/el_sku_1G5YCF_640x640_0.jpg?width=640", isNewArrival: false, onOffer: false },
    { name: "HD Compact Powder", price: 599, category: "Makeup", description: "matte look", image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSK99PbwI9BlRMfSFi1Y_-gBIS9eSQxpKDe2YZMCJJjAtj2c3d9aqB6CmTzV0fz72EqKh7rijIP7A8yd20j1-htZ84o32Cf82S8_cdc8bTMyVPgbocBPSnU", isNewArrival: false, onOffer: false },
    { name: "Colour Correcting Primer", price: 899, category: "Makeup", description: "highly pigmented", image: "https://images-static.nykaa.com/media/catalog/product/f/0/f04d5108904245704179_1.jpg?tr=w-344,h-344,cm-pad_resize", isNewArrival: true, onOffer: false },
    { name: "Highlighter Palette - Glow", price: 799, category: "Makeup", description: "Three luminous shades for a radiant finish.", image: "https://images-static.nykaa.com/media/catalog/product/2/6/262c5ad8904245710576_1.jpg?tr=w-344,h-344,cm-pad_resize", isNewArrival: true, onOffer: false },
    { name: "Waterproof Mascara - Black", price: 399, category: "Makeup", description: "Volumizing waterproof mascara for long wear.", image: "https://images-static.nykaa.com/media/catalog/product/6/3/6355fd7KAYBE00000865_1.jpg", isNewArrival: false, onOffer: true },
    { name: "Gel Eyeliner Pencil", price: 299, category: "Makeup", description: "Smudge-proof gel eyeliner in black.", image: "https://m.media-amazon.com/images/I/61+9hMd2juL._SX522_.jpg", isNewArrival: false, onOffer: false },
    { name: "Professional Makeup Brush Set (12 pcs)", price: 1299, category: "Makeup", description: "Synthetic brushes for smooth application and blending.", image: "https://images-static.nykaa.com/media/catalog/product/f/6/f674195MARSX00000882-new_1.jpg?tr=w-344,h-344,cm-pad_resize", isNewArrival: false, onOffer: true },
    { name: "Nourishing Argan Shampoo", price: 499, category: "Hair", description: "Sulfate-free shampoo enriched with argan oil for shine and softness.", image: "https://m.media-amazon.com/images/I/316mNphZuPL._SX342_SY445_QL70_FMwebp_.jpg", isNewArrival: true, onOffer: true },
    { name: "Keratin Repair Conditioner", price: 599, category: "Hair", description: "Deep conditioning treatment to repair and smooth frizzy hair.", image: "https://images-static.nykaa.com/media/catalog/product/9/4/940d7bcLORAA00000091_1.jpg?tr=w-344,h-344,cm-pad_resize", isNewArrival: false, onOffer: false },
    { name: "Hair Serum with Vitamin E", price: 399, category: "Hair", description: "Lightweight serum to reduce frizz and add shine.", image: "https://m.media-amazon.com/images/I/51LfZQgYA+L._SX522_.jpg", isNewArrival: true, onOffer: false },
    { name: "Scalp Detox Mask", price: 699, category: "Hair", description: "Clarifying mask to remove buildup and stimulate scalp.", image: "https://d2j6dbq0eux0bg.cloudfront.net/images/27229047/3683999653.jpg", isNewArrival: true, onOffer: true },
    { name: "Thermal Protect Spray", price: 349, category: "Hair", description: "Heat protection for styling up to 230°C.", image: "https://assets.vogue.in/photos/5d5d08eb6bda97000860ed99/master/w_1600%2Cc_limit/Wella-Professionals-EIMI-Thermal-Image-Heat-Protection-Spray.jpg", isNewArrival: false, onOffer: false },
    { name: "Volumizing Mousse", price: 299, category: "Hair", description: "Adds body and hold without crunch.", image: "https://www.ozhairandbeauty.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F1588%2F9573%2Ffiles%2FMuk-Hot-muk-Thermal-Protector-250ml_6.png%3Fv%3D1751439858&w=3840&q=75", isNewArrival: false, onOffer: true },
    
    ,
    // Added Skincare & Bath & Body products
    { name: "Gentle Hydrating Face Wash", price: 299, category: "Skincare", image: "https://stripesbeauty.com/cdn/shop/products/skin-care-trial-kit-stripes-beauty-2_1080x.jpg?v=1713378387", isNewArrival: true, onOffer: false },
    { name: "Vitamin C Brightening Serum", price: 899, category: "Skincare", description: "Brightening serum with stable vitamin C to boost radiance.", image: "https://media.douglas.ch/medias/vUk9qi1220066-0-global.jpg?context=bWFzdGVyfGltYWdlc3w1MzgwMnxpbWFnZS9qcGVnfGFETmxMMmd4T1M4Mk5ESTNNekF4T1RFME1qRTNOQzkyVldzNWNXa3hNakl3TURZMlh6QmZaMnh2WW1Gc0xtcHdad3wzZjNkNDZhMTkwNWNlZjZlMzBjYmQxYzE0ODY4OWIwNzhjNTNlMzNjNWE4MDViNDg0MTU1MjljMmY5NGM0YzY1&grid=true&imPolicy=grayScaled", isNewArrival: true, onOffer: true },
    { name: "Lightweight Moisturizer SPF15", price: 699, category: "Skincare", description: "Daily moisturizer with light hydration and SPF protection.", image: "https://dreamskinhaven.co.ke/wp-content/uploads/2022/04/CeraVe-Daily-Moisturizing-Lotion-For-Normal-To-Dry-Skin-87ml.png", isNewArrival: false, onOffer: false },
    { name: "Shea Butter Body Lotion", price: 349, category: "Bath & Body", description: "Deeply moisturizing body lotion enriched with shea butter.", image: "https://www.jiomart.com/images/product/original/1023848/plum-bodylovin-drivin-me-cherry-body-lotion-25gm-prod-1023848-0-202312111033.jpg?im=Resize=(600,600)", isNewArrival: false, onOffer: true },
    { name: "Citrus Fresh Shower Gel", price: 299, category: "Bath & Body", description: "Invigorating citrus shower gel for a refreshing start to the day.", image: "https://philosophy.com/cdn/shop/files/PHF_AG_EDT_25_SG_90ml_Pack_Texture_Swatch.psd-JPG-300dpi-1550px.jpg?crop=center&height=600&v=1762571632&width=600", isNewArrival: false, onOffer: false },
    { name: "Exfoliating Body Scrub", price: 399, category: "Bath & Body", description: "Gentle scrub to remove dead skin and reveal smoothness.", image: "https://molecule.lt/image/cache/ekologiskas-atkuriantis-kuno-sveitiklis-su-vanile-ir-mandarinais_202306011646571-1000x1000.jpg", isNewArrival: true, onOffer: true },
    // Combo / Deal Products (10 combos)
    { name: "Party Ready Makeup Combo", price: 1799, category: "Makeup", description: "Lipstick + Eyeshadow + Highlighter - party-ready trio.", image:", isNewArrival: false, onOffer: true, isCombo: true, comboItems: [{name: 'Liquid Foundation - Natural Beige', price: 549}, {name: 'HD Compact Powder', price: 599}], comboPrice: 999 },
    { name: "Lip Lovers Duo", price: 1199, category: "Makeup", description: "Matte lipstick + Lip gloss set — double the glam.", image: "https://www.saltee.co.uk/wp-content/uploads/2021/11/Everyday-Essentials-Trio-700x700.jpg", isNewArrival: true, onOffer: true, isCombo: true, comboItems: [{name: 'Matte Liquid Lipstick - Plum', price: 749}, {name: 'Lip Gloss Set (5 shades)', price: 549}], comboPrice: 1199 },
    { name: "Eye Drama Kit", price: 1399, category: "Makeup", description: "Eyeshadow palette + Waterproof mascara + Gel eyeliner for striking eyes.", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQd2FG6o1F8mJZtpNbLrHc9yUGu-X3gX78FGMJxbNywBDv-yYIjJIiCDj6_73yWOvBs6quWgUjwjnaU52jMkuPYz9gU1fJgJP_ArBz5zy2a7Qv3coj0rti0icGeZ_csQREH049FaDevtg&usqp=CAc", isNewArrival: true, onOffer: true, isCombo: true, comboItems: [{name: 'Rose Gold Eyeshadow Palette', price: 1500}, {name: 'Waterproof Mascara - Black', price: 399}, {name: 'Gel Eyeliner Pencil', price: 299}], comboPrice: 1399 },
    { name: "Makeup Tools Set", price: 1499, category: "Makeup", description: "12-piece brush set + compact pouch for professional application.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyIsIdHZm4kj-RKk4zUmAEc6Xy4bRKd3fKKQ&s", isNewArrival: false, onOffer: true, isCombo: true, comboItems: [{name: 'Professional Makeup Brush Set (12 pcs)', price: 1299}, {name: 'Highlighter Palette - Glow', price: 799}], comboPrice: 1499 },
    { name: "Hair Care Duo", price: 899, category: "Hair", description: "Shampoo + Conditioner combo for nourished, shiny hair.", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRQnIbFPAoepV3_n3ap1Xbn_GJTmBE_uZ6wLnd1DP-p8rJrfdy-l0LJreH0HeDZ0wRxSh7NcZgZ9Tv0bbTf-CJlPiQeuSTSm2SqYmnQ3fYAwHLTV7_il8e2eA&usqp=CAc", isNewArrival: true, onOffer: true, isCombo: true, comboItems: [{name: 'Nourishing Argan Shampoo', price: 499}, {name: 'Keratin Repair Conditioner', price: 599}], comboPrice: 899 },
    { name: "Scalp Rescue Kit", price: 999, category: "Hair", description: "Detox mask + Hair serum to revive dull scalps.", image: "https://m.media-amazon.com/images/I/7177bslBd6L.jpg", isNewArrival: true, onOffer: true, isCombo: true, comboItems: [{name: 'Scalp Detox Mask', price: 699}, {name: 'Hair Serum with Vitamin E', price: 399}], comboPrice: 999 },
    
];

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nykaaDB';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        return seedDatabase();
    })
    .catch(err => {e: "https://img.joomcdn.net/6ba8519e79a136ff8356ea1f5b86732d36c20ee1_original.jpeg", isNewArrival: false, onOffer: true, isCombo: true, comboItems: [{name: 'Velvet Matte Red Lipstick', price: 799}, {name: 'Rose Gold Eyeshadow Palette', price: 1500}, {name: 'Highlighter Palette - Glow', price: 799}], comboPrice: 1799 },
    { name: "Everyday Essentials Combo", price: 999, category: "Makeup", description: "Foundation + Compact Powder for a smooth, everyday look.", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTCAGUNdDBwYau-9XIRHmNZUTAHp3dCATkE2Mf6coxsUZ5l9PM_lOdrht5rz6ommwykWmDg1-0IY_ZqBMv70SWMzyFHBrEgta3c0LZvvm_rlkYOWuDED9mjMOR0pXy0aAL4GNAEZjWFQA&usqp=CAc
        console.log('MongoDB Connection Error:', err);
        process.exit(1);
    });

// Seed Function
async function seedDatabase() {
    try {
        // Clear existing products
        await Product.deleteMany({});
        console.log('Existing products cleared');

        // Filter out any products missing an image before inserting
        const filteredProducts = products.filter(p => p.image && String(p.image).trim() !== '');
        // Insert new products
        await Product.insertMany(filteredProducts);
        console.log(`✅ Database seeded successfully with ${filteredProducts.length} products (filtered from ${products.length})`);
        
        // Close connection
        mongoose.connection.close();
        console.log('Database connection closed');
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
}

