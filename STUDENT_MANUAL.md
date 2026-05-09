# DiaCare Student Manual

This manual explains the DiaCare project in simple terms so students can understand what it does, how it is organized, and how to run it.

## What DiaCare Is

DiaCare is a diabetes care management system. It helps different users manage health information in one place.

### Main User Roles

- Patient: records glucose readings, books appointments, and views prescriptions or meal plans
- Doctor: reviews patient data and manages care
- Admin: manages users, reports, and system records

## Main Features

- user registration and login
- secure access using JWT authentication
- glucose reading tracking
- appointment management
- prescription management
- meal plan viewing
- notifications
- dashboards for each user role

## Project Structure

The project has two major parts:

- `DiaCare`: Spring Boot backend
- `DiaCareFrontend`: React frontend

The backend provides the API and connects to the database. The frontend displays the screens and sends requests to the backend.

## Prototype Summary

The prototype is the first working version of the system. It was built to test the most important features before finishing the full application.

It shows that:

- users can log in securely
- data can be saved and read from the database
- different roles can access different features
- the frontend and backend can work together

## Design Pattern Used

The project mainly uses the `Repository Pattern`.

This means:

- controllers handle requests
- services hold business logic
- repositories access the database

This keeps the code clean and easier to maintain.

## Software Best Practices Used

- code is organized into layers
- sensitive values are loaded from environment variables
- validation is used for input data
- errors are handled consistently
- API calls are centralized in one client file
- the frontend is built as reusable components

## How To Run The Project With Docker

### Requirements

- Docker
- Docker Compose

### Start the application

From the project root, run:

```bash
docker compose up --build
```

### Open the application

- Frontend: `http://localhost:5173`
- Backend Swagger UI: `http://localhost:8085/swagger-ui.html`

### Stop the application

```bash
docker compose down
```

## How Version Control Works Here

Version control is used to save project changes and prevent code loss. For this project, the important items to track are:

- source code
- database scripts
- Docker files
- documentation
- configuration files

Generated files like `node_modules` and `target` should not be tracked.

## Test Plan Summary

The software test plan checks whether the system works correctly before submission.

### What should be tested

- login and registration
- secured API access
- patient, doctor, and admin workflows
- glucose logging
- appointments
- prescriptions and meal plans
- notifications
- Docker deployment

### Example test steps

1. Start the system with Docker Compose.
2. Register or log in a user.
3. Open protected screens.
4. Add and view health data.
5. Confirm the correct data is returned.

### Expected result

The system should run without errors, protect restricted pages, and save/retrieve data correctly.

## Quick Student Checklist

- Read the prototype section first.
- Learn the repository pattern used in the backend.
- Review the Docker setup and run the project.
- Use the test plan to verify the application.
- Include both documents in your submission.
