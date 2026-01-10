const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
// Taasan natin limit para sa malalaking import files
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const goalRoutes = require('./routes/goals');
const aiRoutes = require('./routes/ai');
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data'); // <--- ADD THIS

app.use('/api/goals', goalRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes); // <--- ADD THIS

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));