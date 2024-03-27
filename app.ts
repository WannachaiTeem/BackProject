import express from "express";
import { router as user} from "./api/user";
import bodyParser from "body-parser";
import { router as image} from "./api/image";
import { router as vote} from "./api/vote";
import { router as time} from "./api/time";
import { router as uploadfile} from "./api/uploadfile";
import cors from "cors";

export const app = express();
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(
    cors({
      origin: "*",
    })
  );
app.use("/user", user);
app.use("/image", image);
app.use("/vote", vote);
app.use("/time", time);

app.use("/upload", uploadfile);
app.use("/uploads", express.static("uploads"));