const Express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router");
const http = require("http");
//const { instrument } = require("@socket.io/admin-ui");   USed for testing
const { Server } = require("socket.io");
const { useReducer } = require("react");
const app = Express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

//"exp://192.168.1.151:19000"

//SOCKET IO STUFF
const PORT = 4077;

// const { Server } = require("socket.io");
// const io = new Server({ cors: { origin: "http://192.168.1.151:19000" } });

// const {}

app.use(cors()).use(morgan("short")).use(Express.json()).use(router);

let users = [];

io.on("connection", (socket) => {
  console.log(` User connected ${socket.id}`);
  //socket.emit(socket.id)

  // socket.emit("");
  // io.clients((error, clients) => {
  //   if (error) throw error;
  //   console.log(clients);
  // socket.emit("hello");
  // });

  socket.on("position", (position) => {
    socket.emit("position", position); //To send information to all users except the one who sent it
    //console.log("change", position);

    users = [...users.filter((el) => el.userId !== position.userId), position];

    // users = [...users.map(el => {
    //   if(el.userId === position.userId) {
    //     return position;
    //   } else {
    //     return el;
    //   }
    // })

    //   , position];
    // console.log(users);
    socket.emit("otherPositions", users);

    //For Later
    // socket.on("join-rally", (rally, cb) => {
    //   socket.join(rally);
    //   cb(`Joined ${rally}`);
    // });

    socket.on("disconnect", () => {
      // users = [...users.filter((el) => el.socket.id !== socket.id)];
    });
  });
});

async function bootstrap() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydb");
    httpServer.listen(4077, async () => {
      console.log(
        "Server is running and connected to db, http://localhost:4077"
      );
    });
  } catch (error) {
    console.error(error);
  }
}
bootstrap();

module.exports = app;
