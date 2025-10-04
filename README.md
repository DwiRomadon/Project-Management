# 🧩 Project Management System

**A web-based project and task management application** built with **Node.js, Express, EJS, PostgreSQL, and Prisma ORM**.  
This application enables teams to manage projects, assign tasks, track progress, and collaborate effectively.

---

## 🚀 Features

### 🧱 Core Features

- ✅ **Project Management** — Create, edit, and delete projects
- ✅ **Task Management** — Manage tasks with priorities, deadlines, and statuses
- ✅ **Team Collaboration** — Assign tasks to team members
- ✅ **Progress Tracking** — Monitor project and task progress in real-time
- ✅ **Responsive Interface** — Access from desktop, tablet, or mobile

### 🔐 Security Features

- 🔑 **User Authentication** — Login/register with session management
- 👁️ **Public Access** — View projects and tasks without login (read-only)
- 🛡️ **Role-based Access** — Only project owners can edit

### ⚙️ Advanced Features

- 📊 **Statistics Dashboard** — Review project and task metrics
- 🔔 **Status Notifications** — Alerts for approaching deadlines
- 🎯 **Task Prioritization** — Priority system (Low, Medium, High, Urgent)
- 📅 **Time Management** — Manage timelines and deadlines
- 💻 **Modern UI/UX** — Built with Bootstrap 5 for a user-friendly experience

---

## 🛠️ Technology Stack

### Backend

- **Node.js** — JavaScript runtime
- **Express.js** — Web framework
- **Express Session** — Session management
- **BCryptJS** — Password encryption
- **Connect Flash** — Flash message system

### Frontend

- **EJS** — Template engine
- **Bootstrap 5** — CSS framework
- **Font Awesome** — Icons
- **JavaScript** — Client-side scripting

### Database & ORM

- **PostgreSQL** — Relational database
- **Prisma ORM** — Database toolkit and ORM
- **Docker** — Containerization

### Development Tools

- **Nodemon** — Auto-restart during development
- **Dotenv** — Manage environment variables

---

## 📁 Project Structure

```text
web-pm/
├─ src/
│  ├─ controllers/
│  │  ├─ authController.js
│  │  ├─ projectController.js
│  │  └─ taskController.js
│  ├─ middlewares/
│  │  ├─ auth.js
│  │  └─ flash.js
│  ├─ routes/
│  │  ├─ auth.js
│  │  ├─ projects.js
│  │  ├─ tasks.js
│  │  └─ public.js
│  ├─ views/
│  │  ├─ layouts/
│  │  │  ├─ main.ejs
│  │  │  └─ public.ejs
│  │  ├─ public/
│  │  │  ├─ projects.ejs
│  │  │  ├─ project-detail.ejs
│  │  │  └─ tasks.ejs
│  │  ├─ projects/
│  │  │  ├─ list.ejs
│  │  │  ├─ show.ejs
│  │  │  └─ edit.ejs
│  │  ├─ tasks/
│  │  │  ├─ list.ejs
│  │  │  └─ show.ejs
│  │  ├─ index.ejs
│  │  ├─ login.ejs
│  │  └─ register.ejs
│  ├─ utils/
│  │  └─ password.js
│  ├─ prismaClient.js
│  └─ app.js
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.js
├─ .env
├─ docker-compose.yml
├─ package.json
└─ README.md
```

---

## ⚙️ Installation & Setup

### 📋 Prerequisites

- Node.js (v16 or higher)
- Docker & Docker Compose
- PostgreSQL (or use Docker container)

### 🧩 Steps

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd web-pm
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` file:

   ```env
   DATABASE_URL="postgresql://admin:password@localhost:5432/project_management?schema=public"
   SESSION_SECRET="your-secret-key-here"
   PORT=3000
   ```

4. **Run database with Docker**

   ```bash
   docker-compose up -d
   ```

5. **Setup Prisma and seed database**

   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

6. **Run the application**

   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

7. **Access the application**
   - Open your browser: [http://localhost:3000](http://localhost:3000)

---

## 👤 Default Account

| Email             | Password    |
| ----------------- | ----------- |
| admin@example.com | password123 |

---

## 🗄️ Database Models

### User

| Field    | Description                     |
| -------- | ------------------------------- |
| id       | Unique identifier               |
| email    | User email (unique)             |
| password | Encrypted password              |
| name     | Full name                       |
| projects | One-to-many relation to Project |
| tasks    | One-to-many relation to Task    |

### Project

| Field       | Description                  |
| ----------- | ---------------------------- |
| id          | Unique identifier            |
| name        | Project name                 |
| description | Project description          |
| startDate   | Start date                   |
| endDate     | End date                     |
| managerId   | User who created the project |
| tasks       | One-to-many relation to Task |

### Task

| Field       | Description                                              |
| ----------- | -------------------------------------------------------- |
| id          | Unique identifier                                        |
| title       | Task title                                               |
| description | Task description                                         |
| status      | Task status (PENDING, IN_PROGRESS, COMPLETED, CANCELLED) |
| priority    | Priority (LOW, MEDIUM, HIGH, URGENT)                     |
| dueDate     | Deadline                                                 |
| projectId   | Related project ID                                       |
| assigneeId  | Assigned user ID                                         |

---

## 🌐 Routes & Endpoints

### Public Routes

- `GET /` — Home page
- `GET /public/projects` — List public projects
- `GET /public/projects/:id` — Project details
- `GET /public/tasks` — List public tasks

### Authentication Routes

- `GET /login` — Login form
- `POST /auth/login` — Login
- `GET /register` — Registration form
- `POST /auth/register` — Register
- `POST /auth/logout` — Logout

### Protected Routes (Require Login)

#### Projects

- `GET /projects` — List user’s projects
- `GET /projects/:id` — View project details
- `GET /projects/:id/edit` — Edit project
- `POST /projects` — Create project
- `PUT /projects/:id` — Update project
- `DELETE /projects/:id` — Delete project

#### Tasks

- `GET /tasks` — List tasks
- `GET /tasks/:id` — Task details
- `POST /tasks` — Create task
- `PUT /tasks/:id` — Update task
- `PATCH /tasks/:id/status` — Update status
- `DELETE /tasks/:id` — Delete task

---

## 💡 Usage Guide

### For New Users

1. Register an account
2. Login with your credentials
3. Create a project
4. Add tasks to your project

### Main Features

- Create/edit/delete projects and tasks
- Assign members and manage priorities
- Track project progress
- View dashboards and notifications

### Public Access

- Guests can view projects/tasks (read-only)
- Share project links publicly

---

## 🐛 Troubleshooting

| Issue                     | Solution                                                    |
| ------------------------- | ----------------------------------------------------------- |
| Database connection error | Ensure Docker is running and `.env` is configured correctly |
| Prisma client error       | Run `npx prisma generate` then restart app                  |
| Session error             | Set `SESSION_SECRET` in `.env` and clear cookies            |
| Port already in use       | Change `PORT` in `.env` or stop conflicting process         |

---

## 🧰 Development Commands

```bash
# Run app with auto reload
npm run dev

# Prisma commands
npx prisma db push
npx prisma studio
npm run db:seed

# Production mode
npm start
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
   ```bash
   git checkout -b feature/awesome-feature
   ```
3. Commit your changes
   ```bash
   git commit -m "Add awesome feature"
   ```
4. Push to branch
   ```bash
   git push origin feature/awesome-feature
   ```
5. Create a Pull Request

**Guidelines**

- Follow existing coding style
- Add tests for new features
- Update documentation
- Ensure all tests pass

---

## 📝 License

Distributed under the **MIT License**.  
See the [LICENSE](LICENSE) file for more information.

---

## 👥 Development Team

Developed with ❤️ by the **Web-PM Development Team**.

---

## 📞 Support

If you encounter issues or have questions:

- Check the Troubleshooting section
- Create an issue in the repository
- Contact the development team
