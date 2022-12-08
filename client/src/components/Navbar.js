import {
  Avatar,
  IconButton,
  Stack,
  TextField,
  Typography,
  Link,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import "react-icons/ai";
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../helpers/authHelper";
import HorizontalStack from "./util/HorizontalStack";

const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const username = user && isLoggedIn().username;
  const [search, setSearch] = useState("");

  const handleLogout = async (e) => {
    logoutUser();
    navigate("/login");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
    navigate("/search?" + new URLSearchParams({ search }));
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        mb: 3,
        py: 2,
        borderBottom: 1,
        borderColor: "divider",
      }}
      spacing={2}
    >
      <Typography variant="h4" mr={1}>
        <Link href="/" color="inherit" underline="none">
          PostIt
        </Link>
      </Typography>

      {/*
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          size="small"
          label="Search for posts..."
          sx={{ flexGrow: 1, maxWidth: 300 }}
          onChange={handleChange}
        />
      </Box>
    */}

      <HorizontalStack>
        <IconButton href="/">
          <AiFillHome />
        </IconButton>
        {isLoggedIn() ? (
          <>
            <IconButton href={"/users/" + username}>
              <Avatar sx={{ width: 25, height: 25 }} />
            </IconButton>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button variant="text" sx={{ minWidth: 80 }} href="/signup">
              Sign Up
            </Button>
            <Button variant="text" sx={{ minWidth: 65 }} href="/login">
              Login
            </Button>
          </>
        )}
      </HorizontalStack>
    </Stack>
  );
};

export default Navbar;
