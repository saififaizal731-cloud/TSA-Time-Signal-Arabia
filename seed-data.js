const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleProducts = [
  {
    name: 'Cisco Catalyst 2960X-48TS-LL Switch',
    category: 'Network Switches',
    price: 2500,
    description: 'Enterprise-grade managed switch with 48 ports',
    specifications: {
      ports: '48 Gigabit Ethernet ports',
      management: 'Managed',
      layer: 'Layer 3',
      bandwidth: '96 Gbps',
    },
    brand: 'Cisco',
    stock: 15,
    rating: 4.8,
    featured: true,
    bestseller: true,
  },
  {
    name: 'TP-Link AC1200 Gigabit WiFi Router',
    category: 'Routers & Gateways',
    price: 450,
    description: 'Dual-band WiFi router with gigabit ports',
    specifications: {
      'WiFi Standard': 'AC1200',
      'Ports': '4x Gigabit + 1x WAN',
      'Range': '100m',
      'Security': 'WPA3',
    },
    brand: 'TP-Link',
    stock: 30,
    rating: 4.5,
    featured: true,
  },
  {
    name: 'Cat6 Ethernet Cable 100m',
    category: 'Network Cables',
    price: 150,
    description: 'High-speed Cat6 networking cable',
    specifications: {
      'Length': '100m',
      'Speed': '10 Gbps',
      'Standard': 'Cat6',
      'Jacket': 'PVC',
    },
    brand: 'Generic',
    stock: 100,
    rating: 4.2,
  },
  {
    name: 'Ubiquiti UniFi Access Point AC Pro',
    category: 'Wireless Access Points',
    price: 350,
    description: 'Dual-band WiFi access point for enterprise',
    specifications: {
      'WiFi': 'AC1750',
      'Range': '150m',
      'Antenna': 'Internal',
      'PoE': 'Passive PoE',
    },
    brand: 'Ubiquiti',
    stock: 20,
    rating: 4.7,
    bestseller: true,
  },
  {
    name: 'Synology DS920+ NAS',
    category: 'Network Storage',
    price: 3200,
    description: '4-bay NAS for network storage and backup',
    specifications: {
      'Bays': '4',
      'Processor': 'Intel Celeron',
      'RAM': '4GB',
      'Storage': 'Up to 48TB',
    },
    brand: 'Synology',
    stock: 8,
    rating: 4.9,
    featured: true,
  },
  {
    name: 'Fluke Network Cable Tester',
    category: 'Networking Tools',
    price: 800,
    description: 'Professional network cable tester',
    specifications: {
      'Type': 'Digital Tester',
      'Display': 'LCD',
      'Tests': 'Cat5, Cat6, Cat7',
      'Battery': '9V',
    },
    brand: 'Fluke',
    stock: 5,
    rating: 4.6,
  },
  {
    name: 'Fortinet FortiGate 200F Firewall',
    category: 'Security & Firewalls',
    price: 2800,
    description: 'Enterprise firewall with advanced security',
    specifications: {
      'Throughput': '2.3 Gbps',
      'Ports': '8x GE + 1x 10GE',
      'Threat Protection': 'Yes',
      'VPN': 'IPSec, SSL',
    },
    brand: 'Fortinet',
    stock: 3,
    rating: 4.8,
    featured: true,
  },
  {
    name: 'Netgear GS105E Switch',
    category: 'Network Switches',
    price: 280,
    description: 'Unmanaged 5-port gigabit switch',
    specifications: {
      'Ports': '5x Gigabit',
      'Bandwidth': '10 Gbps',
      'Management': 'Unmanaged',
      'Size': 'Desktop',
    },
    brand: 'Netgear',
    stock: 50,
    rating: 4.3,
  },
  {
    name: 'Arista 7280SE-68-R Switch',
    category: 'Network Switches',
    price: 4500,
    description: 'Data center grade switch',
    specifications: {
      'Ports': '68x 25GB',
      'Bandwidth': '1.7 Tbps',
      'Layer': '3',
      'OS': 'EOS',
    },
    brand: 'Arista',
    stock: 2,
    rating: 4.9,
    bestseller: true,
  },
  {
    name: 'Linksys MR7350 WiFi 6 Router',
    category: 'Routers & Gateways',
    price: 600,
    description: 'Latest WiFi 6 technology router',
    specifications: {
      'WiFi': 'WiFi 6 (802.11ax)',
      'Speed': 'AX1800',
      'Ports': '4x Gigabit',
      'Security': 'WPA3',
    },
    brand: 'Linksys',
    stock: 25,
    rating: 4.7,
    featured: true,
  },
  {
    name: 'Belkin Cat7 Shielded Cable',
    category: 'Network Cables',
    price: 89,
    description: 'Premium shielded Cat7 cable 10m',
    specifications: {
      'Length': '10m',
      'Category': 'Cat7',
      'Speed': '10 Gbps',
      'Shield': 'Shielded (STP)',
    },
    brand: 'Belkin',
    stock: 60,
    rating: 4.4,
  },
  {
    name: 'NETSCOUT AirCheck WiFi Analyzer',
    category: 'Networking Tools',
    price: 1200,
    description: 'Professional WiFi site survey tool',
    specifications: {
      'Standards': '802.11a/b/g/n/ac',
      'Display': '3-inch touchscreen',
      'Battery': '2000mAh',
      'Features': 'Channel analysis, interference detection',
    },
    brand: 'NETSCOUT',
    stock: 4,
    rating: 4.8,
    featured: true,
  },
];

async function seedDatabase() {
  try {
    await Product.deleteMany({});
    console.log('Cleared existing products');

    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✓ Successfully added ${inserted.length} sample products`);

    inserted.forEach((product) => {
      console.log(`  - ${product.name} (${product.category})`);
    });

    console.log('\n✓ Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
