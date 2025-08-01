<!-- @format -->

# Ride Booking System APIs

A secure, role-based, and scalable backend API for a Ride Booking Platform — similar to Uber or Pathao — built using **TypeScript**, **Express.js**, **MongoDB/Mongoose**, and **JWT Authentication**.

---

## Features

- JWT-based Authentication (Rider, Driver, Admin)
- Role-Based Authorization
- Rider Functionality: Request, Cancel Ride, View Ride History - Get route(/api/rides/me)
- Driver Functionality: Accept Ride, Update Ride Status, View Earnings
- Admin Functionality: Manage Users, Approve Driver, View All Rides
- Modular Project Architecture
- Full Postman Collection Included

---

---

## Tech Stack

- **Backend Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + bcryptjs
- **Validation:** Zod / Express Validator
- **Testing:** Postman (Collection Provided)

---

## Folder Structure

src/
├── modules/
│ ├── auth/
│ ├── user/
│ ├── ride/
├── middlewares/
├── config/
├── utils/
├── app.ts
├── server.ts

---

## API Endpoints

### 1. Auth

- **Method POST:** /api/auth/register **Description:** Register rider/driver default: rider
- **Method POST:** /api/auth/login **Description:** Login & get JWT token

### 2. Rider

- **Method POST:** /api/rides/request **Description:** Request a ride
- **Method PATCH:** /api/rides/:id/cancel **Description:** Cancel a ride
- **Method GET:** /api/rides/me **Description:** View rider's ride history

### 3. Driver

- **Method PATCH:** /api/rides/:id/accept **Description:** Accept a ride
- **Method PATCH:** /api/rides/:id/status **Description:** Update ride status
- **Method GET:** /api/rides/earnings **Description:** View total earnings history

### 4. Admin

- **Method GET:** /api/users **Description:** View all users
- **Method PATCH:** /api/drivers/:id/approve **Description:** Approve a driver
- **Method GET:** /api/rides **Description:** View all rides in the system

## Ride Lifecycle

- **requested** → (accepted by driver) → **accepted**
- **accepted** → pickedup → inTransit → **completed**
- **requested** → (cancelled by rider) → **cancelled**
- **Each transition logs a timestamp:**
  requestedAt, acceptedAt, pickedUpAt, inTransitAt, completedAt, cancelledAt

## Role-Based Protection

- **Riders:** /api/rides/request, /cancel, /me

- **Drivers:** /accept, /status, /earnings

- **Admins:** /users, /approve, /rides
- **All protected by JWT and middleware checkAuth(role).**

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/helal9380/Ride-booking-APIs.git
cd Ride-booking-APIs
npm install
```

## configure .env

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

## Run Locally

npm run dev

## Author

- **Asadur Rahman**
  Frontend Developer
  Thank you
