module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`Participant with ${socket.id} id has joined`);

    socket.on("disconnect", () => {
      console.log(`Participant with id ${socket.id} has left`);
    });
  });
};
