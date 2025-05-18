import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api";
import formatDate from "../utils/formatDate";
const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchMyBlogs = async () => {
    const res = await api.get("/blogs/myblogs/user");
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/blogs/${id}`);
      fetchMyBlogs();
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Blogs
      </Typography>

      <Grid container spacing={2}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card>
              {blog.image && (
                <CardMedia component="img" height="140" image={blog.image} />
              )}
              <CardContent>
                <Typography variant="h6">{blog.title}</Typography>
                <Typography variant="body2">
                  {blog.category} • {blog.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(blog.updatedAt || blog.createdAt)}
                </Typography>
                <Typography>{blog.content.slice(0, 100)}...</Typography>
                <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/edit/${blog._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyBlogs;
