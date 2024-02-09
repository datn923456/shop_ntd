const path = require('path');
const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const crypto = require('crypto');
const methodOverride = require('method-override');
const morgan = require('morgan');
const { engine } = require ('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

//Connect to db
db.connect();

const secretKey = crypto.randomBytes(32).toString('hex');

app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json());

app.use(morgan('combined'));
app.use(methodOverride('_method'));

app.use(session({
  secret: secretKey, // Chuỗi bí mật để ký và mã hóa session ID
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
      sum: (a,b) => a + b,
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'resources/views'));

route(app);

//hbs.registerpartials(partialDir)
//app.engine('myPartial', '{{name}}');
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
