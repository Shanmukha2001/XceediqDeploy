const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/post');
require('dotenv').config(); // Load environment variables
const path = require("path")
const app = express();

app.use(cors());
const _dirname = path.dirname("");
const buildpath = path.join(_dirname,"../frontend/build");
app.use(express.static(buildpath));
app.use(bodyParser.json());
app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));
