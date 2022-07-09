import express from "express";
import mongoose from "mongoose";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import {
  AllUsers,
  Login,
  Logout,
  Me,
  Register,
} from "../controllers/UserController";
import User from "../models/UserModel";

const PORT = 4000;
const REDIS_URL = "localhost:6379";
const COOKIE_NAME = "HintnoSQLInjection";
const SESSION_SECRET = "password";

const main = async () => {
  const app = express();

  // parse body
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Connect to MongoDB
  mongoose.connect("mongodb://localhost:27017/vulnapp", (err: any) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Successfully Connected!");
    }
  });

  // Add default users
  const user1 = new User({
    username: "admin",
    password: "nosqli123!",
    score: 48045,
    kills: 770,
    deaths: 28,
  });
  user1.save((err: any) => {
    if (err) {
      console.log("err creating default user");
    } else {
      console.log("save successful");
    }
  });

  const user2 = new User({
    username: "Sonderdonder",
    password: "d3226629-ace3-40cb-a172-25b36594fa85",
    score: 51966,
    kills: 1160,
    deaths: 1228,
  });
  user2.save((err: any) => {
    if (err) {
      console.log("err creating default user");
    } else {
      console.log("save successful");
    }
  });

  const user3 = new User({
    username: "Burlywood",
    password: "d3226629-ace3-40cb-a172-25b36594fa85",
    score: 35617,
    kills: 340,
    deaths: 3228,
  });
  user3.save((err: any) => {
    if (err) {
      console.log("err creating default user");
    } else {
      console.log("save successful");
    }
  });

  const user4 = new User({
    username: "Cleopatrick",
    password: "d3226629-ace3-40cb-a172-25b36594fa85",
    score: 46812,
    kills: 842,
    deaths: 303,
  });
  user4.save((err: any) => {
    if (err) {
      console.log("err creating default user");
    } else {
      console.log("save successful");
    }
  });

  const user5 = new User({
    username: "Gamer-Name23",
    password: "d3226629-ace3-40cb-a172-25b36594fa85",
    score: 49091,
    kills: 542,
    deaths: 503,
  });
  user5.save((err: any) => {
    if (err) {
      console.log("err creating default user");
    } else {
      console.log("save successful");
    }
  });

  const user6 = new User({
    username: "Opticrex",
    password: "d3226629-ace3-40cb-a172-25b36594fa85",
    score: 84034,
    kills: 2599,
    deaths: 2133,
  });
  user6.save((err: any) => {
    if (err) {
      console.log("err creating default user");
    } else {
      console.log("save successful");
    }
  });

  const user7 = new User({
    username: "Suspect77",
    password: "d3226629-ace3-40cb-a172-25b36594fa85",
    score: 357,
    kills: 29,
    deaths: 33,
  });
  user7.save((err: any) => {
    if (err) {
      console.log("err creating default user");
    } else {
      console.log("save successful");
    }
  });

  const user8 = new User({
    username: "Gigggatic",
    password: "d3226629-ace3-40cb-a172-25b36594fa85",
    score: 52553,
    kills: 2229,
    deaths: 2933,
  });
  user8.save((err: any) => {
    if (err) {
      console.log("err creating default user");
    } else {
      console.log("save successful");
    }
  });

  const user9 = new User({
    username: "Pandoro",
    password: "d3226629-ace3-40cb-a172-25b36594fa85",
    score: 16516,
    kills: 984,
    deaths: 773,
  });
  user9.save((err: any) => {
    if (err) {
      console.log("err creating default user");
    } else {
      console.log("save successful");
    }
  });

  const user10 = new User({
    username: "RIPieces",
    password: "d3226629-ace3-40cb-a172-25b36594fa85",
    score: 13094,
    kills: 883,
    deaths: 1930,
  });
  user10.save((err: any) => {
    if (err) {
      console.log("err creating default user");
    } else {
      console.log("save successful");
    }
  });

  // Cors Configuration
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  // Connect to Redis
  const RedisStore = connectRedis(session);
  const redis = new Redis(REDIS_URL);

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: false, // cookie only works in https
      },
      saveUninitialized: false,
      secret: SESSION_SECRET,
      resave: false,
    })
  );

  // API Endpoints
  app.post("/login", Login);
  app.post("/register", Register);
  app.get("/me", Me);
  app.get("/logout", Logout);
  app.get("/all", AllUsers);

  app.listen(4000, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
