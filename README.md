# Giftify - Gift Shop Application

A beautiful and modern gift shop application built with React, Redux Toolkit, and Tailwind CSS.

## Features

- 🎁 Browse beautiful gift items
- 🛒 Add items to cart
- 👤 User authentication (login/register)
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔄 State management with Redux Toolkit

## Tech Stack

- **Frontend**: React 18
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. **Navigate to the frontend directory**:

   ```bash
   cd Gift-shop/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Application

1. **Start the development server**:

   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:5173
   ```

### Building for Production

```bash
npm run build
```

This will create a `dist` folder in the frontend directory with the production build.

## Project Structure

```
Gift-shop/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthContext.js      # Authentication context
│   │   │   ├── CartContext.js      # Shopping cart context
│   │   │   ├── GiftItem.js         # Individual gift item component
│   │   │   ├── Navbar.js           # Navigation bar
│   │   │   └── ProductModal.js     # Product detail modal
│   │   ├── pages/
│   │   │   └── Home.js             # Main home page
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # Entry point
│   │   ├── store.js                # Redux store configuration
│   │   ├── productSlice.js         # Redux slice for product state
│   │   └── tailwind.css            # Tailwind CSS imports
│   ├── package.json                # Dependencies and scripts
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## Features Explained

### Authentication

- Simple email/password authentication
- Registration and login functionality
- Password recovery (shows stored password)
- User session management

### Shopping Cart

- Add items to cart
- View cart contents
- Cart count display in navbar
- Persistent cart state during session

### Product Management

- Browse gift items with images and descriptions
- Click items to view details in modal
- Quantity selection in product modal
- Redux state management for product selection

### UI/UX

- Responsive design that works on all devices
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Modern card-based layout
- Interactive hover effects

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
