import express from "express";
import mongoose from "mongoose";
import {
  loginValidator,
  postValidator,
  registerValidator,
} from "./validations/validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import multer from "multer";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json())
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.get("/auth/me", checkAuth, UserController.getMe);

app.post('/auth/login',loginValidator, handleValidationErrors, UserController.login)
app.post( "/auth/register",registerValidator,handleValidationErrors,UserController.register)

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts/:id", PostController.getOne);
app.get("/tags", PostController.getAllTags);
app.post("/posts/",checkAuth, postValidator,registerValidator,PostController.createPost);
app.get("/posts", PostController.getAll);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, registerValidator, PostController.update);

mongoose
  .connect(
    "mongodb+srv://gaunt0066:Panzerkampf06@cluster0.6m4r7dq.mongodb.net/ingside?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongo connected");
  })
  .catch((err) => {
    console.log(err, "mongo error");
  });
app.use(express.json());

app.listen(4444, (req, res) => {
  console.log("server has been started");
});
