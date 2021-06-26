require('dotenv').config();
const Express = require('express');
const app = Express();
const dbConnection = require('./db');

const controllers = require('./controllers');

app.use(Express.json());

app.use('/workoutlog', controllers.workoutlogcontroller);

//app.use(require('./middleware/validate-jwt'));
app.use('/user', controllers.userController);

dbConnection
  .authenticate()
  .then(() => dbConnection.sync({ force: true }))
  .then(() => {
    app.listen(3000, () => {
      console.log(`[Server]: App is lstening on 3000.`);
    });
  })
  .catch((err) => {
    console.log(`[Server]:Server crashed. Error=${err}`);
  });
