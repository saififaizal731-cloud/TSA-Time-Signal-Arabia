# TSA Time Signal Arabia - Deployment Guide

Complete guide for deploying your e-commerce website to production.

---

## Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] All tests pass
- [ ] No console errors
- [ ] Database backups working
- [ ] SSL certificate obtained
- [ ] Email configured
- [ ] Payment gateway tested
- [ ] Backup plan in place
- [ ] Team trained on admin panel

---

## 1. Preparation Steps

### Update Environment Variables
```env
PORT=8000
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/tsa-ecommerce
NODE_ENV=production
JWT_SECRET=generate_secure_random_string_here
```

### Generate Secure JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Update package.json
```json
{
  "name": "tsa-time-signal-arabia",
  "version": "1.0.0",
  "engines": {
    "node": "14.x",
    "npm": "6.x"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "npm run test"
  }
}
```

---

## 2. Database Migration to MongoDB Atlas

### Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create organization and project
4. Create a cluster

### Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<username>`, `<password>`, `<dbname>`

### Update .env
```env
MONGODB_URI=mongodb+srv://user:password@cluster0.mongodb.net/tsa-ecommerce
```

### Migrate Local Data (Optional)
```bash
# Backup local data
mongodump --db tsa-ecommerce --out ./backup

# Restore to Atlas
mongorestore --uri "mongodb+srv://user:password@cluster0.mongodb.net" ./backup
```

---

## 3. Deploy Options

### Option A: Deploy to Heroku (Easiest)

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create tsa-time-signal-arabia
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="mongodb+srv://..."
   heroku config:set JWT_SECRET="your_secret_key"
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **View Live**
   ```bash
   heroku open
   ```

### Option B: Deploy to DigitalOcean (Affordable)

1. **Create Droplet**
   - Login to DigitalOcean
   - Create new Droplet (Ubuntu 20.04)
   - Choose $5/month plan

2. **SSH into Droplet**
   ```bash
   ssh root@your_droplet_ip
   ```

3. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install nodejs npm git
   ```

4. **Clone Project**
   ```bash
   git clone https://github.com/yourusername/tsa-website.git
   cd tsa-website
   npm install
   ```

5. **Setup PM2**
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name "tsa"
   pm2 startup
   pm2 save
   ```

6. **Setup Nginx Reverse Proxy**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-enabled/default
   ```

   Add:
   ```nginx
   server {
     listen 80;
     server_name yourdomain.com;
     location / {
       proxy_pass http://localhost:5000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

7. **Setup SSL (Free with Let's Encrypt)**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

8. **Restart Nginx**
   ```bash
   sudo systemctl restart nginx
   ```

### Option C: Deploy to AWS EC2 (Scalable)

1. **Create EC2 Instance**
   - Launch EC2 instance (Ubuntu)
   - Configure security groups
   - Create key pair

2. **Connect via SSH**
   ```bash
   chmod 400 your-key.pem
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Clone and Setup**
   ```bash
   git clone https://github.com/yourusername/tsa-website.git
   cd tsa-website
   npm install
   ```

5. **Setup PM2 and Nginx** (Same as DigitalOcean)

### Option D: Deploy to Windows Server

1. **Install Node.js on Server**
   - Download from nodejs.org
   - Install with default settings

2. **Copy Project Files**
   ```bash
   Copy-Item -Path "C:\TSA-Website" -Destination "C:\inetpub\wwwroot\TSA"
   ```

3. **Install PM2 Globally**
   ```bash
   npm install -g pm2
   ```

4. **Create Batch File**
   ```batch
   @echo off
   cd C:\inetpub\wwwroot\TSA
   pm2 start server.js --name "TSA"
   pause
   ```

5. **Schedule as Windows Service**
   ```bash
   pm2 install pm2-windows-startup
   pm2 save
   ```

---

## 4. Setup Custom Domain

### DNS Configuration
1. Go to your domain registrar
2. Find DNS settings
3. Add A record pointing to your server IP
4. Wait for DNS to propagate (can take 24-48 hours)

### Update Frontend
```javascript
// public/app.js
const API_BASE = 'https://yourdomain.com/api';
```

---

## 5. SSL/HTTPS Certificate

### Using Let's Encrypt (Free)

```bash
# For Nginx
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com

# For Apache
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d yourdomain.com
```

### Auto-Renewal
```bash
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

---

## 6. Backup Strategy

### Automated Daily Backups

```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
MONGODB_URI="mongodb+srv://user:password@cluster0.mongodb.net"

mkdir -p $BACKUP_DIR
mongodump --uri $MONGODB_URI --out $BACKUP_DIR/backup_$DATE

# Keep only last 7 days
find $BACKUP_DIR -type d -name "backup_*" -mtime +7 -exec rm -rf {} \;
```

### Schedule with Cron
```bash
# Backup every day at 2 AM
0 2 * * * /home/user/backup.sh
```

### Backup Code Repository
```bash
# Push to GitHub
git add .
git commit -m "Daily backup"
git push origin main
```

---

## 7. Monitoring & Logging

### PM2 Monitoring
```bash
pm2 monit
pm2 logs
pm2 status
```

### Add Logging to App
```javascript
// server.js
const fs = require('fs');
const logStream = fs.createWriteStream('app.log', { flags: 'a' });

app.use((req, res, next) => {
  const now = new Date();
  logStream.write(`[${now.toISOString()}] ${req.method} ${req.url}\n`);
  next();
});
```

### Monitor with Uptime Robot
1. Go to https://uptimerobot.com
2. Add your website URL
3. Get alerts if site goes down

---

## 8. Performance Optimization

### Enable Compression
```javascript
const compression = require('compression');
app.use(compression());
```

### Setup CDN
1. Use Cloudflare (free tier)
2. Configure DNS to point to Cloudflare
3. Enable caching

### Database Indexing
```javascript
// models/Product.js
productSchema.index({ name: 1 });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
```

---

## 9. Security Hardening

### Update Dependencies
```bash
npm update
npm audit fix
```

### Setup Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);
```

### HTTPS Only
```javascript
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
});
```

### Helmet Security Headers
```javascript
const helmet = require('helmet');
app.use(helmet());
```

---

## 10. Post-Deployment Checklist

- [ ] Website loads without errors
- [ ] All APIs responding correctly
- [ ] User registration works
- [ ] Shopping cart functional
- [ ] Orders can be placed
- [ ] Emails sending
- [ ] Payment gateway working
- [ ] Admin APIs accessible
- [ ] Backups running
- [ ] Monitoring active
- [ ] SSL certificate valid
- [ ] Performance acceptable
- [ ] No sensitive data exposed

---

## 11. Troubleshooting Deployment

### Issue: Connection Timeout
**Solution:**
- Check firewall rules
- Verify security groups allow port 80/443
- Check MongoDB connection string

### Issue: High Memory Usage
**Solution:**
- Increase droplet size
- Check for memory leaks
- Optimize database queries

### Issue: Slow Response Times
**Solution:**
- Enable caching
- Add CDN
- Optimize images
- Use database indexes

### Issue: SSL Certificate Error
**Solution:**
```bash
# Renew manually
sudo certbot renew --force-renewal

# Restart server
sudo systemctl restart nginx
```

---

## 12. Maintenance Schedule

### Daily
- Monitor uptime
- Check error logs
- Verify backups

### Weekly
- Review performance metrics
- Check security updates
- Test backup restore

### Monthly
- Update dependencies
- Review analytics
- Check customer feedback
- Security audit

### Quarterly
- Full system audit
- Disaster recovery test
- Performance optimization review

---

## Useful Commands for Production

```bash
# Check server status
pm2 status

# View logs
pm2 logs tsa

# Restart app
pm2 restart tsa

# Stop app
pm2 stop tsa

# Start app
pm2 start tsa

# Delete from PM2
pm2 delete tsa

# View CPU/Memory
pm2 monit
```

---

## Contact for Support

For production issues:
- Email: info@tsa.com
- Phone: +966-1234-5678
- Emergency: +966-1234-5678

---

**Your TSA Time Signal Arabia store is production-ready! 🚀**
