const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors');
var cookieParser = require('cookie-parser');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require("xss-clean");
const rateLimit = require('express-rate-limit')
const hpp = require('hpp');



//adding socket.io configuration
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const errorHandler = require('./middleware/error');



//import routes
const authRoutes = require('./routes/authRoutes');
const postRoute = require('./routes/postRoute');


//database connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));


//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
  limit: "5mb",
  extended: true
}));
app.use(cookieParser());
app.use(cors());

// prevent SQL injection
app.use(mongoSanitize());
// adding security headers
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"]
    }
  })
)
// prevent Cross-site Scripting XSS
app.use(xss());
//limit queries per 15mn
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter);
//HTTP Param Pollution
app.use(hpp());

//ROUTES MIDDLEWARE
app.use('/api', authRoutes);
app.use('/api', postRoute);

__dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}


//error middleware
app.use(errorHandler);

//port
const port = process.env.PORT || 9000

// app.listen(port, () => {
//     console.log(` Server running on port ${port}`);
// })
io.on('connection', (socket) => {
  //console.log('a user connected', socket.id);
  socket.on('comment', (msg) => {
    // console.log('new comment received', msg);
    io.emit("new-comment", msg);
  })
})

exports.io = io

server.listen(port, () => {
  console.log(` Server running on port ${port}`);
})

