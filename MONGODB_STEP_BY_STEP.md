# 🗄️ MongoDB Atlas - Step by Step Guide

## 📋 **Complete MongoDB Setup (5 minutes)**

### **Step 1: Go to Your MongoDB Atlas Dashboard**
1. **Open this link**: https://cloud.mongodb.com/v2/6673d5b56e8fde266a74b7d7#/settings/groupSettings
2. **You should see your cluster dashboard**

### **Step 2: Create Database User**
1. **Click "Database Access"** (left sidebar)
2. **Click "Add New Database User"**
3. **Fill in the form**:
   - **Username**: `moody-player-user`
   - **Password**: Click "Autogenerate Secure Password" (SAVE THIS PASSWORD!)
   - **Database User Privileges**: Select "Read and write to any database"
4. **Click "Add User"**

### **Step 3: Allow Network Access**
1. **Click "Network Access"** (left sidebar)
2. **Click "Add IP Address"**
3. **Click "Allow access from anywhere"** (for development)
4. **Click "Confirm"**

### **Step 4: Get Connection String**
1. **Go back to "Clusters"** (left sidebar)
2. **Click "Connect"** button on your cluster
3. **Choose "Connect your application"**
4. **Driver**: Select "Node.js"
5. **Version**: Select "4.1 or later"
6. **Copy the connection string**

### **Step 5: Update Connection String**
Your connection string will look like:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Replace:**
- `<username>` with `moody-player-user`
- `<password>` with the password you saved in Step 2
- Add `/moody-player` before the `?` for database name

**Final connection string should look like:**
```
mongodb+srv://moody-player-user:your-password-here@cluster0.xxxxx.mongodb.net/moody-player?retryWrites=true&w=majority
```

---

## ✅ **MongoDB Checklist**

- [ ] Database user created (moody-player-user)
- [ ] Password saved securely
- [ ] Network access allowed from anywhere
- [ ] Connection string copied and updated
- [ ] Database name `/moody-player` added to connection string

---

## 🎯 **What's Next?**

Once you have your MongoDB connection string:
1. **We'll test it** to make sure it works
2. **Then move to ImageKit** (file storage)
3. **Then Spotify** (music API)
4. **Finally deploy** to Vercel

---

## 🆘 **Need Help?**

If you get stuck at any step:
1. **Take a screenshot** of what you see
2. **Tell me exactly** where you are
3. **I'll guide you** through that specific step

**Ready to start with Step 1? Let me know when you're at the MongoDB dashboard!**
