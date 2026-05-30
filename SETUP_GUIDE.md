# TSA Time Signal Arabia - Complete Setup Guide

## Quick Start (5 Minutes)

### Step 1: Install MongoDB
1. Download MongoDB Community Edition from: https://www.mongodb.com/try/download/community
2. Choose Windows version and follow installer
3. MongoDB will auto-start as a service

Verify MongoDB is running:
```bash
mongosh
# If you see the MongoDB shell prompt, it's working
exit
```

### Step 2: Install Node Dependencies
Open PowerShell in the project folder:
```bash
cd "C:\Users\HP Elite\TSA-Time-Signal-Arabia"
npm install
```

### Step 3: Add Sample Products
```bash
node seed-data.js
```

You should see:
```
✓ Successfully added 12 sample products
✓ Database seeding complete!
```

### Step 4: Start the Server
```bash
npm start
```

You should see:
```
Server running on http://localhost:5000
MongoDB connected
```

### Step 5: Open in Browser
Visit: `http://localhost:5000`

---

## Full Setup Walkthrough

### Prerequisites
- Windows 10/11
- Administrator access (for MongoDB)
- Node.js v14+ (included with npm)
- PowerShell or Command Prompt

### Install Node.js & npm
1. Download from: https://nodejs.org/ (LTS version recommended)
2. Run installer and follow steps
3. Verify installation:
```bash
node --version
npm --version
```

### Install MongoDB

#### Option A: MongoDB Community Server (Local)
1. Download: https://www.mongodb.com/try/download/community
2. Run installer
3. Complete installation with default settings
4. MongoDB runs as Windows Service automatically

#### Option B: MongoDB Atlas (Cloud)
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `.env` file with your connection string

### Project Setup

1. **Navigate to project:**
```bash
cd "C:\Users\HP Elite\TSA-Time-Signal-Arabia"
```

2. **Install dependencies:**
```bash
npm install
```

3. **Review .env file:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tsa-ecommerce
NODE_ENV=development
JWT_SECRET=your_secret_key_here_change_in_production
```

4. **Add sample data:**
```bash
node seed-data.js
```

5. **Start server:**
```bash
npm start
```

6. **Access website:**
Open browser to `http://localhost:5000`

---

## Testing the Website

### 1. Browse Products
- Click category buttons to filter
- Use search bar to find products
- Sort by featured, best sellers, price

### 2. Register/Login
- Click "Account" → "Register"
- Fill in details and create account
- Login with your credentials

### 3. Add to Cart
- View product details by clicking "View Details"
- Add quantity and click "Add to Cart"
- View cart by clicking cart icon

### 4. Place Order
- Go to cart
- Click "Proceed to Checkout"
- Enter shipping address
- Click "Place Order"

### 5. Wishlist
- Click heart icon on any product
- Access wishlist from account menu

---

## API Testing with Postman

### Get All Products
```
GET http://localhost:5000/api/products
```

### Get Product by ID
```
GET http://localhost:5000/api/products/{productId}
```

### Register User
```
POST http://localhost:5000/api/users/register
Body (JSON):
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "0512345678",
  "address": "Qurban Street",
  "city": "Madinah",
  "country": "Saudi Arabia"
}
```

### Login User
```
POST http://localhost:5000/api/users/login
Body (JSON):
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Add to Cart
```
POST http://localhost:5000/api/cart/add
Body (JSON):
{
  "userId": "{userId}",
  "productId": "{productId}",
  "quantity": 1
}
```

### Create Order
```
POST http://localhost:5000/api/orders/create
Body (JSON):
{
  "userId": "{userId}",
  "shippingAddress": "123 Qurban Street, Madinah"
}
```

---

## Troubleshooting

### Issue: "MongoDB connection error"
**Solution:**
- Check if MongoDB is running (Services app)
- Restart MongoDB service
- Verify connection string in .env

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID with actual number)
taskkill /PID {PID} /F

# Or change port in .env to 5001, 5002, etc.
```

### Issue: "npm install fails"
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try install again
npm install
```

### Issue: "Products not showing"
**Solution:**
- Run seed-data.js again: `node seed-data.js`
- Check MongoDB is running
- Check browser console for errors (F12)

### Issue: "Can't add to cart"
**Solution:**
- Make sure you're logged in
- Check browser console for error details
- Restart server

---

## Development Tips

### Using Nodemon for Auto-Reload
```bash
npm run dev
```
Server automatically restarts when you modify code

### View MongoDB Data
```bash
mongosh
use tsa-ecommerce
db.products.find()
db.users.find()
db.carts.find()
db.orders.find()
```

### Clear All Data
```bash
mongosh
use tsa-ecommerce
db.products.deleteMany({})
db.users.deleteMany({})
db.carts.deleteMany({})
db.orders.deleteMany({})
```

### Add More Products
Edit `seed-data.js`, add products to `sampleProducts` array, then:
```bash
node seed-data.js
```

---

## Production Deployment

### Before Going Live:
1. **Change JWT_SECRET** in .env
2. **Use MongoDB Atlas** (cloud) instead of local
3. **Enable HTTPS** with SSL certificate
4. **Add payment gateway** (HyperPay, Stripe)
5. **Setup email notifications**
6. **Configure backup system**
7. **Add monitoring & logging**

### Deploy on Windows Server:
1. Install Node.js on server
2. Install MongoDB or use Atlas
3. Copy project files
4. Run `npm install`
5. Use PM2 to keep app running:
```bash
npm install -g pm2
pm2 start server.js --name "TSA"
pm2 save
```

---

## Support & Resources

### MongoDB Documentation
- https://docs.mongodb.com/

### Express.js Documentation
- https://expressjs.com/

### Node.js Documentation
- https://nodejs.org/docs/

### Store Information
- **Email**: info@tsa.com
- **Phone**: +966-1234-5678
- **Location**: Qurban Street, Madinah, Saudi Arabia

---

**Setup complete! Your TSA Time Signal Arabia store is ready to use. 🎉**
