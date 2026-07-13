# 🚀 AI Interview Planner

An AI-powered interview preparation platform that analyzes a candidate's resume and job description to generate personalized interview questions, skill-gap analysis, preparation roadmap, and an ATS-friendly resume.

Built using the MERN Stack and Google Gemini AI.

---

## ✨ Features

### 🤖 AI Interview Report Generation
- Upload your resume (PDF)
- Paste a job description
- Add a self-description
- AI analyzes your profile and generates:
  - Match Score
  - Technical Interview Questions
  - Behavioral Interview Questions
  - Skill Gap Analysis
  - Personalized Preparation Roadmap

### 📊 Dashboard
- View all previous interview reports
- Recent interview history
- Open any report instantly

### 📄 Resume Generator
- Generate an ATS-friendly resume
- Download resume as PDF

### 🔐 Authentication
- Register/Login
- JWT Authentication
- Protected Routes
- Secure Logout

### 📱 Responsive UI
- Desktop
- Tablet
- Mobile

### 🗑️ Report Management
- View Interview Reports
- Delete Reports
- Download Resume PDF

---

# 🛠 Tech Stack

## Frontend

- React.js
- SCSS
- Axios
- React Router
- Lucide React

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

## AI

- Google Gemini AI
- Zod
- Puppeteer

---

# 📸 Screenshots

### Landing Page

<img width="1837" height="965" alt="image" src="https://github.com/user-attachments/assets/451d2ffd-d1ce-4cf4-a7ea-6f45bae7b26c" />


---

### Dashboard

<img width="1860" height="963" alt="image" src="https://github.com/user-attachments/assets/ce873d08-5f00-4757-b65c-c8d8165dec41" />


---

### Interview Report

<img width="1901" height="967" alt="image" src="https://github.com/user-attachments/assets/dc9b28b3-fcf4-4569-80fe-d70ae7b17fa3" />


---

# 📂 Project Structure

```
AI-Interview-Planner
│
├── Backend_GEN-AI
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   └── ...
│
├── FrontEnd-GEN-AI
│   ├── src
│   ├── assets
│   ├── pages
│   ├── hooks
│   └── ...
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/AyushRajput1012/AI-Interview-Planner.git
```

## Backend

```bash
cd Backend_GEN-AI
npm install
```

Create a `.env` file

```env
PORT=3000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret

GOOGLE_GENAI_API_KEY=your_api_key
```

Run

```bash
npm run dev
```

---

## Frontend

```bash
cd FrontEnd-GEN-AI
npm install
npm run dev
```

---

# 🔄 Workflow

```
Resume + Job Description
            │
            ▼
      Gemini AI Analysis
            │
            ▼
 Interview Report Generation
            │
            ├── Match Score
            ├── Technical Questions
            ├── Behavioral Questions
            ├── Skill Gaps
            └── Preparation Roadmap
```

---

# 🎯 Future Improvements

- Interview Practice Mode
- AI Voice Interview
- Company-wise Interview Questions
- Coding Round Generator
- Resume ATS Score
- Export Report as PDF
- Email Interview Report
- Dark / Light Theme

---

# 👨‍💻 Author

**Ayush Singh**

GitHub:
https://github.com/AyushRajput1012

LinkedIn:
www.linkedin.com/in/ayushrajput2060



---

# ⭐ Support

If you like this project, don't forget to ⭐ star the repository.
