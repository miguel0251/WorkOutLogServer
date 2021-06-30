require('dotenv').config();
const Express = require('express');
const app = Express();
const dbConnection = require('./db');

const controllers = require('./controllers');

app.use(Express.json());

app.use(require('./middleware/headers'));

app.use('/workoutlog', controllers.workoutlogcontroller);

//app.use(require('./middleware/validate-jwt'));
app.use('/user', controllers.userController);

dbConnection
  .authenticate()
  .then(() => dbConnection.sync())
  .then(() => {
    app.listen(8080, () => {
      console.log(`[Server]: App is lstening on 8080.`);
    });
  })
  .catch((err) => {
    console.log(`[Server]:Server crashed. Error=${err}`);
  });
