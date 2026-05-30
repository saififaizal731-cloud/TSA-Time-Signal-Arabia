# TSA Time Signal Arabia - Quick Start (2 Minutes)

## Prerequisites
- MongoDB installed and running
- Node.js installed (v14+)

## Start Website in 3 Commands

```bash
# 1. Navigate to project
cd "C:\Users\HP Elite\TSA-Time-Signal-Arabia"

# 2. Install dependencies (first time only)
npm install

# 3. Add sample products (first time only)
node seed-data.js

# 4. Start server
npm start
```

**Done!** Open browser to: `http://localhost:5000`

---

## Default Test Account

After running `node seed-data.js`, create your first account through the website:
1. Click "Account" → "Register"
2. Fill in details and submit
3. Start shopping!

---

## Sample Products Included

✓ Network Switches (Cisco, Netgear, Arista)
✓ Routers & Gateways (TP-Link, Linksys)
✓ Network Cables (Cat6, Cat7, Shielded)
✓ WiFi Access Points (Ubiquiti)
✓ Network Storage (Synology)
✓ Tools (Fluke, NETSCOUT)
✓ Firewalls (Fortinet)

---

## Website Features

✅ Product catalog with filters
✅ User registration & login
✅ Shopping cart system
✅ Wishlist functionality
✅ Order placement
✅ Search & sorting
✅ Responsive mobile design
✅ Admin APIs ready

---

## Common Commands

```bash
# Start server (production)
npm start

# Start server with auto-reload (development)
npm run dev

# Add more sample products
node seed-data.js

# View MongoDB data
mongosh
use tsa-ecommerce
db.products.find()

# Stop server
Ctrl + C
```

---

## File Quick Reference

| File | Purpose |
|------|---------|
| `server.js` | Express server configuration |
| `public/index.html` | Website HTML |
| `public/style.css` | Website styling |
| `public/app.js` | Frontend JavaScript |
| `models/` | Database schemas |
| `routes/` | API endpoints |
| `seed-data.js` | Sample products loader |
| `.env` | Configuration variables |

---

## Troubleshooting

**MongoDB error?**
→ Make sure MongoDB is running (Services or terminal)

**Port 5000 in use?**
→ Change PORT in .env to 5001, 5002, etc.

**npm install fails?**
→ Run: `npm cache clean --force` then `npm install`

**Products not showing?**
→ Run: `node seed-data.js` again

---

## Store Details

📍 **Location:** Qurban Street, Madinah, Saudi Arabia
💼 **Business:** TSA Time Signal Arabia
🛍️ **Products:** Networking Equipment
💰 **Currency:** SAR (Saudi Riyal)

---

**Ready to start? → `npm start`** 🚀
