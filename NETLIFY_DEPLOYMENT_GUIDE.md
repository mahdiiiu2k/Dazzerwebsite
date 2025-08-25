# Netlify Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Environment Variables
Set up these environment variables in your Netlify dashboard:

**Required for Database:**
- `DATABASE_URL` - Your PostgreSQL database connection string

**Required for Image Uploads:**
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret

### 2. Deploy to Netlify

**Option A: GitHub Integration (Recommended)**
1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Netlify will automatically use the `netlify.toml` configuration
4. Build command: `vite build && cd netlify/functions && npm install`
5. Publish directory: `dist/public`

**Option B: Manual Deploy**
1. Run `npm run build` locally
2. Upload the `dist/public` folder to Netlify
3. Upload the `netlify/functions` folder

### 3. What's Configured

✅ **Serverless Functions Created:**
- `/api/contact` - Contact form submissions
- `/api/referral` - Referral form submissions  
- `/api/buttons` - Get/Create repair buttons
- `/api/buttons/:number` - Delete specific buttons

✅ **Build Configuration:**
- Frontend builds to `dist/public`
- Functions install dependencies automatically
- Single Page Application routing configured

✅ **Database Integration:**
- Neon PostgreSQL database connection
- Drizzle ORM with proper schema
- All CRUD operations supported

✅ **Image Upload System:**
- Cloudinary integration for permanent image storage
- Base64 image upload support for serverless functions

### 4. Testing Your Deployment

After deployment, test these features:
- Contact form submission
- Referral form submission
- Adding new repair buttons with images
- Searching and filtering buttons
- Deleting buttons (admin password: `Qw9!tP3@zL7`)

### 5. Important Notes

- **Image Uploads:** File uploads work via base64 encoding in serverless functions
- **Database:** Uses your existing PostgreSQL database with Drizzle ORM
- **CORS:** All API endpoints configured for cross-origin requests
- **SPA Routing:** Frontend routing works properly with fallback to `index.html`

Your website is now ready for Netlify deployment! 🎉