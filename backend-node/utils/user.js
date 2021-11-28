import mongoose from "mongoose";
import User from "../models/user.js";

const fetchUserByUsername = async (username) => {
  const user = await User.findOne({ username }).exec();
  return user;
};

const fetchUserById = async (id) => {
  const user = await User.findOne({ _id: id }).exec();
  if (!user) return null;

  return {
    username: user.username,
    wallet: user.wallet,
    bitcoin: user.bitcoin,
    id: user._id,
  };
};

const createUser = async (username, hashedPassword) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: username,
    password: hashedPassword,
  });
  const result = await user.save();
  return {
    username: result.username,
    wallet: result.wallet,
    bitcoin: result.bitcoin,
    id: result._id,
  };
};

const buyBitcoinAndUpdateUser = async (user, bitcoin, value) => {
  const result = await User.findOneAndUpdate(
    { username: user.username },
    {
      bitcoin: {
        amount: user.bitcoin.amount + bitcoin,
        value: (user.bitcoin.amount + bitcoin) * value,
      },
      wallet: {
        value: user.wallet.value - bitcoin * value,
      },
    },
    { new: true }
  );

  return result;
};

const sellBitcoinAndUpdateUser = async (user, bitcoin, value) => {
  const result = await User.findOneAndUpdate(
    { username: user.username },
    {
      bitcoin: {
        amount: user.bitcoin.amount - bitcoin,
        value: (user.bitcoin.amount - bitcoin) * value,
      },
      wallet: {
        value: user.wallet.value + bitcoin * value,
      },
    },
    { new: true }
  );

  return result;
};

export default {
  fetchUserByUsername,
  fetchUserById,
  createUser,
  buyBitcoinAndUpdateUser,
  sellBitcoinAndUpdateUser,
};
