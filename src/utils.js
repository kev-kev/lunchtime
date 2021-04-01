import Border from "./sprites/Border";

const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5);
  });
};

const addBorders = (game, group) => {
  console.log("adding borders");
  const corner1 = new Border({
    game,
    x: 0,
    y: 0,
    asset: "cBorder",
  });
  const xBorder1 = new Border({
    game,
    x: 32,
    y: 0,
    asset: "xBorder",
  });
  const yBorder1 = new Border({
    game,
    x: 0,
    y: 32,
    asset: "yBorder",
  });
  group.add(xBorder1);
  group.add(corner1);
  group.add(yBorder1);
};

export { centerGameObjects, addBorders };
