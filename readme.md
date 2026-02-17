# Real-Time Poll Rooms

A simple web app where anyone can create a poll, share a link, and watch votes update live.
Built as a full-stack assignment project to demonstrate real-time systems, backend design, and deployment.

**Live demo:** https://leskar-pollweb.vercel.app/
**Backend health check:** https://pollweb.onrender.com/health

---

## 🧩 What this app does

The idea is straightforward:

* Create a poll (question + at least 2 options)
* Get a shareable link
* Send it to others
* People vote once
* Results update instantly for everyone watching

Polls and votes are stored in the database, so refreshing or coming back later doesn’t reset anything.

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Socket.IO client
* Axios

### Backend

* Node.js + Express
* MongoDB (Mongoose)
* Socket.IO
* Custom rate limiting

### Hosting

* Frontend: Vercel
* Backend: Render (free tier)
* Database: MongoDB Atlas

Note: Since the backend is on Render’s free tier, it may take a few seconds to wake up after inactivity.

---

## ✅ Features

### Create a poll

Enter a question, add options, and generate a shareable link instantly.

### Vote via link

Open the poll link, select one option, and submit your vote. No login required.

### Real-time results

When someone votes, everyone currently viewing the poll sees the results update immediately.
This is handled using Socket.IO rooms.

### Persistent data

Polls and votes are stored in MongoDB.
You can refresh, close the tab, or revisit later — everything stays intact.

### Basic fairness protections

The app includes multiple checks to reduce repeat voting:

* IP-based restriction (one vote per IP per poll)
* Database constraint to prevent duplicate entries
* Rate limiting to stop request spam
* localStorage flag to avoid repeat attempts from the same browser

---

## ⚠️ Limitations

This is an anonymous voting system, so it’s not completely cheat-proof. A few known limitations:

* Someone using a VPN can change IP and vote again
* No login system, so votes aren’t tied to identities
* IP-based restriction can behave differently depending on network setup (mobile networks sometimes assign different public IPs)

These were intentional trade-offs to keep the system simple and accessible.

---

## 🧪 Edge Cases Handled

I tried to break the app in different ways and handled common scenarios:

* Invalid or non-existent poll links → shows “Poll not found”
* Voting without selecting an option → blocked on frontend
* Double-clicking the vote button → button disables + server checks
* Two votes hitting at the same moment → database unique index prevents duplicates
* Refresh after voting → UI stays consistent using localStorage + backend validation
* Real-time updates across multiple users → handled through Socket.IO

---

## 🔒 Fairness approach (how duplicate voting is reduced)

To reduce abuse without forcing logins, I used a layered approach:

1. **IP tracking**
   Each vote stores the user’s IP address. If the same IP tries to vote again on the same poll, it’s rejected.

2. **Database-level protection**
   A unique index on `(pollId + ipAddress)` ensures duplicate votes can’t be inserted even during race conditions.

3. **Rate limiting**
   Prevents rapid repeated requests from the same IP.

4. **Browser lock (localStorage)**
   After voting, the browser remembers that the user already voted and switches directly to results view.

---

## 💭 If I had more time

A few things I’d like to improve or add:

* Poll expiry (auto close after a set time)
* CAPTCHA to reduce automated voting
* Multi-select polls
* Optional login system for stronger fairness
* Cleaner mobile UI polish
* Basic analytics (total voters, activity over time)

---

## 🎯 Why I built it this way

The goal was to show end-to-end full-stack capability:

* Frontend UI + state management
* Backend APIs
* Database design
* Real-time updates using sockets
* Fairness logic
* Deployment

Instead of just making something that “works”, I focused on making it stable, handling edge cases, and thinking about how people might try to break it.


---

## 👨‍💻 Built by

**Gouri Shankar Konwar**
