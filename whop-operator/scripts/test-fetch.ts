import * as dotenv from "dotenv";
dotenv.config();

async function run() {
  const url = "https://api.whop.com/api/v2/products?company_id=automatehq-034f&route=automatehq-034f";
  console.log("Fetching: " + url);
  
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.WHOP_API_KEY}`
    }
  });

  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Response:", text);
}
run();
