const { db, Gardener, Plot, Vegetable } = require('./model');
const PlotVegetable = db.model('veg_plot');

db
  .sync({ force: true })
  .then(() => {
    return makePromise();
  })
  .then(values => {
    return PlotVegetable.create({
      vegetableId: values[0].id,
      plotId: values[1].id,
    });
  })
  .then(() => {
    db.close();
  })
  .catch(err => {
    console.error('thrown in global scope', err.stack);
    db.close();
  });

function makePromise() {
  const vegetableP = Vegetable.create({
    name: 'Tomato',
    color: 'Red',
  });

  const plotP = vegetableP
    .then(veg => {
      return Gardener.create({
        name: 'Rick',
        age: 40,
        favoriteVegetableId: veg.id,
      });
    })
    .then(gardener => {
      return Plot.create({
        size: 400,
        shaded: true,
        gardenerId: gardener.id,
      });
    })
    .catch(err => {
      console.error('thrown in makePromise function', err.stack);
    });

  return Promise.all([vegetableP, plotP]);
}
