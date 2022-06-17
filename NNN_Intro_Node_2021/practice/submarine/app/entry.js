'use strict';

// [ library ]
import $, { map } from "jquery";
import io from "socket.io-client";

// [ object ]
const gameObj = {
  radarCanvasWidth: 500,
  radarCanvasHeight: 500,
  scoreCanvasWidth: 300,
  scoreCanvasHeight: 500,
  itemRadius: 4,
  airRadius: 6,
  deg: 0,
  rotationDegreeByDirection: {
    'left': 0,
    'up': 270,
    'down': 90,
    'right': 0
  },
  myDisplayName: $("#main").attr("data-displayName"),
  myThumbUrl: $("#main").attr("data-thumbUrl"),
  fieldWidth: null,
  fieldHeight: null,
  itemsMap: new Map(),
  airMap: new Map()
};

// [ function: init ]
function init() {
  // radar canvas
  const radarCanvas = $("#radar")[0];
  radarCanvas.width = gameObj.radarCanvasWidth;
  radarCanvas.height = gameObj.radarCanvasHeight;
  gameObj.ctxRadar = radarCanvas.getContext("2d");    // ctx -> context

  // score canvas
  const scoreCanvas = $("#score")[0];
  scoreCanvas.width = gameObj.scoreCanvasWidth;
  scoreCanvas.height = gameObj.scoreCanvasHeight;
  gameObj.ctxScore = scoreCanvas.getContext("2d");

  // submarine image
  const submarineImage = new Image();
  submarineImage.src = "/images/submarine.png";
  gameObj.submarineImage = submarineImage;

  // missile image
  gameObj.missileImage = new Image();
  gameObj.missileImage.src = "/images/missile.png";
}

// [ function: helper ]
function getRadian(angle) {
  return angle * Math.PI / 180;
}

function calculationBetweenTwoPoints(pX, pY, oX, oY, gameWidth, gameHeight, radarCanvasWidth, radarCanvasHeight) {
  let distanceX = 99999999;
  let distanceY = 99999999;
  let drawX = null;
  let drawY = null;

  if (pX <= oX) {
      // 右から
      distanceX = oX - pX;
      drawX = (radarCanvasWidth / 2) + distanceX;
      // 左から
      let tmpDistance = pX + gameWidth - oX;
      if (distanceX > tmpDistance) {
          distanceX = tmpDistance;
          drawX = (radarCanvasWidth / 2) - distanceX;
      }

  } else {
      // 右から
      distanceX = pX - oX;
      drawX = (radarCanvasWidth / 2) - distanceX;
      // 左から
      let tmpDistance = oX + gameWidth - pX;
      if (distanceX > tmpDistance) {
          distanceX = tmpDistance;
          drawX = (radarCanvasWidth / 2) + distanceX;
      }
  }

  if (pY <= oY) {
      // 下から
      distanceY = oY - pY;
      drawY = (radarCanvasHeight / 2) + distanceY;
      // 上から
      let tmpDistance = pY + gameHeight - oY;
      if (distanceY > tmpDistance) {
          distanceY = tmpDistance;
          drawY = (radarCanvasHeight / 2) - distanceY;
      }

  } else {
      // 上から
      distanceY = pY - oY;
      drawY = (radarCanvasHeight / 2) - distanceY;
      // 下から
      let tmpDistance = oY + gameHeight - pY;
      if (distanceY > tmpDistance) {
          distanceY = tmpDistance;
          drawY = (radarCanvasHeight / 2) + distanceY;
      }
  }

  const degree = calcTwoPointsDegree(drawX, drawY, radarCanvasWidth / 2, radarCanvasHeight / 2);

  return {
      distanceX,
      distanceY,
      drawX,
      drawY,
      degree
  };
}

function calcTwoPointsDegree(x1, y1, x2, y2) {
  const radian = Math.atan2(y2 - y1, x2 - x1);
  const degree = radian * 180 / Math.PI + 180;
  return degree;
}

function calcDegreeDiffFromRadar(degRadar, degItem) {
    let diff = degRadar - degItem;
    if (diff < 0) {
        diff += 360;
    }
    return diff;
}

function calcOpacity(degreeDiff) {
  const deleteDeg = 270;
  degreeDiff = degreeDiff > deleteDeg ? deleteDeg : degreeDiff; // もう少しだけ暗くするコツ
  return (1 - degreeDiff / deleteDeg).toFixed(2);
}

// [ function: draw rader ]
function drawRadar(ctxRadar) {
  const x = gameObj.radarCanvasWidth / 2;
  const y = gameObj.radarCanvasHeight / 2;
  const r = gameObj.radarCanvasWidth * 1.5 / 2;       // 対角線の長さの半分

  ctxRadar.save();

  ctxRadar.beginPath();
  ctxRadar.translate(x, y);
  ctxRadar.rotate(getRadian(gameObj.deg));

  ctxRadar.fillStyle = "rgba(0, 220, 0, 0.5)";

  ctxRadar.arc(0, 0, r, getRadian(0), getRadian(-30), true);
  ctxRadar.lineTo(0, 0);

  ctxRadar.fill();

  ctxRadar.restore();
  gameObj.deg = (gameObj.deg + 5) % 360;
}

function drawMap(gameObj) {
  // アイテムの描画
  for (let [index, item] of gameObj.itemsMap) {
    const distanceObj = calculationBetweenTwoPoints(
      gameObj.myPlayerObj.x, gameObj.myPlayerObj.y,
      item.x, item.y,
      gameObj.fieldWidth, gameObj.fieldHeight,
      gameObj.radarCanvasWidth, gameObj.radarCanvasHeight
    );

    if (distanceObj.distanceX <= (gameObj.radarCanvasWidth / 2)
          && distanceObj.distanceY <= (gameObj.radarCanvasHeight / 2))
    {
      const degreeDiff = calcDegreeDiffFromRadar(gameObj.deg, distanceObj.degree);
      const toumeido = calcOpacity(degreeDiff);

      gameObj.ctxRadar.fillStyle = `rgba(255, 165, 0, ${toumeido})`;
      gameObj.ctxRadar.beginPath();
      gameObj.ctxRadar.arc(distanceObj.drawX, distanceObj.drawY, gameObj.itemRadius, 0, Math.PI * 2, true);
      gameObj.ctxRadar.fill();
    }
  }
  // 空気の描画
  for (const [airKey, airObj] of gameObj.airMap) {
    const distanceObj = calculationBetweenTwoPoints(
      gameObj.myPlayerObj.x, gameObj.myPlayerObj.y,
      airObj.x, airObj.y,
      gameObj.fieldWidth, gameObj.fieldHeight,
      gameObj.radarCanvasWidth, gameObj.radarCanvasHeight
    );

    if (distanceObj.distanceX <= (gameObj.radarCanvasWidth / 2)
          && distanceObj.distanceY <= (gameObj.radarCanvasHeight / 2))
    {
      const degreeDiff = calcDegreeDiffFromRadar(gameObj.deg, distanceObj.degree);
      const toumeido = calcOpacity(degreeDiff);

      gameObj.ctxRadar.fillStyle = `rgb(0, 220, 255, ${toumeido})`;
      gameObj.ctxRadar.beginPath();
      gameObj.ctxRadar.arc(distanceObj.drawX, distanceObj.drawY, gameObj.airRadius, 0, Math.PI * 2, true);
      gameObj.ctxRadar.fill();
    }
  }
}

function drawSubmarine(ctxRadar, myPlayerObj) {
  const rotationDegree = gameObj.rotationDegreeByDirection[myPlayerObj.direction];

  ctxRadar.save();
  ctxRadar.translate(gameObj.radarCanvasWidth / 2, gameObj.radarCanvasHeight / 2);
  ctxRadar.rotate(getRadian(rotationDegree));
  if (myPlayerObj.direction === "left") {
    ctxRadar.scale(-1, 1);
  }
  ctxRadar.drawImage(
    gameObj.submarineImage,
    -(gameObj.submarineImage.width / 2),
    -(gameObj.submarineImage.height / 2)
  );
  ctxRadar.restore();
}

// [ function: draw score ]
function drawAirTimer(ctxScore, airTime) {
  ctxScore.fillStyle = "rgb(0, 220, 250)";
  ctxScore.font = "bold 40px Arial";
  ctxScore.fillText(airTime, 110, 50);
}

function drawMissiles(ctxScore, missilesMany) {
  for (let i = 0; i < missilesMany; i++) {
    ctxScore.drawImage(gameObj.missileImage, 50 * i, 80);
  }
}

// [ function: execute frame ]
function ticker() {
  if (!gameObj.myPlayerObj || !gameObj.playersMap)
    return;

  // < rader canvas >
  gameObj.ctxRadar.clearRect(   // clear
    0,
    0,
    gameObj.radarCanvasWidth,
    gameObj.radarCanvasHeight
  );
  drawRadar(gameObj.ctxRadar);
  drawMap(gameObj);
  drawSubmarine(
    gameObj.ctxRadar,
    gameObj.myPlayerObj
  );

  // < score canvas >
  gameObj.ctxScore.clearRect(   // clear
    0,
    0,
    gameObj.scoreCanvasWidth,
    gameObj.scoreCanvasHeight
  );
  drawAirTimer(
    gameObj.ctxScore,
    gameObj.myPlayerObj.airTime
  );
  drawMissiles(
    gameObj.ctxScore,
    gameObj.myPlayerObj.missilesMany
  );
}

// [ event: recieve socket ]
const socketQueryParameters
= `displayName=${gameObj.myDisplayName}&thumbUrl=${gameObj.myThumbUrl}`;
const socket = io($("#main").attr("data-ipAddress") + "?" + socketQueryParameters);

socket.on("start data", (startObj) => {
  gameObj.fieldWidth = startObj.fieldWidth;
  gameObj.fieldHeight = startObj.fieldHeight;
  gameObj.myPlayerObj = startObj.playerObj;
});

socket.on("map data", (compressed) => {
  const playersArray = compressed[0];
  const itemsArray = compressed[1];
  const airArray = compressed[2];

  gameObj.playersMap = new Map();
  for (let compressedPlayerData of playersArray) {
    const player = {};
    player.x = compressedPlayerData[0];
    player.y = compressedPlayerData[1];
    player.playerId = compressedPlayerData[2];
    player.displayName = compressedPlayerData[3];
    player.score = compressedPlayerData[4];
    player.isAlive = compressedPlayerData[5];
    player.direction = compressedPlayerData[6];
    player.missilesMany = compressedPlayerData[7];
    player.airTime = compressedPlayerData[8];

    gameObj.playersMap.set(player.playerId, player);
    
    if (player.playerId === gameObj.myPlayerObj.playerId) {
      gameObj.myPlayerObj.x = compressedPlayerData[0];
      gameObj.myPlayerObj.y = compressedPlayerData[1];
      gameObj.myPlayerObj.displayName = compressedPlayerData[3];
      gameObj.myPlayerObj.score = compressedPlayerData[4];
      gameObj.myPlayerObj.isAlive = compressedPlayerData[5];
      gameObj.myPlayerObj.missilesMany = compressedPlayerData[7];
      gameObj.myPlayerObj.airTime = compressedPlayerData[8];
    }
  }

  gameObj.itemsMap = new Map();
  itemsArray.forEach((compressedItemData, index) => {
    gameObj.itemsMap.set(
      index,
      { x: compressedItemData[0], y: compressedItemData[1] }
    );
  });

  gameObj.airMap = new Map();
  airArray.forEach((compressedAirData, index) => {
    gameObj.airMap.set(
      index,
      { x: compressedAirData[0], y: compressedAirData[1] }
    );
  });
});

// [ event: recieve key ]
$(window).keydown(function(event) {
  if (!gameObj.myPlayerObj || gameObj.myPlayerObj.isAlive === false) return;

  switch (event.key) {
    case 'ArrowLeft':
      if (gameObj.myPlayerObj.direction === 'left') break; // 変わってない
      gameObj.myPlayerObj.direction = 'left';
      drawSubmarine(gameObj.ctxRadar, gameObj.myPlayerObj);
      sendChangeDirection(socket, 'left');
      break;
    case 'ArrowUp':
      if (gameObj.myPlayerObj.direction === 'up') break; // 変わってない
      gameObj.myPlayerObj.direction = 'up';
      drawSubmarine(gameObj.ctxRadar, gameObj.myPlayerObj);
      sendChangeDirection(socket, 'up');
      break;
    case 'ArrowDown':
      if (gameObj.myPlayerObj.direction === 'down') break; // 変わってない
      gameObj.myPlayerObj.direction = 'down';
      drawSubmarine(gameObj.ctxRadar, gameObj.myPlayerObj);
      sendChangeDirection(socket, 'down');
      break;
    case 'ArrowRight':
      if (gameObj.myPlayerObj.direction === 'right') break; // 変わってない
      gameObj.myPlayerObj.direction = 'right';
      drawSubmarine(gameObj.ctxRadar, gameObj.myPlayerObj);
      sendChangeDirection(socket, 'right');
      break;
  }
});

function sendChangeDirection(socket, direction) {
  socket.emit('change direction', direction);
}

// [ run game ]
init();
setInterval(ticker, 33);
