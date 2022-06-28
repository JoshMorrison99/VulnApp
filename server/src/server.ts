import express, {Request, Response} from 'express';
import mongoose from "mongoose";
// import Redis from "ioredis";
// import session from "express-session";
// import connectRedis from "connect-redis";
import cors from "cors";
import dotenv from "dotenv"
import {Login, Register} from "../controllers/UserController"


const main = async () => {
    dotenv.config()

    const app = express()

    // parse body
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URL!, (err: any) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("Successfully Connected!");
        }
    });

    // Cors Configuration
    app.use(
        cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        })
    );

    // Connect to Redis
    // const RedisStore = connectRedis(session);
    // const redis = new Redis(REDIS_URL);
    
    // app.use(
    //     session({
    //     name: COOKIE_NAME,
    //     store: new RedisStore({
    //         client: redis,
    //         disableTouch: true,
    //     }),
    //     cookie: {
    //         maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
    //         httpOnly: true,
    //         sameSite: "lax", // csrf
    //         secure: false, // cookie only works in https
    //     },
    //     saveUninitialized: false,
    //     secret: SESSION_SECRET,
    //     resave: false,
    //     })
    // );

    // API Base Endpoint
    app.get('/', (_req: Request, res: Response) => {
        res.send("hello")
    })

    // API Endpoints
    app.post("/login", Login)
    app.post("/register", Register)


    app.listen(4000, () => {
        console.log(`Server listening on port ${process.env.PORT}`)
    })
}

main().catch((err) => {
    console.error(err);
  });

