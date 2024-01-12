'use strict';

const PORT = 3000;

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/router.js');

const app = express();
app.use(morgan('combined'));
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true
  }
app.use(cors(corsOptions));

/* ROUTERS */
app.use('/api', router);

app.listen(PORT,
    () => { console.log(`Server started on http://localhost:${PORT}/`) });
