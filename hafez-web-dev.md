# Healthcare Directory System

## Overview

This is a bilingual (Arabic/English) healthcare directory web application for Al-Beheira Governorate, Egypt. The system provides comprehensive information about healthcare facilities including hospitals, health units, dialysis centers, and emergency services. Built with a modern full-stack architecture using React for the frontend and Express.js for the backend, with PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom Arabic font (Cairo)
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **Internationalization**: Custom i18n implementation supporting Arabic/English with RTL/LTR switching
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful API endpoints for CRUD operations
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Schema Validation**: Zod for runtime type checking and validation
- **Development**: Hot reload with Vite middleware integration

### Data Storage Solutions
- **Primary Database**: PostgreSQL configured for production
- **ORM**: Drizzle with schema-first approach
- **Development Storage**: In-memory storage implementation for rapid development
- **Migrations**: Drizzle Kit for database schema management

### Database Schema Design
The system uses four main entities:
- **Hospitals**: Comprehensive hospital information with multilingual support
- **Health Units**: Primary care facilities and preventive services
- **Dialysis Centers**: Specialized kidney treatment facilities
- **Emergency Services**: 24/7 emergency and ambulance services

Each entity includes:
- Bilingual fields (Arabic/English)
- Contact information and working hours
- Location data (address, coordinates)
- Service catalogs
- Capacity information where applicable

### Authentication and Authorization
Currently implements a simple session-based approach with:
- Basic session management
- No complex user roles (public directory)
- Future-ready for admin authentication implementation

### UI/UX Architecture
- **Design System**: Consistent component library using Shadcn/ui
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Semantic HTML with proper ARIA labels
- **Performance**: Lazy loading for page components and image optimization
- **Loading States**: Comprehensive loading and error state handling

### Development Environment
- **Containerization**: Ready for Docker deployment
- **Development Tools**: ESLint, TypeScript, and Vite dev server
- **Hot Reload**: Full-stack hot reload for rapid development
- **Environment Configuration**: Environment-based configuration management

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router

### UI and Styling Dependencies
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Modern icon library

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type safety and developer experience
- **eslint**: Code linting and quality assurance
- **drizzle-kit**: Database migration and introspection tools

### External Services Integration
- **Google Fonts**: Cairo font family for Arabic typography
- **Replit**: Development environment integration
- **Environment Variables**: Database URL and configuration management

### Database Configuration
- **PostgreSQL**: Production database with Drizzle ORM
- **Connection Pooling**: Configured through Neon serverless
- **Schema Management**: Version-controlled migrations with Drizzle Kit
- **Type Safety**: Full TypeScript integration from database to frontend