const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5);
  });
};

const getRandomNum = (min, max) => {
  return Math.random() * (max - min) + min;
};

export { centerGameObjects, getRandomNum };
