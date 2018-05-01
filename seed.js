const { db, Gardener, Plot, Vegetable } = require('./model');

db
  .sync({ force: true })
  .then(() => {
    return Vegetable.create({
      name: 'Carrot',
      color: 'Orange',
    });
  })
  .then(veg => {
    return Gardener.create({
      name: 'Bob',
      age: 35,
      favoriteVegetableId: veg.id,
    });
  })
  .then(gardener => {
    return Plot.create({
      size: 100,
      shaded: true,
      gardenerId: gardener.id,
    });
  })
  .then(() => {
    db.close();
  })
  .catch(err => {
    console.error(err.message);
    db.close();
  });
