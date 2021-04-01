import Border from "./sprites/Border";

const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5);
  });
};

const generateBorders = (data, game) => {
  return data.map((borderInfo) => {
    return new Border({
      game,
      x: borderInfo.x,
      y: borderInfo.y,
      asset: borderInfo.asset,
    });
  });
};

const addBorders = (game, group) => {
  const borderData = [
    {
      x: 0,
      y: 0,
      asset: "cBorder",
    },
    {
      x: game.width - 32,
      y: game.height - 32,
      asset: "cBorder",
    },
    {
      x: 0,
      y: game.height - 32,
      asset: "cBorder",
    },
    {
      x: game.width - 32,
      y: 0,
      asset: "cBorder",
    },
    {
      x: 32,
      y: 0,
      asset: "xBorder",
    },
    {
      x: 128,
      y: 0,
      asset: "xBorder",
    },
    {
      x: game.width - 128,
      y: 0,
      asset: "xBorder",
    },
    {
      x: game.width - 224,
      y: 0,
      asset: "xBorder",
    },
    {
      x: 32,
      y: game.height - 32,
      asset: "xBorder",
    },
    {
      x: 128,
      y: game.height - 32,
      asset: "xBorder",
    },
    {
      x: game.width - 128,
      y: game.height - 32,
      asset: "xBorder",
    },
    {
      x: game.width - 224,
      y: game.height - 32,
      asset: "xBorder",
    },
    {
      x: 0,
      y: 32,
      asset: "yBorder",
    },
    {
      x: 0,
      y: game.height - 128,
      asset: "yBorder",
    },
    {
      x: game.width - 32,
      y: 32,
      asset: "yBorder",
    },
    {
      x: game.width - 32,
      y: game.height - 128,
      asset: "yBorder",
    },
  ];
  const borders = generateBorders(borderData, game);
  group.addMultiple(borders);
};

export { centerGameObjects, addBorders };
