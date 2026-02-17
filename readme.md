# Real-Time Poll Rooms

A full-stack web application that allows users to create polls, share them via a link, collect votes, and see results update in real time. Built as a complete working product with fairness controls, persistent storage, and live updates.

---

## 🌐 Live Demo

* **Frontend URL:** [text](https://leskar-pollweb.vercel.app/)
* **Backend URL:** [text](https://pollweb.onrender.com/health)

---

## 📌 Objective

This project was built to fulfill the Full-Stack Assignment: **Real-Time Poll Rooms**.

Users can:

* Create a poll with multiple options
* Share the poll via a unique link
* Vote once per poll
* See live result updates instantly
* Access the poll later (persistent storage)

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Socket.IO Client
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Socket.IO
* Rate limiting middleware

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## ✨ Features

### 1. Poll Creation

* Users can create a poll with:

  * A question
  * At least 2 options
* Generates a unique shareable link:

  ```
  /poll/:pollId
  ```

### 2. Join by Link

* Anyone with the link can:

  * View the poll
  * Vote for one option (single-choice)

### 3. Real-Time Results

* When a vote is submitted:

  * Results update instantly for all viewers
  * Achieved using Socket.IO rooms

### 4. Persistent Storage

* Polls and votes are stored in MongoDB
* Refreshing the page does NOT lose data
* Share link works later

### 5. Smooth UX

* Loading skeletons
* Progress bar animations
* Toast notifications
* Instant UI updates after voting

---

## 🛡 Fairness / Anti-Abuse Mechanisms

Multiple layers were implemented to reduce repeat and abusive voting:

### 1) IP-Based Voting Restriction

* Each vote stores the client IP address.
* Only one vote is allowed per IP per poll.
* Prevents:

  * Refresh spamming
  * Basic repeat voting

### 2) Database-Level Protection (Unique Index)

A compound index ensures:

```
pollId + ipAddress = unique
```

This prevents:

* Double voting due to race conditions
* Multiple requests hitting server simultaneously
* Duplicate submissions

### 3) Rate Limiting

Limits how frequently a user can send requests:

* Prevents bot attacks
* Prevents request flooding
* Protects server stability

### 4) Browser Lock (Frontend)

After voting:

```
localStorage.setItem("poll_<id>_voted", true)
```

Prevents:

* Easy repeat voting from the same browser

---

## ⚠️ Limitations

While strong protections exist, this is an anonymous system:

* VPN users can change IP to vote again
* Users on same WiFi share IP
* No login/authentication layer


---

## 🧠 Edge Cases Handled

* Poll not found
* Invalid poll link
* Less than 2 options during creation
* Voting without selecting an option
* Duplicate vote attempts
* Rate limit exceeded
* Page refresh persistence
* Real-time sync across multiple users

---

## 🔄 Real-Time Architecture

Flow:

1. User submits vote
2. Backend updates MongoDB
3. Socket emits:

   ```
   vote_update
   ```
4. All users in that poll room receive live updates
5. UI progress bars animate instantly

---

## 📈 Future Improvements

Possible enhancements:

* Poll expiry time
* User authentication
* CAPTCHA for bot prevention
* Multi-choice polls
* Admin dashboard
* Vote change support
* Analytics panel

---

## 🎯 What This Project Demonstrates

* Full-stack development
* Real-time systems using Socket.IO
* Database schema design
* Fairness & anti-abuse thinking
* Edge-case handling
* Deployment & production readiness

---

## 👨‍💻 Author

**Gouri Shankar Konwar**
GitHub: https://github.com/leskarx

---
