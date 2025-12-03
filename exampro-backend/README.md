# 🧩 ExamPro Backend (Node.js + Express + MySQL)

ExamPro is a dynamic, role-based online exam management platform.

---

## 🚀 Features

- Role hierarchy: SuperAdmin → Admin → SuperUser → Participant  
- SuperAdmin approval system for new SuperAdmins  
- Admin & SuperUser management (create, approve, remove users)  
- Group, Exam, Question, Participant modules  
- Excel import for bulk Participants & Questions  
- Audit & Activity logs  
- Database portable (MySQL now, can switch to PostgreSQL easily)

---

## 🛠️ Tech Stack

- **Node.js + Express** (Backend)
- **Sequelize ORM** (MySQL, portable)
- **JWT Authentication**
- **Winston Logger**
- **Multer + XLSX** for Excel uploads

---

## 🧰 Installation

```bash
# 1. Clone repo
git clone https://github.com/ayushagrawal/exampro-backend.git

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Setup MySQL
mysql -u root -p < sql/schema.sql
mysql -u root -p < sql/seed.sql

# 5. Run server
npm run dev
