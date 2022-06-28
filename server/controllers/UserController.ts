import { Request, Response } from "express";
//import User from "../models/UserModel"

export const Login = (_req: Request, _res: Response) => {
//   let user = User.find((err: any, user: any) => {
//     if (err) {
//       res.send("Error!");
//     } else {
//       res.send(user);
//     }
//   });
};

export const Register = (req: Request, res: Response) => {
    console.log("->", req.body)
    res.send("hello").status(200)
  };