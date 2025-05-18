import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import MyBlogs from "./pages/MyBlogs";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <BrowserRouter>
      <Navbar token={token} />
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<SignUp />} />

        {/* pass token to each ProtectedRoute */}
        <Route
          path="/blogs"
          element={
            <ProtectedRoute token={token}>
              <Blogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute token={token}>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myblogs"
          element={
            <ProtectedRoute token={token}>
              <MyBlogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute token={token}>
              <EditBlog />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
