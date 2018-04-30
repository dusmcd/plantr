const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/plantr', {
  logging: false,
});

const Gardener = db.define('gardener', {
  name: Sequelize.STRING,
  age: Sequelize.INTEGER,
});

const Plot = db.define('plot', {
  size: Sequelize.INTEGER,
  shaded: Sequelize.BOOLEAN,
});

const Vegetable = db.define('vegetable', {
  name: Sequelize.STRING,
  color: Sequelize.STRING,
  planted_on: {
    type: Sequelize.DATE,
    defaultValue: Date.now(),
  },
});

Plot.belongsTo(Gardener);
Gardener.hasOne(Plot);

Vegetable.belongsToMany(Plot, { through: 'veg_plot' });
Plot.belongsToMany(Vegetable, { through: 'veg_plot' });

Gardener.belongsTo(Vegetable, { as: 'favorite_vegetable' });
// Vegetable.hasMany(Gardener);

module.exports = { db, Gardener, Plot, Vegetable };
