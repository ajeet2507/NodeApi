const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const port = 3000;
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/openai', require('./routes/openAiRoutes'));

app.use('/book',require('./routes/bookRoutes'))


app.listen(port, () => console.log(`Api is Runing on port ${port}!`))