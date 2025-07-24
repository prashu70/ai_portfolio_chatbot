# Deployment Guide

This guide covers deploying the AI-Powered Portfolio Chatbot to production environments.

## 🌐 Deployment Options

### Option 1: Full-Stack Deployment (Recommended)

Deploy both frontend and backend together for full functionality.

#### Prerequisites
- Node.js 18+ runtime environment
- PostgreSQL database
- Domain name (optional)

#### Steps

1. **Prepare the Backend**
   ```bash
   cd apps/backend
   npm run build
   ```

2. **Set up Production Database**
   ```bash
   # Create production database
   createdb portfolio_chatbot_prod
   
   # Set production environment variables
   export DATABASE_URL="postgresql://user:password@host:port/portfolio_chatbot_prod"
   export NODE_ENV=production
   export PORT=3001
   ```

3. **Deploy Backend**
   ```bash
   # Push database schema
   npx prisma db push
   
   # Seed with your data
   npm run db:seed
   
   # Start production server
   npm start
   ```

4. **Build Frontend**
   ```bash
   cd apps/web
   npm run build
   ```

5. **Deploy Frontend**
   - Upload build files to your web server
   - Configure reverse proxy if needed

### Option 2: Static Frontend Only

Deploy just the portfolio website without the chatbot functionality.

```bash
cd apps/web
# Remove chatbot component from page.tsx
# Build static version
npm run build
# Deploy to static hosting (Netlify, Vercel, etc.)
```

## 🔧 Platform-Specific Deployment

### Heroku

1. **Backend Deployment**
   ```bash
   # Create Heroku app
   heroku create your-portfolio-backend
   
   # Add PostgreSQL addon
   heroku addons:create heroku-postgresql:hobby-dev
   
   # Set environment variables
   heroku config:set NODE_ENV=production
   
   # Deploy
   git subtree push --prefix apps/backend heroku main
   ```

2. **Frontend Deployment**
   ```bash
   # Create separate Heroku app for frontend
   heroku create your-portfolio-frontend
   
   # Add Node.js buildpack
   heroku buildpacks:set heroku/nodejs
   
   # Deploy
   git subtree push --prefix apps/web heroku main
   ```

### DigitalOcean App Platform

1. **Create App**
   - Connect your GitHub repository
   - Configure build settings

2. **Backend Service**
   ```yaml
   name: portfolio-backend
   source_dir: /apps/backend
   github:
     repo: your-username/ai-portfolio-chatbot
     branch: main
   run_command: npm start
   environment_slug: node-js
   instance_count: 1
   instance_size_slug: basic-xxs
   envs:
   - key: NODE_ENV
     value: production
   ```

3. **Frontend Service**
   ```yaml
   name: portfolio-frontend
   source_dir: /apps/web
   github:
     repo: your-username/ai-portfolio-chatbot
     branch: main
   build_command: npm run build
   run_command: npm start
   environment_slug: node-js
   instance_count: 1
   instance_size_slug: basic-xxs
   ```

### AWS (EC2 + RDS)

1. **Set up RDS PostgreSQL**
   - Create RDS PostgreSQL instance
   - Configure security groups
   - Note connection details

2. **Deploy to EC2**
   ```bash
   # SSH into EC2 instance
   ssh -i your-key.pem ubuntu@your-ec2-ip
   
   # Install Node.js and PostgreSQL client
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs postgresql-client
   
   # Clone and setup project
   git clone your-repo
   cd ai-portfolio-chatbot
   npm install
   
   # Configure environment
   export DATABASE_URL="postgresql://user:password@rds-endpoint:5432/portfolio_chatbot"
   
   # Setup database
   cd apps/backend
   npx prisma db push
   npm run db:seed
   
   # Start services with PM2
   npm install -g pm2
   pm2 start src/index.js --name "portfolio-backend"
   pm2 startup
   pm2 save
   ```

### Vercel (Frontend Only)

```bash
cd apps/web
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🔒 Security Considerations

### Environment Variables

Never commit sensitive data. Use environment variables:

```bash
# Production .env
DATABASE_URL=postgresql://user:password@host:port/database
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://your-domain.com
```

### CORS Configuration

Update backend CORS settings for production:

```javascript
// In apps/backend/src/index.ts
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3002',
  credentials: true
}));
```

### Database Security

- Use strong passwords
- Enable SSL connections
- Restrict database access by IP
- Regular backups

## 🚀 Performance Optimization

### Frontend Optimization

1. **Enable compression**
   ```javascript
   // In Next.js config
   module.exports = {
     compress: true,
     // ... other config
   }
   ```

2. **Optimize images**
   - Use Next.js Image component
   - Implement lazy loading

3. **Code splitting**
   - Dynamic imports for chatbot
   - Route-based splitting

### Backend Optimization

1. **Database optimization**
   ```sql
   -- Add indexes for better performance
   CREATE INDEX idx_conversations_session_id ON conversations(session_id);
   CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
   ```

2. **Caching**
   ```javascript
   // Add Redis for session caching
   const redis = require('redis');
   const client = redis.createClient();
   ```

3. **Rate limiting**
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

## 📊 Monitoring

### Health Checks

Implement health check endpoints:

```javascript
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Logging

Add structured logging:

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build backend
      run: |
        cd apps/backend
        npm run build
        
    - name: Build frontend
      run: |
        cd apps/web
        npm run build
        
    - name: Deploy to production
      run: |
        # Your deployment commands here
```

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check DATABASE_URL format
   - Verify database is running
   - Check firewall settings

2. **WebSocket Connection Issues**
   - Ensure backend is running
   - Check CORS configuration
   - Verify port accessibility

3. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

### Debug Commands

```bash
# Check backend health
curl http://your-backend-url/health

# Test database connection
npx prisma db pull

# Check WebSocket connection
# Use browser dev tools Network tab
```

## 📞 Support

If you encounter issues during deployment:

1. Check the logs for error messages
2. Verify all environment variables are set
3. Ensure all services are running
4. Test each component individually

---

**Note**: This deployment guide covers common scenarios. Your specific deployment may require additional configuration based on your hosting provider and requirements.

