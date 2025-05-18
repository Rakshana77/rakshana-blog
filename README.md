## RAKSHANA Blog – Frontend (React 18 + MUI v5 + Vite)

A responsive blogging UI that consumes the Arnifi Blog API.  
Users can sign up, log in, browse, filter, create, edit and delete their own posts.

---

## 1. Stack

| Purpose      | Tech / Library                      |
|--------------|-------------------------------------|
| Framework    | React 18 + Vite                     |
| UI           | Material UI v5 (MUI)                |
| Routing      | React Router 6                      |
| HTTP client  | Axios (with JWT interceptors)       |
| State        | React hooks                         |
| Date utils   | Day.js (lightweight)                |
| Linting      | ESLint + Prettier                   |

---

## 2. Getting Started Locally

```bash
git clone https://github.com/<you>/arnifi-blog.git
cd arnifi-blog/frontend
npm install
# point VITE_API_BASE to your backend URL
cp .env.example .env    
npm run dev
.env (required)
bash
Copy
Edit
VITE_API_BASE=http://localhost:5000/api
3. Scripts
Command	Purpose
npm run dev	Start Vite dev server
npm run build	Production build to /dist
npm run preview	Preview built site locally
npm run lint	ESLint check

4. Folder Structure
csharp
Copy
Edit
frontend
 ├─ src/
 │   ├─ api/            # Axios instance (adds JWT header)
 │   ├─ components/     # Navbar, PrivateRoute, etc.
 │   ├─ pages/          # Login, Signup, Blogs, MyBlogs, Create, Edit
 │   ├─ utils/          # helpers (formatDate)
 │   ├─ App.jsx
 │   └─ main.jsx
 ├─ public/
 └─ README.md
5. Key Implementation Details
Auth flow
After login/signup, the JWT is stored in localStorage and injected via Axios interceptor.
A PrivateRoute wrapper redirects unauthenticated users to /login.

Filtering
Blogs page builds a query string from category and author inputs, sending it to /api/blogs?category=…&author=….

Styling
MUI components + sx prop.
Blog cards have consistent width (maxWidth: 400px), equal spacing, and backgroundColor: #fafafa.

6. Deployment Guide (Render Static / Netlify / Vercel)
Build: npm run build

Deploy /dist folder as static site

Add environment variable VITE_API_BASE pointing to the live backend URL (must include /api).

7. Available Routes
Path	Component	Access
/	Redirect ➜ /blogs	
/login	Login	public
/signup	Signup	public
/blogs	Blogs	protected
/create	CreateBlog	protected
/edit/:id	EditBlog	protected + owner
/myblogs	MyBlogs	protected

8. Contributing
Same workflow as backend: feature branches + PRs.

9. License
MIT

yaml
Copy
Edit

---

### ✔️ Next steps

1. Place each README in the proper directory.  
2. Commit and push:  

```bash
git add backend/README.md frontend/README.md
git commit -m "docs: add separate README for backend & frontend"
git push
