const getBorderData = (game) => {
  return [
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
};

const addBulletCollisions = (borders, bullets, game) => {
  borders.forEach((border) => {
    game.physics.arcade.collide(border, bullets, () => {
      console.log(bullets);
      const bullet = bullets.getClosestTo(border);
      bullet.damage(1);
    });
  });
};

export { getBorderData, addBulletCollisions };
