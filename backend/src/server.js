import express from "express";
import { restrictAccess } from "./middlewares.js";
import { PTVLocations } from "./ptv-api.js";

const app = express();
const port = 4000;

app.use(restrictAccess);

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
