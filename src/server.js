require("dotenv").config();
const http = require("http");
const app = require("./app");
const { mongoConnect } = require("./database/mongo");
const port = process.env.PORT || 8000;
const SERVER = http.createServer(app);

async function startServer() {
  // Please set up the MONGO_URL in .env file first, then you can uncomment next line
  // await mongoConnect();
  SERVER.listen(port, () => {
    console.log(`App is running on ${port}`);
  });
}

startServer();
