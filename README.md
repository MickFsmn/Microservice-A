﻿# Microservice-A
Kolton's media service


### Media Microservice for Band Hub App 

This microservice handles media uploads (photos and videos) for bands. Band members can upload media with metadata (e.g., date taken, band name), retrieve and filter it, and perform basic CRUD operations. Built using Node.js, Express, and MongoDB.

---

# Getting Started

## Prerequisites

- Node.js (v18+ recommended)
- npm (comes with Node)
- MongoDB Atlas account or local MongoDB instance

---

## Setup Instructions

1. Clone the repository
2. npm install
3. make a .env, fill in your MongoDB URI and preffered port if you want
   structure/example:
   MONGO_URI=your_string
   PORT=PREFFERED_PORT (of your choice :) should be 3000 probably by default)
4. npm start or node server.js
5. API end point (more details below) 
   - `http://localhost:PREFFERED_PORT/api/media`
6. Test html url: http://localhost:PREFFERED_PORT - opens index.html so you can see and test things straight up

## Filestructure Overview

This is going to look incomprehensible in github's readme preview, so just open the file to view this proper


media-service/
├── controllers/            # Business logic for API endpoints
│   └── mediaController.js
├── models/                 # Mongoose schema for media entries
│   └── mediaModel.js
├── routes/                 # Express routes
│   └── mediaRoutes.js
├── middleware/             # File upload config using Multer
│   └── upload.js
├── config/                 # Database connection
│   └── db.js
├── mediaUploads/           # Media files stored here (on disk)
├── .env                    # Environment variables (not tracked in Git), make your own as intstructed above
├── .gitignore              # Files and folders to ignore in Git
├── app.js                  # Main server entry point
├── package.json            # Project metadata and dependencies
├── index.html              # test HTML page for uploading and deleting media. 
└── README.md               # Hi!

# API Endpoints

| Method | Endpoint         | Description                             |
| ------ | ---------------- | --------------------------------------- |
| POST   | `/api/media`     | Upload photo or video                   |
| GET    | `/api/media`     | Get all media or filter by query params |
| PUT    | `/api/media/:id` | Update media metadata                   |
| DELETE | `/api/media/:id` | Delete media by ID                      |

### please give me feedback on how well this works for you/any changes as appropriate :)