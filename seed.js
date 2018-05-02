const { db, Gardener, Plot, Vegetable } = require('./model');
const PlotVegetable = db.model('veg_plot');

db
  .sync({ force: true })
  .then(() => {
    return makePromises();
  })
  .then(values => {
    const plotVegArray = values[0].map((veg, i) => {
      return PlotVegetable.create({
        vegetableId: veg.id,
        plotId: values[1][i].id,
      });
    });
    return Promise.all(plotVegArray);
  })
  .then(() => {
    db.close();
  })
  .catch(err => {
    console.error('thrown in global scope', err.stack);
    db.close();
  });

function makePromises() {
  const vegetablesP = Promise.all([
    Vegetable.create({ name: 'Carrot', color: 'Orange' }),
    Vegetable.create({ name: 'Tomato', color: 'Red' }),
    Vegetable.create({ name: 'Broccoli', color: 'Green' }),
  ]);
  const plotsP = vegetablesP
    .then(([carrot, tomato, broccoli]) => {
      return Promise.all([
        Gardener.create({
          name: 'Bob',
          age: 35,
          favoriteVegetableId: carrot.id,
        }),
        Gardener.create({
          name: 'Jordan',
          age: 25,
          favoriteVegetableId: tomato.id,
        }),
        Gardener.create({
          name: 'Wendie',
          age: 50,
          favoriteVegetableId: broccoli.id,
        }),
      ]);
    })
    .then(([bob, jordan, wendie]) => {
      return Promise.all([
        Plot.create({ size: 100, shaded: true, gardenerId: bob.id }),
        Plot.create({ size: 200, shaded: true, gardenerId: jordan.id }),
        Plot.create({ size: 500, shaded: false, gardenerId: wendie.id }),
      ]);
    });
  return Promise.all([vegetablesP, plotsP]);
}
