import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api";

const CreateBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBlog((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/blogs", blog);
      navigate("/blogs");
    } catch (err) {
      console.error("Error creating blog", err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Create Blog
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Title"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            name="category"
            label="Category"
            fullWidth
            margin="normal"
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
            onChange={handleChange}
            required
          />
          <TextField
            name="image"
            label="Image URL"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Post
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateBlog;
