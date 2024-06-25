import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import User from "./models/user.js";
import initializeRoutes from "./routes/index.js";
import models from './models/index.js';

const initialize = async (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    const conn= await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    initializeRoutes(app);
    if (process.env.NODE_ENV === "production") {
      const __dirname = path.resolve();
      app.use(express.static(path.join(__dirname, "/frontend/dist")));
  
      app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
      );
    } else {
      app.get("/", (req, res) => {
        res.send("API is running....");
      });
    }
    app.use(notFound);
    app.use(errorHandler);
}

export default initialize;