import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import userRoutes from "./routes/user.js"
import bitcoinRoutes from "./routes/bitcoin.js"

const app = express()

mongoose.connect(
  "mongodb+srv://smritigoel:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0.frrk7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/user", userRoutes);
app.use("/bitcoin", bitcoinRoutes);


app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message
  });
});

export default app
