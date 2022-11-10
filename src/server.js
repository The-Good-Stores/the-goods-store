require("dotenv").config();
import { createServer } from "http";
import app from "./app";
import { mongoConnect } from "./database/mongo";
const port = process.env.PORT || 8000;
const SERVER = createServer(app);

async function startServer() {
  // Please set up the MONGO_URL in .env file first, then you can uncomment next line
  await mongoConnect();
  SERVER.listen(port, () => {
    console.log(`App is running on ${port}`);
  });
}

startServer();
