const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/DBConnection');
const dotenv = require('dotenv').config();
connectDB();
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/openai', require('./routes/openAiRoutes'));

app.use('/book',require('./routes/bookRoutes'));

app.use('/api/contacts',require('./routes/contactRoutes'));

app.use('/api/users',require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Api is Runing on port ${port}!`))