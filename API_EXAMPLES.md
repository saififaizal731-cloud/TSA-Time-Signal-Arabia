# TSA Time Signal Arabia - API Examples & Testing

Complete examples for testing all API endpoints using different tools.

---

## Using cURL (Command Line)

### 1. Get All Products
```bash
curl http://localhost:5000/api/products
```

### 2. Get Products by Category
```bash
curl "http://localhost:5000/api/products?category=Network%20Switches"
```

### 3. Search Products
```bash
curl "http://localhost:5000/api/products?search=Cisco"
```

### 4. Register New User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed Ali",
    "email": "ahmed@example.com",
    "password": "securepass123",
    "phone": "0512345678",
    "address": "123 Street",
    "city": "Madinah",
    "country": "Saudi Arabia"
  }'
```

### 5. Login
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ahmed@example.com",
    "password": "securepass123"
  }'
```

Response will include JWT token and user object.

### 6. Add Product to Cart
```bash
curl -X POST http://localhost:5000/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID_HERE",
    "productId": "PRODUCT_ID_HERE",
    "quantity": 2
  }'
```

### 7. Create Order
```bash
curl -X POST http://localhost:5000/api/orders/create \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID_HERE",
    "shippingAddress": "123 Qurban Street, Madinah, Saudi Arabia"
  }'
```

---

## Using Postman

### Setup Collection

1. **Create New Postman Collection**: "TSA E-Commerce API"

2. **Create Requests** in the collection:

#### Request 1: Register User
```
Name: Register User
Method: POST
URL: http://localhost:5000/api/users/register

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

#### Request 2: Login User
```
Name: Login User
Method: POST
URL: http://localhost:5000/api/users/login

Body (JSON):
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Save the token from response for next requests:**
1. Click "Tests" tab
2. Add:
```javascript
var jsonData = pm.response.json();
pm.environment.set("token", jsonData.token);
pm.environment.set("userId", jsonData.user._id);
```

#### Request 3: Get All Products
```
Name: Get All Products
Method: GET
URL: http://localhost:5000/api/products
```

#### Request 4: Get Single Product
```
Name: Get Product
Method: GET
URL: http://localhost:5000/api/products/{{productId}}
```

#### Request 5: Create Product (Admin)
```
Name: Create Product
Method: POST
URL: http://localhost:5000/api/products

Headers:
Authorization: Bearer {{token}}

Body (JSON):
{
  "name": "Netgear ProSAFE Switch",
  "category": "Network Switches",
  "price": 1200,
  "description": "Professional managed switch",
  "specifications": {
    "ports": "24 Gigabit",
    "layer": "Layer 3"
  },
  "brand": "Netgear",
  "stock": 10,
  "rating": 4.6,
  "featured": true,
  "bestseller": false
}
```

#### Request 6: Add to Cart
```
Name: Add to Cart
Method: POST
URL: http://localhost:5000/api/cart/add

Headers:
Authorization: Bearer {{token}}

Body (JSON):
{
  "userId": "{{userId}}",
  "productId": "PRODUCT_ID_HERE",
  "quantity": 1
}
```

#### Request 7: Get User Cart
```
Name: Get Cart
Method: GET
URL: http://localhost:5000/api/cart/{{userId}}
```

#### Request 8: Create Order
```
Name: Create Order
Method: POST
URL: http://localhost:5000/api/orders/create

Headers:
Authorization: Bearer {{token}}

Body (JSON):
{
  "userId": "{{userId}}",
  "shippingAddress": "123 Qurban Street, Madinah, Saudi Arabia"
}
```

#### Request 9: Get User Orders
```
Name: Get Orders
Method: GET
URL: http://localhost:5000/api/orders/{{userId}}
```

---

## Using JavaScript Fetch

### Example: Full Shopping Flow

```javascript
// 1. Register
async function register() {
  const response = await fetch('http://localhost:5000/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Ahmed',
      email: 'ahmed@example.com',
      password: 'password123',
      phone: '0512345678',
      address: 'Qurban Street',
      city: 'Madinah',
      country: 'Saudi Arabia'
    })
  });
  return await response.json();
}

// 2. Login
async function login(email, password) {
  const response = await fetch('http://localhost:5000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
  localStorage.setItem('userId', data.user._id);
  return data;
}

// 3. Get Products
async function getProducts() {
  const response = await fetch('http://localhost:5000/api/products');
  return await response.json();
}

// 4. Add to Cart
async function addToCart(productId, quantity) {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  
  const response = await fetch('http://localhost:5000/api/cart/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ userId, productId, quantity })
  });
  return await response.json();
}

// 5. Create Order
async function createOrder(shippingAddress) {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  
  const response = await fetch('http://localhost:5000/api/orders/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ userId, shippingAddress })
  });
  return await response.json();
}

// Complete Flow Example
async function completeFlow() {
  // 1. Register
  const user = await register();
  console.log('Registered:', user.user.email);
  
  // 2. Login
  const logged = await login('ahmed@example.com', 'password123');
  console.log('Logged in, token:', logged.token);
  
  // 3. Get products
  const products = await getProducts();
  console.log('Products:', products.length);
  
  // 4. Add to cart
  if (products.length > 0) {
    const cart = await addToCart(products[0]._id, 2);
    console.log('Cart updated:', cart.total);
    
    // 5. Create order
    const order = await createOrder('123 Qurban Street, Madinah');
    console.log('Order created:', order.orderNumber);
  }
}

// Run it
completeFlow();
```

---

## Using Thunder Client (VS Code Extension)

1. Install Thunder Client in VS Code
2. Create new request
3. Method: POST
4. URL: http://localhost:5000/api/users/register
5. Body tab → JSON
6. Paste request body
7. Send

---

## Testing Workflow

### Step 1: Test Products API
```
GET /api/products → Should return list of products
GET /api/products?category=Network Switches → Filtered products
GET /api/products?search=Cisco → Search results
```

### Step 2: Test User Registration
```
POST /api/users/register
→ Success: Returns user and token
→ Error: Email already exists
```

### Step 3: Test User Login
```
POST /api/users/login
→ Success: Returns user and token
→ Error: Invalid email/password
```

### Step 4: Test Shopping Cart
```
POST /api/cart/add → Add items
GET /api/cart/{userId} → View cart
POST /api/cart/remove/{userId}/{productId} → Remove items
```

### Step 5: Test Orders
```
POST /api/orders/create → Create order
GET /api/orders/{userId} → View orders
```

---

## Response Examples

### Products Response
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Cisco Catalyst 2960X-48TS-LL Switch",
    "category": "Network Switches",
    "price": 2500,
    "description": "Enterprise-grade managed switch",
    "brand": "Cisco",
    "stock": 15,
    "rating": 4.8,
    "featured": true,
    "bestseller": true
  }
]
```

### Login Response
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "0512345678",
    "address": "Qurban Street",
    "city": "Madinah"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Order Response
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "507f1f77bcf86cd799439012",
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "name": "Cisco Switch",
      "quantity": 2,
      "price": 2500
    }
  ],
  "totalAmount": 5000,
  "orderNumber": "ORD-1704067200000",
  "status": "pending",
  "paymentStatus": "pending",
  "shippingAddress": "123 Qurban Street, Madinah",
  "createdAt": "2024-01-01T12:00:00.000Z"
}
```

---

## Error Handling

### Common Error Responses

404 Not Found:
```json
{
  "message": "Product not found"
}
```

400 Bad Request:
```json
{
  "message": "Email already registered"
}
```

401 Unauthorized:
```json
{
  "message": "Invalid password"
}
```

500 Server Error:
```json
{
  "message": "Server error message"
}
```

---

## Testing Checklist

- [ ] Test getting all products
- [ ] Test product search
- [ ] Test product filtering
- [ ] Test user registration
- [ ] Test user login
- [ ] Test adding to cart
- [ ] Test removing from cart
- [ ] Test getting cart
- [ ] Test adding to wishlist
- [ ] Test creating order
- [ ] Test getting orders
- [ ] Test error handling

---

**Start testing! Happy building! 🚀**
