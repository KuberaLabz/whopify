import Whop from "@whop/sdk";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

if (!process.env.WHOP_API_KEY) {
  console.warn("Warning: WHOP_API_KEY is not set in the environment.");
}

export const whop = new Whop({
  apiKey: process.env.WHOP_API_KEY,
});
