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

- **Method post:** /api/auth/register
- **Method post:** /api/auth/login

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
