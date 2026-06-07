// const express = require('express');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const cors = require('cors');

// const app = express();

// // Middleware setup
// app.use(cors());
// app.use(bodyParser.json());
// app.use(morgan('dev'));

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

// // Export the app for use in index.js
// module.exports = app;

const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve static frontend from /public
app.use(express.static(path.join(__dirname, '../public')));

// Fallback root route -> public/index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Example API mount point placeholder (dodaj swoje controllery)
// const ordersController = require('./controllers/orders');
// app.use('/api', ordersController);

module.exports = app;