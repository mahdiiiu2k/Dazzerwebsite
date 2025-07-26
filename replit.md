# DS Design Portfolio Website

## Overview

This is a modern luxury portfolio website for DS Design, a web design agency that delivers websites in 24 hours. The application is built as a full-stack web application with a React frontend and Express backend, featuring glassmorphism design elements and a dark purple theme.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server:

- **Frontend**: React with TypeScript using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI components via shadcn/ui
- **State Management**: TanStack React Query for server state
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **Component Library**: Built on Radix UI primitives with shadcn/ui styling
- **Styling System**: Tailwind CSS with custom CSS variables for consistent theming
- **Theme**: Dark purple gradient design with glassmorphism effects
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: CSS-based animations and transitions

### Backend Architecture
- **API Structure**: RESTful endpoints for contact and referral form submissions
- **Database Layer**: Drizzle ORM with PostgreSQL for data persistence
- **Storage**: In-memory storage implementation with interface for easy database swapping
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Request Logging**: Custom middleware for API request logging

### Database Schema
- **Users Table**: Basic user management (id, username, password)
- **Contacts Table**: Contact form submissions (id, name, email, message, createdAt)
- **Referrals Table**: Referral program submissions (id, referrerName, referrerEmail, referralInfo, createdAt)

## Data Flow

1. **Contact Form Submission**: Client submits form → Validation with Zod → API endpoint → Database storage → Success response
2. **Referral Form Submission**: Similar flow to contact form with different schema
3. **Static Content**: All marketing content is rendered client-side with smooth scrolling navigation
4. **Form Validation**: Client-side validation with React Hook Form, server-side validation with Zod schemas

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon database connection (configured for PostgreSQL)
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database ORM
- **react-hook-form**: Form state management and validation
- **zod**: Schema validation for both client and server
- **wouter**: Lightweight client-side routing

### UI Dependencies
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant styling
- **lucide-react**: Icon library

### Development Dependencies
- **vite**: Fast build tool and dev server
- **typescript**: Type safety across the application
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

The application is configured for deployment with the following structure:

- **Development**: Vite dev server with HMR for frontend, tsx for backend development
- **Build Process**: 
  - Frontend: Vite builds to `dist/public`
  - Backend: esbuild bundles server code to `dist/index.js`
- **Production**: Node.js server serves built frontend and API endpoints
- **Database**: PostgreSQL via Neon Database (configured in drizzle.config.ts)
- **Environment Variables**: `DATABASE_URL` required for database connection

### Key Features
- **24-hour delivery promise**: Core business proposition
- **Glassmorphism design**: Modern luxury aesthetic with purple gradient theme
- **Referral program**: 40% commission system with dedicated form
- **Portfolio showcase**: Work examples with hover effects
- **Contact system**: Lead capture with form validation
- **Mobile optimization**: Responsive design with mobile-first approach
- **SEO ready**: Semantic HTML structure and meta tag support

The application is designed to be easily deployable on platforms like Replit, with all necessary configuration files present for immediate deployment.