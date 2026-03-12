import Whop from "@whop/sdk";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.WHOP_API_KEY) {
  throw new Error("WHOP_API_KEY is missing from environment variables");
}

export const whop = new Whop({
  apiKey: process.env.WHOP_API_KEY,
});

export const companyId = process.env.WHOP_COMPANY_ID;
