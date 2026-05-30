const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createAdminUser() {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@tsa.com' });
    if (existingAdmin) {
      console.log('✗ Admin account already exists');
      process.exit(1);
    }

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@tsa.com',
      password: 'AdminTSA@2024',
      phone: '+966-1234-5678',
      address: 'Qurban Street',
      city: 'Madinah',
      country: 'Saudi Arabia',
      role: 'admin',
    });

    await admin.save();
    console.log('✓ Admin account created successfully!');
    console.log('\n--- Admin Credentials ---');
    console.log('Email: admin@tsa.com');
    console.log('Password: AdminTSA@2024');
    console.log('Role: admin');
    console.log('------------------------\n');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error creating admin:', error.message);
    process.exit(1);
  }
}

createAdminUser();
