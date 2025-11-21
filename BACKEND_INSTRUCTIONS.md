# Backend Development Instructions for Wanderlust Travels

**Goal:** Build a robust, production-ready backend API for the "Wanderlust Travels" application.

## 1. Technology Stack
- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Tokens) with `bcrypt` for password hashing
- **Validation:** Zod (recommended) or Joi

## 2. Project Initialization
1.  Initialize a new Node.js project: `npm init -y`
2.  Install core dependencies:
    ```bash
    npm install express cors dotenv prisma @prisma/client bcrypt jsonwebtoken zod
    ```
3.  Install dev dependencies:
    ```bash
    npm install -D typescript ts-node @types/node @types/express @types/cors @types/bcrypt @types/jsonwebtoken nodemon
    ```
4.  Initialize TypeScript: `npx tsc --init`
5.  Initialize Prisma: `npx prisma init`

## 3. Database Schema (`schema.prisma`)
Define the following models to match the frontend's data structure:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  USER
  ADMIN
}

enum ServiceType {
  PACKAGE
  HOTEL
  TAXI
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CANCELLED
  COMPLETED
}

enum PaymentStatus {
  PAID
  UNPAID
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  bookings  Booking[]
}

model Package {
  id            String   @id @default(uuid())
  title         String
  location      String
  price         Float
  durationDays  Int
  image         String
  description   String
  category      String
  rating        Float    @default(0)
  reviewsCount  Int      @default(0)
  itinerary     String[] // Store as array of strings
  createdAt     DateTime @default(now())
}

model Hotel {
  id            String   @id @default(uuid())
  name          String
  location      String
  pricePerNight Float
  rating        Float    @default(0)
  image         String
  amenities     String[]
  description   String?
  createdAt     DateTime @default(now())
}

model Taxi {
  id          String   @id @default(uuid())
  name        String
  type        String   // Sedan, SUV, Traveler
  pricePerKm  Float
  baseFare    Float
  capacity    Int
  image       String
  features    String[]
  createdAt   DateTime @default(now())
}

model Booking {
  id            String        @id @default(uuid())
  userId        String
  user          User          @relation(fields: [userId], references: [id])
  serviceType   ServiceType
  serviceId     String        // ID of the Package, Hotel, or Taxi
  serviceName   String        // Snapshot of the service name at booking time
  date          DateTime
  status        BookingStatus @default(PENDING)
  amount        Float
  paymentStatus PaymentStatus @default(UNPAID)
  createdAt     DateTime      @default(now())
}

model BlogPost {
  id        String   @id @default(uuid())
  title     String
  excerpt   String
  content   String
  author    String
  category  String
  image     String
  createdAt DateTime @default(now())
}
```

## 4. API Endpoints Specification

### Authentication (`/api/auth`)
- `POST /signup`: Register a new user.
- `POST /login`: Authenticate and return a JWT.
- `GET /me`: Get current user profile (Protected).

### Packages (`/api/packages`)
- `GET /`: List all packages (Support filtering by category/location).
- `GET /:id`: Get package details.
- `POST /`: Create a new package (Admin only).
- `PUT /:id`: Update a package (Admin only).
- `DELETE /:id`: Delete a package (Admin only).

### Hotels (`/api/hotels`) & Taxis (`/api/taxis`)
- Implement standard CRUD operations similar to Packages.

### Bookings (`/api/bookings`)
- `POST /`: Create a new booking (Protected).
- `GET /my-bookings`: Get bookings for the logged-in user.
- `GET /admin/all`: Get all bookings (Admin only).
- `PATCH /:id/status`: Update booking status (Admin only).

## 5. Implementation Steps for the AI Agent
1.  **Setup**: Create the project structure (`src/app.ts`, `src/routes`, `src/controllers`, `src/middleware`).
2.  **Database**: Set up the Prisma schema and run migrations.
3.  **Auth**: Implement the JWT authentication middleware and auth routes.
4.  **CRUD**: Implement the controllers and routes for Packages, Hotels, and Taxis.
5.  **Bookings**: Implement the booking logic, ensuring users can only see their own bookings unless they are admins.
6.  **Seeding**: Create a `prisma/seed.ts` script to populate the DB with the mock data currently used in the frontend (`constants.ts`).

## 6. Environment Variables (`.env`)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/wanderlust_db?schema=public"
JWT_SECRET="your_super_secret_key_change_this"
PORT=5000
```
