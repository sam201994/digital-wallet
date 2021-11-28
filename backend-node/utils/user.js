import mongoose from "mongoose";
import User from "../models/user.js";

const fetchUserByUsername = async (username) => {
  const user = await User.findOne({ username }).exec();
  if (!user) return null;
  return {
    username: user.username,
    wallet: user.wallet,
    bitcoin: user.bitcoin,
    id: user._id,
  };
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
  const result = await User.updateOne(
    { _id: user._id },
    {
      $set: {
        bitcoin: {
          amount: user.bitcoin.amount + bitcoin,
          value: (user.bitcoin.amount + bitcoin) * value,
        },
        wallet: {
          value: user.wallet.value - bitcoin * value,
        },
      },
    }
  ).exec();
  return result;
};

const sellBitcoinAndUpdateUser = async (user, bitcoin, value) => {
  const result = await User.updateOne(
    { _id: user._id },
    {
      $set: {
        bitcoin: {
          amount: user.bitcoin.amount - bitcoin,
          value: (user.bitcoin.amount - bitcoin) * value,
        },
        wallet: {
          value: user.wallet.value + bitcoin * value,
        },
      },
    }
  ).exec();
  return result;
};

export default {
  fetchUserByUsername,
  fetchUserById,
  createUser,
  buyBitcoinAndUpdateUser,
  sellBitcoinAndUpdateUser,
};
