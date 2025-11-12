# 📘 Temples & Prophets API – CSE 341 Project 2

This is a Node.js + Express REST API built for the BYU-Idaho CSE 341 course – Project 2.  
The application includes CRUD operations, authentication with API keys, error handling, data validation, and Swagger documentation.  
It is deployed using Render and connected to a MongoDB Atlas database.

---

## 🌐 Live Demo

- **Render Deployment:** https://cse-project-2.onrender.com  
- **Swagger UI:** https://cse-project-2.onrender.com/api-docs  
- **GitHub Repo:** https://github.com/DevVasconcelos/CSE_project_2/

---

## 📂 Collections

The application works with two main collections:

1. `temples` – Contains documents with 7+ fields (name, location, dedication date, status, area, services, etc.)
2. `prophets` – Stores data about leaders including name, birth info, service periods, and teachings.

---

## 🛡️ Authentication

All routes are protected using a simple API key mechanism.  
You must pass the following header with every request:

