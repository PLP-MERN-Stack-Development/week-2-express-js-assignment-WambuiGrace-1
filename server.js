const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const productsRouter = require('./routes/products');
const logger = require('./middleware/logger');
const { v4: uuidv4 } = require('uuid');

//Middleware
app.use(bodyParser.json());
app.use(logger);

app.use('/api/products', productsRouter);
app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: statusCode
    }
  });
});

app.get('/', (req, res) => {
    res.send('Hello world!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//Export the app for testing purposes
module.exports = app;