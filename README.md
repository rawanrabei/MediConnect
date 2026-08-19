# MediConnect — Healthcare Appointment Platform

A fully functional, production-ready React frontend application for browsing doctors, booking medical appointments, and managing healthcare workflows across three user roles: **Patient**, **Doctor**, and **Admin**.

Built as a capstone project demonstrating modern React architecture, REST API integration, and responsive UI design.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-purple?logo=redux)
![Vite](https://img.shields.io/badge/Vite-8-yellow?logo=vite)
![Axios](https://img.shields.io/badge/Axios-REST_API-green)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Demo Accounts](#demo-accounts)
- [Scripts](#scripts)
- [Screenshots](#screenshots)

---

## Features

### Patient Portal
- Browse and search doctors by name, specialty, location, rating, and fees
- View detailed doctor profiles with reviews and availability slots
- Book appointments with a step-by-step booking flow
- Manage upcoming, past, and cancelled appointments
- Save favorite doctors for quick access
- Receive real-time notifications on booking confirmations and cancellations
- View appointment statistics with interactive charts

### Doctor Portal
- Dashboard with today's appointments, stats, and recent patients
- Accept, complete, or cancel appointments
- Manage availability schedule
- View patient details and appointment history
- Notification center for new bookings and updates

### Admin Panel
- Platform-wide analytics and statistics
- Manage all doctors (approve, suspend)
- Monitor all appointments across the platform
- User management with role-based views
- Specialty distribution and appointment trend charts

### General
- Dark / Light theme toggle
- Fully responsive design (mobile, tablet, desktop)
- Authentication flow with role-based routing and protected routes
- Loading and error states on all API calls
- Client-side form validation

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| State Management | Redux Toolkit |
| Routing | React Router v7 |
| HTTP Client | Axios |
| Forms | React Hook Form |
| Charts | Recharts |
| Icons | Lucide React |
| Mock API | JSON Server |
| Styling | Custom CSS with CSS Variables |

---

## Project Structure

```
medi-connect/
├── api/                          # Mock REST API
│   ├── server.js                 # JSON Server with custom auth routes
│   ├── generate-db.mjs           # Script to generate db.json from seed data
│   └── db.json                   # Generated database (gitignored)
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── admin/                # Admin dashboard components
│   │   ├── appointment/          # Booking & appointment components
│   │   ├── common/               # Shared components (Modal, Loader, etc.)
│   │   ├── doctor/               # Doctor card, filters, reviews
│   │   ├── doctorDashboard/      # Doctor portal components
│   │   ├── home/                 # Landing page sections
│   │   ├── layout/               # Navbar, Sidebar, Footer
│   │   └── patient/              # Patient dashboard components
│   ├── data/                     # Seed data and mock datasets
│   ├── features/                 # Redux slices, selectors, and thunks
│   │   ├── admin/
│   │   ├── appointments/
│   │   ├── auth/
│   │   ├── doctors/
│   │   ├── notifications/
│   │   └── ui/
│   ├── hooks/                    # Custom React hooks
│   ├── pages/                    # Route-level page components
│   │   ├── Admin/
│   │   ├── Auth/
│   │   ├── Booking/
│   │   ├── Doctor/
│   │   ├── Doctors/
│   │   ├── Home/
│   │   └── Patient/
│   ├── routes/                   # App routing and protected routes
│   ├── services/                 # Axios service layer
│   ├── store/                    # Redux store configuration
│   └── utils/                    # Utility functions
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ installed
- **npm** 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/mediconnect.git
cd mediconnect

# Install dependencies
npm install

# Generate the API database
npm run api:generate
```

### Running the Application

**Option 1 — Run both API and frontend together:**

```bash
npm run dev:all
```

**Option 2 — Run separately (two terminals):**

```bash
# Terminal 1: Start the API server (port 3001)
npm run api

# Terminal 2: Start the React dev server (port 5173)
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## API Endpoints

Base URL: `http://localhost:3001`

### Authentication (Custom Routes)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Login with email, password, and role |
| POST | `/auth/register` | Register a new account |

### Doctors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/doctors` | List all doctors |
| GET | `/doctors/:id` | Get doctor by ID |
| PATCH | `/doctors/:id` | Update doctor profile |

### Appointments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/appointments` | List all appointments |
| GET | `/appointments/:id` | Get appointment by ID |
| POST | `/appointments` | Book a new appointment |
| PATCH | `/appointments/:id` | Update appointment status |

### Notifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notifications` | List all notifications |
| POST | `/notifications` | Create a notification |
| PATCH | `/notifications/:id` | Mark notification as read |

---

## Demo Accounts

After starting the API, you can log in with the following credentials:

| Role | Email | Password |
|------|-------|----------|
| Patient | `jane.doe@example.com` | `password` |
| Doctor | `doctor@mediconnect.com` | `password` |
| Admin | `admin@mediconnect.com` | `password` |

> Make sure to select the matching **Role** from the dropdown on the login page.

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run api:generate` | Generate `api/db.json` from seed data |
| `npm run api` | Start JSON Server on port 3001 |
| `npm run dev:all` | Generate DB + run API and frontend concurrently |
| `npm run lint` | Run ESLint |

---

## Screenshots

> Add screenshots of your application here after deployment.

---

## License

This project is built as a capstone project for the **eYouth React Frontend Development** program.
