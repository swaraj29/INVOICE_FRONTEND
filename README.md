# Invoice Frontend

This is the frontend application for the Invoice Management System. It provides a user-friendly interface for managing invoices, including creating, viewing, and downloading invoices. The frontend is built with React and communicates with a Node.js/Express backend API.

## Live Demo
[Access the deployed app here](https://invoice-frontend-eight.vercel.app/login)

## Features
- User authentication (login/register)
- Create new invoices with multiple items
- View a list of recent invoices
- Download invoices as PDF
- Responsive and modern UI
- Error handling and session management

## Tech Stack
- **React** (with Vite for fast development and build)
- **Axios** for API requests
- **Tailwind CSS** for styling
- **React Router** for client-side routing

## Project Structure

```
invoice-frontend/
├── public/                      # Static assets (favicon, etc.)
│
├── src/
│   ├── api/                     # API configuration and API call modules
│   │   ├── apiConfig.js
│   │   ├── auth.js
│   │   └── invoice.js
│   │
│   ├── components/              # Reusable React components
│   │   ├── CreateInvoiceForm.jsx
│   │   ├── Header.jsx
│   │   ├── InvoiceList.jsx
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   └── Footer.jsx
│   │
│   ├── containers/              # Page-level components (views/screens)
│   │   ├── DashboardPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── CreateInvoicePage.jsx
│   │
│   ├── utils/                   # Utility/helper functions
│   │   └── auth.js
│   │
│   ├── index.css                # Global styles (Tailwind, etc.)
│   ├── main.jsx                 # React entry point
│   └── App.jsx                  # Main App component and routing
│
├── vercel.json                  # Vercel SPA routing config
├── package.json                 # Project metadata and scripts
├── README.md                    # Project documentation
└── vite.config.js               # Vite configuration
```

## Usage
1. Clone the repository and install dependencies:
   ```sh
   npm install
   ```
2. Set the API base URL in `src/api/apiConfig.js` or via environment variable `VITE_API_BASE_URL`.
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Build for production:
   ```sh
   npm run build
   ```

## Deployment
- The app is ready to be deployed on Vercel or any static hosting service.
- For Vercel, ensure you have a `vercel.json` file for SPA routing and set the `VITE_API_BASE_URL` environment variable to your backend API URL.

## License
MIT
