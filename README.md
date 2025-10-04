Project Management System
A web-based project and task management application built with Node.js, Express, EJS, PostgreSQL, and Prisma ORM. This application enables teams to manage projects, assign tasks, track progress, and collaborate effectively.

🚀 Features
Core Features
✅ Project Management - Create, edit, and delete projects

✅ Task Management - Manage tasks with priorities, deadlines, and statuses

✅ Team Collaboration - Assign tasks to team members

✅ Progress Tracking - Monitor project and task progress in real-time

✅ Responsive Interface - Access from desktop, tablet, or mobile

Security Features
🔐 User Authentication - Login/register with session management

👁️ Public Access - View projects and tasks without login (read-only)

🔒 Role-based Access - Only project owners can edit

Advanced Features
📊 Statistics Dashboard - Review project and task metrics

🔔 Status Notifications - Alerts for approaching deadlines

🎯 Task Prioritization - Priority system (Low, Medium, High, Urgent)

📅 Time Management - Project timelines and task deadlines

📱 Modern UI/UX - User-friendly interface with Bootstrap 5

🛠️ Technology Stack
Backend
Node.js - JavaScript runtime

Express.js - Web framework

Express Session - Session management

BCryptJS - Password encryption

Connect Flash - Flash messages

Frontend
EJS - Template engine

Bootstrap 5 - CSS framework

Font Awesome - Icons

JavaScript - Client-side scripting

Database & ORM
PostgreSQL - Relational database

Prisma ORM - Database toolkit and ORM

Docker - Containerization for database

Development Tools
Nodemon - Auto-restart development server

Dotenv - Environment variables

📁 Project Structure
text
web-pm/
├─ src/
│ ├─ controllers/
│ │ ├─ authController.js
│ │ ├─ projectController.js
│ │ └─ taskController.js
│ ├─ middlewares/
│ │ ├─ auth.js
│ │ └─ flash.js
│ ├─ models/ (via Prisma)
│ ├─ routes/
│ │ ├─ auth.js
│ │ ├─ projects.js
│ │ ├─ tasks.js
│ │ └─ public.js
│ ├─ views/
│ │ ├─ layouts/
│ │ │ ├─ main.ejs
│ │ │ └─ public.ejs
│ │ ├─ public/
│ │ │ ├─ projects.ejs
│ │ │ ├─ project-detail.ejs
│ │ │ └─ tasks.ejs
│ │ ├─ projects/
│ │ │ ├─ list.ejs
│ │ │ ├─ show.ejs
│ │ │ └─ edit.ejs
│ │ ├─ tasks/
│ │ │ ├─ list.ejs
│ │ │ └─ show.ejs
│ │ ├─ index.ejs
│ │ ├─ login.ejs
│ │ └─ register.ejs
│ ├─ utils/
│ │ └─ password.js
│ ├─ prismaClient.js
│ └─ app.js
├─ prisma/
│ ├─ schema.prisma
│ └─ seed.js
├─ .env
├─ docker-compose.yml
├─ package.json
└─ README.md
🚀 Installation & Setup
Prerequisites
Node.js (v16 or higher)

Docker & Docker Compose

PostgreSQL (or use Docker)

Installation Steps
Clone repository

bash
git clone <repository-url>
cd web-pm
Install dependencies

bash
npm install
Setup environment variables

bash
cp .env.example .env
Edit the .env file and adjust the configuration:

env
DATABASE_URL="postgresql://admin:password@localhost:5432/project_management?schema=public"
SESSION_SECRET="your-secret-key-here"
PORT=3000
Run database with Docker

bash
docker-compose up -d
Setup database

bash

# Generate Prisma client

npx prisma generate

# Run migration

npx prisma db push

# Seed database with sample data

npm run db:seed
Run the application

bash

# Development mode

npm run dev

# Production mode

npm start
Access the application
Open your browser and visit: http://localhost:3000

👤 Default Account
After running the seed, a default account is available:

Email: admin@example.com

Password: password123

📊 Database Models
User
id - Unique identifier

email - User email (unique)

password - Encrypted password

name - Full name

projects - Relation to Project (one-to-many)

tasks - Relation to Task (one-to-many)

Project
id - Unique identifier

name - Project name

description - Project description

startDate - Start date

endDate - End date

managerId - ID of user who created the project

tasks - Relation to Task (one-to-many)

Task
id - Unique identifier

title - Task title

description - Task description

status - Task status (PENDING, IN_PROGRESS, COMPLETED, CANCELLED)

priority - Priority (LOW, MEDIUM, HIGH, URGENT)

dueDate - Deadline

projectId - Related project ID

assigneeId - Assigned user ID

🌐 Routes & Endpoints
Public Routes (No Login Required)
GET / - Home page

GET /public/projects - Public projects list

GET /public/projects/:id - Public project detail

GET /public/tasks - Public tasks list

Authentication Routes
GET /login - Login form

POST /auth/login - Login process

GET /register - Registration form

POST /auth/register - Registration process

POST /auth/logout - Logout

Protected Routes (Login Required)
Projects
GET /projects - User's projects list

GET /projects/:id - Project detail

GET /projects/:id/edit - Edit project form

POST /projects - Create new project

PUT /projects/:id - Update project

DELETE /projects/:id - Delete project

Tasks
GET /tasks - All user tasks list

GET /tasks/:id - Task detail

POST /tasks - Create new task

PUT /tasks/:id - Update task

PATCH /tasks/:id/status - Update task status

DELETE /tasks/:id - Delete task

🎯 Usage
For New Users
Register - Create a new account on the register page

Login - Sign in with email and password

Create Project - Click "New Project" to start your first project

Add Tasks - In project detail, add tasks by clicking "Add Task"

Main Features
Project Management
Create projects with name, description, and timeline

Edit existing projects

Delete projects (including all tasks within)

View project progress statistics

Task Management
Create tasks with title, description, priority, and deadline

Assign tasks to team members

Update task status (Pending, In Progress, Completed)

Filter tasks by status, priority, or assignee

Mark tasks as completed

Collaboration
View all tasks in one dashboard

Monitor team progress in real-time

Get notifications for approaching deadlines

Public Access
Guests can view projects and tasks without login

Read-only mode for transparency

Shareable links for external stakeholders

🐛 Troubleshooting
Common Issues
Database Connection Error

Ensure Docker is running: docker-compose up -d

Check connection string in .env

Prisma Client Error

Run: npx prisma generate

Restart application

Session Error

Ensure SESSION_SECRET is set in .env

Clear browser cookies

Port Already in Use

Change PORT in .env

Or stop process using port 3000

Development Commands
bash

# Development with auto-reload

npm run dev

# Database commands

npx prisma db push # Sync schema
npx prisma studio # Database GUI
npm run db:seed # Seed data

# Production

npm start
🤝 Contributing
Contributions are welcome! Here's how to contribute:

Fork the repository

Create feature branch: git checkout -b feature/amazing-feature

Commit changes: git commit -m 'Add amazing feature'

Push to branch: git push origin feature/amazing-feature

Create Pull Request

Guidelines
Follow existing coding style

Add tests for new features

Update documentation

Ensure all tests pass

📝 License
Distributed under the MIT License. See LICENSE file for more details.

👥 Development Team
Developed with ❤️ by the development team.

📞 Support
If you encounter issues or have questions:

Check the Troubleshooting section

Create an issue in the repository

Contact the development team
