# Finance Tracker

A comprehensive Personal Finance and Portfolio Tracker application designed to help users manage their finances, track expenses, and monitor their investment portfolios.

## Project Structure

The project is organized into the following main directories:

- **`backend/`**: Contains the Spring Boot backend application (Java 21).
    - REST APIs, Security, Business Logic.
- **`frontend/`**: Contains the React frontend application (Vite + TypeScript).
    - User Interface, State Management, API Integration.
- **`database/`**: Database related files (Docker build context for Postgres).
- **`liquibase/`**: Database migrations and changelogs.
- **`environment/`**: Environment variable configurations for Docker.
- **`docker-compose.yml`**: Docker Compose configuration for running the full stack (Database, Liquibase, Backend).

## Prerequisites

Before running the project, ensure you have the following installed:

- **Java Development Kit (JDK) 21**
- **Maven** (for backend)
- **Node.js** (v18 or higher) & **npm** (for frontend)
- **Docker** & **Docker Compose** (for database and containerized execution)

## Setup & Running

### 1. Database Setup

The easiest way to set up the database is using Docker Compose.

```bash
# Start the PostgreSQL database and run Liquibase migrations
docker-compose up -d postgres liquibase
```

> **Note**: The database runs on port `5433` on your host machine to avoid conflicts with local default Postgres installations.  
> **Credentials**: `postgres` / `postgres`  
> **Database Name**: `finance_tracker`

### 2. Backend Setup (Spring Boot)

Navigate to the `backend` directory:

```bash
cd backend
```

Build the application:

```bash
mvn clean install
```

Run the application:

```bash
mvn spring-boot:run
```

The backend server will start at `http://localhost:8080`.

### 3. Frontend Setup (React + Vite)

Navigate to the `frontend` directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The frontend application will start (usually at `http://localhost:5173`).

### 4. Running with Docker Compose (Full Stack)

To run the entire application stack (Database + Backend) using Docker:

```bash
docker-compose up -d
# or to force rebuild
docker-compose up -d --build
```
*Note: The frontend is currently set up for local development and is not included in the main docker-compose services list for production-like deployment yet, but can be easily added.*

## Development Notes

- **API Documentation**: Swagger/OpenAPI UI is available at `http://localhost:8080/swagger-ui.html`.
- **Linting**:
    - Frontend: `npm run lint`
- **Testing**:
    - Backend: `mvn test`
