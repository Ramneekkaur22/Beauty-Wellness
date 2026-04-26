// ============================================================
// config/db.js — MongoDB connection via Mongoose
// ============================================================
const mongoose = require('mongoose');

const SERVICES = [
  {
    title: 'Luxury Hair Spa Treatment',
    category: 'Hair Care',
    provider: 'Élite Hair Studio',
    price: 2499,
    duration: 90,
    rating: 4.9,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&q=80',
    description: 'Indulge in a deep-nourishing hair spa that restores moisture, eliminates frizz, and leaves your hair silky smooth. Includes keratin mask, scalp massage, and blowout.',
    location: 'Connaught Place, Delhi',
    tags: ['trending', 'popular'],
  },
  {
    title: 'Glow Facial & Skin Brightening',
    category: 'Skin Care',
    provider: 'Lumière Skin Clinic',
    price: 3199,
    duration: 60,
    rating: 4.8,
    reviewCount: 96,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    description: 'A signature brightening facial using vitamin C serums, hyaluronic acid, and LED therapy to reveal radiant, even-toned skin. Perfect for dull or stressed skin.',
    location: 'Bandra West, Mumbai',
    tags: ['popular', 'new'],
  },
  {
    title: 'Nail Art & Gel Extension',
    category: 'Nail Art',
    provider: 'Gloss Nail Bar',
    price: 1299,
    duration: 75,
    rating: 4.7,
    reviewCount: 214,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80',
    description: 'Premium gel nail extensions with hand-painted art. Choose from 200+ designs. Includes cuticle care, nail shaping, and long-lasting finish guaranteed for 3 weeks.',
    location: 'Koramangala, Bangalore',
    tags: ['trending'],
  },
  {
    title: 'Bridal Makeup & Draping',
    category: 'Makeup',
    provider: 'Aura Bridal Studio',
    price: 12999,
    duration: 180,
    rating: 5.0,
    reviewCount: 47,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80',
    description: 'Full bridal transformation with HD airbrush makeup, saree/lehenga draping, hair styling, and accessories. Includes pre-bridal trial session.',
    location: 'Jubilee Hills, Hyderabad',
    tags: ['premium', 'popular'],
  },
  {
    title: 'Swedish Deep Tissue Massage',
    category: 'Spa & Massage',
    provider: 'Serenity Wellness Spa',
    price: 1899,
    duration: 60,
    rating: 4.9,
    reviewCount: 183,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
    description: 'Release tension and restore balance with our signature deep-tissue massage using warm aromatherapy oils. Targets chronic muscle pain and improves circulation.',
    location: 'Indiranagar, Bangalore',
    tags: ['popular'],
  },
  {
    title: 'Microblading & Brow Sculpting',
    category: 'Eyebrows & Lashes',
    provider: 'Brow Architects',
    price: 4500,
    duration: 120,
    rating: 4.8,
    reviewCount: 62,
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80',
    description: 'Achieve perfect, natural-looking brows with precision microblading by certified artists. Includes consultation, numbing, shaping, and touch-up session.',
    location: 'Hauz Khas, Delhi',
    tags: ['new', 'premium'],
  },
  {
    title: 'Vitamin Infusion Body Wrap',
    category: 'Wellness',
    provider: 'Pure Bliss Retreat',
    price: 2799,
    duration: 90,
    rating: 4.6,
    reviewCount: 39,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
    description: 'Full-body detox wrap using antioxidant-rich clays and essential oils. Deeply hydrates skin, reduces bloating, and leaves skin soft and glowing.',
    location: 'Powai, Mumbai',
    tags: ['new'],
  },
  {
    title: 'Men\'s Grooming & Beard Styling',
    category: 'Men Grooming',
    provider: 'The Gentleman\'s Den',
    price: 799,
    duration: 45,
    rating: 4.7,
    reviewCount: 291,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80',
    description: 'Premium men\'s grooming experience: haircut, hot towel shave, beard sculpting, and scalp massage. Walk out looking sharp and feeling fresh.',
    location: 'Sector 18, Noida',
    tags: ['trending', 'popular'],
  },
  {
    title: 'Eyelash Lift & Tint',
    category: 'Eyebrows & Lashes',
    provider: 'Lash Luxe Studio',
    price: 1599,
    duration: 60,
    rating: 4.8,
    reviewCount: 77,
    image: 'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?q=80&w=1974&auto=format&fit=crop',
    description: 'A game-changing lash lift that curls your natural lashes upward for 6-8 weeks, paired with a tint for dramatic, mascara-free eyes. Zero damage formula.',
    location: 'Andheri West, Mumbai',
    tags: ['popular'],
  },
  {
    title: 'Hot Stone Chakra Balancing',
    category: 'Spa & Massage',
    provider: 'Zen Garden Spa',
    price: 3499,
    duration: 90,
    rating: 4.9,
    reviewCount: 54,
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80',
    description: 'Ancient healing ritual using volcanic basalt stones and chakra-aligned essential oils. Melts away stress, re-energizes your body, and soothes the mind.',
    location: 'Whitefield, Bangalore',
    tags: ['premium', 'trending'],
  },
  {
    title: 'Keratin Smoothing Treatment',
    category: 'Hair Care',
    provider: 'Silk & Shine Salon',
    price: 5999,
    duration: 150,
    rating: 4.7,
    reviewCount: 103,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    description: 'Brazilian keratin treatment that eliminates frizz, adds brilliant shine, and makes hair 80% straighter for up to 4 months. Includes hydrating hair mask.',
    location: 'Salt Lake, Kolkata',
    tags: ['popular'],
  },
  {
    title: 'Hydra Dermabrasion Facial',
    category: 'Skin Care',
    provider: 'Derma Glow Clinic',
    price: 4200,
    duration: 75,
    rating: 4.9,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80',
    description: 'Medical-grade hydradermabrasion that exfoliates, extracts, and hydrates simultaneously. Targets blackheads, fine lines, and uneven texture. Zero downtime.',
    location: 'Banjara Hills, Hyderabad',
    tags: ['new', 'trending'],
  },
];

const connectDB = async () => {
  let isInMemory = false;
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`⚠️ Primary MongoDB connection failed: ${error.message}`);
    console.log(`⏳ Starting In-Memory MongoDB instead...`);
    
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      
      await mongoose.connect(uri);
      console.log(`✅ In-Memory MongoDB Connected`);
      isInMemory = true;
    } catch (memError) {
      console.error(`❌ In-Memory MongoDB failed: ${memError.message}`);
      process.exit(1);
    }
  }

  // Seeding Logic (Forced for testing)
  try {
    const Service = require('../models/Service');
    console.log('🧹 Clearing existing services...');
    await Service.deleteMany({});
    
    console.log('🌱 Seeding fresh services...');
    const result = await Service.insertMany(SERVICES);
    console.log(`✅ Successfully seeded ${result.length} services into the database!`);
  } catch (seedError) {
    console.error('❌ CRITICAL SEEDING ERROR:', seedError);
  }
};

module.exports = connectDB;
