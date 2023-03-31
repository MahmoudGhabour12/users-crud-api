const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
var morgan = require('morgan');

const connectDB = require('./database/connection');
const routers = require('./routes/router');

const app = express();

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

// Parse request to body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Mongodb connection
connectDB();

// Load all routers
app.use('/', routers);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
