import Border from "./sprites/Border";

const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5);
  });
};

const addBorders = (game, group) => {
  console.log("adding borders");
  const borders = [];
  borders.push(
    new Border({
      game,
      x: 0,
      y: 0,
      asset: "cBorder",
    }),
    new Border({
      game,
      x: game.width - 32,
      y: game.height - 32,
    }),
    new Border({
      game,
      x: 32,
      y: 0,
      asset: "xBorder",
    }),
    new Border({
      game,
      x: 0,
      y: 32,
      asset: "yBorder",
    })
  );
  group.addMultiple(borders);
};

export { centerGameObjects, addBorders };
