require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const weatherRoutes = require('./routes/weather');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/weather', weatherRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
