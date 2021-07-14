import express from "express";
import { getPhotosData } from "./getPhotosHelper";
import { getRovers } from "./getRoverHelper";

require("dotenv").config();

const app = express();
const port = 7000;

app.use(express.json());
const router = express.Router();
router.get("/test", (req, res) => res.send("Hello world !"));

router.get("/rovers", async (req, res) => {
  const data = await getRovers();
  res.send(data);
});

function postToCameraPath(rover: string, camera: string) {
  router.get(`/rovers/${rover}/camera/${camera}`, async (req, res) => {
    let { sol, page, pagestart, pageend } = req.query;
    console.log(req.query);
    sol = sol ?? "1000";
    pagestart = pagestart ?? "0";
    const data = await getPhotosData(
      (rover = rover),
      camera,
      Number(sol),
      Number(page),
      Number(pagestart),
      pageend
    );
    res.send(data);
  });
}

postToCameraPath("Curiosity", "MAST");
app.use("/", router);

app.listen(port, () => {
  console.log(`Test backend is running on port ${port}`);
});
