import express from "express";
import axios from "axios";
import accessControlMiddleware from "./access-control.js";

const app = express();
const port = 4000;

app.use(accessControlMiddleware);

const PTVLocations = axios.create({
  baseURL:
    "https://xserver2-europe-eu-test.cloud.ptvgroup.com/services/rest/XLocate/locations/",
  timeout: 6000,
  headers: {
    Authorization: process.env.npm_config_token,
  },
});

console.log("token ->", process.env.npm_config_token);

app.get("/", async (req, res) => {
  const { search: searchTerm } = req.query;

  try {
    const { data } = await PTVLocations.get(`/${searchTerm}`);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err.message);
    return res.status(503).send("Service occasionnellement non disponible");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
