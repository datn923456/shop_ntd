const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require ('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

//Connect to db
db.connect();

app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json());

app.use(morgan('combined'));

app.engine('hbs', engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'resources/views'));

route(app);

//hbs.registerpartials(partialDir)
//app.engine('myPartial', '{{name}}');
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));