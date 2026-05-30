# TSA Time Signal Arabia - Admin Guide

## Admin Features & API Endpoints

This guide explains how to use the backend APIs for administrative tasks.

---

## Using Postman or Thunder Client

Download Postman: https://www.postman.com/downloads/

### 1. Create a Product (Admin)

**Endpoint:** `POST http://localhost:5000/api/products`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Cisco Catalyst 3850-48T-E Switch",
  "category": "Network Switches",
  "price": 3500,
  "description": "Enterprise-grade stackable managed switch",
  "specifications": {
    "ports": "48 Gigabit Ethernet",
    "layer": "Layer 3",
    "bandwidth": "250 Gbps",
    "stackable": "Yes"
  },
  "brand": "Cisco",
  "stock": 10,
  "rating": 4.9,
  "featured": true,
  "bestseller": false
}
```

**Response:**
```json
{
  "_id": "ObjectId",
  "name": "Cisco Catalyst 3850-48T-E Switch",
  "price": 3500,
  ...
}
```

---

### 2. Get All Products

**Endpoint:** `GET http://localhost:5000/api/products`

**Query Parameters:**
- `category` - Filter by category
- `search` - Search by name
- `sort` - Sort type (featured, bestseller, newest, price-low, price-high, rating)

**Examples:**
```
GET /api/products
GET /api/products?category=Network Switches
GET /api/products?search=Cisco
GET /api/products?sort=bestseller
GET /api/products?sort=price-low
```

---

### 3. Get Single Product

**Endpoint:** `GET http://localhost:5000/api/products/{productId}`

**Response:**
```json
{
  "_id": "ObjectId",
  "name": "Product Name",
  "category": "Network Switches",
  "price": 2500,
  ...
}
```

---

### 4. Update Product (Admin)

**Endpoint:** `PUT http://localhost:5000/api/products/{productId}`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "price": 2800,
  "stock": 20,
  "featured": false,
  "bestseller": true
}
```

---

### 5. Delete Product (Admin)

**Endpoint:** `DELETE http://localhost:5000/api/products/{productId}`

**Response:**
```json
{
  "message": "Product deleted"
}
```

---

## User Management APIs

### 6. Get User Profile

**Endpoint:** `GET http://localhost:5000/api/users/{userId}`

**Response:**
```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0512345678",
  "address": "123 Street",
  "city": "Madinah",
  "role": "customer",
  "wishlist": [],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

## Order Management APIs

### 7. Get All Orders for User

**Endpoint:** `GET http://localhost:5000/api/orders/{userId}`

**Response:**
```json
[
  {
    "_id": "ObjectId",
    "orderNumber": "ORD-1704067200000",
    "items": [
      {
        "productId": "ObjectId",
        "name": "Product Name",
        "quantity": 2,
        "price": 500
      }
    ],
    "totalAmount": 1000,
    "status": "pending",
    "paymentStatus": "pending",
    "shippingAddress": "123 Street",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### 8. Get Specific Order

**Endpoint:** `GET http://localhost:5000/api/orders/order/{orderId}`

---

## Database Management

### Access MongoDB Data

1. **Install MongoDB CLI:**
```bash
mongosh
```

2. **View All Products:**
```bash
mongosh
use tsa-ecommerce
db.products.find()
```

3. **View All Users:**
```bash
db.users.find()
```

4. **View All Orders:**
```bash
db.orders.find()
```

5. **Add Product via MongoDB:**
```javascript
db.products.insertOne({
  name: "Test Product",
  category: "Network Cables",
  price: 100,
  stock: 50,
  rating: 4.5
})
```

6. **Update Product Stock:**
```javascript
db.products.updateOne(
  { _id: ObjectId("...") },
  { $set: { stock: 25 } }
)
```

7. **Delete All Test Data:**
```javascript
db.products.deleteMany({})
db.users.deleteMany({})
db.orders.deleteMany({})
db.carts.deleteMany({})
```

---

## Product Categories

Available categories for products:
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

---

## Authentication

### Register User
**Endpoint:** `POST http://localhost:5000/api/users/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "0512345678",
  "address": "123 Street",
  "city": "Madinah",
  "country": "Saudi Arabia"
}
```

---

### Login User
**Endpoint:** `POST http://localhost:5000/api/users/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": { ... },
  "token": "JWT_TOKEN_HERE"
}
```

Use this token for authenticated requests by adding:
```
Authorization: Bearer JWT_TOKEN_HERE
```

---

## Managing Sample Data

### Reload Sample Products

```bash
node seed-data.js
```

This will:
1. Delete all existing products
2. Add 12 new networking products
3. Display confirmation

---

## Creating Admin Dashboard (Next Phase)

To create an admin dashboard, you would:

1. **Create Admin Routes:**
```javascript
// routes/admin.js
router.post('/admin/products', isAdmin, createProduct);
router.put('/admin/products/:id', isAdmin, updateProduct);
router.delete('/admin/products/:id', isAdmin, deleteProduct);
```

2. **Add Admin Check Middleware:**
```javascript
const isAdmin = (req, res, next) => {
  const user = req.user;
  if (user.role === 'admin') next();
  else res.status(403).json({ message: 'Admin only' });
};
```

3. **Create Admin HTML Pages:**
- `/admin/products.html` - Manage products
- `/admin/orders.html` - View orders
- `/admin/users.html` - Manage users
- `/admin/dashboard.html` - Sales reports

---

## Monitoring & Analytics Queries

### Total Sales
```javascript
db.orders.aggregate([
  {
    $group: {
      _id: null,
      total: { $sum: "$totalAmount" }
    }
  }
])
```

### Orders by Status
```javascript
db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 }
    }
  }
])
```

### Best Selling Products
```javascript
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.productId",
      total_sold: { $sum: "$items.quantity" }
    }
  },
  { $sort: { total_sold: -1 } }
])
```

---

## Scheduled Tasks (Coming Soon)

Examples of tasks to automate:
- Send order status emails
- Generate daily sales reports
- Backup database
- Clear expired carts
- Update inventory

---

## Security Best Practices

### For Production:
1. ✅ Use strong JWT_SECRET
2. ✅ Enable HTTPS/SSL
3. ✅ Add rate limiting
4. ✅ Implement 2FA for admins
5. ✅ Regular database backups
6. ✅ Monitor API logs
7. ✅ Update dependencies regularly
8. ✅ Use environment variables for sensitive data

---

## Troubleshooting Admin Tasks

### Product not showing after creation?
- Check MongoDB is running
- Verify data was saved: `db.products.find()`
- Refresh browser and reload products

### API returns 500 error?
- Check server console for error details
- Verify data format in request
- Check database connection

### Can't authenticate?
- Verify email/password are correct
- Check user exists in database
- Review JWT_SECRET in .env

---

## Support

For admin-related questions:
- Review error messages in server console
- Check SETUP_GUIDE.md
- Verify MongoDB is running
- Ensure dependencies are installed

**Ready to manage your store! 🎯**
