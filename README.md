# EcoCart — Smart Sustainable Shopping Platform

> Built for the **CodeAlpha Full Stack Development Internship**.

EcoCart is a full-stack e-commerce web platform engineered to help consumers discover, compare, and purchase eco-friendly products with transparent sustainability intelligence (**EcoScore**), sustainable alternative suggestions, and personal environmental impact indicators.

---

## Technology Stack

- **Backend**: Node.js v22 (LTS) & Express.js REST API
- **Database**: SQLite 3 (Node.js native `node:sqlite` `DatabaseSync` engine with WAL mode and foreign key enforcement)
- **Security**: JWT authentication, HTTP-only Secure Cookies, `bcryptjs` password hashing, role-based authorization (Admin / Customer), centralized error handling, and SQL injection prevention via prepared statements.
- **Frontend**: React 18, Vite, React Router v6, Lucide React icons, and modern responsive CSS design.

---

## REST API Overview

### 1. Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new customer account | No |
| `POST` | `/api/auth/login` | Log in and receive JWT in HTTP-only cookie | No |
| `POST` | `/api/auth/logout` | Clear auth token cookie | No |
| `GET` | `/api/auth/me` | Fetch currently authenticated user session | Customer / Admin |

### 2. Products (`/api/products`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | List products with search, category, sort, and pagination | No |
| `GET` | `/api/products/categories` | Get all product categories with item counts and avg EcoScores | No |
| `GET` | `/api/products/:idOrSlug` | Get product details, factors, and sustainable alternatives | No |

### 3. Persistent Shopping Cart (`/api/cart`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/cart` | View cart items, subtotal, and cart EcoScore impact | Customer / Admin |
| `POST` | `/api/cart` | Add product to cart with quantity validation | Customer / Admin |
| `PUT` | `/api/cart/:id` | Update item quantity in cart | Customer / Admin |
| `DELETE` | `/api/cart/:id` | Remove item from cart | Customer / Admin |
| `DELETE` | `/api/cart` | Clear entire cart | Customer / Admin |

### 4. Orders & Checkout (`/api/orders`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders/checkout` | Validate stock, compute server-side total, deduct stock, and place simulated order | Customer / Admin |
| `GET` | `/api/orders` | Customer's order history | Customer / Admin |
| `GET` | `/api/orders/:id` | Single order details with line items | Owner / Admin |

### 5. User Profile (`/api/user`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/user/profile` | Profile info, orders summary, and personal environmental impact | Customer / Admin |
| `PUT` | `/api/user/profile` | Update profile name or password | Customer / Admin |

### 6. Admin Portal (`/api/admin`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/analytics` | KPIs (simulated revenue, orders, customers, low stock), top sellers | **Admin Only** |
| `GET` | `/api/admin/products` | Manage inventory catalog | **Admin Only** |
| `POST` | `/api/admin/products` | Add new eco product with auto-generated slug | **Admin Only** |
| `PUT` | `/api/admin/products/:id` | Update product details, price, or stock | **Admin Only** |
| `DELETE` | `/api/admin/products/:id` | Delete product (with order history conflict protection) | **Admin Only** |
| `GET` | `/api/admin/orders` | View all customer orders across the platform | **Admin Only** |
| `PUT` | `/api/admin/orders/:id/status`| Update order status (`pending`, `processing`, `shipped`, `delivered`, `cancelled`) | **Admin Only** |

---

## Demo Accounts

The database comes pre-seeded with three demo accounts:

| Role | Email | Password | Purpose |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@ecocart.local` | `EcoAdmin#2026!` | Store management, analytics, order status, inventory |
| **Customer** | `jane.eco@example.local` | `GreenLiving#2026!` | Browsing, persistent cart, checkout, order tracking |
| **Customer** | `marcus.green@example.local` | `EcoShopper#2026!` | Demonstrates multi-user order isolation and privacy |

---

## Local Development & Setup

### Environment Variables (`server/.env`)
```ini
PORT=5000
NODE_ENV=development
JWT_SECRET=super_secure_ecocart_jwt_secret_key_2026_codealpha
DB_PATH=./src/database/ecocart.db
CLIENT_URL=http://localhost:5173
```

### Server Commands
```powershell
cd server

# Initialize database schema
npm run init-db

# Seed 20 fictional eco products & demo accounts
npm run seed

# Run diagnostic inspection
npm run inspect-db

# Run full backend test suite (40 automated tests)
npm test

# Start backend server
npm start
```
