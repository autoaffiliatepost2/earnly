const express = require("express");
const app = express();
var path = require('path');
const PORT = process.env.PORT || 5006;
const cors = require("cors");
// var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');

//Middleware files
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
// app.use('/', usersRouter);

// app.get("/", (req, res) => {
//   res.send("my name is vijay 111111");
// });

app.listen(PORT, () => {
  console.log(`This server is running on PORT ${PORT}`);
});
