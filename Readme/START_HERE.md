# 🚀 START HERE - Server Startup Instructions

## What You Need (Install First)

1. **Node.js** (v16 or higher) - https://nodejs.org/
2. **MongoDB** (v4.4 or higher) - https://www.mongodb.com/try/download/community

---

## 📋 Step-by-Step Startup (5 Minutes)

### Step 1: Create MongoDB Data Directory
```powershell
mkdir "$env:USERPROFILE\mongodb-data"
```

### Step 2: Open 4 Terminal Windows

Open PowerShell or Command Prompt and do the following in separate windows:

---

### **WINDOW 1: Start MongoDB**

```powershell
mongod --dbpath "%USERPROFILE%\mongodb-data"
```

✓ You should see: `"Waiting for connections on port 27017"`

Leave this running.

---

### **WINDOW 2: Start Backend Server**

```powershell
cd "C:\Users\Priviledge\Desktop\Job finder\jobfinderserver"
npm install
npm run dev
```

✓ You should see: `"Server running on port 5000"`

Leave this running.

---

### **WINDOW 3: Seed Sample Data**

```powershell
cd "C:\Users\Priviledge\Desktop\Job finder\jobfinderserver"
npm run seed
```

✓ You should see: `"✅ Seed data created successfully!"`

This window will close after completing.

---

### **WINDOW 4: Start Frontend Server**

```powershell
cd "C:\Users\Priviledge\Desktop\Job finder\job-finder"
npm install
npm run dev
```

✓ You should see: `"VITE v... ready in ... ms"`

Leave this running.

---

## 🌐 Open in Browser

Once all servers are running, open your browser and go to:

```
http://localhost:5173
```

You should see the Job Finder home page!

---

## 🧪 Test Login

Use these credentials:

```
Email: jobseeker@example.com
Password: password123
```

Or try:
- Employer: employer@example.com / password123
- Admin: admin@example.com / password123

---

## ✅ Verify Everything Works

### Frontend
- [ ] Home page loads (http://localhost:5173)
- [ ] Can view jobs
- [ ] Dark mode toggle works (moon icon)

### Backend
- [ ] Backend console shows "Server running on port 5000"
- [ ] Health check: http://localhost:5000/api/health

### Database
- [ ] MongoDB console shows "Waiting for connections"
- [ ] Sample jobs appear on home page
- [ ] Can login with test credentials

---

## 🆘 If Something Goes Wrong

### MongoDB won't start
```powershell
# Check if data directory exists
ls "$env:USERPROFILE\mongodb-data"

# If not, create it
mkdir "$env:USERPROFILE\mongodb-data"

# Try starting MongoDB again
mongod --dbpath "%USERPROFILE%\mongodb-data"
```

### Backend won't start
```powershell
# Check Node version
node --version  # Should be v16 or higher

# Delete node_modules and reinstall
cd jobfinderserver
rm node_modules -r -Force
npm install
npm run dev
```

### Frontend won't start
```powershell
# Delete node_modules and reinstall
cd job-finder
rm node_modules -r -Force
npm install
npm run dev
```

### Can't login after seeding
Make sure you ran the seed command in Window 3. It should show:
```
✓ Users created
✓ Company created
✓ Jobs created
✅ Seed data created successfully!
```

If you don't see this, run:
```powershell
cd jobfinderserver
npm run seed
```

### Port Already in Use
```powershell
# Find process on port 5000
netstat -ano | findstr :5000

# Kill it (replace 1234 with actual PID)
taskkill /PID 1234 /F

# Find process on port 5173
netstat -ano | findstr :5173

# Kill it
taskkill /PID 5678 /F
```

---

## 🎯 Common Commands

### Backend
```powershell
npm run dev      # Start development server
npm run seed     # Load sample data
npm start        # Production mode
```

### Frontend
```powershell
npm run dev      # Start dev server
npm run build    # Build for production
```

---

## 📚 After Startup

1. **Read SETUP_CHECKLIST.md** - Full setup verification
2. **Read QUICK_START.md** - Quick reference guide
3. **Read README_SETUP.md** - Complete documentation
4. **Explore the app** - Test all features

---

## 🎉 You're Done!

Once all 4 windows show their success messages, your job platform is running!

**Happy coding! 🚀**

---

## 💾 Key Ports

- **Frontend**: 5173
- **Backend**: 5000
- **MongoDB**: 27017

If you want to change these, edit `.env` files in the respective folders.

---

## 🔐 Remember

- Always start MongoDB first
- Keep all 4 windows running while developing
- Use Ctrl+C to stop a server gracefully
- Don't close terminals until you're done testing

---

**Questions? See the documentation files or check the terminal output for error messages.**
