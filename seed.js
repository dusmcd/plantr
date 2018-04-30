const { db, Gardener, Plot, Vegetable } = require('./model');

db
  .sync({ force: true })
  .then(() => {
    console.log('sync is successful');
    db.close();
  })
  .catch(err => {
    console.error(err.message);
    db.close();
  });
