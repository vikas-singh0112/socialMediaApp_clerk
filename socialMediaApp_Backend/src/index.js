import connectDB from "./db/index.js";
import { app } from "./app.js";

const serverPort = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(serverPort, () => {
    console.log(`\nserver started at port: ${serverPort}`)
  })
}).catch((err) => {
  console.log("mongoDB coonnection failed")
})