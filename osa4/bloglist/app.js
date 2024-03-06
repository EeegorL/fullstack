const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/CBlogs');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const config = require("./utils/config");

mongoose.set('strictQuery', false);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);

module.exports = app;