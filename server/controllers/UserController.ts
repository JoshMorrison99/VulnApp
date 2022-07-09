import { Request, Response } from "express";
import User from "../models/UserModel";

export const Login = async (req: Request, res: Response) => {
  console.log("login");
  console.log(req.body);
  let user = await User.findOne({ username: req.body.username });
  if (!user) {
    res.status(400);
    res.send({ message: "user does not exist" });
  } else {
    req.session!.userId = user.id;
    res.send(user);
  }
};

export const Register = (req: Request, res: Response) => {
  console.log(req.body);
  const { username, password } = req.body;
  User.findOne({ username: username }, (_err: Error, user: typeof User) => {
    if (user) {
      console.log("username already exists");
      res.status(400);
      res.json({ message: "username already exist" });
    } else {
      const user = new User({ username, password });
      user.save((err) => {
        if (err) {
          res.send(err).status(400);
        } else {
          console.log("save successful");
          req.session!.userId = user.id;
          res.send({ message: "successful" }).status(200);
        }
      });
    }
  });
};

export const Me = async (req: Request, res: Response) => {
  if (!req.session!.userId) {
    return null;
  }

  const user = await User.findById(req.session!.userId);
  if (!user) {
    res.sendStatus(400);
  } else {
    res.send(user);
  }
};

export const Logout = async (req: Request, res: Response) => {
  if (req.session!) {
    req.session!.destroy((err) => {
      res.clearCookie("HintnoSQLInjection");
      if (err) {
        res.sendStatus(400);
      } else {
        res.send("Logout Successful");
      }
    });
  }
};

export const AllUsers = async (_req: Request, res: Response) => {
  User.find({}, function (_err: any, users: any) {
    var userMap: any = {};

    users.forEach(function (user: any) {
      userMap[user._id] = user;
    });

    res.send(userMap);
  });
};
