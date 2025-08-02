# 🎵 Moody Player

**Moody Player** is a fullstack AI-powered music application that detects your mood using facial expressions and plays songs that match your emotional state. Built with **React**, **FaceAPI.js**, **Express.js**, **MongoDB**, and **ImageKit** for file handling.

---

## ✨ Features

- 🎭 Real-time mood detection using your webcam
- 🎶 Plays songs that match your detected mood
- 📂 Upload songs (title, artist, mood, audio file)
- ☁️ Audio storage via ImageKit CDN
- 💾 MongoDB integration for song metadata

---

## 🧠 Tech Stack

| Frontend        | Backend         | Storage / DevOps   |
|-----------------|------------------|---------------------|
| React.js        | Node.js + Express | MongoDB (Compass)   |
| FaceAPI.js      | Multer (file upload) | ImageKit (audio files) |
| Tailwind CSS    | Mongoose         | Dotenv for ENV vars |
| Axios           |                  | Nodemon             |

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js
- MongoDB installed locally or via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- An [ImageKit.io](https://imagekit.io) account

---

### 📁 Project Structure

```
moody-player/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── service/
│   │   └── models/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   │   └── models/ (face-api.js models)
│   ├── src/
│   │   ├── components/
│   │   └── App.jsx
│   └── .env
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install
```

### 🔐 Environment Variables (`.env`)

```
PORT=3000
MONGODB_URL=mongodb://localhost:27017/moody-player
IMAGEKIT_PUBLICKEY=your_public_key
IMAGEKIT_PRIVATEKEY=your_private_key
IMAGEKIT_URLENDPOINT=https://ik.imagekit.io/your_id
```

### ▶️ Start Server

```bash
npm run dev
```

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
```

### 🧠 FaceAPI Models

Download FaceAPI models and place them in:

```
frontend/public/models/
```

Get models here:  
[https://github.com/justadudewhohacks/face-api.js-models](https://github.com/justadudewhohacks/face-api.js-models)

### ▶️ Start React App

```bash
npm run dev
```

---

## 📷 How it Works

1. Click **"Detect Mood"** to activate the webcam.
2. FaceAPI analyzes your expression (`happy`, `sad`, `neutral`, etc.)
3. Frontend sends a request to `GET /songs?mood=<expression>`
4. Matching songs are retrieved from MongoDB.
5. User can play/pause each song inline.

---

## 🎯 API Routes

### `POST /songs`
Upload a song:
- `multipart/form-data` with:
  - `title`, `artist`, `mood`
  - `audio` file

### `GET /songs?mood=<mood>`
Retrieve songs by mood.

---

## 🧪 Example Moods Detected

- `happy`
- `sad`
- `neutral`
- `angry`
- `surprised`
- `disgusted`
- `fearful`

---

## 📌 Known Issues

- Webcam permissions required
- Face detection might not work in low light
- MongoDB must be running (`localhost:27017`)
- Audio auto-play behavior may vary by browser

---

## 🤝 Contributing

PRs welcome! Feel free to fork and improve 🎉

---

## 📜 License

MIT License © 2025 [Arindam Dinda]

---

## 📷 Screenshots (Optional)

> _You can add images like_:
> - `frontend/public/screenshot1.png`
> - `![Detect Mood UI](./public/screenshot1.png)`
