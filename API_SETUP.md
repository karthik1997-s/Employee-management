# REST API Setup Guide

This application uses REST API for employee management. You can use JSON Server for local development or connect to your own backend API.

## Option 1: Using JSON Server (Recommended for Development)

### Step 1: Install Dependencies

```bash
npm install
```

This will install `json-server` and `concurrently` as dev dependencies.

### Step 2: Create Environment File

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### Step 3: Start the API Server

**Option A: Start API server separately**
```bash
npm run server
```

**Option B: Start both API server and dev server together**
```bash
npm run dev:all
```

The JSON Server will run on `http://localhost:3000` and the React app will run on `http://localhost:5173`.

### Step 4: Verify API is Running

Open your browser and navigate to:
- `http://localhost:3000/employees` - Should show the list of employees

## Option 2: Using Your Own Backend API

### Step 1: Update Environment Variable

Create or update `.env` file with your API base URL:

```env
VITE_API_BASE_URL=https://your-api-domain.com
```

### Step 2: API Endpoints Required

Your backend API should provide these endpoints:

- **GET** `/employees` - Get all employees
  - Response: `{ data: Employee[] }` or `Employee[]`
  
- **GET** `/employees/:id` - Get single employee
  - Response: `{ data: Employee }` or `Employee`
  
- **POST** `/employees` - Create new employee
  - Body: `{ fullName, gender, dateOfBirth, state, profileImage, isActive }`
  - Response: `{ data: Employee }` or `Employee`
  
- **PUT** `/employees/:id` - Update employee
  - Body: `{ fullName?, gender?, dateOfBirth?, state?, profileImage?, isActive? }`
  - Response: `{ data: Employee }` or `Employee`
  
- **DELETE** `/employees/:id` - Delete employee
  - Response: `{ success: true }` or `{ data: { success: boolean } }`

### Step 3: CORS Configuration

If your frontend and backend are on different origins, ensure your backend allows CORS:

```javascript
// Example for Express.js
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Step 4: Authentication

The application uses Bearer token authentication. Make sure your API:
- Accepts `Authorization: Bearer <token>` header
- Returns `401` status code for unauthorized requests

## API Response Format

The application supports two response formats:

**Format 1:**
```json
{
  "data": {
    "id": 1,
    "fullName": "John Doe",
    ...
  }
}
```

**Format 2:**
```json
{
  "id": 1,
  "fullName": "John Doe",
  ...
}
```

## Testing the API

You can test the API endpoints using:

1. **Browser**: Navigate to `http://localhost:3000/employees`
2. **cURL**:
   ```bash
   curl http://localhost:3000/employees
   ```
3. **Postman**: Import the endpoints and test them

## Troubleshooting

### API Connection Errors

1. **Check if API server is running**
   ```bash
   # For JSON Server
   curl http://localhost:3000/employees
   ```

2. **Verify environment variable**
   - Check `.env` file exists
   - Restart dev server after changing `.env`

3. **Check CORS settings**
   - Ensure backend allows requests from frontend origin
   - Check browser console for CORS errors

4. **Verify API endpoints**
   - Ensure endpoints match exactly: `/employees`
   - Check HTTP methods (GET, POST, PUT, DELETE)

### Common Issues

- **404 Not Found**: Check API base URL and endpoint paths
- **401 Unauthorized**: Verify authentication token is being sent
- **CORS Error**: Configure backend to allow frontend origin
- **Network Error**: Ensure API server is running and accessible

## Sample Employee Data Structure

```json
{
  "id": 1,
  "fullName": "John Doe",
  "gender": "Male",
  "dateOfBirth": "1990-05-15",
  "state": "California",
  "profileImage": "data:image/png;base64,...",
  "isActive": true,
  "createdAt": "2024-01-15T10:00:00.000Z",
  "updatedAt": "2024-01-15T10:00:00.000Z"
}
```

## Next Steps

1. Start the API server (JSON Server or your backend)
2. Start the React development server
3. Login to the application
4. Test CRUD operations on employees

For more information, see the main [README.md](./README.md) file.

