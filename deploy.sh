#!/bin/bash

# ============================================
# EC2 Deployment Script for Startup Platform
# Run this on Ubuntu 22.04 EC2 Instance
# ============================================

echo "🚀 Starting deployment setup..."

# Update system
echo "📦 Updating system packages..."
sudo apt-get update && sudo apt-get upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Verify Docker
docker --version
docker compose version

# Install Git
echo "📥 Installing Git..."
sudo apt-get install -y git

# Install Node.js (for local development if needed)
echo "⬢ Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Create app directory
echo "📁 Creating application directory..."
mkdir -p ~/apps
cd ~/apps

# Clone repository (replace with your repo)
echo "📂 Cloning repository..."
git clone https://github.com/ahmadansari1942/startup-platform.git
cd startup-platform

# Create environment file
echo "⚙️ Setting up environment..."
cat > .env << EOF
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://mongo:27017/startup_platform
SESSION_SECRET=your_super_secret_session_key_change_this
JWT_SECRET=your_jwt_secret_key_change_this
MONGO_ROOT_USER=admin
MONGO_ROOT_PASS=your_mongo_password
ME_USER=admin
ME_PASS=your_mongo_express_password
EOF

# Build and run with Docker Compose
echo "🏗️ Building Docker containers..."
docker compose up -d --build

# Check status
echo "✅ Checking container status..."
docker ps

echo ""
echo "🎉 Deployment Complete!"
echo "📱 Application URL: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
echo "🗄️ MongoDB Express: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):8081"
echo ""
echo "Useful commands:"
echo "  docker logs -f startup-platform    # View app logs"
echo "  docker compose down              # Stop all containers"
echo "  docker compose up -d             # Start all containers"
