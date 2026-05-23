# 🛒 E-Commerce Server

**E-commerce backend API with JWT authentication** — a robust Node.js/Express REST API powering product management and user authentication for modern e-commerce applications.

## ✨ Key Features

- 🔐 **JWT-based authentication** with secure password hashing (bcryptjs)
- 👥 **Role-based access control** (User / Admin)
- 📦 **Full CRUD** for products with filtering, search, sorting
- 🛒 **Shopping cart** with add, update, remove, clear, and auto-calculated totals
- 💰 **Cart pricing engine** — subtotal, taxes (14% VAT), shipping, grand total
- 🔒 **Protected admin routes** for product management
- ✅ **Input validation** at schema level with Mongoose
- 🧩 **Modular architecture** — clean separation of concerns with controllers & utilities
- ⚡ **ES Modules** (`import`/`export`) throughout

---

## 📚 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Authentication & Authorization](#authentication--authorization)
- [Database](#database)
- [Error Handling](#error-handling)
- [Security](#security)
- [Scripts](#scripts)
- [Troubleshooting](#troubleshooting)
- [Scalability Notes](#scalability-notes)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## 🧰 Tech Stack

| Category       | Technology                            |
|----------------|---------------------------------------|
| **Runtime**    | [Node.js](https://nodejs.org/) (≥ 18) |
| **Framework**  | [Express](https://expressjs.com/) 4.21 |
| **Database**   | [MongoDB](https://www.mongodb.com/)   |
| **ODM**        | [Mongoose](https://mongoosejs.com/) 8.9 |
| **Auth**       | [JWT](https://jwt.io/) (jsonwebtoken 9.x) |
| **Password**   | [bcryptjs](https://github.com/dcodeIO/bcrypt.js) 2.4 |
| **CORS**       | [cors](https://github.com/expressjs/cors) 2.8 |
| **Env**        | [dotenv](https://github.com/motdotla/dotenv) 16.4 |
| **Module**     | ES Modules (`"type": "module"`)       |

---

## 🏗️ Project Architecture

```
backend/
├── config/          # Database configuration & connection
│   └── db.js
├── controllers/     # Route handler logic (business logic layer)
│   └── cartController.js
├── middleware/      # Express middleware (auth, role guards)
│   ├── auth.js      # JWT verification middleware
│   └── admin.js     # Admin role check middleware
├── models/          # Mongoose schemas & models
│   ├── Cart.js      # Cart model (items, pricing, user association)
│   ├── Product.js   # Product model (name, price, category, etc.)
│   └── User.js      # User model (name, email, password, role)
├── routes/          # Route definitions
│   ├── auth.js      # /api/auth/* routes
│   ├── cart.js      # /api/cart/* routes
│   └── products.js  # /api/products/* routes
├── utils/           # Reusable utility functions
│   └── calculateCart.js  # Cart pricing calculation engine
├── .env             # Environment variables (git-ignored)
├── package.json
├── server.js        # Application entry point
└── README.md
```

### Design Patterns

- **Layered architecture** — Routes → Middleware → Controllers (inline) → Models
- **Middleware chain pattern** — Request passes through auth guards before reaching handlers
- **Model-view-controller (MVC) lite** — Mongoose models encapsulate data logic; route handlers act as controllers
- **Singleton DB connection** — Mongoose connection established once at startup

---

## 📦 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) **≥ 18** (LTS recommended)
- [MongoDB](https://www.mongodb.com/) running locally on port `27017` (or a remote Atlas URI)

### Steps

```bash
# Clone the repository (if not already done)
git clone <repo-url>
cd <project-name>/backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your values
```

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory with the following:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ReactProject
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
```

| Variable         | Description                                  | Required | Example                                                        |
|------------------|----------------------------------------------|----------|----------------------------------------------------------------|
| `PORT`           | Server port                                  | ❌ No    | `5000`                                                         |
| `MONGO_URI`      | MongoDB connection string                    | ❌ No    | `mongodb://localhost:27017/ReactProject`                        |
| `JWT_SECRET`     | Secret key used to sign JWTs                 | ✅ Yes   | `my_super_secret_jwt_key_2026`                                |
| `JWT_EXPIRES_IN` | JWT token expiration duration (e.g. `7d`, `1h`) | ❌ No    | `7d`                                                           |

> **Note:** If `MONGO_URI` starts with `mongodb+srv` (Atlas), the system **automatically falls back** to the local MongoDB at `mongodb://localhost:27017/ReactProject`. Set a direct local or Atlas URI to override this behavior.

---

## 🚀 Running the Project

### Development (with auto-restart)

```bash
npm run dev
```

### Production

```bash
npm start
```

The server starts on **http://localhost:5000** (or the port defined in `PORT`).

> **Health check:** `GET /api/health` returns `{ "status": "OK", "timestamp": "..." }`

---

## 📖 API Documentation

### 📍 POST `/api/auth/register`

Register a new user account.

**Authentication:** None

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**

| Field      | Rule                                         |
|------------|----------------------------------------------|
| `name`     | Required, 2–50 characters                    |
| `email`    | Required, valid email format, unique         |
| `password` | Required, minimum 6 characters               |

**Success Response (201):**

```json
{
  "_id": "664e...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Responses:**

| Code | Description                        |
|------|------------------------------------|
| 400  | Missing fields / User already exists / Validation error |
| 500  | Server error                       |

---

### 📍 POST `/api/auth/login`

Authenticate an existing user.

**Authentication:** None

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**

```json
{
  "_id": "664e...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error Responses:**

| Code | Description         |
|------|---------------------|
| 400  | Missing credentials |
| 401  | Invalid email or password |
| 500  | Server error        |

---

### 📍 GET `/api/auth/me`

Retrieve the currently authenticated user's profile.

**Authentication:** Required (Bearer token)

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Success Response (200):**

```json
{
  "_id": "664e...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

**Error Responses:**

| Code | Description                        |
|------|------------------------------------|
| 401  | No token / Invalid token / User not found |

---

### 📍 GET `/api/products`

Retrieve all products with optional filtering, search, and sorting.

**Authentication:** None

**Query Parameters:**

| Parameter   | Type    | Description                                      | Example           |
|-------------|---------|--------------------------------------------------|-------------------|
| `category`  | String  | Filter by category (`All` returns all)          | `Clothes`         |
| `search`    | String  | Search by name or description (case-insensitive) | `blue dress`      |
| `minPrice`  | Number  | Minimum price filter                             | `10`              |
| `maxPrice`  | Number  | Maximum price filter                             | `100`             |
| `sort`      | String  | Sort order                                       | `price_asc`       |

**Valid Sort Values:**

| Value         | Order        |
|---------------|--------------|
| (none)        | Newest first |
| `price_asc`   | Price low→high |
| `price_desc`  | Price high→low |
| `name_asc`    | Name A→Z     |

**Success Response (200):**

```json
[
  {
    "_id": "664e...",
    "name": "Summer Dress",
    "description": "Lightweight floral summer dress",
    "price": 49.99,
    "category": "Clothes",
    "quantity": 15,
    "image": "https://...",
    "size": "M",
    "createdAt": "2026-05-16T...",
    "updatedAt": "2026-05-16T..."
  }
]
```

---

### 📍 GET `/api/products/:id`

Retrieve a single product by its MongoDB ID.

**Authentication:** None

**Route Parameters:**

| Parameter | Description           |
|-----------|-----------------------|
| `id`      | MongoDB ObjectId (24 hex chars) |

**Success Response (200):** Single product object.

**Error Responses:**

| Code | Description           |
|------|-----------------------|
| 404  | Product not found     |
| 500  | Server error          |

---

### 📍 POST `/api/products`

Create a new product.

**Authentication:** Required — Admin only (Bearer token)

**Headers:**

```
Authorization: Bearer <jwt-token>
```

**Request Body:**

```json
{
  "name": "Summer Dress",
  "description": "Lightweight floral summer dress",
  "price": 49.99,
  "category": "Clothes",
  "quantity": 15,
  "image": "https://example.com/image.jpg",
  "size": "M"
}
```

**Validation Rules:**

| Field         | Rule                                                        |
|---------------|-------------------------------------------------------------|
| `name`        | Required, max 100 characters                                |
| `description` | Required, max 1000 characters                               |
| `price`       | Required, min 0                                             |
| `category`    | Required — one of: `Clothes`, `Makeup`, `Phones`, `Electronics`, `Accessories`, `Other` |
| `quantity`    | Required, min 0 (default 0)                                 |
| `image`       | Optional, string (URL or path)                              |
| `size`        | Optional — one of: `XS`, `S`, `M`, `L`, `XL`, `XXL`, `N/A` (default `N/A`) |

**Success Response (201):** Created product object.

**Error Responses:**

| Code | Description                        |
|------|------------------------------------|
| 400  | Validation error                   |
| 401  | Not authorized (no/invalid token)  |
| 403  | Access denied (non-admin)          |
| 500  | Server error                       |

---

### 📍 PUT `/api/products/:id`

Update an existing product.

**Authentication:** Required — Admin only (Bearer token)

**Route Parameters:**

| Parameter | Description           |
|-----------|-----------------------|
| `id`      | MongoDB ObjectId      |

**Request Body:** Any subset of product fields.

**Success Response (200):** Updated product object.

**Error Responses:**

| Code | Description                        |
|------|------------------------------------|
| 400  | Validation error                   |
| 401  | Not authorized                     |
| 403  | Access denied (non-admin)          |
| 404  | Product not found                  |
| 500  | Server error                       |

---

### 📍 DELETE `/api/products/:id`

Delete a product.

**Authentication:** Required — Admin only (Bearer token)

**Route Parameters:**

| Parameter | Description           |
|-----------|-----------------------|
| `id`      | MongoDB ObjectId      |

**Success Response (200):**

```json
{
  "message": "Product deleted successfully"
}
```

**Error Responses:**

| Code | Description                        |
|------|------------------------------------|
| 401  | Not authorized                     |
| 403  | Access denied (non-admin)          |
| 404  | Product not found                  |
| 500  | Server error                       |

---

### 📍 GET `/api/health`

Health check endpoint.

**Authentication:** None

**Success Response (200):**

```json
{
  "status": "OK",
  "timestamp": "2026-05-16T23:35:00.000Z"
}
```

---

### 🛒 Cart Endpoints

All cart endpoints require **JWT authentication** (Bearer token).

---

### 📍 GET `/api/cart`

Retrieve the authenticated user's shopping cart.

**Authentication:** Required (Bearer token)

**Success Response (200):**

```json
{
  "success": true,
  "cart": {
    "_id": "664e...",
    "user": "664e...",
    "items": [
      {
        "_id": "664f...",
        "product": {
          "_id": "664e...",
          "name": "Summer Dress",
          "price": 49.99,
          "image": "https://...",
          "category": "Clothes",
          "quantity": 15
        },
        "quantity": 2,
        "priceAtPurchase": 49.99
      }
    ],
    "subtotal": 99.98,
    "totalItems": 2,
    "tax": 14.00,
    "shipping": 0,
    "total": 113.98,
    "createdAt": "2026-05-16T...",
    "updatedAt": "2026-05-16T..."
  }
}
```

**Empty Cart Response (200):**

```json
{
  "success": true,
  "cart": {
    "items": [],
    "subtotal": 0,
    "totalItems": 0,
    "tax": 0,
    "shipping": 0,
    "total": 0
  }
}
```

**Error Responses:**

| Code | Description                        |
|------|------------------------------------|
| 401  | No token / Invalid token           |
| 500  | Server error                       |

---

### 📍 POST `/api/cart/add`

Add a product to the cart. If the product already exists, the quantity is incremented.

**Authentication:** Required (Bearer token)

**Request Body:**

```json
{
  "productId": "664e...",
  "quantity": 2
}
```

**Validation Rules:**

| Field       | Rule                          |
|-------------|-------------------------------|
| `productId` | Required, valid MongoDB ObjectId |
| `quantity`  | Optional, default `1`, min `1` |

**Business Logic:**
- Validates product existence and stock availability
- If item already in cart → increases quantity (checks cumulative stock)
- Captures `priceAtPurchase` from current product price
- Auto-recalculates subtotal, totalItems, tax, shipping, and grand total

**Success Response (201):** Full cart object with populated product details.

**Error Responses:**

| Code | Description                                    |
|------|------------------------------------------------|
| 400  | Missing productId / Invalid quantity / Insufficient stock |
| 401  | No token / Invalid token                       |
| 404  | Product not found                              |
| 500  | Server error                                   |

---

### 📍 PUT `/api/cart/item/:productId`

Update the quantity of a specific item in the cart.

**Authentication:** Required (Bearer token)

**Route Parameters:**

| Parameter   | Description                      |
|-------------|----------------------------------|
| `productId` | MongoDB ObjectId of the product  |

**Request Body:**

```json
{
  "quantity": 3
}
```

**Validation Rules:**

| Field      | Rule                          |
|------------|-------------------------------|
| `quantity` | Required, min `1`             |

**Business Logic:**
- Validates product existence and stock availability
- Updates quantity and auto-recalculates all totals

**Success Response (200):** Updated cart object.

**Error Responses:**

| Code | Description                       |
|------|-----------------------------------|
| 400  | Invalid quantity / Insufficient stock |
| 401  | No token / Invalid token          |
| 404  | Product not found / Cart not found / Item not found |
| 500  | Server error                      |

---

### 📍 DELETE `/api/cart/item/:productId`

Remove a specific product from the cart.

**Authentication:** Required (Bearer token)

**Route Parameters:**

| Parameter   | Description                      |
|-------------|----------------------------------|
| `productId` | MongoDB ObjectId of the product  |

**Success Response (200):**

```json
{
  "success": true,
  "cart": {
    "items": [],
    "subtotal": 0,
    "totalItems": 0,
    "tax": 0,
    "shipping": 0,
    "total": 0
  }
}
```

**Error Responses:**

| Code | Description                       |
|------|-----------------------------------|
| 401  | No token / Invalid token          |
| 404  | Cart not found / Item not found   |
| 500  | Server error                      |

---

### 📍 DELETE `/api/cart/clear`

Clear all items from the cart and reset all pricing fields to zero.

**Authentication:** Required (Bearer token)

**Success Response (200):**

```json
{
  "success": true,
  "cart": {
    "_id": "664e...",
    "user": "664e...",
    "items": [],
    "subtotal": 0,
    "totalItems": 0,
    "tax": 0,
    "shipping": 0,
    "total": 0
  }
}
```

**Error Responses:**

| Code | Description                       |
|------|-----------------------------------|
| 401  | No token / Invalid token          |
| 404  | Cart not found                    |
| 500  | Server error                      |

---

## 🔑 Authentication & Authorization

### Authentication Flow

1. **Registration / Login** — User sends credentials to `/api/auth/register` or `/api/auth/login`
2. **Token generation** — Server verifies credentials, then signs a JWT containing the user's `_id` using `JWT_SECRET` with configurable expiry (`JWT_EXPIRES_IN`)
3. **Client stores token** — Client saves the JWT (e.g. localStorage, cookie, memory)
4. **Subsequent requests** — Client includes the JWT in the `Authorization` header as `Bearer <token>`
5. **Token verification** — `protect` middleware (`middleware/auth.js`) decodes the JWT, fetches the user from the database, and attaches it to `req.user`
6. **Authorized access** — Protected routes proceed with the authenticated user context

### Role-Based Access Control

| Role    | Permissions                                           |
|---------|-------------------------------------------------------|
| `user`  | View products, manage own cart, view own profile      |
| `admin` | All user permissions + Create / Update / Delete products |

The `adminOnly` middleware (`middleware/admin.js`) checks `req.user.role === "admin"` and returns a **403 Forbidden** response for non-admin users.

---

## 🗄️ Database

### Technology

**MongoDB** with **Mongoose ODM** (version 8.9).

### Connection

Configured in `config/db.js`. On startup, the server connects using `MONGO_URI` from the environment, with an automatic local fallback to `mongodb://localhost:27017/ReactProject` when the URI starts with `mongodb+srv`.

### Schema Relationships

```
User (1) ──creates──> Product (N)
User (1) ────has────> Cart (1)
Cart (1) ──contains──> Product (N)
```

No explicit foreign keys — MongoDB handles relationships via application-level Mongoose references (`ObjectId` with `ref` and `.populate()`).

### User Schema

| Field      | Type   | Constraints                                      |
|------------|--------|--------------------------------------------------|
| `name`     | String | Required, 2–50 chars, trimmed                    |
| `email`    | String | Required, unique, lowercase, email regex         |
| `password` | String | Required, min 6 chars, excluded from queries by default (`select: false`) |
| `role`     | String | Enum: `user` / `admin`, default `user`           |
| timestamps | ✓      | `createdAt`, `updatedAt`                         |

**Pre-save hook:** Password is automatically hashed with bcryptjs (salt rounds: 12) before saving.

### Product Schema

| Field         | Type   | Constraints                                      |
|---------------|--------|--------------------------------------------------|
| `name`        | String | Required, max 100 chars, trimmed                 |
| `description` | String | Required, max 1000 chars                         |
| `price`       | Number | Required, min 0                                  |
| `category`    | String | Required — Enum: `Clothes`, `Makeup`, `Phones`, `Electronics`, `Accessories`, `Other` |
| `quantity`    | Number | Required, min 0, default 0                       |
| `image`       | String | Optional, URL/path                               |
| `size`        | String | Enum: `XS`–`XXL`, `N/A`, default `N/A`           |
| timestamps    | ✓      | `createdAt`, `updatedAt`                         |

### Cart Schema

| Field         | Type   | Constraints                                          |
|---------------|--------|------------------------------------------------------|
| `user`        | ObjectId | Ref `User` — Required, unique (one cart per user)  |
| `items[]`     | Array  | List of cart item subdocuments                       |
| `items.product` | ObjectId | Ref `Product` — Required                          |
| `items.quantity` | Number | Required, min 1                                    |
| `items.priceAtPurchase` | Number | Snapshot of product price when added to cart |
| `subtotal`    | Number | Sum of `priceAtPurchase × quantity` across all items |
| `totalItems`  | Number | Sum of all quantities                               |
| `tax`         | Number | 14% VAT on subtotal                                 |
| `shipping`    | Number | Free over 100 EGP subtotal, otherwise flat 20 EGP   |
| `total`       | Number | `subtotal + tax + shipping`                         |
| timestamps    | ✓      | `createdAt`, `updatedAt`                            |

**Cart Calculation Logic** (`utils/calculateCart.js`):

| Component  | Formula                                        |
|------------|------------------------------------------------|
| `totalItems` | `sum(item.quantity)`                          |
| `subtotal`   | `sum(item.priceAtPurchase × item.quantity)`   |
| `tax`        | `subtotal × 0.14` (14% VAT)                   |
| `shipping`   | `0` if subtotal ≥ 100 or empty, else `20`     |
| `total`      | `subtotal + tax + shipping`                   |

**Schema Relationships:**

```
User (1) ──has──> Cart (1) ──contains──> Product (N)
```

---

## ⚠️ Error Handling

The application uses a **two-tier error handling** strategy:

### 1. In-Route Error Handling (try/catch)

Every route handler wraps its logic in `try/catch` blocks, returning appropriate HTTP status codes and JSON error messages.

- **400 Bad Request** — Validation errors (Mongoose `ValidationError`), missing fields, duplicate email
- **401 Unauthorized** — Invalid/missing JWT token, wrong credentials
- **403 Forbidden** — Non-admin attempting admin actions
- **404 Not Found** — Route not found, product not found
- **500 Internal Server Error** — Unexpected server failures

### 2. Global Error Middleware (`server.js:35`)

```javascript
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});
```

Catches any errors that propagate past route handlers, logs them to the console, and returns a generic 500 response.

### 404 Handler (`server.js:31`)

```javascript
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});
```

---

## 🛡️ Security

| Feature               | Implementation                               |
|------------------------|----------------------------------------------|
| **Password hashing**   | bcryptjs with 12 salt rounds (`User.js:43`)  |
| **JWT authentication** | 256-bit HMAC-sha256 signed tokens            |
| **Input validation**   | Mongoose schema-level validation             |
| **CORS**               | Whitelisted origins: `localhost:5173`, `localhost:5174` |
| **Password exclusion** | `select: false` on password field            |
| **No SQL injection**   | MongoDB document-based (injection-resistant by design) |

---

## 📜 Scripts

| Script          | Description                          |
|-----------------|--------------------------------------|
| `npm start`     | Run the server in production mode    |
| `npm run dev`   | Run with `--watch` for auto-restart on changes |

---

## 🐛 Troubleshooting

### MongoDB Connection Error

```
MongoDB Connection Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:** Make sure MongoDB is running locally:

```bash
# Windows (MongoDB as a service)
net start MongoDB

# Or start manually
mongod --dbpath /path/to/data
```

### Prisma / ODM Not Found

This project uses **Mongoose** (not Prisma). Ensure it is installed:

```bash
npm install
```

### JWT Token Expired

Tokens expire based on `JWT_EXPIRES_IN` (default 7 days). Re-login to obtain a fresh token.

### CORS Errors in Frontend

The allowed origins are `http://localhost:5173` and `http://localhost:5174`. If your frontend runs on a different port, update the `cors` configuration in `server.js`.

---

## 📈 Scalability Notes

- **Stateless authentication** — JWT tokens enable horizontal scaling without shared session storage
- **MongoDB indexing** — Add compound indexes on frequently queried fields (`category`, `price`, `name`) for production workloads
- **Connection pooling** — Mongoose uses a default pool of 100 connections; tune via `mongoose.connect(uri, { maxPoolSize })`
- **Caching** — Consider adding Redis for product listing cache to reduce database load
- **Pagination** — Products endpoint currently returns all matches; add `.skip()` / `.limit()` for large collections

---

## 🔮 Future Improvements

- [ ] **Pagination & cursor-based navigation** for product listings
- [ ] **Redis caching** for frequent product queries
- [ ] **Image upload** with Multer + cloud storage (Cloudinary / S3)
- [ ] **Rate limiting** with express-rate-limit
- [ ] **Helmet** for secure HTTP headers
- [ ] **Order / Checkout system** with payment gateway integration
- [ ] **Wishlist** feature
- [ ] **Coupon / discount** system
- [ ] **Refresh token** rotation for improved security
- [ ] **Input sanitization** (express-validator / Joi/Zod)
- [ ] **Swagger / OpenAPI** documentation
- [ ] **Unit & integration tests** (Jest + Supertest)
- [ ] **Docker Compose** for local development
- [ ] **CI/CD pipeline** (GitHub Actions)
- [ ] **Logging** with Winston or Pino

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**E-Commerce Server Team**

- GitHub: [@your-org](https://github.com/your-org)
- Project Link: [https://github.com/your-org/ecommerce-server](https://github.com/your-org/ecommerce-server)

---

<p align="center">
  Built with ❤️ using Node.js, Express & MongoDB
</p>
