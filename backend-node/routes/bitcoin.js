import express from "express";
import UserUtils from "../utils/user.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/buy", checkAuth, async (req, res, next) => {
  const { bitcoin, value } = req.body;
  const id = req.userData.userId
  try {
    const user = await UserUtils.fetchUserById(id);
    if (!user) {
      throw { status: 401, message: "Auth Failed" };
    }
    if (user.wallet.value < bitcoin * value) {
      throw { status: 400, message: "Not enough money in the wallet" };
    }
    const result = await UserUtils.buyBitcoinAndUpdateUser(
      user,
      bitcoin,
      value
    );
    return res.status(201).json({
      message: `Successfully bought bitcoin for userId ${id}`,
    });

    throw { status: 500, message: "Update Failed" };
  } catch (e) {
    const status = e.status || 500;
    const message = e.message || e;
    res.status(status).json({
      message,
    });
  }
});

router.post("/sell", checkAuth, async (req, res, next) => {
  const { bitcoin, value } = req.body;
  const id = req.userData.userId
  try {
    const user = await UserUtils.fetchUserById(id);
    if (!user) {
      throw { status: 401, message: "Auth Failed" };
    }
    if (user.bitcoin.amount < bitcoin) {
      throw { status: 400, message: "Not enough bitcoins to sell" };
    }
    const result = await UserUtils.sellBitcoinAndUpdateUser(
      user,
      bitcoin,
      value
    );
    return res.status(201).json({
      message: `Successfully sold bitcoin for userId ${id}`,
    });

    throw { status: 500, message: "Update Failed" };
  } catch (e) {
    const status = e.status || 500;
    const message = e.message || e;
    res.status(status).json({
      message,
    });
  }
});

export default router;
