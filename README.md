# Employee Management System

A modern, full-featured Employee Management System built with React, TypeScript, and Ant Design. This application provides comprehensive employee management capabilities including authentication, dashboard analytics, CRUD operations, search, filtering, and print functionality.

## 🚀 Features

### Authentication
- **Login Page**: Secure login with mock authentication
- **Route Protection**: Dashboard access requires authentication
- **Session Management**: Token-based session handling

### Dashboard
- **Summary Cards**: 
  - Total number of employees
  - Active employees count
  - Inactive employees count
- **Real-time Statistics**: Automatically updates as employee data changes

### Employee Management
- **Employee List Table** with columns:
  - Employee ID
  - Profile Image (with avatar fallback)
  - Full Name
  - Gender
  - Date of Birth (formatted)
  - State
  - Active/Inactive Toggle (switch control)
  - Actions (Edit, Delete)

### Employee Form
- **Add/Edit Employee** with fields:
  - Full Name (validation: 2-100 characters)
  - Gender (Male, Female, Other)
  - Date of Birth (date picker with max date validation)
  - Profile Image (image upload with preview)
  - State (dropdown with all US states, searchable)
  - Active/Inactive Status (switch control)
- **Image Preview**: Preview uploaded images before saving
- **Form Validation**: Comprehensive validation for all fields

### Search & Filter
- **Search**: Search employees by full name (case-insensitive)
- **Gender Filter**: Filter by Male, Female, Other, or All
- **Status Filter**: Filter by Active, Inactive, or All
- **Combined Filtering**: All filters work together seamlessly

### Actions
- **Add Employee**: Create new employee records
- **Edit Employee**: Update existing employee information
- **Delete Employee**: Remove employees with confirmation dialog
- **Toggle Status**: Quickly activate/deactivate employees
- **Print**: Generate and print employee list with formatted table

### UI/UX
- **Modern Design**: Clean, professional interface using Ant Design
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Loading States**: Proper loading indicators during operations
- **Empty States**: Graceful handling when no data is available
- **Error Handling**: User-friendly error messages
- **Success Notifications**: Confirmation messages for all actions

## 🛠️ Tech Stack

- **React 19.1.1**: Modern React with latest features
- **TypeScript 5.9.3**: Type-safe development
- **Vite 7.1.7**: Fast build tool and dev server
- **Ant Design 5.27.6**: Comprehensive UI component library
- **React Router DOM 7.9.4**: Client-side routing
- **TanStack Query 5.90.5**: Powerful data synchronization
- **Day.js**: Lightweight date manipulation library
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **js-cookie**: Cookie management for authentication

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Loadable.tsx
│   ├── Loader.tsx
│   └── Pagination.tsx
├── constants/          # Constants and configuration
│   └── states.ts       # US states list
├── layout/             # Layout components
│   ├── Header.tsx
│   └── MainLayout.tsx
├── pages/              # Page components
│   ├── login/          # Login page
│   └── employee/       # Employee management
│       ├── index.tsx   # Main employee list page
│       └── EmployeeForm.tsx
├── routes/             # Route configuration
│   ├── Routes.tsx
│   ├── AuthRoutes.tsx
│   └── UnAuthRoutes.tsx
├── services/           # API and data services
│   ├── authService.ts  # Authentication (mock)
│   ├── employeeService.ts  # Employee CRUD (localStorage)
│   └── apiInterceptor.ts
├── types/              # TypeScript type definitions
│   └── employee.ts
├── utills/             # Utility functions
│   ├── auth.ts
│   └── ImageConstants.tsx
├── App.tsx
└── main.tsx
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v20.19.0 or >=22.12.0 recommended)
- npm or yarn package manager
- Backend API server (or use JSON Server for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd UsersManagement-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```
   Replace with your actual API base URL.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Using JSON Server (Development)

For local development, you can use JSON Server:

1. **Install JSON Server globally**
   ```bash
   npm install -g json-server
   ```

2. **Create a `db.json` file** in the project root:
   ```json
   {
     "employees": [
       {
         "id": 1,
         "fullName": "John Doe",
         "gender": "Male",
         "dateOfBirth": "1990-05-15",
         "state": "California",
         "profileImage": "",
         "isActive": true
       }
     ]
   }
   ```

3. **Start JSON Server**
   ```bash
   json-server --watch db.json --port 3000
   ```

4. **Update `.env` file** to point to JSON Server:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🔐 Authentication

The application uses mock authentication:
- **Any email/password combination** will work for login
- Example: `user@example.com` / `password123`
- Authentication token is stored in cookies
- Session persists until logout

## 💾 Data Storage

- **REST API**: All employee data is managed through REST API endpoints
- **API Endpoints**: 
  - `GET /employees` - Get all employees
  - `GET /employees/:id` - Get single employee
  - `POST /employees` - Create new employee
  - `PUT /employees/:id` - Update employee
  - `DELETE /employees/:id` - Delete employee
- **Environment Variable**: Set `VITE_API_BASE_URL` in `.env` file
- **Backend Required**: Requires a backend API server

## 📝 Usage Guide

### Login
1. Navigate to the login page
2. Enter any email and password
3. Click "Log in"
4. You'll be redirected to the dashboard

### Add Employee
1. Click "Add Employee" button
2. Fill in all required fields:
   - Upload a profile image (preview will show)
   - Select gender, date of birth, and state
   - Toggle active status
3. Click "Submit"

### Edit Employee
1. Click "Edit" button on any employee row
2. Modify the fields as needed
3. Click "Submit"

### Delete Employee
1. Click "Delete" button on any employee row
2. Confirm deletion in the modal dialog

### Search & Filter
1. Use the search box to filter by name
2. Select gender filter from dropdown
3. Select status filter from dropdown
4. Filters work together (combined filtering)

### Print Employee List
1. Apply any desired filters
2. Click "Print" button
3. A print-friendly page will open
4. Use browser's print dialog to print

### Toggle Employee Status
1. Use the switch in the "Active / Inactive" column
2. Status updates immediately

## 🎨 Design Decisions

1. **REST API**: Uses REST API for data persistence and scalability
2. **Ant Design**: Provides professional UI components out of the box
3. **TypeScript**: Ensures type safety and better developer experience
4. **React Query**: Handles data fetching, caching, and state management
5. **Base64 Images**: Profile images stored as base64 strings for simplicity
6. **Mock Authentication**: Allows testing without real authentication setup
7. **Axios Interceptors**: Handles authentication tokens and error responses

## 🔧 Configuration

### Environment Variables

No environment variables are required. The application works out of the box.

### Customization

- **Primary Color**: Edit `colorPrimary` in `src/App.tsx` (currently `#3C83F6`)
- **States List**: Modify `src/constants/states.ts` to change available states
- **Sample Data**: Edit `initializeStorage()` in `src/services/employeeService.ts`

## 🐛 Troubleshooting

### Issue: Images not displaying
- Ensure images are valid base64 strings or URLs
- Check browser console for errors

### Issue: API connection errors
- Verify `VITE_API_BASE_URL` is set correctly in `.env` file
- Check if the backend API server is running
- Verify CORS settings on the backend if accessing from different origin
- Check browser console for detailed error messages

### Issue: Login not working
- Ensure cookies are enabled in browser
- Check browser console for errors

## 📄 License

This project is provided as-is for demonstration purposes.

## 👤 Author

Built as a comprehensive employee management solution.

---

**Note**: This application uses mock authentication and localStorage for data persistence. For production use, integrate with a proper backend API and authentication system.
