const express = require('express');
var cors = require('cors')

const q1Router = require('./Routers/q1Router');
const q2Router = require('./Routers/q2Router');

var app = express();

//require('./configs/database')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())

app.use('/api/q1', q1Router);
app.use('/api/q2', q2Router);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);



