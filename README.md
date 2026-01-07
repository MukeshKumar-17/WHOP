# Whop Clone Frontend

A scalable, frontend-only React application designed as a starting point for a Whop-like digital marketplace platform. This project uses the MERN stack approach (currently React-only) and is structured for easy backend integration.

## Tech Stack

- **React 18**: UI Library
- **Vite**: Build tool and development server
- **React Router**: Client-side routing
- **Axios**: HTTP client for API requests
- **JavaScript**: Core language

## Project Structure

```
src/
 ├── assets/          # Static assets (images, fonts)
 ├── components/      # Reusable UI components
 │    ├── common/     # Generic components (buttons, inputs)
 │    └── layout/     # Layout components (header, footer)
 ├── pages/           # Page components
 ├── services/        # API services and configuration
 ├── hooks/           # Custom React hooks
 ├── context/         # Global state (AuthContext)
 ├── routes/          # Routing configuration
 ├── utils/           # Helper functions
 ├── App.jsx          # Main application component
 ├── main.jsx         # Entry point
 └── index.css        # Global styles
```

## Getting Started

1.  **Clone the repository** (if applicable)
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Setup**:
    Ensure the `.env` file exists in the root directory:
    ```
    VITE_API_BASE_URL=http://localhost:3000/api
    ```
4.  **Run Locally**:
    ```bash
    npm run dev
    ```
    The application will start at `http://localhost:5173`.

## Authentication Features
The application uses a simulated authentication system with role-based access control.

### Demo Credentials
- **User (Customer)**:
  - Email: `user@test.com`
  - Password: `password` (or any string > 6 chars)
  - Role: `user` (Access to basic dashboard and marketplace)

- **Creator (Seller)**:
  - Email: `creator@test.com` (Must contain 'creator')
  - Password: `password`
  - Role: `creator` (Access to sales overview and product management)

### Key Components
- **AuthContext**: Manages user state and persists sessions via `localStorage`.
- **Protected Routes**: Redirects unauthenticated users to `/login`.
- **Navbar**: Dynamically updates based on login state.
- **Dashboard**: Renders different views for Users vs Creators.
- **Product Listing**: 
  - Publicly accessible marketplace.
  - Mock data simulates various product types (One-time vs Subscription).
  - Responsive grid layout with reusable `ProductCard` components.
- **Product Details**: 
  - Dynamic route `/products/:id`.
  - Simulates logic for "Buy Now" vs "Access Granted".
  - Mock API checks purchase status based on user ID.
- **Creator Tools**:
  - **Create Product**: Mock form to create new products (`/creator/create-product`).
  - Restricted to users with `role: creator`.
  - Validates input and simulates success with auto-redirect to Dashboard.
  - **My Products**: Management dashboard (`/creator/my-products`).
  - Lists valid products with status.
  - Supports mock deletion with confirmation dialog.

## Mock Data & Access
The application now includes rich mock data and access control logic:
- **Subscriptions**: Billed monthly (e.g., Trading Signals).
- **One-Time**: Single purchase (e.g., Courses).
- **Creators**: Different creators associated with products.
- **Access Control**:
  - `user@test.com` (ID: 1) has access to **Product ID 1** and **Product ID 3**.
  - All other users see "Buy Now" for all products.

## Backend Integration
The frontend is configured to communicate with a backend API using Axios.

### Configuration
1.  Set the API base URL in `.env`:
    ```
    VITE_API_BASE_URL=http://localhost:5000/api
    ```

### Authentication
- **Login/Register**: Uses `/auth/login` and `/auth/register`.
- **Token Management**: JWT stored in `localStorage` and attached to headers via Axios interceptor.
- **Auto-Logout**: 401/403 responses trigger automatic logout and redirect to login.

### Payment Flow
1.  **Initiation**: "Buy Now" triggers `POST /payments/create-checkout-session` with `productId`.
2.  **Redirect**: Backend returns Stripe Checkout URL -> User is redirected.
3.  **Completion**:
    - **Success**: Redirects to `/payment/success`. Access is granted.
    - **Cancel**: Redirects to `/payment/cancel`.
4.  **Verification**: Access is re-checked via `GET /access/:productId` upon return.

### API Endpoints
expected by frontend:
- `POST /auth/login`
- `POST /auth/register`
- `GET /products`
- `GET /products/:id`
- `POST /products` (Creator only)
- `GET /creator/products` (Creator only)
- `DELETE /products/:id` (Creator only)
- `GET /access/:productId` (Check access)
- `POST /payments/create-checkout-session` (Stripe)

## License

MIT License
