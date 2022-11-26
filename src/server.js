// Project Name: Used Goods Store
// Date: Nov 19 2022
// Project Member (SID):
// Long Tang (301225866)
// Alabed, Nabeel
// Chung, Wonyoung
// Park, Inhee
// Vu, Thi Thanh Thu
// Yeom, Hanna

require("dotenv").config();
const http = require("http");
const app = require("./app");
const { mongoConnect } = require("./database/mongo");
const port = process.env.PORT || 8000;
const SERVER = http.createServer(app);

async function startServer() {
  await mongoConnect();
  SERVER.listen(port, () => {
    console.log(`App is running on ${port}`);
  });
}

startServer();
