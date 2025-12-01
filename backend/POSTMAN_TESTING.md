# 🧪 Postman Testing Guide

Complete guide to test all backend endpoints using Postman.

## Prerequisites

1. **Install Postman**: Download from [postman.com](https://www.postman.com/downloads/)
2. **Backend Running**: Make sure your backend is running on `http://localhost:5000`
3. **MongoDB Connected**: Ensure MongoDB connection is successful

---

## 1. Admin Registration (ONE-TIME USE)

### Create Admin Account

```
POST http://localhost:5000/api/admin/register
```

**Headers:**

```
Content-Type: application/json
```

**Body (JSON):**

```json
{
  "name": "Your Name",
  "email": "your-email@example.com",
  "password": "YourSecurePassword123"
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "Admin registered successfully! IMPORTANT: Disable registration route now.",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Your Name",
    "email": "your-email@example.com",
    "role": "admin"
  }
}
```

> **⚠️ IMPORTANT**: After successful registration:
>
> 1. Save the `accessToken` and `refreshToken`
> 2. Follow the instructions in `DISABLE_REGISTRATION.md` to disable this route
> 3. Trying to register again should return: `"Admin already exists"`

---

## 2. Admin Login

### Login to Get Tokens

```
POST http://localhost:5000/api/admin/login
```

**Headers:**

```
Content-Type: application/json
```

**Body (JSON):**

```json
{
  "email": "your-email@example.com",
  "password": "YourSecurePassword123"
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Your Name",
    "email": "your-email@example.com",
    "role": "admin"
  }
}
```

> **📌 Note**: Access token expires in 30 minutes, refresh token in 7 days.

### Test Rate Limiting

Try logging in with wrong password 6 times. On the 6th attempt, you should be blocked:

**Expected Response (429):**

```json
{
  "success": false,
  "message": "Too many login attempts. Please try again later."
}
```

---

## 3. Refresh Access Token

### Get New Access Token

When your access token expires (after 30 minutes), use the refresh token:

```
POST http://localhost:5000/api/admin/refresh
```

**Headers:**

```
Content-Type: application/json
```

**Body (JSON):**

```json
{
  "refreshToken": "your_refresh_token_from_login"
}
```

**Expected Response (200):**

```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 4. Get Admin Profile

### Get Current User Info

```
GET http://localhost:5000/api/admin/me
```

**Headers:**

```
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "Your Name",
    "email": "your-email@example.com",
    "role": "admin",
    "createdAt": "2025-12-01T09:00:00.000Z",
    "updatedAt": "2025-12-01T09:00:00.000Z"
  }
}
```

### Test Without Token

Try the same request without the `Authorization` header:

**Expected Response (401):**

```json
{
  "success": false,
  "message": "Not authorized to access this route. No token provided."
}
```

---

## 5. Contact Form Submission

### Submit Contact Form (Public)

```
POST http://localhost:5000/api/contact
```

**Headers:**

```
Content-Type: application/json
```

**Body (JSON):**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Interested in collaboration",
  "message": "Hi! I'd love to discuss a potential project with you."
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Interested in collaboration",
    "message": "Hi! I'd love to discuss a potential project with you.",
    "read": false,
    "ip": "::1",
    "createdAt": "2025-12-01T10:00:00.000Z"
  }
}
```

> **📧 Email**: Admin should receive notification email at `ADMIN_EMAIL`

### Test Rate Limiting

Try submitting 6 contact forms within an hour:

**Expected Response (429):**

```json
{
  "success": false,
  "message": "Too many contact form submissions. Please try again later."
}
```

---

## 6. Get All Contact Messages (Admin Only)

### Fetch All Messages

```
GET http://localhost:5000/api/contact
```

**Headers:**

```
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Expected Response (200):**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Interested in collaboration",
      "message": "Hi! I'd love to discuss...",
      "read": false,
      "createdAt": "2025-12-01T10:00:00.000Z"
    }
  ]
}
```

---

## 7. Delete Contact Message (Admin Only)

### Delete a Message

```
DELETE http://localhost:5000/api/contact/MESSAGE_ID
```

**Headers:**

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {},
  "message": "Contact message deleted successfully"
}
```

---

## 8. Create Project (Admin Only)

### Add New Project

```
POST http://localhost:5000/api/projects
```

**Headers:**

```
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Body (JSON):**

```json
{
  "title": "Futuristic Portfolio",
  "description": "A stunning 3D portfolio with MERN stack",
  "category": "Web Development",
  "imageUrl": "https://example.com/portfolio.jpg",
  "technologies": ["React", "Node.js", "MongoDB", "Three.js"],
  "features": ["3D animations", "Admin dashboard", "Contact form with email"],
  "liveUrl": "https://portfolio.example.com",
  "githubUrl": "https://github.com/user/portfolio",
  "featured": true,
  "order": 1
}
```

**Expected Response (201):**

```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
    "title": "Futuristic Portfolio",
    "slug": "futuristic-portfolio",
    "description": "A stunning 3D portfolio with MERN stack",
    "category": "Web Development",
    "imageUrl": "https://example.com/portfolio.jpg",
    "technologies": ["React", "Node.js", "MongoDB", "Three.js"],
    "features": ["3D animations", "Admin dashboard", "Contact form with email"],
    "liveUrl": "https://portfolio.example.com",
    "githubUrl": "https://github.com/user/portfolio",
    "featured": true,
    "order": 1,
    "createdAt": "2025-12-01T11:00:00.000Z",
    "updatedAt": "2025-12-01T11:00:00.000Z"
  }
}
```

> **✨ Note**: The `slug` is automatically generated from the title!

---

## 9. Get All Projects (Public)

### Fetch All Projects

```
GET http://localhost:5000/api/projects
```

**No headers required** (public endpoint)

**Expected Response (200):**

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
      "title": "Futuristic Portfolio",
      "slug": "futuristic-portfolio",
      "description": "A stunning 3D portfolio...",
      "category": "Web Development",
      "featured": true,
      "order": 1
    }
  ]
}
```

### Filter Featured Projects

```
GET http://localhost:5000/api/projects?featured=true
```

### Filter by Category

```
GET http://localhost:5000/api/projects?category=Web Development
```

---

## 10. Get Single Project (Public)

### By Slug (SEO Friendly)

```
GET http://localhost:5000/api/projects/futuristic-portfolio
```

### By ID

```
GET http://localhost:5000/api/projects/65a1b2c3d4e5f6g7h8i9j0k3
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
    "title": "Futuristic Portfolio",
    "slug": "futuristic-portfolio",
    "description": "A stunning 3D portfolio with MERN stack",
    "technologies": ["React", "Node.js", "MongoDB", "Three.js"]
  }
}
```

---

## 11. Update Project (Admin Only)

### Modify Existing Project

```
PUT http://localhost:5000/api/projects/PROJECT_ID
```

**Headers:**

```
Content-Type: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Body (JSON):**

```json
{
  "title": "Updated Portfolio Title",
  "description": "Updated description",
  "featured": false
}
```

> **Note**: Slug will auto-update if title changes!

---

## 12. Delete Project (Admin Only)

### Remove Project

```
DELETE http://localhost:5000/api/projects/PROJECT_ID
```

**Headers:**

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Expected Response (200):**

```json
{
  "success": true,
  "data": {},
  "message": "Project deleted successfully"
}
```

---

## 13. Logout

### Clear Refresh Token

```
POST http://localhost:5000/api/admin/logout
```

**Headers:**

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

**Expected Response (200):**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 🔐 Security Tests

### 1. MongoDB Injection Protection

Try this malicious body in login:

```json
{
  "email": { "$gt": "" },
  "password": { "$gt": "" }
}
```

**Expected**: Request should be sanitized and fail authentication.

### 2. XSS Protection

Try submitting contact form with:

```json
{
  "name": "<script>alert('XSS')</script>",
  "email": "test@test.com",
  "message": "Test"
}
```

**Expected**: Script tags should be sanitized.

### 3. Unauthorized Access

Try any admin route without token:

**Expected (401):**

```json
{
  "success": false,
  "message": "Not authorized to access this route. No token provided."
}
```

---

## 📋 Quick Tips

1. **Save Tokens**: Create Postman environment variables for `accessToken` and `refreshToken`
2. **Auto-Headers**: Use Postman's Authorization tab with "Bearer Token" type
3. **Collections**: Organize endpoints into folders (Admin, Projects, Contact)
4. **Tests**: Add Postman tests to auto-save tokens from responses

---

## ✅ Testing Checklist

- [ ] Admin registration successful
- [ ] Admin login returns tokens
- [ ] Token refresh works
- [ ] Get admin profile with valid token
- [ ] Contact form submission successful
- [ ] Email received at admin email
- [ ] Get contacts (admin only) works
- [ ] Delete contact works
- [ ] Create project with auto-slug
- [ ] Get all projects (public)
- [ ] Get single project by slug
- [ ] Update project (admin only)
- [ ] Delete project (admin only)
- [ ] Rate limiting blocks after limit
- [ ] Unauthorized requests blocked
- [ ] Logout clears refresh token
