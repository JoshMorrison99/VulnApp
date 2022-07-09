import { Box, Container, Grid } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NavBar from "../components/Navbar";
import styles from "../styles/Home.module.css";
import CircularProgress from "@mui/material/CircularProgress";

const Home: NextPage = () => {
  const [allUsers, setAllUsers] = useState<any>({});
  const [user, setUser] = useState<Object | null>(null);

  useEffect(() => {
    console.log("fetch data start");
    const response = fetch("http://localhost:4000/all", {
      method: "GET",
      mode: "cors",
    });
    response.then((data) => {
      console.log("fetch data end");
      data.json().then((d) => {
        setAllUsers(d);
      });
    });
  }, []);

  useEffect(() => {
    console.log("index me start");
    const me = () => {
      fetch("http://localhost:4000/me", {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }).then((res) => {
        if (res.ok) {
          setUser(res.json());
          console.log("index me end");
        } else {
          console.log("error");
        }
      });
    };
    me();
  }, []);

  return (
    <>
      <Head>
        <title>Leaderboards</title>
      </Head>
      <NavBar />
      <Box mt={10}>
        <Container>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={styles.boldtitle}>Username</TableCell>
                  <TableCell className={styles.boldtitle} align="right">
                    Score
                  </TableCell>
                  <TableCell className={styles.boldtitle} align="right">
                    Kills
                  </TableCell>
                  <TableCell className={styles.boldtitle} align="right">
                    Deaths
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(allUsers).map((user) => (
                  <TableRow
                    key={allUsers[user].username}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {allUsers[user].username}
                    </TableCell>
                    <TableCell align="right">{allUsers[user].score}</TableCell>
                    <TableCell align="right">{allUsers[user].kills}</TableCell>
                    <TableCell align="right">{allUsers[user].deaths}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </>
  );
};

export default Home;
