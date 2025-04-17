# 🏍️ Bike Servicing Management System API

A comprehensive backend API for bike service centers to efficiently manage customers, bikes, and service records. This RESTful API enables complete management of the bike servicing workflow including customer management, bike registration, and service tracking.

## 🌐 Live Demo

API Endpoint: [https://bike-service-server-psi.vercel.app](https://bike-service-server-psi.vercel.app/)

## 🛠️ Tech Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Hosting**: Render

## ✨ Key Features

- **Customer Management**: Full CRUD operations for customer records
- **Bike Management**: Track bikes with owner relationships
- **Service Record Management**: Document service history for each bike
- **Service Status Tracking**: Monitor pending, in-progress, and completed services
- **Overdue Service Detection**: Automatically identify services older than 7 days
- **Comprehensive Error Handling**: Standardized error responses with appropriate HTTP status codes

## 🚀 Getting Started

### Prerequisites

- Node.js v16+ installed
- PostgreSQL database
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shihab-2021/Bike-Servicing-Management-Server.git
   cd Bike-Servicing-Management-Server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following variables:

   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/bike_service_db"
   PORT=5000
   NODE_ENV=development
   ```

4. Set up the database:

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 📌 API Endpoints

### Customer Management

- `POST /api/customers` - Create a new customer
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `PUT /api/customers/:id` - Update customer details
- `DELETE /api/customers/:id` - Delete a customer

### Bike Management

- `POST /api/bikes` - Add a new bike
- `GET /api/bikes` - Get all bikes
- `GET /api/bikes/:id` - Get bike by ID

### Service Management

- `POST /api/services` - Create a new service record
- `GET /api/services` - Get all service records
- `GET /api/services/:id` - Get service record by ID
- `PUT /api/services/:id/complete` - Mark service as completed
- `GET /api/services/status` - Get pending or overdue services (older than 7 days)

## Contact 📧

For any questions or feedback, feel free to reach out:

- **Email**: shihab77023@gmail.com
- **GitHub**: [shihab-2021](https://github.com/shihab-2021)

---

## Happy coding! 🚀
