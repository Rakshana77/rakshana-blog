import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

const EditBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await api.get("/blogs");
      const target = res.data.find((b) => b._id === id);
      if (target) setBlog(target);
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setBlog((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/blogs/${id}`, blog);
    navigate("/myblogs");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Edit Blog
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Title"
            fullWidth
            margin="normal"
            value={blog.title}
            onChange={handleChange}
            required
          />
          <TextField
            name="category"
            label="Category"
            fullWidth
            margin="normal"
            value={blog.category}
            onChange={handleChange}
            required
          />
          <TextField
            name="content"
            label="Content"
            multiline
            rows={5}
            fullWidth
            margin="normal"
            value={blog.content}
            onChange={handleChange}
            required
          />
          <TextField
            name="image"
            label="Image URL"
            fullWidth
            margin="normal"
            value={blog.image}
            onChange={handleChange}
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Update
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EditBlog;
