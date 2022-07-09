import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [user, setUser] = useState<Object | null>({});

  const logout = async () => {
    const response = await fetch("http://localhost:4000/logout", {
      method: "GET",
      credentials: "include",
      mode: "cors",
    });
    setUser(null);
  };

  useEffect(() => {
    const me = () => {
      fetch("http://localhost:4000/me", {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }).then((res) => {
        if (res.ok) {
          console.log(res.json);
          setUser(res.json());
        } else {
          console.log("error");
        }
      });
    };
    me();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Leaderboards
          </Typography>
          {!user ? (
            <>
              <Link href="/login">
                <Button color="inherit">Login</Button>
              </Link>
              <Link href="/register">
                <Button color="inherit">Register</Button>
              </Link>
            </>
          ) : (
            <Link href="/">
              <Button onClick={() => logout()} color="inherit">
                Logout
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
