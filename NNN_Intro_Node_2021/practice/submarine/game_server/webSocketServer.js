// [ function: server ]
function createWebSocketServer(io, game) {
  const rootIo = io.of("/");
  
  rootIo.on("connection", (socket) => {
    const displayName = socket.handshake.query.displayName;
    const thumbUrl = socket.handshake.query.thumbUrl;
    const startObj = game.newConnection(socket.id, displayName, thumbUrl);

    // < event: send data >
    socket.emit("start data", startObj);

    // < event: recieve data >
    socket.on("change direction", (direction) => {
      game.updatePlayerDirection(socket.id, direction);
    });

    socket.on("disconnect", () => {
      game.disconnect(socket.id);
    });
  });

  // < event: send data >
  const socketTicker = setInterval(() => {
    rootIo.volatile.emit("map data", game.getMapData());    // send to everyone
  },
  66);
};

// [ export ]
module.exports = {
  createWebSocketServer
};