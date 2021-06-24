const express  = require('express');
const dotenv = require('dotenv').config();

const router = require('./routes/index.js')

const app = express();

app.use(express.json());

app.use('/posts', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))