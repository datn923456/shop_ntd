const path = require('path');
const express = require('express');
const session = require('express-session');
const handlebars = require('handlebars');
const helpers = require('handlebars-helpers')();
const flash = require('express-flash');
const crypto = require('crypto');
const methodOverride = require('method-override');
const morgan = require('morgan');
const { engine } = require ('express-handlebars');
const cookieParser = require('cookie-parser')
const SortMiddleware = require('./app/middlewares/SortMiddleware')
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server,{ cors:{origin:"*"}})
const port = 3000;
const numeral = require('numeral');
const route = require('./routes');
const db = require('./config/db');
const { type } = require('os');

//Connect to db
db.connect();
handlebars.registerHelper('eq', helpers.eq);
handlebars.registerHelper('formatCurrency', function (value) {
  return numeral(value).format('0,0');
});

const secretKey = crypto.randomBytes(32).toString('hex');
app.use(cookieParser());

// io.on("connection", function(socket) {
//   console.log("Có người connected: " + socket.id);
//   // socket.emit("socketId", socket.id);
//   socket.on("disconnect", function(){
//     console.log(socket.id + "ngat ket noi !!!")
//   });

//   socket.on("Client-send-data", function(data){
//     console.log(socket.id + "vua gui: " + data);
//     io.sockets.emit("Server-send-data", data + "888");
//   });

// });
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
  saveUninitialized: false,
  maxAge: 24 * 60 * 60 * 1000, // Thời gian sống của phiên (ở đây là 1 ngày)
  max: 50, // Số phiên tối đa được lưu trữ trong bộ nhớ
}));

app.use(SortMiddleware);
app.use(flash());

app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
      sum: (a,b) => a + b,
      sortable: (field, sort) =>{
        const sortType = field === sort.column ? sort.type : 'default';
        
        const icons = {
          default: 'oi oi-elevator',
          asc: 'oi oi-sort-ascending',
          desc: 'oi oi-sort-descending',
        };
        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}"><span class="${icon}"></span></a>`;
      }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'resources/views'));

//middleware 404 not found
// app.locals.io = io;
route(app,io);
app.use((req,res) =>{
  return res.render('404');
})


//hbs.registerpartials(partialDir)
//app.engine('myPartial', '{{name}}');
server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
