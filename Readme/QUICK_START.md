# 🚀 Quick Start Guide - Job Finder

## Prerequisites
Make sure you have installed:
- **Node.js** (v16+) - https://nodejs.org/
- **MongoDB** (v4.4+) - https://www.mongodb.com/try/download/community

## ⚡ Fastest Setup (Windows)

### Option 1: One-Click Startup
Simply double-click `startup.bat` and follow the prompts. All servers will start automatically.

### Option 2: Manual Setup (5 minutes)

#### Step 1: Start MongoDB
```powershell
# Open PowerShell as Administrator
mongod --dbpath "%USERPROFILE%\mongodb-data"
```
✓ MongoDB running on port 27017

#### Step 2: Start Backend Server
```powershell
cd jobfinderserver
npm install
npm run dev
```
✓ Backend running on http://localhost:5000

#### Step 3: Start Frontend Server
Open a **new terminal/PowerShell**:
```powershell
cd job-finder
npm install
npm run dev
```
✓ Frontend running on http://localhost:5173

## 📝 Test Accounts

After seeding, use these credentials:

### Job Seeker
- Email: `jobseeker@example.com`
- Password: `password123`

### Employer
- Email: `employer@example.com`
- Password: `password123`

### Admin
- Email: `admin@example.com`
- Password: `password123`

## 🔧 Initial Setup (First Time Only)

### Seed Database with Sample Data
```powershell
cd jobfinderserver
npm run seed
```

This creates:
- 3 test users (job seeker, employer, admin)
- 1 test company
- 4 test job listings

## 🌐 Access the Application

Open your browser and go to:
```
http://localhost:5173
```

## ✅ Verify Everything is Working

1. **Frontend** - http://localhost:5173 should load
2. **Backend API** - http://localhost:5000/api/health should return `{"success":true,"message":"Server is running"}`
3. **Database** - You should see jobs on the home page

## 🧪 Test Basic Workflow

### As Job Seeker:
1. Register as Job Seeker or login with test account
2. Browse jobs on home page
3. Search and filter jobs
4. Click a job to view details
5. Save a job
6. Apply to a job with resume
7. View application in dashboard

### As Employer:
1. Register as Employer or login with test account
2. Go to Employer Dashboard
3. Update company info
4. Create a new job posting
5. View applications for your jobs
6. Update application status

### As Admin:
1. Login as admin (may need manual DB update)
2. Go to Admin Dashboard
3. View system statistics
4. Manage users and jobs

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"
```powershell
# Make sure MongoDB is running
mongod --dbpath "%USERPROFILE%\mongodb-data"

# Check connection in another terminal
mongo
> show databases
```

### "Address already in use"
Something is using port 5000 or 5173. Kill the process:
```powershell
# Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Find and kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### "Cannot find module"
Delete node_modules and reinstall:
```powershell
cd jobfinderserver
rm node_modules -r -Force
npm install
npm run dev
```

### API calls returning 401 Unauthorized
- Make sure you're logged in
- Check that token is stored in localStorage
- Open DevTools (F12) > Application > Local Storage

### MongoDB shows old data
Clear and reseed:
```powershell
cd jobfinderserver
npm run seed
```

## 📚 File Structure

```
Job Finder/
├── job-finder/                 # React Frontend
│   ├── src/
│   │   ├── api/client.js      # API calls
│   │   ├── components/        # Reusable components
│   │   ├── context/           # Auth context
│   │   ├── pages/             # Page components
│   │   └── App.jsx            # Main app with routes
│   └── package.json
│
├── jobfinderserver/           # Node.js Backend
│   ├── controllers/           # Business logic
│   ├── models/                # Database schemas
│   ├── routes/                # API routes
│   ├── middlewares/           # Auth, errors
│   ├── index.js               # Server entry
│   └── package.json
│
└── README_SETUP.md            # Full documentation
```

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jobfinder
JWT_SECRET=your_jwt_secret_key_change_in_production
FRONTEND_URL=http://localhost:5173
UPLOAD_DIR=./uploads/resumes
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## 📞 Common Commands

```powershell
# Backend
npm run dev     # Start with hot reload
npm start       # Production start
npm run seed    # Load sample data

# Frontend
npm run dev     # Start dev server
npm run build   # Build for production
npm run lint    # Check code quality
```

## 🎯 Next Steps

1. Read `README_SETUP.md` for full documentation
2. Explore the codebase structure
3. Customize the app (colors, content, etc.)
4. Deploy to production

## 💡 Tips

- Use Dark Mode in navbar (moon icon)
- Open DevTools (F12) to debug
- Check Network tab for API issues
- Check Console for JavaScript errors
- Use MongoDB Compass to view data visually

## 🚀 Deploy to Production

See `README_SETUP.md` > "Production Deployment" section for:
- Backend hosting options
- Frontend deployment
- Database setup
- Domain configuration

---

**You're all set! Happy coding! 🎉**
