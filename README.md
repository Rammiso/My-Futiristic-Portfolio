# 🚀 Futuristic Cyberpunk Portfolio

A cutting-edge, interactive portfolio website built with the MERN stack, featuring cyberpunk aesthetics, neon animations, and AI-powered demos.

## ✨ Features

- **Cyberpunk Design**: Neon green accents, glassmorphism, holographic effects
- **Interactive Animations**: Framer Motion transitions, tsParticles backgrounds, smooth micro-interactions
- **Project Showcase**: Dynamic project grid with detailed case studies
- **Blog System**: Full-featured CMS with WYSIWYG editor
- **AI Playground**: Interactive AI demos (text generation, image prompts)
- **Admin Dashboard**: Secure admin panel for content management
- **Contact Form**: Email integration with MongoDB storage
- **Theme Toggle**: Light/dark mode with localStorage persistence
- **Responsive**: Mobile-first design approach

## 🛠️ Tech Stack

### Frontend

- **React** (JavaScript - NO TypeScript)
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **tsParticles** - Particle effects
- **Three.js** - 3D avatar (optional)
- **Axios** - HTTP client

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database (Atlas)
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Helmet** - Security headers
- **Express Rate Limit** - API protection

## 📁 Project Structure

```
musab-portfolio/
├── frontend/                 # React application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── ui/         # UI primitives (Button, Card, Modal, etc.)
│   │   │   ├── sections/   # Portfolio sections (Hero, About, Projects, etc.)
│   │   │   └── admin/      # Admin dashboard components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── vite.config.js      # Vite configuration
│   ├── tailwind.config.js  # Tailwind configuration
│   └── package.json
│
├── backend/                 # Node.js API
│   ├── config/             # Configuration files
│   ├── models/             # Mongoose schemas
│   ├── controllers/        # Route controllers
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── server.js           # Entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd musab-portfolio
   ```

2. **Setup Frontend**

   ```bash
   cd frontend
   npm install
   ```

3. **Setup Backend**

   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Variables**

   Create `.env` in the `backend` directory:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d

   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password

   OPENAI_API_KEY=your_openai_api_key (optional for AI playground)

   CLIENT_URL=http://localhost:5173
   ```

   Create `.env` in the `frontend` directory:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Create Admin User**

   Run the backend and use a tool like Postman to create the first admin user, or add a seed script.

### Running the Application

**Development Mode:**

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

   Backend runs on `http://localhost:5000`

2. Start the frontend dev server:
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

**Production Build:**

```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

## 📝 API Endpoints

### Public Routes

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get single blog post
- `POST /api/contact` - Submit contact form

### Admin Routes (Protected)

- `POST /api/admin/login` - Admin login
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project
- `POST /api/admin/posts` - Create blog post
- `PUT /api/admin/posts/:id` - Update blog post
- `DELETE /api/admin/posts/:id` - Delete blog post
- `GET /api/admin/contacts` - Get contact messages

### AI Routes

- `POST /api/ai/demo` - AI playground demo

## 🎨 Customization

### Colors

Edit `frontend/tailwind.config.js` to customize the cyberpunk color scheme:

```javascript
colors: {
  neon: {
    green: '#39FF14',
    cyan: '#00FFFF',
    pink: '#FF10F0',
  }
}
```

### Animations

Framer Motion variants are defined in individual components. Edit them to customize animation behavior.

### Content

Use the admin dashboard to manage:

- Projects (add/edit/delete)
- Blog posts (with WYSIWYG editor)
- View contact messages

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input sanitization
- CORS configuration
- Helmet security headers
- Environment variables for sensitive data

## 🚢 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set root directory to `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable: `VITE_API_URL`

### Backend (Render/Heroku/Railway)

1. Connect your repository
2. Set root directory to `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all environment variables from `.env`

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 👨‍💻 Author

**Musab**

- Portfolio: [Your deployed URL]
- GitHub: [@yourusername]
- LinkedIn: [Your LinkedIn]

---

Built with ❤️ using React JavaScript (NO TypeScript!) 🚫📘
