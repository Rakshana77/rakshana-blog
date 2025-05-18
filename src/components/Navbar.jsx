import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ token }) => {
  // token arrives from App.jsx
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          RAKSHANA BLOG
        </Typography>

        <Box>
          {token ? (
            <>
              <Button color="inherit" onClick={() => navigate("/blogs")}>
                Blogs
              </Button>
              <Button color="inherit" onClick={() => navigate("/create")}>
                Create
              </Button>
              <Button color="inherit" onClick={() => navigate("/myblogs")}>
                My Blogs
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
