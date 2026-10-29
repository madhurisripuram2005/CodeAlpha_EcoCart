# EcoCart — Smart Sustainable Shopping Platform

> Complete full-stack web application built for the **CodeAlpha Full Stack Development Internship**.
> Repository Name: `CodeAlpha_EcoCart`

EcoCart is an e-commerce platform designed to help consumers discover, evaluate, and purchase eco-friendly products. It pairs rich product information with transparent sustainability intelligence (**EcoScore** from 0–100), automated sustainable alternative recommendations, personal environmental impact tracking, full wishlist management, and an executive administration portal.

---

## Key Features & Capabilities

1. **140 Sustainable Products across 8 Departments**:
   - Reusable Bottles & Drinkware (15 products)
   - Sustainable Bags & Accessories (15 products)
   - Eco-Friendly Stationery (15 products)
   - Home & Kitchen Essentials (20 products)
   - Personal Care & Reusable Products (15 products)
   - Sustainable Fashion (15 products)
   - Gardening & Outdoor Products (15 products)
   - Travel & Lifestyle (10 products)
   - *Plus 20 original launch items preserved with backward-compatible aliases.*
2. **Transparent EcoScore Intelligence (0–100)**:
   - Evaluates carbon footprint, material circularity, biodegradability, plastic reduction, and fair-trade ethics.
   - Transparent disclaimer: *EcoScores are illustrative demonstration metrics, not independently audited laboratory certifications.*
   - Dynamic alternative engine suggests higher-rated sustainable alternatives when viewing lower-scoring items.
3. **Standardized INR (`₹`) Pricing**:
   - Realistic Indian Rupee pricing across all items (`₹199` – `₹3,999`).
   - Server-validated pricing with currency-formatted cards, cart subtotals, and simulated checkout.
   - Original MRP strikethrough and realistic discount badges (`-20% OFF`).
4. **Wishlist System**:
   - Guest fallback using browser `localStorage` + authenticated cloud sync (`GET /api/wishlist`, `POST /api/wishlist`, `DELETE /api/wishlist/:id`).
   - Dynamic navbar heart badge with live counter.
5. **Interactive Storefront & Home Experience**:
   - Hero banner with conscious living call-to-actions.
   - Four core eco-benefit highlight cards (Plastic-Free Packaging, Carbon-Neutral Transit, Circular Lifecycle, Direct Artisan Sourcing).
   - Tabbed showcase for Featured Highlights, Top EcoScores (95+), and New Arrivals.
   - Pincode delivery estimator with instant carbon-neutral transit estimates.
   - Customer community reviews with verified buyer badges and star ratings.
   - Free Zero-Waste Living Handbook newsletter subscription banner.
   - Business Value section explaining how EcoCart promotes sustainable consumption.
6. **Executive Admin Dashboard**:
   - Real-time KPIs (simulated revenue in INR, total orders, average order value, customer base).
   - Department & Category sales performance table.
   - Inventory low-stock alerts table with replenishment triggers.
   - Product CRUD management supporting all 8 categories and automated slug generation.
   - Order fulfillment workflow (`pending` → `processing` → `shipped` → `delivered` → `cancelled`).
   - Explicit disclaimer banner distinguishing simulated prototype metrics from commercial revenue.
7. **Robust Architecture & Security**:
   - Node.js LTS native `node:sqlite` engine with foreign key enforcement and WAL journal mode.
   - Atomic database transactions for cart checkouts and stock deductions.
   - JWT sessions with HTTP-only cookies and bcrypt-hashed credentials.
   - Role-Based Access Control (RBAC) protecting admin endpoints against unauthorized customers.

---

## Visual Design System

- **Forest Green** (`#173F35`, `#1F5044`): Primary brand color, headers, hero highlights, and action buttons.
- **Warm Ivory / Cream** (`#F5F0E5`, `#FAF7F2`, `#EFEAE1`): Backgrounds, pill badges, and elevated card surfaces.
- **Charcoal Text** (`#1C1E1D`, `#3D4340`): High-contrast, readable typography.
- **Warm Ochre / Coral Accent** (`#C57B57`): Alerts, badges, and rating stars.
- **High-Resolution Imagery**: Curated Unsplash CDN product photography with aspect-ratio preservation and graceful local SVG fallbacks.

---

## Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, React Router v6, Lucide React icons, CSS3 Design Tokens |
| **Backend** | Node.js v22 (LTS), Express.js REST API, `node:sqlite` (Built-in engine) |
| **Database** | SQLite 3 (WAL mode, foreign key enforcement, transactions) |
| **Authentication** | JWT (`jsonwebtoken`), HTTP-only Cookies (`cookie-parser`), `bcryptjs` hashing |
| **Testing** | Node.js native test runner, Supertest, Custom 51-check live E2E test suite |

---

## REST API Overview

### 1. Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register customer account with bcrypt password hashing | No |
| `POST` | `/api/auth/login` | Authenticate user & issue JWT HTTP-only cookie | No |
| `POST` | `/api/auth/logout` | Clear session cookie | No |
| `GET` | `/api/auth/me` | Fetch active user session | Customer / Admin |

### 2. Products & Catalogue (`/api/products`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Browse catalogue with search, category, sort, price, EcoScore & pagination | No |
| `GET` | `/api/products/categories` | Department list with item counts and average EcoScores | No |
| `GET` | `/api/products/:idOrSlug` | Detailed product specifications with sustainable alternative suggestions | No |

### 3. Wishlist (`/api/wishlist`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/wishlist` | Retrieve authenticated customer's saved products | Customer / Admin |
| `POST` | `/api/wishlist` | Save product to wishlist (with duplicate protection) | Customer / Admin |
| `DELETE` | `/api/wishlist/:productId` | Remove product from wishlist | Customer / Admin |

### 4. Persistent Cart (`/api/cart`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/cart` | View cart items, subtotal in INR, and combined EcoScore impact | Customer / Admin |
| `POST` | `/api/cart` | Add product to cart with server-side stock validation | Customer / Admin |
| `PUT` | `/api/cart/:id` | Update item quantity | Customer / Admin |
| `DELETE` | `/api/cart/:id` | Remove line item | Customer / Admin |
| `DELETE` | `/api/cart` | Clear entire shopping cart | Customer / Admin |

### 5. Orders & Checkout (`/api/orders`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/orders/checkout` | Execute atomic stock deduction and create simulated order | Customer / Admin |
| `GET` | `/api/orders` | Customer's past orders history | Customer / Admin |
| `GET` | `/api/orders/:id` | Single order summary with line items | Owner / Admin |

### 6. User Profile (`/api/user`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/user/profile` | Account overview with lifetime environmental impact indicators | Customer / Admin |
| `PUT` | `/api/user/profile` | Update profile information or password | Customer / Admin |

### 7. Admin Portal (`/api/admin`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/analytics` | Executive revenue, order stats, top eco products, category sales | **Admin Only** |
| `GET` | `/api/admin/products` | Complete product catalogue for inventory management | **Admin Only** |
| `POST` | `/api/admin/products` | Create new product with automatic slug & category validation | **Admin Only** |
| `PUT` | `/api/admin/products/:id` | Update product details, stock, or price | **Admin Only** |
| `DELETE` | `/api/admin/products/:id`| Remove product (with integrity checks against ordered items) | **Admin Only** |
| `GET` | `/api/admin/orders` | View all platform orders across all customers | **Admin Only** |
| `PUT` | `/api/admin/orders/:id/status` | Advance order status (`pending`, `shipped`, `delivered`, etc.) | **Admin Only** |

---

## Demo Accounts

Pre-configured demo accounts for grading and testing:

| Role | Email | Password | Intended Use |
| :--- | :--- | :--- | :--- |
| **Store Administrator** | `admin@ecocart.local` | `EcoAdmin#2026!` | Access `/admin` dashboard, analytics in INR, inventory low-stock alerts, product CRUD, order status management |
| **Primary Customer** | `jane.eco@example.local` | `GreenLiving#2026!` | Storefront browsing, wishlist heart toggle, persistent cart, simulated checkout, order history |
| **Secondary Customer** | `marcus.green@example.local` | `EcoShopper#2026!` | Verification of multi-user isolation and order data privacy |

> **Note on Simulated Checkout**: Payment transactions are simulated for internship demonstration purposes. No real banking details or payment credentials are required or processed.

---

## 140-Product Catalogue Distribution

| Department / Category | Count | Average Price (INR) | Average EcoScore |
| :--- | :---: | :---: | :---: |
| **Home & Kitchen Essentials** | 20 | ₹929 | 96.3 / 100 |
| **Personal Care & Reusable Products** | 15 | ₹452 | 97.4 / 100 |
| **Gardening & Outdoor Products** | 15 | ₹656 | 97.1 / 100 |
| **Sustainable Fashion** | 15 | ₹1,792 | 95.8 / 100 |
| **Reusable Bottles & Drinkware** | 15 | ₹1,282 | 92.9 / 100 |
| **Sustainable Bags & Accessories** | 15 | ₹1,396 | 94.9 / 100 |
| **Eco-Friendly Stationery** | 15 | ₹479 | 95.6 / 100 |
| **Travel & Lifestyle** | 10 | ₹1,009 | 95.3 / 100 |
| *Original Launch Items (Legacy Aliases)* | 20 | ₹1,574 | 92.0 / 100 |
| **Total** | **140** | **₹1,098** | **95.2 / 100** |

---

## Running the Application Locally

### Prerequisites
- Node.js `v20+` or `v22+` (with experimental SQLite support)
- npm `v10+`

### 1. Start Both Servers

From the root project directory:

**Terminal 1 — Express Backend API (Port 5000)**:
```powershell
cd server
npm start
```
*Backend runs at `http://localhost:5000` (Health check: `http://localhost:5000/api/health`).*

**Terminal 2 — React Vite Client (Port 5173)**:
```powershell
cd client
npm run dev
```
*Frontend runs at `http://localhost:5173`.*

---

## Verification & Automated Testing

### 1. Full End-to-End Live System Verification (51 Checks)
Verifies live connectivity, 140 products across 8 categories, pagination, search, INR price sorting, product alternatives, customer login, session cookies, wishlist CRUD, persistent cart, atomic checkout stock deduction, customer RBAC protection, and admin analytics:
```powershell
npm run test:e2e
```
*Expected Result: 51 Passed, 0 Failed (100.0% Success Rate).*

### 2. Backend Unit & API Test Suite (40 Tests)
Runs automated integration tests using Node's test runner and Supertest:
```powershell
npm test
```
*Expected Result: 40 Passed, 0 Failed across 6 test suites.*

### 3. Frontend Production Build
Validates Vite packaging and client compilation:
```powershell
npm run build
```
*Expected Result: 0 errors, production bundle generated in `client/dist`.*

---

## Project Structure

```
ECO CART/
├── client/                     # React 18 Frontend Application (Vite)
│   ├── public/                 # Static assets & favicon
│   ├── src/
│   │   ├── components/         # Navbar, Footer, ProductCard, AlternativeCard, etc.
│   │   ├── context/            # AuthContext, CartContext, WishlistContext
│   │   ├── pages/              # Home, Products, ProductDetail, Cart, Checkout,
│   │   │                       # Wishlist, Profile, AdminDashboard, NotFound
│   │   ├── styles/             # Design tokens (variables.css) and global styling (index.css)
│   │   ├── utils/              # formatters.js (formatINR, formatNumber)
│   │   ├── App.jsx             # React Router configuration
│   │   └── main.jsx            # React root mount
│   ├── index.html              # HTML shell
│   ├── package.json
│   ├── .env.example
│   └── vite.config.js          # API proxy (/api -> http://localhost:5000)
│
├── server/                     # Express.js REST API Backend
│   ├── src/
│   │   ├── controllers/        # auth, product, cart, order, wishlist, user, admin
│   │   ├── database/
│   │   │   ├── db.js           # SQLite DatabaseSync connection & transaction wrapper
│   │   │   ├── schema.sql      # Database DDL schema (users, products, cart, orders, wishlist)
│   │   │   ├── init.js         # Schema initialiser
│   │   │   ├── seed.js         # Base 20-product seeder & demo accounts
│   │   │   ├── productsData120.js # 120 unique fictional products across 8 categories
│   │   │   ├── seed120Products.js # Idempotent 120-product database seeder
│   │   │   ├── migrateSchema.js   # Non-destructive SQLite schema migration
│   │   │   ├── inspect.js         # Database diagnostics tool
│   │   │   └── verifyE2E.js       # Live 51-check end-to-end verification script
│   │   ├── middleware/         # authMiddleware, errorHandler
│   │   ├── routes/             # auth, product, cart, order, wishlist, user, admin
│   │   ├── services/           # ecoScoreService (alternatives & environmental impact)
│   │   ├── app.js              # Express app setup, CORS, cookie parser, route mounting
│   │   └── server.js           # Server listen entrypoint
│   ├── tests/                  # Integration test suites (auth, products, cart, orders, admin, user)
│   ├── .env.example            # Backend env template
│   └── package.json
│
├── .env.example                # Root env template
├── .gitignore                  # Git exclusions for dependencies, builds, databases & env files
├── package.json                # Root convenience scripts (test, test:e2e, build, client, server)
└── README.md                   # Project documentation & evaluator guide
```

---

## Internship Evaluation Walkthrough

1. **Visit Storefront**: Open `http://localhost:5173`. Notice the Forest Green & Ivory aesthetic, 4-pillar eco benefits bar, 8-department quick access grid, curated featured items, and sustainability impact counters.
2. **Explore Catalog & Filters**:
   - Navigate to `/products`.
   - Test category filtering across all 8 departments.
   - Use the price slider/presets in INR (`₹199` – `₹3,999`).
   - Filter by minimum EcoScore (e.g., 95+).
   - Test pagination across all 12 pages (140 products).
3. **Product Intelligence & Alternatives**:
   - Click on any product (e.g., *HydroPure Insulated Bamboo Flask* or *PureCopper Bottle*).
   - Review the illustrative EcoScore pill, MRP strikethrough, discount badge, and sustainability factor breakdown.
   - Test the Pincode Delivery Estimator with a 6-digit Indian PIN (e.g. `560001`).
   - Switch between the tabs: "EcoScore & Lifecycle Intelligence", "Customer Reviews", and "Zero-Waste Packaging & Delivery".
   - Note the automatic Sustainable Alternative recommendations at the bottom.
4. **Wishlist**:
   - Click the heart icon on any card or product detail page.
   - Notice the heart count badge updates in the navbar.
   - Visit `/wishlist` to inspect saved items.
5. **Cart & Simulated Checkout**:
   - Add items to the cart.
   - Visit `/cart` to observe the server-calculated INR subtotal and cart average EcoScore impact.
   - Proceed to `/checkout`, enter delivery details, select simulated card payment, and click **Place Simulated Order**.
   - Review your order confirmation and track status in your customer profile (`/profile`).
6. **Admin Dashboard**:
   - Log out and log in as `admin@ecocart.local` (`EcoAdmin#2026!`): [http://localhost:5173/admin](http://localhost:5173/admin).
   - Inspect platform analytics (simulated revenue in INR, total orders, top eco products, department sales performance).
   - Check the low-stock inventory table.
   - Test updating an order's status or adding a new eco product.

---

## Screenshots & Visual Walkthrough

> *To capture genuine screenshots for your internship submission:*

1. **Homepage Hero & Eco-Benefits**: Take a full-screen screenshot of `http://localhost:5173`.
2. **Product Catalog with Filters & Pagination**: Take a screenshot of `http://localhost:5173/products` showing the filter sidebar and 140-product pagination.
3. **Product Detail & EcoScore Breakdown**: Take a screenshot of a product page showing the factor breakdown, star ratings, and greener alternative recommendations.
4. **Shopping Cart & Eco Impact**: Take a screenshot of `http://localhost:5173/cart` showing the carbon reduction and plastic container avoidance metrics.
5. **Simulated Checkout & Order Confirmation**: Take a screenshot of the order completion screen with the generated reference code.
6. **Admin Executive Analytics & Inventory Management**: Take a screenshot of `http://localhost:5173/admin` displaying KPIs, sales breakdown, and low-stock alerts.

Place images in a `docs/screenshots/` folder and link them:
```markdown
![EcoCart Homepage](docs/screenshots/01-homepage.png)
![Product Catalog](docs/screenshots/02-catalog.png)
![Admin Dashboard](docs/screenshots/03-admin.png)
```

---

## Deployment Guidance

### Deploying the Backend (e.g., Render / Railway)
1. Push your repository to GitHub.
2. In [Render](https://render.com) or [Railway](https://railway.app), create a new **Web Service** connected to your repository.
3. Set the Root Directory to `server`.
4. Set Build Command: `npm install`
5. Set Start Command: `node --no-warnings --experimental-sqlite src/server.js`
6. Configure Environment Variables:
   - `NODE_ENV=production`
   - `PORT=10000`
   - `JWT_SECRET=<your-strong-random-secret>`
   - `CLIENT_URL=https://your-frontend-domain.vercel.app`

### Deploying the Frontend (e.g., Vercel / Netlify)
1. In [Vercel](https://vercel.com) or [Netlify](https://netlify.com), import your repository.
2. Set Root Directory to `client`.
3. Set Build Command: `npm run build`
4. Set Output Directory: `dist`
5. Configure Environment Variables:
   - `VITE_API_BASE_URL=https://your-backend-service.onrender.com/api`

---

## Known Limitations & Future Roadmap

- **Illustrative EcoScore Model**: Scores are currently calculated algorithmically based on material and packaging indicators; future iterations could integrate certified Life Cycle Assessment (LCA) APIs.
- **Simulated Payment Gateway**: The current checkout uses a simulated payment workflow to ensure data privacy; production deployment would integrate Razorpay or Stripe test-mode webhooks.
- **Automated Carbon Tax Calculator**: A future module can compute localized carbon offset credits based on freight distance.

---

## Steps to Create a GitHub Repository & Upload

When you are ready to upload this project to your GitHub account:

1. **Create an empty repository on GitHub**:
   - Go to [GitHub](https://github.com/new).
   - Set Repository name to `CodeAlpha_EcoCart`.
   - Choose **Public**.
   - Do **NOT** initialize with a README, .gitignore, or license (we already have them configured).
   - Click **Create repository**.

2. **Open PowerShell in the project directory**:
   ```powershell
   cd "c:\Users\MADHURI\Desktop\ECO CART"
   ```

3. **Verify Git status**:
   ```powershell
   git status
   ```

4. **Link your GitHub remote and push**:
   ```powershell
   # Add your GitHub remote URL
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/CodeAlpha_EcoCart.git

   # Rename branch to main if not already
   git branch -M main

   # Push your code to GitHub
   git push -u origin main
   ```
