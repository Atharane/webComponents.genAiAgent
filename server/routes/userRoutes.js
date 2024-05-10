import express from "express";
import * as authControllers from "../controller/userController.js";

const router = express.Router();


router.post("/signup", authControllers.signup);


export default router;
