# 🚀 Musab's Portfolio - Full Stack Developer

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.x-blue.svg)
![MongoDB](https://img.shields.io/badge/mongodb-6.x-green.svg)

**Modern, cyberpunk-themed portfolio with 3D animations, AI integration, and admin dashboard**

[Live Demo](https://musab-hassen.vercel.app/) • [Documentation](backend/README.md) • [Report Bug](https://t.me/neuron_v1)

</div>

---

## ✨ Features

- 🎨 **Cyberpunk UI** - Neon aesthetics with glassmorphism and gradient effects
- 🎭 **3D Holographic Animations** - Three.js powered interactive graphics
- 🤖 **AI Playground** - OpenAI integration for text & image generation
- 📱 **Fully Responsive** - Optimized for all devices
- ⚡ **60fps Performance** - Smooth animations with device-adaptive rendering
- 🔐 **Secure Admin Dashboard** - JWT authentication with refresh tokens
- 📧 **Contact Form** - Email notifications via Nodemailer
- 🎯 **SEO Optimized** - Meta tags and semantic HTML

---

## 🎯 Live Sections

1. **Hero** - Animated introduction with 3D tech hologram
2. **About** - Bio with animated portrait and stats
3. **Skills** - Technology proficiency with progress bars
4. **Projects** - Filterable portfolio showcase
5. **AI Playground** - Interactive AI demonstrations
6. **Contact** - 3D globe with contact form
7. **Admin Panel** - Project & contact management

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js + React Three Fiber
- **Icons**: React Icons
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast

### Backend

- **Runtime**: Node.js 16+
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (access + refresh tokens)
- **Email**: Nodemailer (Gmail SMTP)
- **Security**:
  - Helmet.js
  - Express Rate Limit
  - Express Mongo Sanitize
  - XSS Clean
  - CORS

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Gmail Account](https://gmail.com) (for contact form emails)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Rammiso/musab-portfolio.git
   cd musab-portfolio
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install

   # Create .env from example
   cp .env.example .env

   # Edit .env with your credentials
   # Required: MONGODB_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASSWORD

   # Start backend
   npm run dev
   ```

3. **Frontend Setup** (in a new terminal)

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the Application**

   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:5000
   - **Admin Panel**: http://localhost:5173/admin/login

5. **Create Admin Account** (one-time)
   ```bash
   # POST to http://localhost:5000/api/auth/register
   # See backend/QUICK_START.md for details
   ```

---

## 📖 Documentation

- 📘 [Backend README](backend/README.md) - Complete API documentation
- ⚡ [Quick Start Guide](backend/QUICK_START.md) - Get running in 5 minutes
- 🚀 [Deployment Guide](backend/DEPLOYMENT.md) - Deploy to Render, Railway, or Heroku
- 🧪 [API Testing](backend/POSTMAN_TESTING.md) - Postman collection guide
- 🔒 [Security Guide](backend/DISABLE_REGISTRATION.md) - Production security steps

---

## 🔐 Security Features

- ✅ Environment variables for sensitive data
- ✅ JWT access tokens (30m) + refresh tokens (7d)
- ✅ One-time admin registration (disable after setup)
- ✅ Rate limiting on all endpoints
- ✅ Input sanitization (XSS & NoSQL injection prevention)
- ✅ CORS configuration
- ✅ Helmet.js security headers
- ✅ Bcrypt password hashing

---

## 📦 Project Structure

```
musab-portfolio/
├── backend/               # Express.js API
│   ├── controllers/       # Route controllers
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth, rate limiting, sanitization
│   ├── config/            # DB, JWT helpers
│   └── .env.example       # Environment template
├── frontend/              # React + Vite app
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── animations/    # Framer Motion configs
│   │   ├── hooks/         # Custom React hooks
│   │   └── utils/         # Helper functions
│   └── public/            # Static assets
├── .gitignore             # Git ignore patterns
└── README.md              # This file
```

---

## 🌐 Deployment

### Backend (Render/Railway/Heroku)

1. Create account on hosting platform
2. Connect GitHub repository
3. Add environment variables
4. Deploy!

**Detailed instructions**: [backend/DEPLOYMENT.md](backend/DEPLOYMENT.md)

### Frontend (Vercel/Netlify)

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

---

## 🔧 Environment Variables

### Backend `.env`

```env
# Required
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@email.com
CLIENT_URL=http://localhost:5173

# Optional
OPENAI_API_KEY=sk-...  # For AI Playground
ALLOW_REGISTRATION=true  # Disable after creating admin
```

See [backend/.env.example](backend/.env.example) for full documentation.

---

## 🧪 Testing

### Run Backend Tests

```bash
cd backend
npm test
```

### Manual API Testing

Use the Postman collection documented in [backend/POSTMAN_TESTING.md](backend/POSTMAN_TESTING.md)

---

## 🎨 Customization

### Colors (Tailwind)

Edit `frontend/tailwind.config.js`:

```js
colors: {
  'neon-green': '#39FF14',  // Main accent
  'neon-cyan': '#00FFFF',   // Secondary
  'neon-pink': '#FF10F0',   // Tertiary
}
```

### Content

- **Projects**: Add via Admin Panel or directly in MongoDB
- **Skills**: Edit `frontend/src/utils/constants.js`
- **Personal Info**: Edit Hero section in `frontend/src/components/sections/Hero.jsx`

---

## 📄 License

MIT License - feel free to use this for your own portfolio!

```
MIT License

Copyright (c) 2024 Musab

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👤 Author

**Musab**

- 🌐 Portfolio: [Your Live URL]
- 💼 LinkedIn: [Your LinkedIn]
- 🐙 GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- 📧 Email: your.email@example.com

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🙏 Acknowledgments

- Icons by [React Icons](https://react-icons.github.io/react-icons/)
- 3D graphics powered by [Three.js](https://threejs.org/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- UI inspiration from cyberpunk aesthetics

---

## 📊 Project Stats

- **Lines of Code**: ~15,000+
- **Components**: 50+
- **API Endpoints**: 20+
- **Performance Score**: 95+ (Lighthouse)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ and lots of ☕

</div>
