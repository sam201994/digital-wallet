import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserUtils from "../utils/user.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await UserUtils.fetchUserByUsername(username);
    if (user) {
      throw { status: 409, message: "Username Exists" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await UserUtils.createUser(username, hashedPassword);
    const token = jwt.sign(
      {
        username: result.username,
        userId: result.id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      message: "User created",
      token: token,
    });
  } catch (e) {
    const status = e.status || 500;
    const message = e.message || e;
    res.status(status).json({
      message,
    });
  }
});

router.post("/signin", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await UserUtils.fetchUserByUsername(username);
    if (!user) {
      throw { status: 401, message: "Auth Failed" };
    }

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const token = jwt.sign(
        {
          username: user.username,
          userId: user._id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({
        message: "Auth successful",
        token: token,
      });
    }

    throw { status: 401, message: "Auth Failed" };
  } catch (e) {
    const status = e.status || 500;
    const message = e.message || e;
    res.status(status).json({
      message,
    });
  }
});

router.get("/", checkAuth, async (req, res, next) => {
  const id = req.userData.userId;
  try {
    const user = await UserUtils.fetchUserById(id);

    if (!user) {
      throw { status: 401, message: "Auth Failed" };
    }

    return res.status(200).json({
      message: "User fetched successfully",
      user,
    });
    throw { status: 401, message: "Auth Failed" };
  } catch (e) {
    const status = e.status || 500;
    const message = e.message || e;
    res.status(status).json({
      message,
    });
  }
});

export default router;
