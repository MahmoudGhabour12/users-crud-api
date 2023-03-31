const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
var morgan = require('morgan');
const cors = require('cors');

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

const connectDB = require('./database/connection');
const userRouters = require('./routes/user-router');
const authRouters = require('./routes/auth-router');

const app = express();

// Parse request to body-parser
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

// Mongodb connection
connectDB();

// Load all routers
app.use('/', userRouters);
app.use('/auth', authRouters);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
