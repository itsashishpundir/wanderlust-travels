# Wanderlust Backend

This is the backend API for the Wanderlust Travels application, built with Node.js, Express, and Prisma.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (or your preferred database supported by Prisma)

## Setup & Installation

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Configuration**
    Create a `.env` file in the root directory (`Wanderlust-backend/.env`) with the following variables:

    ```env
    PORT=5000
    # Update the database URL with your credentials
    DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/wanderlust_db?schema=public"
    JWT_SECRET="your_super_secret_jwt_key"
    
    # Optional: Email configuration for notifications
    EMAIL_USER="your_email@example.com"
    EMAIL_PASS="your_email_password"
    ```

3.  **Database Setup**
    Initialize the database schema and generate the Prisma client:

    ```bash
    # Generate Prisma Client
    npx prisma generate

    # Push schema to database (for development)
    npx prisma db push
    
    # OR run migrations (for production-like flows)
    # npx prisma migrate dev --name init
    ```

    *(Optional) Seed the database:*
    ```bash
    npx prisma db seed
    ```

## Running the Server

### Development Mode
Runs the server with `nodemon` for hot-reloading.
```bash
npm run dev
```
The server will start at `http://localhost:5000`.

### Production Mode
Builds the TypeScript code and runs the compiled JavaScript.
```bash
npm run build
npm start
```

## API Endpoints
The API is served at `/api`. Key routes include:
- `/api/auth` - Authentication
- `/api/packages` - Travel Packages
- `/api/hotels` - Hotels
- `/api/bookings` - Bookings
- `/api/upload` - File Uploads
