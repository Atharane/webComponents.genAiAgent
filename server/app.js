import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"
dotenv.config({});

const app = express();
app.use(express.json());


// app.use(
//   cors({
//     origin:
//       process.env.NODE_ENV === "development"
//         ? "http://localhost:3000"
//         : `${process.env.CLIENT_PRODUCTION_URL}`,
//     credentials: true,
//   })
// );
// app.use(
//   cors({
//     // origin: "https://www.turfcreed.com",
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "https://www.turfcreed.com");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});

// app.set("trust proxy", 1);

// // setting up routes
app.use("/api/v1", userRoutes);
// app.use("/api/v1/turf", turfRoutes);
// app.use("/api/v1/creeds", creedRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "server is up" });
});


const PORT = 5000;
const dbURI = process.env.MONGO_DB_URI;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
  app.listen(PORT, () => {
    console.log('Server is running on port 5000');
}))
  .catch((err) => console.log(err));

  