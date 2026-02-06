# Job Finder - Full Stack Application

A complete full-stack job application web platform built with React (Frontend) and Node.js/Express (Backend).

## Features

### For Job Seekers
- Browse and search jobs with advanced filtering (location, employment type, salary range)
- Save jobs for later
- Apply to jobs with resume and cover letter
- Manage application history and status
- Upload and manage multiple resumes
- Set primary resume for applications
- View personalized job recommendations
- Update profile with skills and preferences

### For Employers
- Create and manage company profile
- Post and edit job listings
- View applications for each job
- Update application status (applied, under review, interviewed, rejected, hired)
- Track total applications
- Manage job visibility

### For Admins
- Dashboard with system statistics
- Manage users (search, ban users)
- Manage job listings (hide inappropriate jobs)
- Monitor platform activity

## Project Structure

```
Job Finder/
├── job-finder/                 # React Frontend
│   ├── src/
│   │   ├── api/               # API client integration
│   │   ├── components/        # Reusable React components
│   │   ├── context/           # React Context for authentication
│   │   ├── pages/             # Page components
│   │   ├── App.jsx            # Main app with routing
│   │   └── main.jsx           # React DOM entry point
│   ├── package.json
│   ├── vite.config.js         # Vite configuration
│   └── tailwind.config.js     # Tailwind CSS configuration
│
├── jobfinderserver/           # Node.js/Express Backend
│   ├── config/                # Database configuration
│   ├── controllers/           # Business logic controllers
│   ├── middlewares/           # Auth, error handling, upload
│   ├── models/                # MongoDB schemas
│   ├── routes/                # API route definitions
│   ├── services/              # Business logic services
│   ├── index.js               # Main server file
│   ├── package.json
│   └── .env                   # Environment variables
│
└── startup.bat                # Quick start script (Windows)
```

## Technology Stack

### Frontend
- **React 19** - UI library
- **React Router** - Client-side routing
- **TanStack React Query** - Server state management
- **Tailwind CSS** - Styling
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **CORS** - Cross-origin requests

## Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Usually comes with Node.js

## Installation & Setup

### Option 1: Automatic Setup (Windows)
Double-click `startup.bat` to automatically install dependencies and start all servers.

### Option 2: Manual Setup

#### 1. Start MongoDB
```bash
# On Windows (if installed as service)
net start MongoDB

# Or run directly
mongod --dbpath "%USERPROFILE%\mongodb-data"
```

#### 2. Setup Backend Server
```bash
cd jobfinderserver

# Install dependencies
npm install

# Create/update .env file (see .env.example)
# The default values should work for local development

# Start the server
npm run dev
```
The backend will run on `http://localhost:5000`

#### 3. Setup Frontend
```bash
cd job-finder

# Install dependencies
npm install

# Start development server
npm run dev
```
The frontend will run on `http://localhost:5173`

## Environment Variables

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

## Available Scripts

### Backend
```bash
npm run dev    # Start development server with auto-reload
npm start      # Start production server
npm test       # Run tests (if configured)
```

### Frontend
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
npm run lint    # Run ESLint
```

## API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Jobs
- `GET /api/jobs` - List all jobs (with filters)
- `GET /api/jobs/:id` - Get job details

### Applications
- `POST /api/applications` - Apply to a job (requires auth)
- `GET /api/applications` - Get my applications (requires auth)
- `GET /api/applications/:id` - Get application details (requires auth)
- `DELETE /api/applications/:id` - Withdraw application (requires auth)

### Profile
- `PUT /api/profile` - Update user profile (requires auth)

### Resumes
- `GET /api/resumes` - Get my resumes (requires auth)
- `POST /api/resumes` - Upload resume (requires auth)
- `DELETE /api/resumes/:id` - Delete resume (requires auth)
- `PUT /api/resumes/:id/primary` - Set as primary resume (requires auth)

### Saved Jobs
- `GET /api/saved` - Get saved jobs (requires auth)
- `POST /api/saved` - Save a job (requires auth)
- `DELETE /api/saved/:jobId` - Unsave a job (requires auth)

### Recommendations
- `GET /api/recommendations/jobs` - Get recommended jobs (requires auth)

### Employer (requires employer role)
- `GET /api/employer/company` - Get company profile
- `PUT /api/employer/company` - Update company profile
- `GET /api/employer/jobs` - Get my jobs
- `POST /api/employer/jobs` - Create new job
- `PUT /api/employer/jobs/:id` - Update job
- `DELETE /api/employer/jobs/:id` - Delete job
- `GET /api/employer/jobs/:jobId/applications` - Get job applications
- `PUT /api/employer/applications/:id/status` - Update application status

### Admin (requires admin role)
- `GET /api/admin/summary` - Get platform statistics
- `GET /api/admin/users` - List users (searchable)
- `PUT /api/admin/users/:id/ban` - Ban user
- `GET /api/admin/jobs` - List all jobs
- `PUT /api/admin/jobs/:id/hide` - Hide inappropriate job

## User Roles

### Job Seeker (Default)
- Can search and apply for jobs
- Can manage resumes
- Can save jobs for later
- Can view application history
- Can update profile

### Employer
- Can post and manage job listings
- Can view applications for their jobs
- Can update application status
- Can manage company profile
- Automatically created when registering as employer

### Admin
- Can view platform statistics
- Can manage users
- Can manage job listings
- Can monitor platform activity

## Testing the Application

### 1. Register and Login
- Go to `http://localhost:5173`
- Click "Sign up" to create a new account
- Choose role: Job Seeker, Employer, or Admin
- Log in with your credentials

### 2. Test Job Seeker Features
- Browse jobs on home page
- Search and filter jobs
- Click on a job to view details
- Save jobs
- Apply to jobs
- View applications in dashboard

### 3. Test Employer Features
- Register as employer
- Go to Employer Dashboard
- Update company information
- Post new job listing
- View and manage applications
- Update application status

### 4. Test Admin Features
- Admin account needs to be created manually
- In MongoDB, update a user: `db.users.updateOne({email: "admin@example.com"}, {$set: {role: "admin"}})`
- Login as admin
- Access admin dashboard
- Manage users and jobs

## Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Default: `mongodb://localhost:27017/jobfinder`

### API Connection Error
- Ensure backend is running on `http://localhost:5000`
- Check `VITE_API_URL` in frontend `.env`
- Check browser console for CORS errors

### Port Already in Use
- Backend (5000): `netstat -ano | findstr :5000` and kill process
- Frontend (5173): `netstat -ano | findstr :5173` and kill process

### File Upload Issues
- Ensure `uploads/resumes` directory exists
- Check file permissions
- Max file size: 5MB (PDF, DOC, DOCX only)

## Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Update `MONGODB_URI` to production database
3. Change `JWT_SECRET` to a secure random string
4. Set `FRONTEND_URL` to your domain
5. Deploy using: `npm start`

### Frontend
1. Build the project: `npm run build`
2. Serve the `dist` folder using a static server (Nginx, Apache, Vercel, Netlify)
3. Update `VITE_API_URL` to production API endpoint

## Future Enhancements

- Email notifications for applications
- Advanced job matching algorithm
- Video interviews integration
- Messaging between employers and candidates
- Skills verification
- Job seeker portfolio
- Analytics dashboard
- Social features (job sharing, reviews)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on the GitHub repository or contact the development team.

## Credits

Built with ❤️ using React and Node.js
