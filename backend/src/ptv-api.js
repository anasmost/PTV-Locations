import axios from "axios";
import { Buffer } from "node:buffer";

export const PTVLocations = axios.create({
  baseURL:
    "https://xserver2-europe-eu-test.cloud.ptvgroup.com/services/rest/XLocate/locations/",
  timeout: 6000,
  headers: {
    Authorization: `Basic ${Buffer.from(
      process.env.npm_config_credentials
    ).toString("base64")}`,
  },
});

console.log("credentials ->", process.env.npm_config_credentials);
