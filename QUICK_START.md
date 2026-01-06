# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Environment File
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:3000
```

### Step 3: Start the Application

**Option A: Start API and Frontend Together (Recommended)**
```bash
npm run dev:all
```

**Option B: Start Separately**
```bash
# Terminal 1: Start JSON Server API
npm run server

# Terminal 2: Start React App
npm run dev
```

### Step 4: Access the Application

1. **API Server**: http://localhost:3000
2. **React App**: http://localhost:5173

### Step 5: Login

- **Email**: Any email (e.g., `user@example.com`)
- **Password**: Any password (e.g., `password123`)

The application uses mock authentication, so any credentials will work.

## 📋 Available Scripts

- `npm run dev` - Start React development server
- `npm run server` - Start JSON Server API
- `npm run dev:all` - Start both API and frontend together
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔧 API Endpoints

The JSON Server provides these endpoints:

- `GET http://localhost:3000/employees` - Get all employees
- `GET http://localhost:3000/employees/:id` - Get single employee
- `POST http://localhost:3000/employees` - Create employee
- `PUT http://localhost:3000/employees/:id` - Update employee
- `DELETE http://localhost:3000/employees/:id` - Delete employee

## 📝 Sample Data

The `db.json` file contains 3 sample employees. You can modify this file to add more test data.

## 🐛 Troubleshooting

**Port already in use?**
- Change the port in `package.json` scripts or `.env` file

**API not connecting?**
- Verify JSON Server is running on port 3000
- Check `.env` file has correct `VITE_API_BASE_URL`
- Restart the dev server after changing `.env`

**Module not found errors?**
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then `npm install`

For detailed setup, see [API_SETUP.md](./API_SETUP.md)

