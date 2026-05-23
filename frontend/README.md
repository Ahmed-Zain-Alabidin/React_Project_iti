# SOUQ — Premium E-Commerce Platform

A modern, production-ready e-commerce frontend built with React, featuring a complete shopping experience with authentication, cart management, product catalog, and admin functionality.

---

## Table of Contents

- [Screenshots / UI Preview](#screenshots--ui-preview)
- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Routing System](#routing-system)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [UI & Styling](#ui--styling)
- [Reusable Components](#reusable-components)
- [Forms & Validation](#forms--validation)
- [Performance Optimizations](#performance-optimizations)
- [Accessibility](#accessibility)
- [Responsive Design](#responsive-design)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Screenshots / UI Preview

### Home Page

![Home Page](https://placehold.co/800x500/2563eb/ffffff?text=Home+Page+Hero+Section)

### Products Catalog

![Products Page](https://placehold.co/800x500/1e293b/ffffff?text=Products+Catalog+with+Filters)

### Shopping Cart

![Cart Page](https://placehold.co/800x500/0f172a/ffffff?text=Shopping+Cart+with+Summary)

### Authentication

![Auth Pages](https://placehold.co/800x500/334155/ffffff?text=Login+and+Register+Pages)

---

## Live Demo

- **Production**: https://souq-ecommerce.netlify.app
- **Backend API**: http://localhost:5000/api

---

## Tech Stack

| Category             | Technology                            |
| -------------------- | ------------------------------------- |
| **Framework**        | React 18.3                            |
| **Language**         | JavaScript (ES6+)                     |
| **Build Tool**       | Vite 5.4                              |
| **State Management** | Redux Toolkit 2.12                    |
| **Routing**          | React Router DOM 6.26                 |
| **HTTP Client**      | Axios 1.7                             |
| **Styling**          | CSS Modules + Custom CSS Variables    |
| **UI Components**    | Custom-built (no external UI library) |
| **Authentication**   | JWT-based with localStorage           |
| **Backend API**      | Node.js/Express with MongoDB          |
| **Backend Cart**     | Full cart management with 14% VAT tax |

---

## Project Architecture

```
frontend/
├── src/
│   ├── api/              # API layer (Axios configuration)
│   │   └── axios.js
│   ├── assets/           # Static assets (images, icons)
│   ├── Components/       # Reusable UI components
│   │   ├── CartItem.jsx
│   │   ├── CartSummary.jsx
│   │   ├── EmptyCart.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── Nav.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductFormModal.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── QuantitySelector.jsx
│   ├── context/          # React Context providers
│   │   └── AuthContext.jsx
│   ├── Pages/            # Page components
│   │   ├── Cart.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Products.jsx
│   │   └── Register.jsx
│   ├── store/            # Redux store configuration
│   │   ├── cartApi.js
│   │   ├── cartSlice.js
│   │   └── store.js
│   ├── styles/           # Shared CSS modules
│   │   └── cart.module.css
│   ├── App.jsx           # Main app component with routing
│   └── main.jsx          # Entry point
├── public/               # Static assets
├── index.html            # HTML template
└── package.json
```

### Architecture Patterns

- **Component Architecture**: Feature-based structure with reusable components
- **State Management**: Redux Toolkit for global state (cart)
- **Context API**: For authentication state management
- **Styling**: CSS Modules for component-scoped styles + global CSS variables
- **API Layer**: Axios with interceptors for automatic token handling
- **Async Thunks**: createAsyncThunk for API operations with loading/error states
- **Optimistic Updates**: Local state updates for immediate UI feedback

---

## Features

### Core Features

- ✅ **User Authentication**: Login/Register with JWT tokens
- ✅ **Product Catalog**: Browse, search, filter, and sort products
- ✅ **Shopping Cart**: Add/remove items, update quantities, clear cart
- ✅ **Cart Persistence**: Backend sync with automatic token handling
- ✅ **Live Totals**: Real-time subtotal, 14% VAT tax, shipping (free over 100 EGP), and total calculations
- ✅ **Cart Badge**: Dynamic cart count in navigation
- ✅ **Admin Dashboard**: Create, edit, delete products
- ✅ **Role-Based Access**: Protected routes for authenticated users
- ✅ **Responsive Design**: Mobile-first approach with breakpoints

### User Experience

- 🎨 **Modern UI**: Clean, professional design with glassmorphism effects
- 🌙 **Dark Mode Ready**: CSS variables support for theme customization
- ⚡ **Fast Performance**: Code splitting, lazy loading, optimized images
- 📱 **Mobile Responsive**: Works on all screen sizes
- ♿ **Accessible**: ARIA labels, keyboard navigation, semantic HTML
- 🔄 **Optimistic Updates**: Immediate UI feedback with local state
- 🎯 **Loading States**: Skeleton loaders and spinners for async operations
- 🛡️ **Error Handling**: Graceful error states with retry functionality

### Technical Features

- 🔒 **Secure Authentication**: JWT with localStorage, automatic token refresh
- 🛡️ **Protected Routes**: Route guards for authenticated pages
- 🔄 **Real-time Updates**: Automatic cart state synchronization
- 📊 **Product Management**: Full CRUD operations for admin users
- 🎯 **Smart Search**: Debounced search with category filtering
- 📦 **Cart Persistence**: Cart data persists across sessions
- 🚀 **Async Operations**: createAsyncThunk for API calls with loading states
- 🎨 **Modern UI**: Professional cart layout with sticky summary
- ♿ **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- ⚡ **Performance**: Memoized selectors, lazy loading, minimal re-renders
- 🚀 **Async Operations**: createAsyncThunk for API calls with loading states
- 🎨 **Modern UI**: Professional cart layout with sticky summary
- ♿ **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- ⚡ **Performance**: Memoized selectors, lazy loading, minimal re-renders

---

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup Steps

```bash
# Clone the repository
git clone <repository-url>
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

---

## Environment Variables

Create a `.env` file in the root of the frontend directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME="SOUQ"
VITE_APP_URL=http://localhost:5173
```

| Variable        | Required | Description                        |
| --------------- | -------- | ---------------------------------- |
| `VITE_API_URL`  | Yes      | Backend API base URL               |
| `VITE_APP_NAME` | No       | Application name (default: "SOUQ") |
| `VITE_APP_URL`  | No       | Frontend application URL           |

---

## Running the Project

### Development

```bash
npm run dev
```

Starts the Vite development server with hot module replacement.

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Previews the production build locally before deployment.

### Linting

```bash
npm run lint
```

Runs ESLint to check code quality and style issues.

---

## Routing System

### Route Structure

| Path        | Component | Protected | Description                    |
| ----------- | --------- | --------- | ------------------------------ |
| `/`         | Home      | No        | Landing page with hero section |
| `/login`    | Login     | No        | User login page                |
| `/register` | Register  | No        | User registration page         |
| `/products` | Products  | No        | Product catalog with filters   |
| `/cart`     | Cart      | No        | Shopping cart page             |
| `*`         | Error     | No        | 404 error page                 |

### Protected Routes

Protected routes use the `ProtectedRoute` component to check authentication status before rendering. Unauthenticated users are redirected to `/login`.

```jsx
<Route
  element={
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  }
>
  <Route path="/cart" element={<Cart />} />
</Route>
```

### Layout System

The application uses a layout pattern with `Layout.jsx` containing the navigation and footer, wrapping all pages via `Outlet` from React Router.

---

## State Management

### Redux Store

The application uses Redux Toolkit for global state management with a comprehensive cart slice:

**Cart Slice** (`src/store/cartSlice.js`)

```javascript
{
  items: [
    {
      _id: string,
      name: string,
      price: number,
      quantity: number,
      // ... other product fields
    }
  ],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  loading: false,
  error: null
}
```

**Async Thunks:**

- `fetchCart()` - Fetch cart from backend
- `addToCart({ productId, quantity })` - Add item to cart
- `updateItemQuantity({ productId, quantity })` - Update item quantity
- `removeFromCart(productId)` - Remove item from cart
- `clearCart()` - Clear entire cart

**Actions:**

- `addToCartLocal(product)` - Optimistic local update
- `removeFromCartLocal(productId)` - Remove item locally
- `updateQuantityLocal({ id, quantity })` - Update quantity locally
- `clearCartLocal()` - Clear cart locally
- `resetError()` - Reset error state

**Selectors:**

- `selectCartItems` - Get all cart items
- `selectCartLoading` - Get loading state
- `selectCartError` - Get error state
- `selectCartSubtotal` - Get subtotal
- `selectCartTax` - Get tax (14% VAT)
- `selectCartShipping` - Get shipping cost (free over 100 EGP, otherwise 20 EGP)
- `selectCartTotal` - Get total amount
- `selectCartTotalItems` - Get total item count

### Cart API Service

**Cart API** (`src/store/cartApi.js`)

Backend integration for cart operations:

- `getCart()` - Fetch cart from backend (returns `data.cart`)
- `addToCart(productId, quantity)` - Add item to cart (returns `data.cart`)
- `updateItemQuantity(productId, quantity)` - Update item quantity (returns `data.cart`)
- `removeFromCart(productId)` - Remove item from cart (returns `data.cart`)
- `clearCart()` - Clear entire cart (returns `data.cart`)

All API calls use Axios with automatic JWT token handling.

**Backend Cart Endpoints:**

- `GET /api/cart` - Get authenticated user's cart
- `POST /api/cart/add` - Add product to cart
- `PUT /api/cart/item/:productId` - Update item quantity
- `DELETE /api/cart/item/:productId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

**Backend Cart Features:**

- 14% VAT tax calculation
- Free shipping over 100 EGP, otherwise flat 20 EGP
- Product stock validation before adding/updating
- Price snapshot at purchase time (`priceAtPurchase`)
- One cart per user (unique user reference)

### Context API

**Auth Context** (`src/context/AuthContext.jsx`)

Manages user authentication state:

- `user` - Current user object
- `token` - Authentication token
- `loading` - Loading state
- `isAuthenticated` - Authentication status
- `register(name, email, password)` - Register new user
- `login(email, password)` - Login user
- `logout()` - Logout user

---

## Cart System

### Architecture

The cart system follows a modern, production-ready architecture:

```
src/
├── Components/
│   ├── CartItem.jsx        # Individual cart item display
│   ├── CartSummary.jsx     # Order summary with totals
│   ├── EmptyCart.jsx       # Empty cart state
│   └── QuantitySelector.jsx # Quantity controls
├── store/
│   ├── cartApi.js          # API service layer
│   └── cartSlice.js        # Redux slice with thunks
└── styles/
    └── cart.module.css     # CSS Modules styling
```

### Features

- **Backend Sync**: Automatic cart persistence with JWT authentication
- **Live Totals**: Real-time calculation of subtotal, tax (14% VAT), shipping (free over 100 EGP, otherwise 20 EGP), and total
- **Optimistic Updates**: Immediate UI feedback with local state updates
- **Loading States**: Skeleton loaders and spinners for async operations
- **Error Handling**: Graceful error states with retry functionality
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

### Backend Cart Integration

The frontend cart is fully integrated with the backend cart API:

**Backend Cart Endpoints:**

- `GET /api/cart` - Get authenticated user's cart
- `POST /api/cart/add` - Add product to cart
- `PUT /api/cart/item/:productId` - Update item quantity
- `DELETE /api/cart/item/:productId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

**Backend Cart Features:**

- 14% VAT tax calculation
- Free shipping over 100 EGP, otherwise flat 20 EGP
- Product stock validation before adding/updating
- Price snapshot at purchase time (`priceAtPurchase`)
- One cart per user (unique user reference)

**API Response Format:**

```json
{
  "cart": {
    "items": [...],
    "subtotal": 0,
    "totalItems": 0,
    "tax": 0,
    "shipping": 0,
    "total": 0
  }
}
```

### Cart Slice State

```javascript
{
  items: [
    {
      _id: string,
      name: string,
      price: number,
      quantity: number,
      image: string,
      description: string,
      size: string
    }
  ],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
  loading: false,
  error: null
}
```

### Cart API Endpoints

| Method | Endpoint             | Description      | Auth Required |
| ------ | -------------------- | ---------------- | ------------- |
| GET    | `/api/cart`          | Get cart items   | Yes           |
| POST   | `/api/cart/add`      | Add item to cart | Yes           |
| PUT    | `/api/cart/item/:id` | Update item qty  | Yes           |
| DELETE | `/api/cart/item/:id` | Remove item      | Yes           |
| DELETE | `/api/cart/clear`    | Clear cart       | Yes           |

**Backend Cart Features:**

- 14% VAT tax calculation
- Free shipping over 100 EGP, otherwise flat 20 EGP
- Product stock validation before adding/updating
- Price snapshot at purchase time (`priceAtPurchase`)
- One cart per user (unique user reference)

### Cart Components

| Component          | Purpose                             |
| ------------------ | ----------------------------------- |
| `CartItem`         | Display individual cart item        |
| `CartSummary`      | Show order summary with totals      |
| `EmptyCart`        | Show empty cart state               |
| `QuantitySelector` | Increase/decrease quantity controls |

### Cart Styling

- **CSS Modules**: Component-scoped styles in `cart.module.css`
- **Responsive Grid**: 2-column layout on desktop, single column on mobile
- **Sticky Summary**: Order summary stays visible while scrolling
- **Hover Effects**: Smooth transitions on interactive elements
- **Loading States**: Skeleton loaders for async operations

---

## API Integration

### Axios Configuration

The API layer is configured in `src/api/axios.js` with:

- **Base URL**: `http://localhost:5000/api`
- **Content-Type**: `application/json`
- **Request Interceptor**: Automatically attaches JWT token
- **Response Interceptor**: Handles 401 responses by clearing auth and redirecting to login

### API Endpoints Used

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| POST   | `/auth/register`     | Register new user | No            |
| POST   | `/auth/login`        | Login user        | No            |
| GET    | `/products`          | Get all products  | No            |
| POST   | `/products`          | Create product    | Yes (Admin)   |
| PUT    | `/products/:id`      | Update product    | Yes (Admin)   |
| DELETE | `/products/:id`      | Delete product    | Yes (Admin)   |
| GET    | `/api/cart`          | Get cart items    | Yes           |
| POST   | `/api/cart/add`      | Add item to cart  | Yes           |
| PUT    | `/api/cart/item/:id` | Update item qty   | Yes           |
| DELETE | `/api/cart/item/:id` | Remove item       | Yes           |
| DELETE | `/api/cart/clear`    | Clear cart        | Yes           |

**Backend Cart Features:**

- 14% VAT tax calculation
- Free shipping over 100 EGP, otherwise flat 20 EGP
- Product stock validation before adding/updating
- Price snapshot at purchase time (`priceAtPurchase`)
- One cart per user (unique user reference)

---

## Authentication

### Flow

1. User navigates to `/login` or `/register`
2. User fills form and submits
3. Backend returns JWT token and user data
4. Token and user are stored in localStorage
5. Token is automatically attached to all API requests
6. Protected routes check authentication status
7. On logout, token and user are removed from localStorage

### Token Storage

Tokens are stored in `localStorage` with keys:

- `token`: JWT authentication token
- `user`: User object (JSON stringified)

### Protected Routes

The `ProtectedRoute` component checks `isAuthenticated` from AuthContext. If false, redirects to `/login` with the original location as state for post-login redirect.

---

## UI & Styling

### Design System

The application uses a comprehensive CSS variable system defined in `src/index.css`:

```css
:root {
  /* Brand Colors */
  --color-primary: #2563eb;
  --color-primary-light: #60a5fa;
  --color-primary-dark: #1d4ed8;
  --color-accent: #0f172a;

  /* Surfaces */
  --color-bg-primary: #fafafa;
  --color-bg-secondary: #f1f5f9;
  --color-bg-card: #ffffff;

  /* Typography */
  --font-family: "Inter", sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-base: 1rem;
  --font-size-xl: 1.25rem;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Styling Approach

- **CSS Modules**: Component-scoped styles in `.module.css` files
- **Global CSS**: Shared variables, utilities, and animations
- **CSS Variables**: Theme tokens for colors, spacing, typography
- **Responsive**: Mobile-first with media queries

### Key UI Patterns

- **Glassmorphism**: Backdrop blur effects on navigation and modals
- **Gradient Accents**: Primary gradient for buttons and highlights
- **Card Layouts**: Product cards with hover effects
- **Form Validation**: Real-time validation with error states
- **Loading States**: Skeleton loaders and spinners

---

## Performance Optimizations

### Code Splitting

Vite automatically splits code by route, loading components only when needed.

### Image Optimization

- Lazy loading for product images
- Placeholder fallbacks for missing images
- Responsive image sizing

### Bundle Optimization

- Tree shaking for unused code
- Minification in production builds
- CSS purging with PurgeCSS (via Vite)

### Rendering Optimizations

- `useCallback` for expensive computations
- `useMemo` for filtered/sorted data
- Debounced search input
- Skeleton loaders for async data

### Cart-Specific Optimizations

- **Memoized Selectors**: Redux selectors with `createSelector` for efficient state access
- **Optimistic Updates**: Local state updates for immediate UI feedback
- **Lazy Loading**: Components loaded on-demand
- **Minimal Re-renders**: Selective state updates to prevent unnecessary re-renders
- **CSS Modules**: Scoped styles to prevent style conflicts

---

## Reusable Components

| Component          | Purpose          | Features                                          |
| ------------------ | ---------------- | ------------------------------------------------- |
| `Nav`              | Navigation bar   | Responsive hamburger, cart badge, user avatar     |
| `Footer`           | Footer section   | Links, brand info, copyright                      |
| `ProductCard`      | Product display  | Image, details, price, add to cart, admin actions |
| `ProductFormModal` | Product CRUD     | Create/edit products with validation              |
| `ProtectedRoute`   | Route guard      | Authentication check, redirect to login           |
| `Layout`           | Page layout      | Navigation + main content + footer                |
| `CartItem`         | Cart item        | Product image, name, description, quantity, price |
| `CartSummary`      | Order summary    | Subtotal, tax, shipping, total, checkout button   |
| `EmptyCart`        | Empty state      | Illustration, message, start shopping button      |
| `QuantitySelector` | Quantity control | Increase/decrease buttons with accessibility      |

### Component Architecture

Components follow a consistent pattern:

- **Props**: Clear prop types with default values
- **State**: Local state for component-specific data
- **Styling**: CSS Modules for encapsulation
- **Accessibility**: ARIA labels, keyboard navigation

---

## Forms & Validation

### Validation Approach

The application uses custom validation logic with:

- **Real-time validation**: Errors clear on input
- **Server error handling**: Display backend validation errors
- **Form state management**: Controlled components with useState
- **Password strength**: Visual indicator for password strength

### Form Components

**Login Form** (`src/Pages/Login.jsx`)

- Email validation (regex pattern)
- Password validation (minimum length)
- Server error display
- Password visibility toggle

**Register Form** (`src/Pages/Register.jsx`)

- Name validation (minimum length)
- Email validation
- Password validation with strength meter
- Password confirmation matching
- Server error display

---

## Performance Optimizations

### Code Splitting

Vite automatically splits code by route, loading components only when needed.

### Image Optimization

- Lazy loading for product images
- Placeholder fallbacks for missing images
- Responsive image sizing

### Bundle Optimization

- Tree shaking for unused code
- Minification in production builds
- CSS purging with PurgeCSS (via Vite)

### Rendering Optimizations

- `useCallback` for expensive computations
- `useMemo` for filtered/sorted data
- Debounced search input
- Skeleton loaders for async data

---

## Accessibility

### Implemented Features

- **Semantic HTML**: Proper use of `<nav>`, `<main>`, `<footer>`, `<section>`
- **ARIA Labels**: Form inputs, buttons, and interactive elements
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus rings and management
- **Color Contrast**: Sufficient contrast ratios (WCAG AA compliant)
- **Screen Reader Support**: Proper heading hierarchy and labels

### Accessibility Checklist

- [x] All interactive elements are keyboard accessible
- [x] Form labels are properly associated with inputs
- [x] Color is not the only means of conveying information
- [x] Focus indicators are visible
- [x] Heading hierarchy is logical
- [x] Alt text for all images

---

## Responsive Design

### Breakpoints

| Breakpoint | Width          | Layout Changes                |
| ---------- | -------------- | ----------------------------- |
| Mobile     | < 768px        | Single column, hamburger menu |
| Tablet     | 768px - 1024px | 2-column grid, expanded nav   |
| Desktop    | > 1024px       | Full layout, hover effects    |

### Mobile Optimizations

- Single-column layouts
- Touch-friendly tap targets (44px minimum)
- Hamburger navigation menu
- Stacked form elements
- Responsive typography

### Desktop Optimizations

- Multi-column grids
- Hover effects and transitions
- Sticky elements (cart summary)
- Expanded navigation

---

## Scripts

| Script    | Command        | Description              |
| --------- | -------------- | ------------------------ |
| `dev`     | `vite`         | Start development server |
| `build`   | `vite build`   | Create production build  |
| `preview` | `vite preview` | Preview production build |
| `lint`    | `eslint .`     | Run ESLint               |

---

## Deployment

### Vercel

1. Push code to GitHub repository
2. Import project to Vercel
3. Set environment variables
4. Deploy

### Netlify

1. Push code to GitHub repository
2. Connect repository in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy

### Manual Deployment

```bash
# Build the application
npm run build

# Deploy the dist/ directory to your hosting provider
```

### Docker (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## Troubleshooting

### Common Issues

#### 1. API Connection Errors

**Problem**: `Network Error` or `404 Not Found`

**Solution**:

- Ensure backend server is running on `http://localhost:5000`
- Check API URL in `src/api/axios.js`
- Verify CORS is enabled on backend

#### 2. Styles Not Loading

**Problem**: Application renders without styles

**Solution**:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### 3. Authentication Not Working

**Problem**: Login succeeds but redirects to login again

**Solution**:

- Clear browser localStorage
- Check token format in backend response
- Verify JWT token is being sent in Authorization header

#### 4. Port Already in Use

**Problem**: `Port 5173 is already in use`

**Solution**:

```bash
# Use a different port
npm run dev -- --port 3000
```

---

## Scalability Notes

### Component Scalability

- Components are designed for reusability
- CSS Modules prevent style conflicts
- Props-based customization

### State Scalability

- Redux for global state (cart)
- Context API for auth state
- Consider Zustand for larger state trees

### Feature Modularity

- Pages are self-contained
- Components can be easily added
- API layer is centralized

### Monorepo Readiness

The project structure is ready for monorepo migration:

- Clear separation of concerns
- Independent components
- Centralized configuration

---

## Future Improvements

### Short-term

- [ ] Add product search filters (price range, rating)
- [ ] Implement product details page
- [ ] Add order history page
- [ ] Implement user profile page
- [ ] Add email notifications

### Medium-term

- [ ] Implement payment gateway integration
- [ ] Add product reviews and ratings
- [ ] Implement wish list functionality
- [ ] Add inventory management for admin
- [ ] Implement advanced analytics

### Long-term

- [ ] Add PWA support for offline capability
- [ ] Implement server-side rendering
- [ ] Add internationalization (i18n)
- [ ] Implement dark mode toggle
- [ ] Add advanced admin dashboard with charts

---

## Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow existing code style
- Use meaningful variable names
- Add comments for complex logic
- Test changes locally before committing
- Update documentation as needed

### Pull Request Guidelines

- Include a clear description of changes
- Reference related issues
- Include screenshots for UI changes
- Ensure all tests pass
- Update README if needed

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

**SOUQ Team**

- GitHub: [@souq-team](https://github.com/souq-team)
- Email: team@souq.com

---

_Built with React, Vite, and Redux Toolkit_
