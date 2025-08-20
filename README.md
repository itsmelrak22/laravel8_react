# Laravel + ReactJS User Roles Application

This is a full-stack application built with Laravel 8 and ReactJS that allows managing users with multiple roles.

## Features

- Add new users with full name, email, and multiple roles
- View users organized by their roles
- Form validation with error handling
- Responsive design with Tailwind CSS
- RESTful API endpoints

## Installation & Setup

### Prerequisites

- PHP 8.0 or higher
- Composer
- Node.js 16 or higher
- MySQL database

### Backend Setup (Laravel)

1. Clone the repository and navigate to the project directory:
```bash
cd laravel8-react
```

2. Install PHP dependencies:
```bash
composer install
```

3. Copy the environment file and configure your database:
```bash
cp .env.example .env
```

4. Update your `.env` file with your database credentials:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

5. Generate application key:
```bash
php artisan key:generate
```

6. Run database migrations and seeders:
```bash
php artisan migrate --seed
```

### Frontend Setup (ReactJS)

1. Install Node.js dependencies:
```bash
npm install
```

2. Install Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
```

### Running the Application

1. Start the Laravel development server:
```bash
php artisan serve
```

2. In a separate terminal, start the Vite development server for assets:
```bash
npm run dev
```

3. Visit `http://localhost:8000` in your browser

## API Endpoints

- `GET /api/roles` - Fetch all available roles
- `POST /api/users` - Create a new user with roles
- `GET /api/users` - Fetch all users grouped by roles

## Available Roles

- Author
- Editor
- Subscriber
- Administrator

## Technology Stack

- **Backend**: Laravel 8, PHP
- **Frontend**: ReactJS 18, React Router DOM
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Database**: MySQL

## Project Structure

```
├── app/
│   ├── Http/Controllers/UserController.php
│   └── Models/
│       ├── User.php
│       └── Role.php
├── database/
│   ├── migrations/
│   └── seeders/RoleSeeder.php
├── resources/
│   ├── js/
│   │   ├── components/
│   │   │   ├── UserForm.jsx
│   │   │   └── UserList.jsx
│   │   ├── MainApp.jsx
│   │   └── app.jsx
│   └── views/welcome.blade.php
└── routes/api.php
```

## Application Screenshots

### User Management Interface
- Clean and modern user interface with Tailwind CSS styling
- Responsive design that works on desktop and mobile devices
- Interactive forms with real-time validation feedback

### User List by Roles
- Users are organized and displayed by their assigned roles
- Each role section shows the count of assigned users
- Individual user cards display name, email, and status

## API Documentation

### Authentication
Currently, the application doesn't require authentication.
### API Endpoints Details

#### Get All Roles
```http
GET /api/roles
```
**Response:**
```json
[
    {
        "id": 1,
        "name": "Administrator",
        "description": "Full system access and user management" 
    },
    {
        "id": 2,
        "name": "Editor",
        "description": "Can edit and manage content"
    }
]
```

#### Get Users Grouped by Roles
```http
GET /api/users
```
**Response:**
```json
[
    {
        "id": 1,
        "name": "Administrator",
        "description": "Full system access and user management",
        "users": [
            {
                "id": 1,
                "name": "John Doe",
                "email": "john@example.com",
                "created_at": "2025-08-20T10:00:00.000000Z"
            }
        ]
    }
]
```

#### Create New User
```http
POST /api/users
Content-Type: application/json
```
**Request Body:**
```json
{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "roles": [1, 2]
}
```
**Response:**
```json
{
    "message": "User created successfully",
    "user": {
        "id": 2,
        "name": "Jane Smith",
        "email": "jane@example.com",
        "roles": [
            {
                "id": 1,
                "name": "Administrator"
            },
            {
                "id": 2,
                "name": "Editor"
            }
        ]
    }
}
```

## Database Schema

### Users Table
- `id` - Primary key
- `name` - User's full name
- `email` - Unique email address
- `email_verified_at` - Email verification timestamp
- `password` - Hashed password (for future authentication)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Roles Table
- `id` - Primary key
- `name` - Role name (unique)
- `description` - Role description
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Role_User Pivot Table
- `role_id` - Foreign key to roles table
- `user_id` - Foreign key to users table
- `created_at` - Assignment timestamp
- `updated_at` - Last update timestamp

## Validation Rules

### User Creation
- **Name**: Required, string, max 255 characters
- **Email**: Required, valid email format, unique in database
- **Roles**: Required, must be an array, each role must exist in database

### Role Assignment
- Users can have multiple roles
- At least one role must be assigned to each user
- Role IDs must exist in the roles table

## Troubleshooting

### Common Issues

#### Database Connection Errors
- Ensure your database server is running
- Verify database credentials in `.env` file
- Check if the database exists

#### Asset Compilation Issues
```bash
# Clear and rebuild assets
npm run build
# or for development
npm run dev
```

#### Laravel Cache Issues
```bash
# Clear application cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

#### Permission Issues (Linux/Mac)
```bash
# Set proper permissions for storage and cache
chmod -R 775 storage bootstrap/cache
```

## Development

### Adding New Features
1. **Backend**: Add new routes in `routes/api.php`
2. **Controllers**: Create or modify controllers in `app/Http/Controllers/`
3. **Models**: Define relationships in models under `app/Models/`
4. **Frontend**: Add new components in `resources/js/components/`


### Testing
```bash
# Run PHP tests
php artisan test

# Run JavaScript tests (if configured)
npm test
```


### features
- Initial release with user and role management
- React frontend with Tailwind CSS
- Laravel 8 backend with RESTful API
- Database migrations and seeders



