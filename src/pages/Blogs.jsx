import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Box,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import formatDate from "../utils/formatDate";
import api from "../api";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filters, setFilters] = useState({ category: "", author: "" });

  /* ---------------- helpers ---------------- */
  const fetchBlogs = async () => {
    const cleaned = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v.trim())
    );
    const query = new URLSearchParams(cleaned).toString();
    const res = await api.get(`/blogs?${query}`);
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) =>
    setFilters((p) => ({ ...p, [e.target.name]: e.target.value }));

  /* ---------------- UI ---------------- */
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        All Blogs
      </Typography>

      {/* filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 4 }} justifyContent="center">
        <TextField
          name="category"
          label="Filter by Category"
          size="small"
          value={filters.category}
          onChange={handleChange}
        />
        <TextField
          name="author"
          label="Filter by Author"
          size="small"
          value={filters.author}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={fetchBlogs}>
          Apply
        </Button>
      </Box>

      {/* blog cards */}

      <Grid container spacing={3} justifyContent="center">
        {blogs.map((b) => (
          <Grid item key={b._id}>
            <Card
              sx={{
                width: 280,
                height: 400,
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              {b.image && (
                <CardMedia
                  component="img"
                  height="140"
                  image={b.image}
                  alt={b.title}
                />
              )}

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{b.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {b.category} • {b.author} • {formatDate(b.createdAt)}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  {b.content.slice(0, 100)}…
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Blogs;
