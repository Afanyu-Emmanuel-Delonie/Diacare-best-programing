# DiaCare Project Documentation

This document summarizes the Dockerization process, the version control setup, and a software test plan for the DiaCare application.

## PHASE 2. Software Development Prototype

The DiaCare prototype is an early working version of a diabetes care management system built to validate the main idea before full deployment. The prototype focuses on the core workflows that matter most:

- user registration and login
- role-based access for patient, doctor, and admin users
- glucose reading tracking
- appointments
- prescriptions and meal plans
- notifications
- dashboards and reports

### Prototype Purpose

The purpose of the prototype is to prove that the application architecture works and that the major features can be used together in one system. It helps detect design problems early, especially around authentication, database structure, and API integration.

### Prototype Structure

The prototype is divided into two main parts:

- Backend: Spring Boot REST API in `DiaCare`
- Frontend: React/Vite user interface in `DiaCareFrontend`

The backend handles business rules, validation, security, persistence, and API endpoints. The frontend provides the screens the user interacts with.

### Programming Best Practices Followed

The implementation follows common Java and React best practices:

- separation of concerns between controller, service, repository, and model layers
- reusable DTOs for request and response payloads
- validation on incoming data
- JWT-based authentication for secured endpoints
- centralized exception handling for consistent API errors
- environment-based configuration instead of hardcoding secrets
- component-based frontend design
- API communication through a single axios client

### Design Pattern Used

The main design pattern used in the project is the `Repository Pattern`.

This pattern appears throughout the backend through interfaces such as:

- `UserRepository`
- `PatientRepository`
- `DoctorRepository`
- `AppointmentRepository`
- `PrescriptionRepository`
- `MealPlanRepository`
- `NotificationRepository`
- `HealthMetricsRepository`
- `GlucoseReadingRepository`

#### How the pattern is used

- Controllers call services.
- Services call repositories.
- Repositories handle database access through Spring Data JPA.

This keeps database logic separate from business logic and makes the application easier to maintain and test.

### Why This Prototype Is Useful

- It proves the system can support the intended users and features.
- It reduces risk before full-scale deployment.
- It gives a solid foundation for testing, Dockerization, and future improvement.

## 1. Brief Process To Dockerize An Application

Dockerizing an application means packaging the application code, runtime, and dependencies into containers so the application runs the same way in different environments.

The general process is:

1. Identify the application components.
   - DiaCare has a Spring Boot backend and a React/Vite frontend.
   - The backend also depends on PostgreSQL.

2. Create container instructions.
   - Write a `Dockerfile` for each service.
   - Use a multi-stage build for smaller production images.

3. Provide environment configuration.
   - Pass database, JWT, and mail settings as environment variables.
   - Build the frontend with the correct API base URL.

4. Orchestrate the services.
   - Use `docker-compose.yml` to start PostgreSQL, the backend, and the frontend together.

5. Test the containers.
   - Build the images.
   - Start the stack.
   - Confirm the frontend, backend API, and database are reachable.

### Dockerization Applied To DiaCare

The repository now includes:

- `DiaCare/Dockerfile` for the Spring Boot backend.
- `DiaCareFrontend/Dockerfile` for the React frontend.
- `DiaCareFrontend/nginx.conf` to serve the built frontend on port `5173`.
- `docker-compose.yml` at the project root to run the complete stack.

#### Runtime layout

- Backend: `http://localhost:8085`
- Frontend: `http://localhost:5173`
- PostgreSQL: `localhost:5432`

#### How to run

```bash
docker compose up --build
```

After startup:

- Open the frontend at `http://localhost:5173`
- Swagger UI is available at `http://localhost:8085/swagger-ui.html`

## 2. Version Control System Setup

This project is managed with Git, which is a distributed version control system. Git keeps track of code changes, makes collaboration easier, and allows the project to be restored to earlier versions when needed.

### SVN Alternative

If SVN is required instead of Git, the same project files should be added to an SVN working copy and committed to a central repository. The important files to capture are still the same:

- backend source code
- frontend source code
- build files
- Docker files
- documentation
- SQL scripts

### What should be captured in version control

The following parts of the application should be tracked:

- Backend source code under `DiaCare/src`
- Frontend source code under `DiaCareFrontend/src`
- Build configuration files such as `pom.xml` and `package.json`
- Docker files and compose files
- Documentation and SQL scripts

### What should not be tracked

Large generated or machine-specific files should be ignored, including:

- `target/`
- `node_modules/`
- local environment files such as `.env`
- IDE metadata and log files

### Practical Git workflow

1. Initialize the repository.
2. Add the project files.
3. Create a clear `.gitignore`.
4. Commit the backend, frontend, Docker, and documentation changes.
5. Push the repository to a remote server such as GitHub or GitLab.
6. Continue working with feature branches for future improvements.

If your lecturer specifically expects SVN terminology, the same idea still applies: source files, configuration, and documentation are versioned, while generated files are excluded.

## 3. Software Test Plan

### 3.1 Test Plan Objective

The purpose of the test plan is to verify that DiaCare behaves correctly across authentication, patient management, doctor workflows, glucose tracking, appointments, prescriptions, notifications, and deployment in Docker containers.

### 3.2 Test Items

- User authentication and authorization
- Patient registration and profile updates
- Doctor, admin, and patient dashboard functions
- Glucose reading capture and trend viewing
- Appointment booking, rescheduling, and cancellation
- Prescription and meal-plan retrieval
- Notification creation and retrieval
- Docker deployment and service startup

### 3.3 Test Strategy

The system should be tested at three levels:

1. Unit testing
   - Validate individual service methods and utility classes.
   - Use JUnit and Mockito where needed.

2. Integration testing
   - Verify controller-to-database flows.
   - Confirm secured endpoints respect roles and JWT authentication.

3. System and acceptance testing
   - Test the complete web application from the user interface.
   - Confirm the deployed Docker stack works end to end.

### 3.4 Test Environment

- Backend: Spring Boot 3.4 on Java 21
- Frontend: React 19 with Vite
- Database: PostgreSQL
- Container platform: Docker and Docker Compose

### 3.5 Entry Criteria

Testing should start when:

- the application builds successfully
- database connection settings are available
- the frontend can reach the backend API

### 3.6 Exit Criteria

Testing is complete when:

- critical endpoints work as expected
- login and role-based access pass
- main user workflows succeed
- no blocking deployment errors remain

### 3.7 Sample Test Cases

| ID | Test Case | Expected Result |
| --- | --- | --- |
| TC-01 | Register a new user | User account is created successfully |
| TC-02 | Login with valid credentials | JWT token is returned and session starts |
| TC-03 | Login with invalid credentials | Authentication fails with an error message |
| TC-04 | Access a protected endpoint without a token | Request is rejected with 401 |
| TC-05 | Access an admin endpoint as a patient | Request is rejected with 403 |
| TC-06 | Add a glucose reading | Reading is stored and returned in history |
| TC-07 | View glucose trend | Trend data is displayed correctly |
| TC-08 | Book an appointment | Appointment is saved and visible in the list |
| TC-09 | Reschedule or cancel an appointment | Appointment status is updated correctly |
| TC-10 | View prescriptions and meal plans | Records are loaded for the authenticated user |
| TC-11 | Send and view notifications | Notification is stored and can be retrieved |
| TC-12 | Start the app with Docker Compose | Backend, frontend, and database all start correctly |

### 3.8 Recommended Test Execution

Run the following checks:

```bash
cd DiaCare
mvn test

cd ../DiaCareFrontend
npm run build

cd ..
docker compose up --build
```

### 3.9 Test Reporting

For each test run, record:

- test case ID
- date and time
- environment used
- actual result
- pass or fail status
- defects found

This gives a clear trace from requirements to implementation and to verification.
