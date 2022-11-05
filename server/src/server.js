require("dotenv").config();
const http = require("http");
const app = require("./app");
const port = process.env.PORT || 8000;
const SERVER = http.createServer(app);

async function startServer() {
  SERVER.listen(port, () => {
    console.log(`App is running on ${port}`);
  });
}

startServer();
