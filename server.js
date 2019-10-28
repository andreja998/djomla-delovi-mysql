const express = require('express');
bodyParser = require('body-parser');

const routes = require('./Routes/MakerRoutes');

app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


port = process.env.PORT || 3000;
app.listen(port);

console.log('RESTful API server started on: ' + port);

routes(app);