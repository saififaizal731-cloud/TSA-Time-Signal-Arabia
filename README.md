# TSA Time Signal Arabia - E-Commerce Website

A complete e-commerce platform for networking products built with HTML/CSS/JavaScript frontend and Node.js/Express backend with MongoDB.

## Features

- **Product Catalog**: Browse networking products by category
- **User Authentication**: Register and login functionality
- **Shopping Cart**: Add/remove products, adjust quantities
- **Wishlist**: Save favorite products
- **Order Management**: Place and track orders
- **Product Search & Filter**: Find products by name, category, price
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Admin Panel Ready**: Backend APIs for admin product management

## Project Structure

```
TSA-Time-Signal-Arabia/
├── public/
│   ├── index.html          # Main HTML file
│   ├── style.css           # Styling
│   └── app.js              # Frontend JavaScript
├── models/
│   ├── Product.js          # Product model
│   ├── User.js             # User model
│   ├── Cart.js             # Cart model
│   └── Order.js            # Order model
├── routes/
│   ├── products.js         # Product API routes
│   ├── users.js            # User API routes
│   ├── cart.js             # Cart API routes
│   └── orders.js           # Order API routes
├── server.js               # Express server
├── package.json            # Dependencies
└── .env                    # Environment variables
```

## Setup Instructions

### 1. Install MongoDB
Download and install MongoDB from: https://www.mongodb.com/try/download/community

Make sure MongoDB is running:
```bash
mongod
```

### 2. Install Node Dependencies
```bash
cd C:\Users\HP Elite\TSA-Time-Signal-Arabia
npm install
```

### 3. Configure Environment
Edit `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tsa-ecommerce
NODE_ENV=development
JWT_SECRET=your_secret_key_here_change_in_production
```

### 4. Start the Server
```bash
npm start
```

Or use nodemon for development:
```bash
npm run dev
```

Server will run at: `http://localhost:5000`

### 5. Add Sample Products
Run the sample data script (create this file):

```bash
node seed-data.js
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/:id` - Get user profile
- `POST /api/users/:id/wishlist/:productId` - Add to wishlist

### Cart
- `POST /api/cart/add` - Add to cart
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/remove/:userId/:productId` - Remove from cart
- `POST /api/cart/clear/:userId` - Clear cart

### Orders
- `POST /api/orders/create` - Create order
- `GET /api/orders/:userId` - Get user's orders
- `GET /api/orders/order/:orderId` - Get order details

## Using the Website

1. Open browser and go to: `http://localhost:5000`
2. Browse products by category
3. Register or login to your account
4. Add products to cart
5. Proceed to checkout
6. Complete purchase

## Product Categories

- Network Switches
- Routers & Gateways
- Network Cables
- Wireless Access Points
- Network Storage
- Networking Tools
- Security & Firewalls
- Modems & Converters
- Patch Panels
- Accessories

## Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

## Store Information

- **Name**: TSA Time Signal Arabia
- **Location**: Qurban Street, Madinah, Saudi Arabia
- **Currency**: SAR (Saudi Riyal)
- **Languages**: English, Arabic (RTL ready)

## Next Steps

1. Add payment gateway integration (HyperPay, Stripe)
2. Implement admin dashboard
3. Add email notifications
4. Implement SMS for orders
5. Add live chat support
6. Setup SSL/HTTPS
7. Deploy to production server

## Troubleshooting

**MongoDB connection error:**
- Make sure MongoDB is running
- Check connection string in .env

**CORS errors:**
- Frontend and backend on different ports is normal
- CORS is configured in server.js

**Products not loading:**
- Check MongoDB is running
- Check browser console for errors
- Verify API endpoints in app.js

## Support

For issues or questions about TSA Time Signal Arabia, contact:
- Email: info@tsa.com
- Phone: +966-1234-5678
- Location: Qurban Street, Madinah, Saudi Arabia

---

**Developed for TSA Time Signal Arabia - Quality Networking Solutions**
