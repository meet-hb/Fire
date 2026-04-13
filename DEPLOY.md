# 🔥 Firegard AWS Deployment Guide

This document outlines the steps to deploy the Firegard project to an AWS EC2 instance (Ubuntu 22.04 LTS recommended).

## 1. Initial Server Setup
Connect to your instance and install dependencies:
```bash
sudo apt update
sudo apt install -y nodejs npm postgresql postgresql-contrib nginx
sudo npm install -g pm2
```

## 2. Database Configuration
```bash
sudo -u postgres psql
# Inside psql:
CREATE DATABASE firegard_db;
CREATE USER fireuser WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE firegard_db TO fireuser;
\q
```

## 3. Project Deployment
Clone your repository and install dependencies:
```bash
git clone <your-repo-url>
cd fire
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
DATABASE_URL=postgres://fireuser:your_secure_password@localhost:5432/firegard_db
```

## 4. Launch Backend (PM2)
```bash
pm2 start backend/index.js --name "fire-api"
pm2 save
pm2 startup
```

## 5. Build & Serve Frontend (Nginx)
Build the React application:
```bash
npm run build
```

Configure Nginx: `sudo nano /etc/nginx/sites-available/default`
Replace content with:
```nginx
server {
    listen 80;
    server_name your_domain_or_ip;

    # React Frontend
    location / {
        root /home/ubuntu/fire/dist;
        try_files $uri /index.html;
    }

    # API Proxy
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }

    # Permanent Uploads
    location /uploads {
        alias /home/ubuntu/fire/backend/uploads;
    }
}
```
Restart Nginx: `sudo systemctl restart nginx`

## 6. One-Time Setup
Visit `http://your_domain_or_ip/api/setup` once to initialize the database tables and seed data.
