<div align="center">

# 🚀 Startup Platform

<img src="https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js" />
<img src="https://img.shields.io/badge/Express.js-4.x-blue?style=for-the-badge&logo=express" />
<img src="https://img.shields.io/badge/MongoDB-6.x-green?style=for-the-badge&logo=mongodb" />
<img src="https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker" />
<img src="https://img.shields.io/badge/EC2-Deployed-orange?style=for-the-badge&logo=amazon-aws" />

**Production-Ready Node.js SaaS Application with Modern UI**

[Live Demo](http://your-ec2-ip:3000) • [Documentation](#documentation) • [Screenshots](#screenshots)

</div>

---

## 📸 Screenshots

<div align="center">

### 🏠 Hero Section (Light Mode)
![Hero Section](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop)

### 📊 Dashboard (Dark Mode)
![Dashboard Dark Mode](https://kimi-web-img.moonshot.cn/img/cdn.prod.website-files.com/f645a4e68913f1afb7d1ac20ff61dc3fac851dec.png)

### 🔐 Authentication Pages
![Auth Interface](https://kimi-web-img.moonshot.cn/img/cdn.dribbble.com/bf13ac46931bce070ebf92f742d13d71fce95eb7.png)

### 📱 Mobile Responsive
<p align="center">
  <img src="https://kimi-web-img.moonshot.cn/img/miro.medium.com/ff7dfe3406d121cd0e78dd028cdffe916f1ea937" width="300" />
  <img src="https://kimi-web-img.moonshot.cn/img/cdn.dribbble.com/b5e50508b6fa1cc140112f0b42ff8de7da773c64.png" width="300" />
</p>

</div>

---

## ✨ Features

### 🎨 Frontend
- ✅ **Modern UI** with Tailwind CSS + Dark Mode
- ✅ **Responsive Design** (Mobile + Desktop + Tablet)
- ✅ **Smooth Animations** & Hover Effects
- ✅ **Toast Notifications** System
- ✅ **Loading Spinners** & Skeleton Screens
- ✅ **FontAwesome Icons** Integration

### 🔧 Backend
- ✅ **Node.js + Express.js** REST API
- ✅ **MongoDB** Database with Mongoose
- ✅ **Authentication** (Passport.js + Sessions)
- ✅ **File Uploads** with Multer
- ✅ **Form Validation** with Express-Validator
- ✅ **Security** (Helmet, CORS, Rate Limiting)
- ✅ **Logging** with Winston + Morgan

### 🐳 DevOps
- ✅ **Docker** Containerization
- ✅ **Docker Compose** (App + MongoDB + Nginx)
- ✅ **AWS EC2** Deployment Ready
- ✅ **Health Checks** & Auto-restart
- ✅ **Environment Variables** Support

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js 18+ |
| **Framework** | Express.js 4.x |
| **Database** | MongoDB 6.x |
| **ODM** | Mongoose 8.x |
| **Auth** | Passport.js + bcryptjs |
| **Template** | EJS |
| **Styling** | Tailwind CSS 3.x |
| **Icons** | FontAwesome 6 |
| **Uploads** | Multer |
| **Validation** | Express-Validator |
| **Logs** | Winston + Morgan |
| **Container** | Docker |
| **Proxy** | Nginx |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Docker (optional)

### Local Development

```bash
# Clone repository
git clone https://github.com/ahmadansari1942/startup-platform.git
cd startup-platform

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Build CSS
npm run build:css

# Run development server
npm run dev
```

**App runs on:** `http://localhost:3000`

---

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f app

# Stop all
docker compose down
```

**Services:**
- App: `http://localhost:3000`
- MongoDB: `localhost:27017`
- Mongo Express: `http://localhost:8081`

### Manual Docker Build

```bash
# Build image
docker build -t startup-platform .

# Run container
docker run -d \
  -p 3000:3000 \
  --env-file .env \
  -v $(pwd)/public/uploads:/app/public/uploads \
  startup-platform
```

---

## ☁️ AWS EC2 Deployment

### Step-by-Step Guide

```bash
# 1. SSH into EC2
ssh -i your-key.pem ubuntu@YOUR_EC2_IP

# 2. Install Docker
sudo apt-get update
sudo apt-get install -y docker.io docker-compose

# 3. Clone repo
git clone https://github.com/ahmadansari1942/startup-platform.git
cd startup-platform

# 4. Setup env
cp .env.example .env
nano .env  # Add your secrets

# 5. Deploy
docker compose up -d
```

### Security Group Settings

| Type | Port | Source |
|------|------|--------|
| SSH | 22 | My IP |
| HTTP | 80 | Anywhere |
| HTTPS | 443 | Anywhere |
| App | 3000 | Anywhere |
| Mongo Express | 8081 | My IP |

---

## 📁 Project Structure

```
startup-platform/
├── src/
│   ├── config/          # Database & Passport config
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & Error handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routes
│   ├── views/           # EJS templates
│   └── utils/           # Logger & helpers
├── public/              # Static assets
│   ├── css/             # Tailwind styles
│   ├── js/              # Client scripts
│   └── uploads/         # User uploads
├── tests/               # Test files
├── server.js            # Entry point
├── package.json         # Dependencies
├── Dockerfile           # Docker config
├── docker-compose.yml   # Compose services
└── .env.example         # Environment template
```

---

## 🔐 Environment Variables

```env
# App
NODE_ENV=production
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/startup_platform

# Security
SESSION_SECRET=your_super_secret_key
JWT_SECRET=your_jwt_secret

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

---

## 🧪 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page |
| GET | `/about` | About page |
| GET | `/contact` | Contact form |
| POST | `/contact` | Submit contact |
| GET | `/auth/login` | Login page |
| POST | `/auth/login` | Authenticate |
| GET | `/auth/register` | Register page |
| POST | `/auth/register` | Create account |
| GET | `/auth/logout` | Logout |
| GET | `/dashboard` | User dashboard |
| GET | `/api/data` | API endpoint |
| GET | `/health` | Health check |

---

## 📝 Docker Commands Cheat Sheet

```bash
# Build
docker build -t startup-platform .

# Run
docker run -d -p 3000:3000 startup-platform

# List
docker ps

# Logs
docker logs -f startup-platform

# Stop
docker stop startup-platform

# Remove
docker rm startup-platform

# System prune
docker system prune -a
```

---

## 👨‍💻 Author

<div align="center">

**Ahmad Ansari**

[![GitHub](https://img.shields.io/badge/GitHub-ahmadansari1942-black?style=flat-square&logo=github)](https://github.com/ahmadansari1942)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/ahmadansari)
[![Email](https://img.shields.io/badge/Email-Contact-red?style=flat-square&logo=gmail)](mailto:ahmadansari1942@gmail.com)

</div>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com) for amazing styling
- [Express.js](https://expressjs.com) for robust backend
- [MongoDB](https://mongodb.com) for flexible database
- [Docker](https://docker.com) for easy deployment

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

**[⬆ Back to Top](#-startup-platform)**

</div>
