# Momentum AI - Product Landing Site

## Overview

Momentum AI is an AI-powered study assistant application. This repository contains the marketing/landing website and authentication backend for the product. The main application is a React-based single-page application with an Express.js backend that handles user authentication, email verification, and session management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 19 with TypeScript, bootstrapped with Create React App
- **Styling**: Tailwind CSS with custom configuration for Apple-inspired design
- **Routing**: React Router DOM for client-side navigation
- **Smooth Scrolling**: Lenis library for premium scroll experience
- **Pages**: Home (landing), Team, Careers, Events, Beta Signup, Login, and Signup

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript (executed via tsx)
- **API Design**: REST endpoints prefixed with `/api/`
- **Static Serving**: Express serves the React build folder, with all non-API routes falling back to index.html for SPA routing

### Authentication System
- **Strategy**: Passport.js with Local Strategy (email/password)
- **Sessions**: Express-session with PostgreSQL session store (connect-pg-simple)
- **Password Hashing**: bcrypt
- **Email Verification**: Token-based verification flow with Resend for transactional emails
- **Password Reset**: Token-based reset with expiration

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with node-postgres driver
- **Schema**: Single `users` table with fields for email, password, name, verification tokens, and reset tokens
- **Session Storage**: PostgreSQL-backed session store

### Email Services
- **Primary**: Resend API for transactional emails (verification, welcome, password reset)
- **Beta Signups**: EmailJS for client-side email notifications (separate from auth flow)
- **Resend Integration**: Uses Replit's connector system to fetch API credentials dynamically

### Development Setup
- Frontend runs on port 3000 (Create React App dev server)
- Backend runs on port 5000
- Frontend proxies `/api` requests to backend via CRA proxy configuration
- Concurrent development using `concurrently` package

## External Dependencies

### Third-Party Services
- **Resend**: Email delivery for authentication flows (verification, password reset, welcome emails)
- **EmailJS**: Client-side email service for beta signup notifications
- **PostgreSQL**: Primary database (requires DATABASE_URL environment variable)

### Key Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret for session encryption (auto-generated if not provided)
- `REPLIT_DEV_DOMAIN`: Used to construct verification URLs in development
- Resend credentials fetched via Replit connectors API

### Notable NPM Packages
- `drizzle-orm` + `drizzle-kit`: Database ORM and migrations
- `passport` + `passport-local`: Authentication
- `express-session` + `connect-pg-simple`: Session management
- `bcrypt`: Password hashing
- `resend`: Email API client
- `@emailjs/browser`: Client-side email service
- `lenis`: Smooth scrolling library