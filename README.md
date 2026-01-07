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

## Features (Mocked)

- **Authentication**:
    - Login: `test@example.com` / `password`
    - Register: Simulates user registration.
- **Products**: Displays a list of mock products.
- **Dashboard**: Protected route example.

## Backend Integration

This frontend is designed to be connected to a backend. To integrate:
1.  Update `VITE_API_BASE_URL` in `.env`.
2.  Replace mock functions in `src/services/api.js` with actual API calls.

## License

MIT License
