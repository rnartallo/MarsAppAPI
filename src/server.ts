import express from "express";
import { getPhotosData } from "./getPhotosHelper";
import { getRovers } from "./getRoverHelper";

require("dotenv").config();

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();
router.get("/test", (req, res) => res.send("Hello world !"));

router.get("/rovers", async (req, res) => {
  const data = await getRovers();
  res.send(data);
});

router.get(`/rovers/:roverName/camera/:cameraName`, async (req, res) => {
  let { sol, page, pagestart, pageend } = req.query;
  let { roverName, cameraName } = req.params;
  sol = sol ?? "1000";
  pagestart = pagestart ?? "0";
  const data = await getPhotosData(
    roverName,
    cameraName,
    Number(sol),
    Number(page),
    Number(pagestart),
    pageend
  );
  res.send(data);
});
app.use("/", router);

app.listen(port, () => {
  console.log(`Test backend is running on port ${port}`);
});
