import express from "express";
import { Rover, Camera, trimCameraData } from "./cameraTypeHelper";
import { getPhotosData } from "./getPhotosHelper";
import { getRovers } from "./getRoverHelper";
import cors from "cors";
import getMission from "./getMissionHelper";
import getSolLog from "./getSolHelper";
require("dotenv").config();

const app = express();
const port = 7000;
app.use(cors());
app.use(express.json());
const router = express.Router();
router.get("/test", (req, res) => res.send("Hello world !"));

router.get("/rovers", async (req, res) => {
  const data = await getRovers();
  res.send(data);
});

router.get("/rovers/:roverName/camera/:cameraName", async (req, res) => {
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

router.get("/rovers/:rovername", async (req, res) => {
  let { rovername } = req.params;
  const data = await getMission(rovername);
  res.send(data);
});

// router.get("/rovers/:rovername/:sol", async (req, res) => {
//   let { rovername, sol } = req.params;
//   const data = await getSolLog(rovername, Number(sol));
//   res.send(data);
// });

router.get("/rovers/:roverName/cameras", async (req, res) => {
  const { roverName } = req.params;
  const data = await getRovers();
  const roverList: Rover[] = data.rovers;
  for (var rover of roverList) {
    if (rover.name == roverName) {
      let cameraList: Camera[] = rover.cameras;
      const trimmedCameraList: Camera[] = trimCameraData(cameraList);
      res.send(trimmedCameraList);
    }
  }
});
app.use("/", router);

app.listen(port, () => {
  console.log(`Test backend is running on port ${port}`);
});
