import * as dotenv from "dotenv";
dotenv.config();

async function run() {
  const url = "https://api.whop.com/api/v2/plans/plan_Voysf86mxACCi";
  
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.WHOP_API_KEY}`
    }
  });

  const text = await res.text();
  console.log("Plan JSON:", text);
}
run();
